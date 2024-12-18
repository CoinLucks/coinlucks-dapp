import BigNumber from "bignumber.js";
import React, { useState } from "react";
import { useAccount } from "wagmi";

import WalletConnector from "@/components/WalletConnector";
import WalletConnectButton from "@/components/WalletConnector/WalletConnectButton";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useGetNativeTokenBalance } from "@/hooks/useTokenBalance";
import { BetGamePlayerStats } from "@/types/bet/bet";
import { Native } from "@/types/token/native";
import { BIG_ZERO } from "@/utils/bigNumber";

import BetAmountInfo from "../../BetGame/Play/BetAmountInfo";
import BetAmountInput from "../../BetGame/Play/BetAmountInput";
import BetAmountOptions from "../../BetGame/Play/BetAmountOptions";
import BetButtonClaim from "../../BetGame/Play/BetButtonClaim";
import BetButtonPlay from "../Play/BetButtonPlay";
import { calculateMultiplier } from "../utils";

const BetInput = ({
  betOption,
  minBet = BigNumber(0.001),
  maxBet = BigNumber(100),
  jackpot,
  playerStats,
}: {
  betOption: number[];
  minBet: BigNumber;
  maxBet: BigNumber;
  jackpot: BigNumber;
  playerStats: BetGamePlayerStats;
}) => {

  const { chainId } = useBetGameBasicContext();
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const { balance } = useGetNativeTokenBalance();

  const token = Native.onChain(chainId);

  const getPayout = () => {
    return BigNumber(calculateMultiplier(betOption[0], betOption[1]))
      .multipliedBy(BigNumber(amount ?? "0"))
      .toString();
  };

  const jackpotAmt =
    betOption[0] <= 69 && betOption[1] >= 69
      ? jackpot?.multipliedBy(0.3)
      : BIG_ZERO;

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
          minBet={minBet}
          maxBet={maxBet}
          setAmount={setAmount}
        />
        <BetAmountInfo
          token={token.symbol}
          amount={amount}
          balance={balance}
          payout={getPayout()}
          jackpot={jackpotAmt}
        />
      </div>
      <div className="flex flex-col w-[50%] max-md:w-full gap-3">
        {isConnected == true ? (
          <>
            <BetButtonPlay
              betOption={betOption}
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
