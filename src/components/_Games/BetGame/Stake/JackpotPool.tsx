import { Chip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
import { formatEther } from "viem";

import CryptoCurrency, { money } from "@/components/CryptoCurrency";
import { useCryptoPrice } from "@/context/CryptoPrice/useCryptoPrice";
import { BetGameStats } from "@/types/bet";
import { Native } from "@/types/token/native";

import { StakePoolLoading } from "../loading";

const JackpotPool = ({
  chainId,
  gameStats,
  fetchStatus,
}: {
  chainId: number;
  gameStats: BetGameStats;
  fetchStatus: any;
}) => {
  const t = useTranslations("pool");
  const token = Native.onChain(chainId);
  const { data } = useCryptoPrice();
  const prizePool = formatEther(gameStats.gamePool ?? 0n);
  const jackpotPool = formatEther(gameStats.jackpotPool ?? 0n);
  let price = data?.find((it: any) => it.name == token.symbol);

  if (fetchStatus == "pending") {
    return <StakePoolLoading title={"Jackpot Pool"} />;
  }

  return (
    <>

      <div className="flex flex-col mt-4 gap-1 p-2 w-full border border-divider rounded-xl">
        <Chip size="md" variant="flat" radius="sm" className="bg-background-600">
          {t("prize_pool")}
        </Chip>
        <div className="flex gap-2 items-center my-2 w-full">
          <div className="flex flex-col flex-1 shrink justify-center self-stretch basis-0 min-w-[240px]">
            <div className="text-xl font-semibold leading-snug text-foreground">
              <CryptoCurrency
                className="flex flex-row"
                token={token.symbol}
                value={prizePool}
                display={"Crypto"}
                showSuffix={false}
                showIcon={true}
                iconSize={{ width: "18px", height: "18px" }}
                endContent={
                  price && (
                    <span className="ml-2 text-pm text-foreground-800 font-normal">
                      ≈ {money.format(Number(prizePool) * Number(price.price))}
                    </span>
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 gap-1 p-2 w-full border border-divider rounded-xl">
        <Chip size="md" variant="flat" radius="sm" className="bg-background-600">
          {t("jackpot_pool")}
        </Chip>
        <div className="flex gap-2 items-center my-2 w-full">
          <div className="flex flex-col flex-1 shrink justify-center self-stretch basis-0 min-w-[240px]">
            <div className="text-xl font-semibold leading-snug text-foreground">
              <CryptoCurrency
                className="flex flex-row"
                token={token.symbol}
                value={jackpotPool}
                display={"Crypto"}
                showSuffix={false}
                showIcon={true}
                iconSize={{ width: "18px", height: "18px" }}
                endContent={
                  price && (
                    <span className="ml-2 text-pm text-foreground-800 font-normal">
                      ≈ {money.format(Number(jackpotPool) * Number(price.price))}
                    </span>
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JackpotPool;
