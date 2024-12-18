import React, { useEffect, useState } from "react";

import ConfettiAnimation from "@/components/Animation/ConfettiAnimation";
import RaindropAnimation from "@/components/Animation/RaindropAnimation";
import { useBetGameResultContext } from "@/context/BetGameResultContext";
import { useRefetchContext } from "@/context/RefetchContext";
import { useScratcherContext } from "@/context/ScratcherContext";
import { BetStatus, ScratchStatus } from "@/types/bet";

import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const ScratchCard = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLostAnimating, setIsLostAnimating] = useState(false);

  const { status, setStatus } = useScratcherContext();

  const { triggerRefetch } = useRefetchContext();
  const { betId, betResult } = useBetGameResultContext();

  useEffect(() => {

    if (betId) {
      if (betResult.result) {
        if (status == ScratchStatus.REVEALED) {
          triggerRefetch("payment");
          if (betResult.result.betStatus == BetStatus.Won) {
            setIsAnimating(true);
          }
          if (betResult.result.betStatus == BetStatus.Lost) {
            setIsLostAnimating(true);
          }
        } else {
          if (status != ScratchStatus.SCRATCHING) {
            setStatus(ScratchStatus.UNSCRATCH);
          }
        }
      }

      if (betResult.loading) {
        setStatus(ScratchStatus.PENDING);
      }
      if (betResult.error) {
        setStatus(ScratchStatus.ERROR);
      }
    }
  }, [betId, betResult, betResult, status]);

  return (
    <div className="flex flex-row max-md:flex-col gap-2 relative items-start p-2 max-md:p-0 bg-gradient-to-r from-background-700 via-background to-background-700 bg-opacity-80 rounded-xl">
      <div className="flex flex-col w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 bg-opacity-80 rounded-xl">
        <div className="flex relative flex-col">
          <Header />
          <Content />
          <Footer />
        </div>
      </div>
    
      <ConfettiAnimation
        isAnimating={isAnimating && status == ScratchStatus.REVEALED}
        setIsAnimating={setIsAnimating}
      />
      <RaindropAnimation
        isAnimating={isLostAnimating && status == ScratchStatus.REVEALED}
        setIsAnimating={setIsLostAnimating}
      />
    </div>
  );
};

export default ScratchCard;
