import BigNumber from "bignumber.js";
import React, { useState } from "react";
import { useAccount } from "wagmi";

import WalletConnector from "@/components/WalletConnector";
import WalletConnectButton from "@/components/WalletConnector/WalletConnectButton";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useGetNativeTokenBalance } from "@/hooks/useTokenBalance";
import { BetGamePlayerStats } from "@/types/bet/bet";
import { Native } from "@/types/token/native";

import BetAmountInfo from "../../BetGame/Play/BetAmountInfo";
import BetAmountInput from "../../BetGame/Play/BetAmountInput";
import BetAmountOptions from "../../BetGame/Play/BetAmountOptions";
import BetButtonClaim from "../../BetGame/Play/BetButtonClaim";
import BetButtonPlay from "../Play/BetButtonPlay";

const BetInput = ({
  jackpot,
  playerStats,
}: {
  jackpot: BigNumber;
  playerStats: BetGamePlayerStats;
}) => {
  const { chainId } = useBetGameBasicContext();
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const { balance } = useGetNativeTokenBalance();

  const token = Native.onChain(chainId);
  const jackpotAmt = jackpot?.multipliedBy(0.3);
  const maxMultiplier = 10000;

  if (!isConnected) {
    return (
      <div className="flex flex-row max-md:flex-col items-center justify-center bg-background-700 gap-3 mt-4 p-4 rounded-2xl">
        <WalletConnector />
      </div>
    );
  }

  return (
    <div className="flex flex-row mt-4 max-md:flex-col bg-background-700 gap-3 p-4 rounded-2xl">
      <div className="flex flex-col flex-shrink gap-3">
        <BetAmountInput token={token.symbol} amount={amount} setAmount={setAmount} />
        <BetAmountOptions
          options1={[0.001, 0.002, 0.005, 0.01, 0.05, 0.1]}
          options2={[0.2, 0.3, 0.4, 0.5, 0.75, 1]}
          setAmount={setAmount} />
        <BetAmountInfo
          token={token.symbol}
          amount={amount}
          balance={balance}
          payout={Number(amount) * maxMultiplier}
          jackpot={jackpotAmt}
        />
      </div>
      <div className="flex flex-col w-[50%] max-md:w-full gap-3">
        {isConnected == true ? (
          <>
            <BetButtonPlay
              amount={amount}
              setAmount={setAmount}
            />
            <BetButtonClaim playerStats={playerStats} />
          </>
        ) : (
          <div className="flex flex-row items-center gap-1">
            <WalletConnectButton label={"Please Connect Wallet"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BetInput;
