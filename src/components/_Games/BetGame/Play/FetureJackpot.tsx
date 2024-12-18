
import { Icon } from "@iconify/react";
import { Chip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
import { formatEther } from "viem/utils";

import CryptoCurrency from "@/components/CryptoCurrency";
import Tips from "@/components/Tips";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import useBetGameStats from "@/hooks/game/useBetGameStats";
import { BetGamePlayerStats } from "@/types/bet/bet";
import { Native } from "@/types/token";

import { FeatrueLoading } from "../loading";


const FetureJackpot = ({
  label,
  tips,
}: {
  playerStats: BetGamePlayerStats;
  label?: any;
  tips?: any;
}) => {
  const { chainId, gameName } = useBetGameBasicContext();
  const { gameStats, fetchStatus, refetch } = useBetGameStats(
    chainId,
    gameName
  );

  const token = Native.onChain(chainId);
  const amount = formatEther(gameStats?.jackpotPool ?? 0n);
  const t = useTranslations("games");

  if (fetchStatus == "pending") {
    return <FeatrueLoading />;
  }

  return (
    <div className="flex flex-col justify-start gap-1 items-center w-full rounded-xl pr-4">
      <div className="flex flex-row gap-1 items-center">
        <Icon icon={"flowbite:gift-box-outline"} width={20} />
        <Tips
          startContent={t("jackpot")}
          text={
            tips ?? (
              <div>
                <p className="font-semibold">{t("features.jackpot.title")}</p>
                <p>{t("features.jackpot.tips")}</p>
              </div>
            )
          }
        />
      </div>
      <Chip variant="flat" color="primary">
        <CryptoCurrency
          className="flex flex-row font-semibold"
          token={token.symbol}
          value={amount}
          display="USD"
          showSuffix={false}
          showIcon={false}
        />
      </Chip>
      <div className="text-foreground-800 h-6 content-center">
        {label}
      </div>
    </div>
  );
};

export default FetureJackpot;
