import { Image } from "@nextui-org/image";
import React from "react";

import CryptoCurrency from "@/components/CryptoCurrency";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useBetGameResultContext } from "@/context/BetGameResultContext";
import coinHeadImg from "@/public/img/game/coin-head2.png";
import coinTailImg from "@/public/img/game/coin-tail2.png";
import { Native } from "@/types/token/native";

const PendingFlip = () => {
  const { chainId } = useBetGameBasicContext();
  const token = Native.onChain(chainId);
  const { betAmount } = useBetGameResultContext();

  return (
    <div className="rounded-xl bg-background-700 py-4 px-6">
      <div className="flex w-full justify-center">
        <SpinningCoin className={"animate-coin-flip"} />
      </div>
      <div className="flex flex-col p-5 items-center text-white">
        <p className="text-xl font-semibold text-foreground-900">
          Awaiting Flip...
        </p>
        <CryptoCurrency
          className="flex flex-row text-sm mt-1"
          token={token.symbol}
          value={betAmount}
          display="Crypto"
          showSuffix={false}
          showIcon={true}
          iconSize={{ width: "18px", height: "18px" }}
        />
      </div>
    </div>
  );
};

const SpinningCoin = ({ className = "", size = "w-20 h-20" }) => {
  return (
    <div className={`${size} ${className}`}>
      <div className="relative w-full h-full [perspective:1000px]">
        <div className="absolute w-full h-full [transform-style:preserve-3d] animate-coin-flip">
          <div className="absolute w-full h-full rounded-full flex items-center justify-center [transform:translateZ(6px)]">
            <Image
              src={coinTailImg.src}
              alt="Coin Tail"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="absolute w-full h-full rounded-full flex items-center justify-center [transform:rotateY(180deg) translateZ(6px)]">
            <Image
              src={coinHeadImg.src}
              alt="Coin Head"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingFlip;
