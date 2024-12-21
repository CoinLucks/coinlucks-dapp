"use client";

import { cn, Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { formatEther } from "viem/utils";

import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import CryptoCurrency, { money } from "@/components/CryptoCurrency";
import Tips from "@/components/Tips";
import { ContractNames } from "@/constants/contracts/names";
import { BetGameBasicProvider } from "@/context/BetGameBasicContext";
import { useCryptoPrice } from "@/context/CryptoPrice/useCryptoPrice";
import useBetStakingPool from "@/hooks/game/useBetStakingPool";
import { BetGame } from "@/types/bet/bet";
import { Native } from "@/types/token/native";

import { StakePoolLoading } from "../loading";
import { calculateStakeROI, getROI } from "../utils";


import { StakeNowButton } from "./StakePoolModal";
import { StakeYieldCalculatorButton } from "./StakeYieldCalculator";

const BetGamePoolCard = ({
  game,
  url,
  image,
  className,
  tags,
}: {
  game: BetGame;
  url: string;
  image?: string;
  className?: any;
  tags?: any;
}) => {
  const tGame = useTranslations("games");
  const t = useTranslations("pool");

  const token = Native.onChain(game.chainId);
  const { data } = useCryptoPrice();

  const {
    balance,
    poolStats,
    fetchStatus,
  } = useBetStakingPool(game.chainId, game.name as ContractNames);

  const amount = Number(formatEther(poolStats.totalStaked ?? 0n)).toFixed(4);
  let price = data?.find((it: any) => it.name == token.symbol);

  const stakingAmt = 0.1; // for yield calculating;

  const roi = calculateStakeROI(poolStats, Number(stakingAmt ?? 0), 14);
  const day14ROI = getROI(stakingAmt, roi.projectedRewards).toFixed(4);

  if (fetchStatus == "pending") {
    return <StakePoolLoading title={t("staking_pool")} />;
  }

  return (
    <BetGameBasicProvider chainId={game.chainId} gameName={game.name as ContractNames}>
      <div
        className={cn(
          `w-full flex flex-col relative p-2 rounded-2xl border border-divider bg-background-700 shadow-lg`,
          className
        )}
      >
        <div className="w-full flex flex-col m-0 border-0 text-foreground">
          <div className="flex flex-row rounded-xl relative overflow-hidden">
            <AppLink href={url}>
              <AppImage
                className={"w-full relative h-auto object-cover p-0"}
                classNames={{
                  box: "flex max-w-24 items-center justify-center",
                }}
                src={image}
                alt={game.name}
              />
            </AppLink>
            <div className="flex text-pm p-2 pl-4 flex-grow flex-col items-start justify-items-start">
              <div className="text-lg font-semibold">{tGame(`${game.name}.name`)}</div>

              <div className="text-xl my-1 font-semibold leading-snug text-foreground">
                <CryptoCurrency
                  className="flex flex-row text-sm"
                  token={token.symbol}
                  value={amount}
                  display="Crypto"
                  showSuffix={false}
                  showIcon={true}
                  iconSize={{ width: "18px", height: "18px" }}
                  endContent={<span className="text-ps text-foreground-700 font-normal">({t("field.tvl")})</span>}
                />
                {
                  price && (
                    <span className="ml-2 text-ps text-foreground-800 font-normal">
                      ≈ {money.format(Number(amount) * Number(price.price))}
                    </span>
                  )
                }
              </div>
            </div>
          </div>
          {tags && <div className="z-10 absolute right-0 top-0">{tags}</div>}
          <Divider className="my-2" />
          <div className="flex flex-col my-2 flex-1 shrink justify-center self-stretch basis-0 min-w-[240px]">
            <div className="flex flex-col gap-1">
              {/* <div className="flex flex-row items-center w-full px-2 justify-between text-sm">
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
              </div> */}
              <div className="flex flex-row items-center w-full px-2 justify-between text-sm">
                <Tips className="max-md:text-ps" text={t("field.pending_rewards_tip")} startContent={t("field.pending_rewards")} />
                <span className="font-semibold">
                  {poolStats.totalRewardsDistributed ? (
                    <CryptoCurrency
                      className="flex flex-row"
                      token={token.symbol}
                      value={(Number(
                        formatEther(poolStats.totalRewardsReceived)
                      ) - Number(formatEther(poolStats.totalRewardsDistributed))).toFixed(4)}
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
              <div className="flex flex-row items-center w-full px-2 pr-0 justify-between text-sm">
                <span className="max-md:text-ps">{t("field.apr")}</span>
                <div className="flex flex-row items-center">
                  <span className="font-semibold">{(roi.apr * 100).toFixed(4)}%</span>
                  <StakeYieldCalculatorButton />
                </div>
              </div>
              <div className="flex flex-row items-center w-full px-2 pr-0 justify-between text-sm">
                <Tips className="max-md:text-ps" text={t.rich("field.yield_tip", { amount: stakingAmt, token: token.symbol, yield: day14ROI })} startContent={t("field.yield")} />
                <div className="flex flex-row items-center"><span className="font-semibold">{day14ROI}%</span>
                  <StakeYieldCalculatorButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        <StakeNowButton className="w-full mt-2" />
      </div>
    </BetGameBasicProvider>
  );
};

export default BetGamePoolCard;
