import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Chip } from "@nextui-org/react";
import React, { useEffect } from "react";

import CryptoCurrency from "@/components/CryptoCurrency";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useBetGameResultContext } from "@/context/BetGameResultContext";
import { useScratcherContext } from "@/context/ScratcherContext";
import useBetGameScratchPrize from "@/hooks/game/useBetGameScratchPrize";
import { ScratchPrize, ScratchPrizeName, ScratchStatus } from "@/types/bet";
import { Native } from "@/types/token/native";
import { cn } from "@/utils/cn";

import ScratchPayout from "./ScratchPayout";

const Footer = () => {
  const { chainId, gameName } = useBetGameBasicContext();
  const token = Native.onChain(chainId);
  const { betId, betAmount, betResult, refetch } = useBetGameResultContext();
  const { prize, refetch: refetchPrize } = useBetGameScratchPrize(
    chainId,
    gameName,
    betId
  );
  const { status, setStatus } = useScratcherContext();

  const bet = betResult.result;
  useEffect(() => {
    refetchPrize();
  }, [betId, betResult, status, prize]);

  if (status == ScratchStatus.REVEALED) {
    return (
      <div className="flex flex-row p-5 justify-between items-center">
        <div className="flex relative flex-col self-start text-white">
          <div className="self-start text-md flex flex-row items-center gap-1">
            <span>Ticket #{`${betId}`}</span>
            <CryptoCurrency
              className="flex flex-row text-sm"
              token={token.symbol}
              value={betAmount}
              display="Crypto"
              showSuffix={false}
              showIcon={true}
              iconSize={{ width: "18px", height: "18px" }}
            />
          </div>
          <div className="flex flex-wrap gap-1 items-center">
            <Chip
              variant="flat"
              radius="none"
              startContent={
                prize == ScratchPrize.None ? (
                  <Icon icon={"pepicons-pop:ticket-circle-off"} />
                ) : (
                  <Icon
                    icon={"healthicons:award-trophy"}
                    color="warning"
                    className="text-warning"
                  />
                )
              }
              className="text-lg font-bold text-white"
            >
              {prize == ScratchPrize.None
                ? "Not a Winner"
                : `${ScratchPrizeName(prize!)} Prize`}
            </Chip>
            {prize != ScratchPrize.None && bet && (
              <ScratchPayout chainId={chainId} bet={bet} />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (status == ScratchStatus.UNSCRATCH || status == ScratchStatus.SCRATCHING) {
    return (
      <div className="flex flex-row p-5 justify-between items-center">
        <div className="flex relative flex-col self-start text-white">
          <h2 className="self-start text-md">Ticket #{`${betId}`}</h2>
          <p className="text-xl font-bold">Scratch & Win</p>
        </div>
        <Button
          size="md"
          radius="md"
          variant="flat"
          className={cn("px-4 py-3 bg-gradient-blue text-white font-bold", {
            hidden: !(
              status == ScratchStatus.UNSCRATCH ||
              status == ScratchStatus.SCRATCHING
            ),
          })}
          onClick={() => setStatus(ScratchStatus.REVEALED)}
        >
          Reveal
        </Button>
      </div>
    );
  }

  if (status == ScratchStatus.PENDING) {
    return (
      <div className="flex flex-col p-5 items-center text-white">
        <p className="text-xl font-semibold ">Awaiting Ticket...</p>
        <CryptoCurrency
          className="flex flex-row text-sm mt-1"
          token={token.symbol}
          value={bet?.betAmount ?? betAmount}
          display="Crypto"
          showSuffix={false}
          showIcon={true}
          iconSize={{ width: "18px", height: "18px" }}
        />
      </div>
    );
  }

  if (status == ScratchStatus.ERROR) {
    return (
      <div className="flex flex-col p-5 items-center text-white gap-2">
        <p className="text-lg font-semibold ">Network Timeout!</p>
        <Button size="md" color="primary" onClick={refetch}>
          Refetch
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-row p-5 justify-between items-center">
      <div className="flex relative flex-col self-start text-white gap-2">
        <div className="flex flex-row items-center gap-1">
          <p className="text-md">Up to</p>
          <p className="text-xl font-bold">10000x Payouts!</p>
        </div>
        <div className="flex flex-wrap gap-1 items-center">
          <Chip size="sm" color="default" variant="solid">
            On-chain
          </Chip>
          <Chip size="sm" color="default" variant="solid">
            Instant
          </Chip>
          <Chip size="sm" color="default" variant="solid">
            Fairness
          </Chip>
          <Chip size="sm" color="default" variant="solid">
            7 Prizes
          </Chip>
        </div>
      </div>
    </div>
  );
};

export default Footer;
