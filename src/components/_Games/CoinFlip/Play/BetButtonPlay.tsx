import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Address, decodeEventLog, parseEther, zeroAddress } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import AppLink from "@/components/AppLink";
import { getDeploysByName } from "@/constants/contracts/address";
import { useAuth } from "@/context/AuthContext";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useBetGameResultContext } from "@/context/BetGameResultContext";
import { useNotify } from "@/hooks";
import { useCheckAndSwitchNetwork } from "@/hooks/useCheckAndSwitchNetwork";
import { useContractAbi } from "@/hooks/useContractAbi";
import { FlipBetType } from "@/types/bet";
import { Native } from "@/types/token/native";
import { findChain } from "@/utils/address";



const BetButtonPlay = ({
  betOption,
  amount,
  setAmount,
  label,
}: {
  betOption?: FlipBetType;
  amount: string;
  setAmount: any;
  label?: any;
}) => {
  const t = useTranslations("form");
  const { chainId, gameName } = useBetGameBasicContext();
  const { account } = useAuth();

  const { checkAndSwithNetwork } = useCheckAndSwitchNetwork(chainId);
  const { notifyError, notifySuccess } = useNotify();
  const { betId, betResult, reset: resetBet, queryBet } = useBetGameResultContext();

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const token = Native.onChain(chainId);
  const chain = findChain(chainId);

  // contract interaction
  const contractInfo = getDeploysByName(`${chainId}`, gameName);
  const abi = useContractAbi(chainId, contractInfo?.address);
  const { data: hash, error, isError, writeContract } = useWriteContract({});
  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash: hash,
  });

  const getBetIdFromReceipt = () => {
    if (receipt) {
      const log = receipt.logs.find(
        (it) =>
          it.address == contractInfo.address.toLowerCase() &&
          it.topics[0]?.startsWith("0x3a5b25f4")
      );

      if (log) {
        const event = decodeEventLog({
          abi: abi,
          data: log.data,
          topics: log.topics,
        }) as any;

        return event.args.betId;
      }
    }
    return null;
  };

  /**
   * Submit handler
   * @param e
   * @returns
   */
  const handlePayment = (e: any) => {
    if (!checkAndSwithNetwork(e)) {
      return;
    }

    if (betOption == undefined) {
      notifyError({
        title: t("require_bet_option"),
        message: t("require_bet_option_msg"),
      });
      return;
    }

    if (isEmpty(amount)) {
      notifyError({
        title: t("require_bet_amount"),
        message: t("require_bet_amount_msg"),
      });
      return;
    }

    // reset
    resetBet();

    // btn loading state
    setBtnLoading(true);

    // send transaction
    writeContract({
      chainId: chainId,
      address: contractInfo?.address as Address,
      abi: abi,
      functionName: "placeBet",
      args: [
        betOption!,
        parseEther(amount),
        zeroAddress,
        account?.referrer ?? zeroAddress,
        "",
      ],
      value: parseEther(amount),
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      setBtnLoading(false);

      // fetch bet result
      const newBetId = getBetIdFromReceipt();
      queryBet({
        chainId: chainId,
        contractAddress: contractInfo?.address as Address,
        betId: newBetId,
        betAmount: Number(amount),
      });

      notifySuccess({
        title: t("tx_success"),
        message: (
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-stretch justify-items-center">
              <div className="flex flex-wrap gap-1 items-center">
                <span>Bet</span>
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
    <>
      <Button
        size="lg"
        radius="md"
        variant="shadow"
        className="px-4 py-3 w-full mt-2 !shadow-inner-blue bg-gradient-blue text-white font-bold"
        isLoading={btnLoading}
        isDisabled={!!(betId && betResult && betResult.result)}
        onClick={handlePayment}
      >
        {btnLoading ? t("wallet_confirm") : label ?? t("btn_play")}
      </Button>
    </>
  );
};

export default BetButtonPlay;
