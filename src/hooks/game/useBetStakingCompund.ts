import { Address } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { getStakingDeploysByName } from "@/constants/contracts/address";
import { ContractNames } from "@/constants/contracts/names";

import { useContractAbi } from "../useContractAbi";

function useBetStakingCompund(
  chainId: number,
  gameName: ContractNames,
  autoCompound: boolean
) {
  const contractInfo = getStakingDeploysByName(`${chainId}`, gameName);
  const abi = useContractAbi(chainId, contractInfo?.address);
  const {
    data: hash,
    error,
    isPending,
    isError,
    isSuccess,
    writeContract,
  } = useWriteContract({});
  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash: hash,
  });

  const sendTransaction = () => {
    writeContract({
      chainId: chainId,
      address: contractInfo?.address as Address,
      abi: abi,
      functionName: "setAutoCompound",
      args: [autoCompound],
    });
  };

  return {
    sendTransaction,
    hash,
    error: error as any,
    isPending,
    isSuccess,
    isError,
    isConfirming,
    isConfirmed,
    receipt,
  };
}

export default useBetStakingCompund;
