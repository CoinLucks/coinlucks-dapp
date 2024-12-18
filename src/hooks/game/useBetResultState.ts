import { useState, useEffect } from "react";
import { Address } from "viem";

import { ContractNames } from "@/constants/contracts/names";
import { BetStats } from "@/types/bet/bet";

import { queryBetResultWithRetry } from "./queryBetResultWithRetry";

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

interface GlobalBetState {
  currentId: number | null;
  betAmount?: number;
  betResults: Record<number, BetResult>;
  lastQuery: QueryParam | null;
  reset: () => void;
  refetch: () => void;
  queryBet: (args: QueryParam) => void;
}

const globalBetState: GlobalBetState = {
  currentId: null,
  betResults: {},
  lastQuery: null,
  reset: () => {
    globalBetState.currentId = null;
    globalBetState.lastQuery = null;
  },
  refetch: () => {
    if (globalBetState.lastQuery) {
      globalBetState.queryBet(globalBetState.lastQuery);
    }
  },
  queryBet: (args: QueryParam) => {
    globalBetState.currentId = args.betId;
    globalBetState.betAmount = args.betAmount;

    globalBetState.betResults[args.betId] = {
      result: null,
      loading: true,
      error: null,
    };

    globalBetState.lastQuery = args;

    queryBetResultWithRetry(args.chainId, args.contractAddress, args.betId)
      .then((result: any) => {
        globalBetState.betResults[args.betId] = {
          result,
          loading: false,
          error: null,
        };
        updateListeners();
      })
      .catch((error: { message: any }) => {
        globalBetState.betResults[args.betId] = {
          result: null,
          loading: false,
          error: error.message,
        };
        updateListeners();
      });

    updateListeners();
  },
};

const listeners = new Set<() => void>();

const updateListeners = () => {
  listeners.forEach((listener) => listener());
};

export const useBetResultState = (gameName: ContractNames): GlobalBetState => {
  const [, setUpdate] = useState({});

  useEffect(() => {
    const listener = () => setUpdate({});
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, [gameName]);

  return globalBetState;
};
