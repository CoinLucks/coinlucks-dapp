import React from "react";

import { useBetGameResultContext } from "@/context/BetGameResultContext";
import { useScratcherContext } from "@/context/ScratcherContext";
import { ScratchStatus } from "@/types/bet";

import CardDefault from "./CardDefault";
import CardError from "./CardError";
import CardPending from "./CardPending";
import CardRevealed from "./CardRevealed";
import CardUnscratch from "./CardUnscratch";

const Content = () => {
  const { betResult } = useBetGameResultContext();
  const { status } = useScratcherContext();

  const bet = betResult.result;

  if (status == ScratchStatus.REVEALED) {
    return <CardRevealed numbers={bet?.drawNumbers!} />;
  }

  if (status == ScratchStatus.UNSCRATCH || status == ScratchStatus.SCRATCHING) {
    return <CardUnscratch bet={bet!} />;
  }

  if (status == ScratchStatus.PENDING) {
    return <CardPending />;
  }

  if (status == ScratchStatus.ERROR) {
    return <CardError />;
  }

  return <CardDefault />;
};

export default Content;
