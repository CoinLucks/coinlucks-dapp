import { Icon } from "@iconify/react";
import { Chip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";


import ConfettiAnimation from "@/components/Animation/ConfettiAnimation";
import RaindropAnimation from "@/components/Animation/RaindropAnimation";
import { useBetGameResultContext } from "@/context/BetGameResultContext";
import { useRefetchContext } from "@/context/RefetchContext";
import { BetStatus } from "@/types/bet";
import { cn } from "@/utils/cn";

const PredictionDisplay = ({ betOption }: { betOption: number[] }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLostAnimating, setIsLostAnimating] = useState(false);
  const { triggerRefetch } = useRefetchContext();
  const { betId, betResult } = useBetGameResultContext();

  const text =
    betOption[0] == betOption[1]
      ? `${betOption[0]}`
      : `${betOption[0]}-${betOption[1]}`;

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

  const isWon =
    betId && betResult.result
      ? betResult.result.betStatus == BetStatus.Won
      : false;

  const isLost =
    betId && betResult.result
      ? betResult.result.betStatus == BetStatus.Lost
      : false;

  const isPending = betId && betResult.loading ? true : false;

  let drawNumber = <>00</>;
  if (isWon) {
    drawNumber = (
      <>
        <Chip
          size="lg"
          radius="full"
          variant="flat"
          color="success"
          className="text-4xl font-semibold leading-none max-md:text-2xl items-center"
        >
          {`${betResult.result!.drawNumbers[0]}`}
        </Chip>
      </>
    );
  }
  if (isLost) {
    drawNumber = (
      <Chip
        size="lg"
        radius="full"
        variant="flat"
        className="text-4xl font-semibold leading-none max-md:text-2xl items-center"
      >
        {`${betResult.result!.drawNumbers[0]}`}
      </Chip>
    );
  }

  return (
    <div className="flex relative items-start w-full text-center text-foreground max-md:max-w-full">
      <div className="flex z-0 flex-col flex-1 shrink justify-center items-start py-8 pr-16 pl-6 whitespace-nowrap rounded-xl basis-0 bg-gradient-to-r from-background-700 min-h-[148px] max-md:px-5">
        <div className="flex flex-col justify-center items-center">
          <div className="text-4xl font-semibold leading-none max-md:text-2xl">
            {text}
          </div>
          <div className="mt-1 text-sm leading-6">Prediction</div>
        </div>
      </div>
      <div className="flex z-0 flex-col flex-1 shrink justify-center items-end py-8 pr-16 pl-6 rounded-xl basis-0 bg-gradient-to-l from-background-700  min-h-[148px] max-md:px-5">
        <div className="flex flex-col justify-center items-center">
          <div className="text-4xl font-semibold leading-none max-md:text-2xl items-center">
            {isPending ? (
              <Icon
                icon={"game-icons:perspective-dice-six-faces-random"}
                width={48}
              />
            ) : (
              drawNumber
            )}
          </div>
          <div className="mt-1 text-sm leading-6">Draw Number</div>
        </div>
      </div>
      <div className="flex flex-col items-center absolute top-2/4 left-2/4 -ml-9 -mt-9 z-0 shrink-0">
        <Icon
          icon={"emojione:crown"}
          width={"56"}
          height={"56"}
          className={cn("absolute top-0 -mt-9 z-10 shrink-0 hidden", {
            flex: isWon,
          })}
        />
        <Icon
          icon={"ion:dice-outline"}
          width={"72"}
          height={"72"}
          className={cn("z-0 shrink-0", {
            "animate-spin-fast": isPending,
          })}
        />
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

export default PredictionDisplay;
