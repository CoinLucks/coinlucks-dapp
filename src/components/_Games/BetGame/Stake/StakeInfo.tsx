import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import CountDown from "@/components/CountDown";
import CryptoCurrency from "@/components/CryptoCurrency";
import Tips from "@/components/Tips";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useRefetchContext } from "@/context/RefetchContext";
import useBetStakingPlayerStats from "@/hooks/game/useBetStakingPlayerStats";
import useBetStakingPool from "@/hooks/game/useBetStakingPool";
import { Native } from "@/types/token/native";

import { StakeInfoLoading } from "../loading";
import { get14DaySimpleAPR } from "../utils";

import StakeBtnSetCompound from "./StakeBtnSetCompound";

const StakeInfo = () => {
  const t = useTranslations("pool");
  const { chainId, gameName } = useBetGameBasicContext();
  const token = Native.onChain(chainId);
  const { triggers } = useRefetchContext();
  const { address } = useAccount();
  const {
    poolStats,
    fetchStatus: poolFetchStatus,
    refetch: poolRefetch,
  } = useBetStakingPool(chainId, gameName);
  const {
    playerStats,
    fetchStatus: playerFetchStatus,
    refetch: playerRefetch,
  } = useBetStakingPlayerStats(chainId, gameName, address);

  useEffect(() => {
    if (triggers.payment !== undefined || triggers.stake !== undefined) {
      setTimeout(() => {
        poolRefetch();
        playerRefetch();
      }, 1000);
    }
  }, [triggers, poolRefetch, playerRefetch]);

  if (poolFetchStatus == "pending" || playerFetchStatus == "pending") {
    return <StakeInfoLoading />;
  }

  return (
    <div className="flex flex-col gap-2 px-1 w-full text-pm">
      <div className="flex flex-row w-full justify-between">
        <span>{t("field.stake_amount")}</span>
        <span className="font-semibold">
          {playerStats.amount ? (
            <CryptoCurrency
              className="flex flex-row"
              token={token.symbol}
              value={Number(formatEther(playerStats.amount)).toFixed(6)}
              display="Crypto"
              showSuffix={false}
              showIcon={true}
              iconSize={{ width: "18px", height: "18px" }}
            />
          ) : (
            "-"
          )}
        </span>
      </div>
      <div className="flex flex-row w-full justify-between">
        <span>{t("field.pending_reward")}</span>
        <span className="font-semibold">
          {playerStats.pendingRewards ? (
            <CryptoCurrency
              className="flex flex-row"
              token={token.symbol}
              value={Number(formatEther(playerStats.pendingRewards)).toFixed(6)}
              display="Crypto"
              showSuffix={false}
              showIcon={true}
              iconSize={{ width: "18px", height: "18px" }}
            />
          ) : (
            "-"
          )}
        </span>
      </div>
      <div className="flex flex-row w-full justify-between">
        <span>{t("field.auto_compound")}</span>
        <StakeBtnSetCompound autoCompound={playerStats.autoCompound} />
      </div>
      <div className="flex flex-row w-full justify-between">
        <span>{t("field.share_of_pool")}</span>
        <span className="font-semibold">
          {playerStats.amount ? (
            (Number(playerStats.amount) / Number(poolStats.totalStaked)) *
            100
          ).toFixed(2) + "%" : "-"}

        </span>
      </div>
      <div className="flex flex-row w-full justify-between">
        <span>{t("field.apr")}</span>
        <span className="font-semibold">
          {get14DaySimpleAPR(poolStats).toFixed(2)}%
        </span>
      </div>
      <div className="flex flex-row w-full justify-between">
        <Tips
          startContent={t("field.unlock_in")}
          text={
            t("field.unlock_in_tip")
          }
        />
        <span className="font-semibold">
          {playerStats.lastUpdateTimestamp ? <CountDown
            eventTime={
              Number(playerStats.lastUpdateTimestamp) + 7 * 24 * 60 * 60
            }
            showOutdate={false}
            outdateText={t("field.unlocked")}
          /> : "-"}
        </span>
      </div>
    </div>
  );
};


export default StakeInfo;
