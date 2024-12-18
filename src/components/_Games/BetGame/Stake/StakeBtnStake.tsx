import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import AppLink from "@/components/AppLink";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useRefetchContext } from "@/context/RefetchContext";
import { useNotify } from "@/hooks";
import useBetStakingStake from "@/hooks/game/useBetStakingStake";
import { useCheckAndSwitchNetwork } from "@/hooks/useCheckAndSwitchNetwork";
import { Native } from "@/types/token/native";
import { findChain } from "@/utils/address";

const StakeBtnStake = ({
  amount,
  setAmount,
}: {
  amount: string;
  setAmount: any;
}) => {
  const t = useTranslations("form");
  const { chainId, gameName } = useBetGameBasicContext();
  const token = Native.onChain(chainId);
  const chain = findChain(chainId);

  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const { triggerRefetch } = useRefetchContext();
  const { notifyError, notifySuccess } = useNotify();

  const { sendTransaction, hash, error, isError, isConfirming, isConfirmed } =
    useBetStakingStake(chainId, gameName!, amount);

  const { checkAndSwithNetwork } = useCheckAndSwitchNetwork(chainId);

  const handleSubmit = (e: any) => {
    if (!checkAndSwithNetwork(e)) {
      return;
    }
    if (isEmpty(amount)) {
      notifyError({
        title: t("require_bet_amount"),
        message: t("require_bet_amount_msg"),
      });
      return;
    }

    setBtnLoading(true);

    sendTransaction();
  };

  useEffect(() => {
    if (isConfirmed) {
      setBtnLoading(false);

      notifySuccess({
        title: t("tx_success"),
        message: (
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-stretch justify-items-center">
              <div className="flex flex-wrap gap-1 items-center">
                <span>{t("field_stake")}</span>
                <span className="font-bold">
                  {amount} {token.symbol}
                </span>
                <span>on</span>
                <span>{gameName}</span>
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

      setAmount("");

      triggerRefetch("stake");
    }

    if (isError && error) {
      setBtnLoading(false);

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
    <Button
      size="md"
      radius="md"
      variant="flat"
      className="px-4 py-3 w-full bg-gradient-blue text-white font-bold"
      isLoading={btnLoading}
      onClick={handleSubmit}
    >
      {btnLoading ? t("wallet_confirm") : t("btn_stake")}
    </Button>
  );
};

export default StakeBtnStake;
