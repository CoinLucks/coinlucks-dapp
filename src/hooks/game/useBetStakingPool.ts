import { useMemo } from "react";
import { Address } from "viem";
import { useReadContracts } from "wagmi";

import { getStakingDeploysByName } from "@/constants/contracts/address";
import { ContractNames } from "@/constants/contracts/names";
import { StakingPoolStats } from "@/types/bet/bet.staking";

import { useContractAbi } from "../useContractAbi";
import { useGetNativeTokenBalance } from "../useTokenBalance";

function useBetStakingPool(chainId: number, gameName?: ContractNames) {
  const contractInfo = getStakingDeploysByName(`${chainId}`, gameName!);
  const abi = useContractAbi(chainId, contractInfo?.address);
  const { balance } = useGetNativeTokenBalance(contractInfo?.address);

  const { data, status, refetch, ...rest } = useReadContracts({
    contracts: [
      {
        abi: abi,
        address: contractInfo?.address as Address,
        functionName: "pool",
        args: [],
      },
      {
        abi: abi,
        address: contractInfo?.address as Address,
        functionName: "getAPY",
        args: [],
      },
    ],
    query: {
      enabled: !!chainId,

    },
  });

  return {
    ...rest,
    refetch,
    balance: balance,
    fetchStatus: status,
    poolStats: useMemo(() => {
      if (data && data[0].status == "success" && data[1].status == "success") {
        const [
          accumulatedRewardsPerShare,
          lastUpdateTimestamp,
          totalStaked,
          totalWeightedStake,
          totalRewardsReceived,
          totalRewardsDistributed,
        ] = data[0].result as unknown as any[];
        const apr = data[1].result;
        return {
          accumulatedRewardsPerShare: accumulatedRewardsPerShare,
          lastUpdateTimestamp: lastUpdateTimestamp,
          totalStaked: totalStaked,
          totalWeightedStake: totalWeightedStake,
          totalRewardsReceived: totalRewardsReceived,
          totalRewardsDistributed: totalRewardsDistributed,
          apr: apr,
        };
      } else {
        return {};
      }
    }, [data, balance]) as StakingPoolStats,
  };
}

export default useBetStakingPool;
