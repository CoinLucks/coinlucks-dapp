import { useTranslations } from "next-intl";
import React from "react";

import {
  ScrollAnchorSection,
  SectionItem,
} from "@/components/ScrollToTop/ScrollAnchorSection";
import { ContractNames } from "@/constants/contracts/names";
import { BetGameBasicProvider } from "@/context/BetGameBasicContext";
import { BetGameResultProvider } from "@/context/BetGameResultContext";
import { useWindowSize } from "@/hooks/useWindowSize";

import Stake from "../BetGame/Stake";

import GameHistory from "./History";
import Play from "./Play";

const Scratch69Game = ({ chainId }: { chainId: number }) => {
  const { isMobile } = useWindowSize();
  const t = useTranslations("games");
  const gameName = ContractNames.Scratch69;
  const sections: SectionItem[] = [
    {
      id: "play",
      label: t("play"),
      content: <Play />,
    },
    {
      id: "history",
      label: t("history"),
      content: <GameHistory />,
    },
    {
      id: "stake",
      label: t("stake"),
      content: <Stake />,
    },
  ];
  if (isMobile) {
    return (
      <BetGameBasicProvider chainId={chainId} gameName={gameName}>
        <BetGameResultProvider>
          <ScrollAnchorSection sections={sections} />
        </BetGameResultProvider>
      </BetGameBasicProvider>
    );
  }
  return (
    <BetGameBasicProvider chainId={chainId} gameName={gameName}>
      <BetGameResultProvider>
        <div className="flex flex-row max-md:flex-col">
          <Play />
          <Stake />
        </div>
        <GameHistory />
      </BetGameResultProvider>
    </BetGameBasicProvider>
  );
};

export default Scratch69Game;
