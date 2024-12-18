import { useMemo } from "react";
import { Address } from "viem";
import { useReadContracts } from "wagmi";

import { getStakingDeploysByName } from "@/constants/contracts/address";
import { ContractNames } from "@/constants/contracts/names";
import { StakingPlayerStats } from "@/types/bet";

import { useContractAbi } from "../useContractAbi";

function useBetStakingPlayerStats(
  chainId: number,
  gameName: ContractNames,
  player?: Address
) {
  const contractInfo = getStakingDeploysByName(`${chainId}`, gameName);
  const abi = useContractAbi(chainId, contractInfo?.address);

  const { data, status, error, refetch, ...rest } = useReadContracts({
    contracts: [
      {
        abi: abi,
        address: contractInfo?.address as Address,
        functionName: "stakes",
        args: [player!],
      },
      {
        abi: abi,
        address: contractInfo?.address as Address,
        functionName: "getPendingRewards",
        args: [player!],
      },
    ],
    query: {
      enabled: !!player,
    },
  });

  return {
    ...rest,
    refetch,
    fetchStatus: status,
    playerStats: useMemo(() => {
      if (data && data[0].status == "success" && data[1].status == "success") {
        const [
          amount,
          weightedAmount,
          rewardDebt,
          lastUpdateTimestamp,
          autoCompound,
        ] = data[0].result as any[];
        const pendingRewards = data[1].result;
        return {
          amount: amount,
          weightedAmount: weightedAmount,
          rewardDebt: rewardDebt,
          lastUpdateTimestamp: lastUpdateTimestamp,
          autoCompound: autoCompound,
          pendingRewards: pendingRewards,
        };
      } else {
        return {};
      }
    }, [data]) as StakingPlayerStats,
  };
}

export default useBetStakingPlayerStats;
