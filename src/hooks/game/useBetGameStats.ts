import { useMemo } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";

import { getDeploysByName } from "@/constants/contracts/address";
import { ContractNames } from "@/constants/contracts/names";
import { BetGameStats } from "@/types/bet/bet";

import { useContractAbi } from "../useContractAbi";

function useBetGameStats(chainId: number, gameName?: ContractNames) {
  const contractInfo = getDeploysByName(`${chainId}`, gameName);
  const abi = useContractAbi(chainId, contractInfo?.address);

  const { data, status, refetch, ...rest } = useReadContract({
    abi: abi,
    address: contractInfo?.address as Address,
    functionName: "gameStats",
    args: [],
    query: {
      enabled: !!chainId,
    },
  });

  return {
    ...rest,
    refetch,
    fetchStatus: status,
    gameStats: useMemo(() => {
      if (typeof data !== "undefined") {
        const [currentId, payouts, claims, gamePool, jackpotPool] =
          data as any[];
        return {
          currentId: currentId,
          payouts: payouts,
          claims: claims,
          gamePool: gamePool,
          jackpotPool: jackpotPool,
        };
      } else {
        return {};
      }
    }, [data]) as BetGameStats,
  };
}

export default useBetGameStats;
