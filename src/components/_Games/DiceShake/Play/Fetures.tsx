import { Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import { BetGamePlayerStats } from "@/types/bet/bet";

import FetureJackpot from "../../BetGame/Play/FetureJackpot";
import FetureStreakLost from "../../BetGame/Play/FetureStreakLost";
import FetureStreakWin from "../../BetGame/Play/FetureStreakWin";
import { calculateChance } from "../utils";

const Fetures = ({
  playerStats,
  betOption,
}: {
  playerStats: BetGamePlayerStats;
  betOption: number[];
}) => {
  const t = useTranslations("games");
  const winRate = Number(calculateChance(betOption[0], betOption[1]));
  return (
    <div className="flex flex-col gap-2 items-start p-3 mt-4 w-full rounded-xl bg-background-700 max-md:px-5 max-md:max-w-full text-sm overflow-x-scroll scrollbar-hide">
      <div className="flex flex-row items-center text-nowrap gap-4 w-full">
        <FetureJackpot
          playerStats={playerStats}
          tips={
            <div>
              <p className="font-semibold">{t("features.jackpot.title")}</p>
              <p>{t("features.jackpot.CoinFlip")}</p>
            </div>
          }
        />
        <Divider className="h-24" orientation="vertical" />
        <FetureStreakWin playerStats={playerStats} baseWinStreak={4} winRate={winRate} />
        <Divider className="h-24" orientation="vertical" />
        <FetureStreakLost playerStats={playerStats} />
      </div>
    </div>
  );
};

export default Fetures;
