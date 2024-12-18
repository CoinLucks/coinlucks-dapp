import { useMemo } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";

import { getDeploysByName } from "@/constants/contracts/address";
import { ContractNames } from "@/constants/contracts/names";
import { BetGamePlayerStats } from "@/types/bet/bet";

import { useContractAbi } from "../useContractAbi";

function useBetGamePlayerStats(
  chainId: number,
  gameName?: ContractNames,
  player?: string
) {
  const contractInfo = getDeploysByName(`${chainId}`, gameName);
  const abi = useContractAbi(chainId, contractInfo?.address);

  const { data, status, refetch, ...rest } = useReadContract({
    abi: abi,
    address: contractInfo?.address as Address,
    functionName: "players",
    args: [player!],
    query: {
      enabled: !!player,
    },
  });

  return {
    ...rest,
    refetch,
    fetchStatus: status,
    playerStats: useMemo(() => {
      if (typeof data !== "undefined") {
        const [
          winnings,
          claims,
          lastBetAmount,
          winStreak,
          loseStreak
        ] = data as any[];
        return {
          winnings: winnings,
          claims: claims,
          lastBetAmount: lastBetAmount,
          winStreak: winStreak,
          loseStreak: loseStreak
        };
      } else {
        return {};
      }
    }, [data]) as BetGamePlayerStats,
  };
}

export default useBetGamePlayerStats;
