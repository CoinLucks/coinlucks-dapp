import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Address, formatEther } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import AppLink from "@/components/AppLink";
import { getDeploysByName } from "@/constants/contracts/address";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useRefetchContext } from "@/context/RefetchContext";
import { useNotify } from "@/hooks";
import { useCheckAndSwitchNetwork } from "@/hooks/useCheckAndSwitchNetwork";
import { useContractAbi } from "@/hooks/useContractAbi";
import { BetGamePlayerStats } from "@/types/bet";
import { Native } from "@/types/token/native";
import { findChain } from "@/utils/address";

const BetButtonPlay = ({
  playerStats,
}: {
  playerStats: BetGamePlayerStats;
}) => {
  const t = useTranslations("form");
  const { chainId, gameName } = useBetGameBasicContext();
  const token = Native.onChain(chainId);
  const chain = findChain(chainId);

  const { notifyError, notifySuccess } = useNotify();
  const { triggerRefetch } = useRefetchContext();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  // contract interaction
  const contractInfo = getDeploysByName(`${chainId}`, gameName);
  const abi = useContractAbi(chainId, contractInfo?.address);
  const { data: hash, error, isError, writeContract } = useWriteContract({});
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  const { checkAndSwithNetwork } = useCheckAndSwitchNetwork(chainId);

  const winnings = formatEther(playerStats?.winnings || 0n);

  /**
   * Submit handler
   * @param e
   * @returns
   */
  const handlePayment = (e: any) => {
    if (!checkAndSwithNetwork(e)) {
      return;
    }

    // btn loading state
    setBtnLoading(true);

    // send transaction
    writeContract({
      chainId: chainId,
      address: contractInfo?.address as Address,
      abi: abi,
      functionName: "claim",
      args: [],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      setBtnLoading(false);

      notifySuccess({
        title: t("tx_success"),
        message: (
          <div className="flex flex-col">
            <div>
              Claim
              <span className="font-bold">
                {`${winnings}`} {token.symbol}
              </span>
              on {gameName}
              {token.symbol}
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
        ),
      });

      // refetch
      setTimeout(() => triggerRefetch("payment"), 5000);
    }

    if (isError && error) {
      setBtnLoading(false);
      // @ts-ignore ignore
      error.cause?.code != 4001 &&
        notifyError({
          title: t("tx_fail"),
          // @ts-ignore ignore
          message: error.cause?.reason || error.details || error.message,
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
    <>
      <span className="text-sm mt-4 text-foreground-800">
        {t("profit")}: {`${winnings}`} {token.symbol}
      </span>
      <Button
        size="lg"
        radius="md"
        variant="shadow"
        className="px-4 py-3 w-full !shadow-inner-blue bg-gradient-blue text-white font-bold"
        isDisabled={playerStats?.winnings > 0 ? false : true}
        isLoading={btnLoading}
        onClick={handlePayment}
      >
        {t("btn_claim")}
      </Button>
    </>
  );
};

export default BetButtonPlay;
