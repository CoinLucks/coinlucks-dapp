import { Icon } from "@iconify/react/dist/iconify.js";
import { Image } from "@nextui-org/image";
import { Button, Chip, cn } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import ConfettiAnimation from "@/components/Animation/ConfettiAnimation";
import RaindropAnimation from "@/components/Animation/RaindropAnimation";
import { useBetGameResultContext } from "@/context/BetGameResultContext";
import { useRefetchContext } from "@/context/RefetchContext";
import coinEdgeImg from "@/public/img/game/coin-edge.png";
import coinHeadImg from "@/public/img/game/coin-head.png";
import coinTailImg from "@/public/img/game/coin-tail.png";
import { BetStatus, FlipBetType, FlipBetTypeName } from "@/types/bet/bet";

import { calculateFlipType } from "../../utils";

const RevealedFlip = ({ betOption }: { betOption?: FlipBetType }) => {
  const images = [coinHeadImg, coinTailImg, coinEdgeImg];

  const [isAnimating, setIsAnimating] = useState(false);
  const [isLostAnimating, setIsLostAnimating] = useState(false);
  const { triggerRefetch } = useRefetchContext();

  const { betId, betResult, reset } = useBetGameResultContext();

  const isWon =
    betId && betResult.result
      ? betResult.result.betStatus == BetStatus.Won
      : false;

  const isLost =
    betId && betResult.result
      ? betResult.result.betStatus == BetStatus.Lost
      : false;

  useEffect(() => {
    if (betId && betResult.result) {
      triggerRefetch("payment");
      if (betResult.result.betStatus == BetStatus.Won) {
        setIsAnimating(true);
      }
      if (betResult.result.betStatus == BetStatus.Lost) {
        setIsLostAnimating(true);
      }
    }
  }, [betId, betResult]);

  const flip = calculateFlipType(betResult.result!.drawNumbers[0]);

  const imgSrc = images[flip].src;

  return (
    <div className="rounded-xl bg-background-700 py-4 px-6">
      <div className="flex w-full justify-center">
        <Image src={imgSrc} className="w-20 h-20" loading="lazy" />
      </div>
      <div className="flex flex-col p-2 items-center">
        <p className="text-pm font-semibold ">Draw: {FlipBetTypeName(flip)}</p>
        <p className="text-pm font-semibold ">Your Bet: {FlipBetTypeName(betOption!)}</p>
        <Chip
          className={cn("hidden", { flex: isLost })}
          variant="flat"
          startContent={<Icon icon={"tabler:mood-sad-dizzy"} width={20} />}
        >
          Lost
        </Chip>
        <Chip
          className={cn("hidden", { flex: isWon })}
          startContent={<Icon icon={"bx:wink-smile"} width={20} />}
          variant="flat"
          color="success"
        >
          Won
        </Chip>
        <Button
          size="lg"
          radius="md"
          variant="shadow"
          className="px-4 py-3 w-[60%] max-md:w-full mt-2 !shadow-inner-blue bg-gradient-blue text-white font-bold"
          onClick={reset}
        >One more Try
        </Button>
      </div>
      <ConfettiAnimation
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
      />
      <RaindropAnimation
        isAnimating={isLostAnimating}
        setIsAnimating={setIsLostAnimating}
      />
    </div>
  );
};

export default RevealedFlip;
