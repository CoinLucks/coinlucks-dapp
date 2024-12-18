import { Icon } from "@iconify/react";
import { Chip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import Tips from "@/components/Tips";
import { BetGamePlayerStats } from "@/types/bet/bet";

const FetureStreakLost = ({
  playerStats,
}: {
  playerStats: BetGamePlayerStats;
}) => {
  const t = useTranslations("games");
  return (
    <div className="flex flex-col justify-start gap-1 items-center w-full rounded-xl max-md:max-w-full">
      <div className="flex flex-row gap-1 items-center">
        <Icon icon={"tabler:ice-cream"} width={20} />
        <Tips
          startContent={t("features.streakLoss.title")}
          text={
            <div>
              <p className="font-semibold">{t("features.streakLoss.title")}</p>
              <p>{t("features.streakLoss.desc")}</p>
            </div>
          }
        />
      </div>
      <Chip size="md" variant="flat" color="primary">
        <span className="font-semibold mr-1">x1</span>
        <span className="text-xs">{t("list.title_payback")}</span>
      </Chip>
      <div className="flex flex-row h-6 items-center gap-1">
        {playerStats?.loseStreak == 0 ? (
          <span className="text-foreground-800 p-2">{t("features.streakWin.label")}</span>
        ) : (
          Array.from({ length: 5 }, (_, i) => i + 1).map((it, idx) => (
            <Chip
              key={`lost${idx}`}
              color={idx < playerStats.loseStreak ? "warning" : "default"}
              size="md"
            >
              L
            </Chip>
          ))
        )}
      </div>
    </div>
  );
};

export default FetureStreakLost;
