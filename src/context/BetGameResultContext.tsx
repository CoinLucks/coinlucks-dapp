"use client";

import React, { createContext, useContext, useState } from "react";
import { Address } from "viem";

import { queryBetResultWithRetry } from "@/hooks/game/queryBetResultWithRetry";
import { BetStats } from "@/types/bet/bet";

interface BetResult {
  result: BetStats | null;
  loading: boolean;
  error: string | null;
}

interface QueryParam {
  chainId: number;
  contractAddress: Address;
  betId: number;
  betAmount?: number;
}

interface BetGameResultContextType {
  betId: number | null;
  betAmount: number | null;
  betResult: BetResult;
  reset: () => void;
  refetch: () => void;
  queryBet: (args: QueryParam) => void;
}

const BetGameResultContext = createContext<
  BetGameResultContextType | undefined
>(undefined);

export const useBetGameResultContext = () => {
  const context = useContext(BetGameResultContext);
  if (context === undefined) {
    throw new Error(
      "useBetGameResultContext must be used within a BetGameResultProvider"
    );
  }
  return context;
};

export const BetGameResultProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [betId, setBetId] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<number | null>(null);
  const [betResult, setBetResult] = useState<BetResult>({
    result: null,
    loading: false,
    error: null,
  });
  const [queryInput, setQueryInput] = useState<QueryParam | null>(null);

  const reset = () => {
    setBetId(null);
    setQueryInput(null);
  };
  const refetch = () => {
    if (queryInput) {
      queryBet(queryInput);
    }
  };
  const queryBet = (args: QueryParam) => {
    setBetId(args.betId);
    setBetAmount(args.betAmount!);
    setQueryInput(args);
    setBetResult({
      result: null,
      loading: true,
      error: null,
    });

    queryBetResultWithRetry(args.chainId, args.contractAddress, args.betId)
      .then((result: any) => {
        setBetResult({
          result,
          loading: false,
          error: null,
        });
      })
      .catch((error: { message: any }) => {
        setBetResult({
          result: null,
          loading: false,
          error: error.message,
        });
      });
  };

  return (
    <BetGameResultContext.Provider
      value={{
        betId,
        betAmount,
        betResult,
        reset,
        refetch,
        queryBet,
      }}
    >
      {children}
    </BetGameResultContext.Provider>
  );
};

export default BetGameResultContext;
