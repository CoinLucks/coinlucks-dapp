import { Chip, Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
import { formatEther } from "viem/utils";

import CryptoCurrency, { money } from "@/components/CryptoCurrency";
import Tips from "@/components/Tips";
import { useCryptoPrice } from "@/context/CryptoPrice/useCryptoPrice";
import { StakingPoolStats } from "@/types/bet";
import { Native } from "@/types/token/native";

import { StakePoolLoading } from "../loading";
import { get14DaySimpleAPR } from "../utils";

const StakePool = ({
  chainId,
  poolStats,
  fetchStatus,
  balance,
}: {
  chainId: number;
  poolStats: StakingPoolStats;
  fetchStatus: any;
  balance: any;
}) => {
  const t = useTranslations("pool");
  const token = Native.onChain(chainId);
  const { data } = useCryptoPrice();

  const amount = Number(formatEther(poolStats.totalStaked ?? 0n)).toFixed(2);
  let price = data?.find((it: any) => it.name == token.symbol);
  const apr = poolStats.apr
    ? `${get14DaySimpleAPR(poolStats).toFixed(2)}%`
    : "-";

  if (fetchStatus == "pending") {
    return <StakePoolLoading title={t("staking_pool")} />;
  }
  return (
    <div className="flex flex-col mt-4 gap-1 p-2 w-full border border-divider rounded-xl">
      <Chip size="md" variant="flat" radius="sm" className="bg-background-600">
        {t("staking_pool")}
      </Chip>
      <div className="flex flex-col my-2 flex-1 shrink justify-center self-stretch basis-0 min-w-[240px]">
        <div className="text-xl my-1 font-semibold leading-snug text-foreground">
          <CryptoCurrency
            className="flex flex-row"
            token={token.symbol}
            value={amount}
            display="Crypto"
            showSuffix={false}
            showIcon={true}
            iconSize={{ width: "18px", height: "18px" }}
            endContent={
              price && (
                <span className="ml-2 text-pm text-foreground-800 font-normal">
                  ≈ {money.format(Number(amount) * Number(price.price))}
                </span>
              )
            }
          />
        </div>
        <Divider className="my-2" />
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center w-full px-2 justify-between text-sm">
            <Tips text={t("field.balance_tip")} startContent={t("pools")} />
              <span className="font-semibold">
                {poolStats.totalRewardsReceived ? (
                  <CryptoCurrency
                    className="flex flex-row"
                    token={token.symbol}
                    value={Number(formatEther(balance)).toFixed(4)}
                    display="Crypto"
                    showSuffix={false}
                    showIcon={true}
                    iconSize={{ width: "16px", height: "16px" }}
                  />
                ) : (
                  "-"
                )}
              </span>
          </div>
          <div className="flex flex-row items-center w-full px-2 justify-between text-sm">
            <Tips text={t("field.rewards_tip")} startContent={t("field.rewards")} />
            <span className="font-semibold">
              {poolStats.totalRewardsReceived ? (
                <CryptoCurrency
                  className="flex flex-row"
                  token={token.symbol}
                  value={Number(
                    formatEther(poolStats.totalRewardsReceived)
                  ).toFixed(4)}
                  display="Crypto"
                  showSuffix={false}
                  showIcon={true}
                  iconSize={{ width: "16px", height: "16px" }}
                />
              ) : (
                "-"
              )}
            </span>
          </div>
          <div className="flex flex-row items-center w-full px-2 justify-between text-sm">
            <Tips text={t("field.distributed_tip")} startContent={t("field.distributed")} />
            <span className="font-semibold">
              {poolStats.totalRewardsDistributed ? (
                <CryptoCurrency
                  className="flex flex-row"
                  token={token.symbol}
                  value={Number(
                    formatEther(poolStats.totalRewardsDistributed)
                  ).toFixed(4)}
                  display="Crypto"
                  showSuffix={false}
                  showIcon={true}
                  iconSize={{ width: "16px", height: "16px" }}
                />
              ) : (
                "-"
              )}
            </span>
          </div>
          <div className="flex flex-row items-center w-full px-2 justify-between text-sm">
            <span>{t("field.apr")}</span>
            <span className="font-semibold">{apr}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakePool;
