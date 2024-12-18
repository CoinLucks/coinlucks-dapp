import { Icon } from "@iconify/react";
import { Chip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import Tips from "@/components/Tips";
import { BetGamePlayerStats } from "@/types/bet/bet";

import { calculateStreakWinMultiplier } from "../utils";

const FetureStreakWin = ({
  playerStats,
  baseWinStreak,
  winRate,
}: {
  playerStats: BetGamePlayerStats;
  baseWinStreak: number;
  winRate?: number;
}) => {
  const t = useTranslations("games");
  const multiplier = calculateStreakWinMultiplier(baseWinStreak, Number(winRate));

  return (
    <div className="flex flex-col justify-center gap-1 items-center w-full rounded-xl">
      <div className="flex flex-row gap-1 items-center">
        <Icon icon={"mingcute:ice-cream-line"} width={20} />
        <Tips
          startContent={t("features.streakWin.title")}
          text={
            <div>
              <p className="font-semibold">{t("features.streakWin.title")}</p>
              <p>{t("features.streakWin.desc")}</p>
            </div>
          }
        />
      </div>
      <Chip size="md" variant="flat" color="primary">
        <span className="font-semibold mr-1">x{multiplier}</span>
        <span className="text-xs">{t("list.title_bonus")}</span>
      </Chip>
      <div className="flex flex-row h-6 items-center gap-1">
        {playerStats?.winStreak == 0 ? (
          <span className="text-foreground-800">{t("features.streakWin.label")}</span>
        ) : (
          Array.from({ length: 5 }, (_, i) => i + 1).map((it, idx) => (
            <Chip
              key={`win${idx}`}
              color={idx < playerStats.winStreak ? "success" : "default"}
              size="md"
            >
              W
            </Chip>
          ))
        )}
      </div>
    </div>
  );
};

export default FetureStreakWin;
