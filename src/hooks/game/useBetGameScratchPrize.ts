import { useMemo } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";

import { getDeploysByName } from "@/constants/contracts/address";
import { ContractNames } from "@/constants/contracts/names";
import { ScratchPrize } from "@/types/bet/bet";

import { useContractAbi } from "../useContractAbi";

function useBetGameScratchPrize(
  chainId: number,
  gameName: ContractNames,
  betId?: number | null
) {
  const contractInfo = getDeploysByName(`${chainId}`, gameName);
  const abi = useContractAbi(chainId, contractInfo?.address);

  const { data, status, refetch, ...rest } = useReadContract({
    abi: abi,
    address: contractInfo?.address as Address,
    functionName: "betPrizes",
    args: [betId!],
    query: {
      enabled: !!betId,
    },
  });

  return {
    ...rest,
    refetch,
    fetchStatus: status,
    prize: data ? (Number(data) as ScratchPrize) : ScratchPrize.None,
  };
}

export default useBetGameScratchPrize;
