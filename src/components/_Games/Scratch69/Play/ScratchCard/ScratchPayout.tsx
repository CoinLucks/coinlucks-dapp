import { Chip } from "@nextui-org/react";
import React from "react";

import CryptoCurrency from "@/components/CryptoCurrency";
import { BetStats } from "@/types/bet";
import { Native } from "@/types/token";

const ScratchPayout = ({
  chainId,
  bet,
}: {
  chainId: number;
  bet: BetStats;
}) => {
  const token = Native.onChain(chainId);
  const pnl = (Number(bet.winAmount) / Number(bet.betAmount)) * 100;
  return (
    <>
      <Chip
        startContent={<span>PnL</span>}
        size="sm"
        variant="solid"
        radius="none"
        color="success"
      >
        <span className="font-bold ml-1">{pnl.toFixed(2)}%</span>
      </Chip>
      <Chip
        startContent={<span>Payout</span>}
        size="sm"
        variant="solid"
        radius="none"
        color="success"
      >
        <CryptoCurrency
          className="flex flex-row text-sm"
          token={token.symbol}
          value={bet.winAmount}
          display="Crypto"
          showSuffix={false}
          showIcon={true}
          iconSize={{ width: "18px", height: "18px" }}
        />
      </Chip>
    </>
  );
};

export default ScratchPayout;
