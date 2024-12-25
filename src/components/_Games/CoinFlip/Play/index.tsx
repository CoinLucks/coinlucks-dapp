import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import AppImage from "@/components/AppImage";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useRefetchContext } from "@/context/RefetchContext";
import { ScratcherProvider } from "@/context/ScratcherContext";
import useBetGamePlayerStats from "@/hooks/game/useBetGamePlayerStats";
import useBetGameStats from "@/hooks/game/useBetGameStats";
import coverImg from "@/public/img/game/coinflip.png";
import { FlipBetType } from "@/types/bet/bet";

import BetInput from "./BetInput";
import Fetures from "./Fetures";
import IconSet from "./IconSet";
import PlayBox from "./PlayBox";


const Play = () => {
  const { chainId, gameName } = useBetGameBasicContext();
  const [betOption, setBetOption] = useState<FlipBetType>();
  const { address } = useAccount();
  const { triggers } = useRefetchContext();
  const { playerStats, refetch: playerRefetch } = useBetGamePlayerStats(
    chainId,
    gameName,
    address
  );
  const { gameStats, refetch: gameRefetch } = useBetGameStats(
    chainId,
    gameName
  );

  const winRate = betOption == FlipBetType.EDGE ? 0.5 : 50;

  useEffect(() => {
    if (triggers.payment !== undefined) {
      setTimeout(() => {
        playerRefetch();
        gameRefetch();
      }, 500);
    }
  }, [triggers, gameRefetch, playerRefetch]);

  return (
    <ScratcherProvider>
      <section className="flex flex-col flex-1 shrink pr-6 max-md:pr-0 basis-0 min-w-[240px] max-md:max-w-full">
        <header className="flex flex-wrap gap-2 items-start w-full">
          <AppImage
            classNames={{ box: "grow" }}
            src={coverImg.src}
            size={{ width: "32px" }}
          />
          <div className="flex flex-row flex-grow justify-start shrink basis-0 w-full pr-1">
            <IconSet />
          </div>
        </header>
        <main className="flex flex-col mt-4 w-full">
          <PlayBox betOption={betOption} setBetOption={setBetOption} />
          <BetInput
            betOption={betOption}
            jackpot={BigNumber(formatEther(gameStats.jackpotPool ?? 0n))}
            playerStats={playerStats}
          />
          <Fetures playerStats={playerStats} winRate={winRate} />
        </main>
        <footer className="flex flex-col mt-4 w-full"></footer>
      </section>
    </ScratcherProvider>
  );
};

export default Play;
