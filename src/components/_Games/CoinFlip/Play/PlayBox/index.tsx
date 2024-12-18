import { useTranslations } from "next-intl";
import React from "react";

import { useBetGameResultContext } from "@/context/BetGameResultContext";
import { FlipBetType } from "@/types/bet";

import CoinOptions from "./CoinOptions";
import PendingFlip from "./PendingFlip";
import RevealedFlip from "./RevealedFlip";

const PlayBox = ({
  betOption,
  setBetOption,
}: {
  betOption?: FlipBetType;
  setBetOption?: any;
}) => {
  const { betId, betResult } = useBetGameResultContext();
  const t = useTranslations("games");
  if (betId && betResult.loading) {
    return <PendingFlip />;
  }

  if (betId && betResult && betResult.result) {
    return <RevealedFlip betOption={betOption} />;
  }

  return (
    <div className="rounded-xl bg-background-700 py-4 px-6">
      <span className="text-md">{t("CoinFlip.option.select")}</span>
      <CoinOptions selected={betOption} setSelected={setBetOption} />
    </div>
  );
};

export default PlayBox;
