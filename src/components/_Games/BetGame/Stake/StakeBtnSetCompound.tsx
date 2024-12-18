import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip, Spinner, Switch } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import AppLink from "@/components/AppLink";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useRefetchContext } from "@/context/RefetchContext";
import { useNotify } from "@/hooks";
import useBetStakingCompund from "@/hooks/game/useBetStakingCompund";
import { useCheckAndSwitchNetwork } from "@/hooks/useCheckAndSwitchNetwork";
import { findChain } from "@/utils/address";

const StakeBtnSetCompound = ({ autoCompound }: { autoCompound: boolean }) => {
  const t = useTranslations("form");
  const { chainId, gameName } = useBetGameBasicContext();
  const chain = findChain(chainId);

  const [checked, setChecked] = useState<boolean>(autoCompound);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const { triggerRefetch } = useRefetchContext();
  const { notifyError, notifySuccess } = useNotify();

  const { sendTransaction, hash, error, isError, isConfirming, isConfirmed } =
    useBetStakingCompund(chainId, gameName!, !autoCompound);

  const { checkAndSwithNetwork } = useCheckAndSwitchNetwork(chainId);

  const handleSubmit = (e: any) => {
    if (!checkAndSwithNetwork(e)) {
      return;
    }

    setBtnLoading(true);

    sendTransaction();
  };

  useEffect(() => {
    if (isConfirmed) {
      setBtnLoading(false);
      setChecked(!autoCompound);

      notifySuccess({
        title: t("tx_success"),
        message: (
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-stretch justify-items-center">
              <div className="flex flex-wrap gap-1 items-center">
                <span>Autocompound Updated</span>
              </div>
              <AppLink
                className="gap-1"
                href={`${chain?.blockExplorers?.default.url}/tx/${hash}`}
              >
                <span className="text-primary whitespace-nowrap text-ellipsis overflow-hidden max-w-64">
                  {t("tx_view")}
                </span>
                <Icon height={18} icon="fluent:share-16-regular" width={18} />
              </AppLink>
            </div>
          </div>
        ),
      });

      triggerRefetch("stake");
    }

    if (isError && error) {
      setBtnLoading(false);
      setChecked(autoCompound);
      // @ts-ignore ignore
      error.cause?.code != 4001 &&
        notifyError({
          title: t("tx_fail"),
          // @ts-ignore ignore
          message: error.cause?.reason || error.details || error.message
        });
    }
  }, [
    hash,
    isConfirming,
    isConfirmed,
    isError,
    error,
    notifyError,
    notifySuccess,
  ]);

  return (
    <div className="flex flex-col items-end justify-end gap-1">
      <Switch
        size="sm"
        classNames={{
          wrapper: "bg-background-500",
        }}
        isSelected={checked}
        isDisabled={btnLoading}
        onChange={handleSubmit}
      ></Switch>
      {btnLoading && (
        <Chip
          size="md"
          variant="flat"
          color="primary"
          startContent={<Spinner size="sm" color="primary" />}
        >
          {t("wallet_confirm")}
        </Chip>
      )}
    </div>
  );
};

export default StakeBtnSetCompound;
