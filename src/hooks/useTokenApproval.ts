import { useCallback } from "react";
import { Address, erc20Abi, erc721Abi } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

function useTokenApproval(token?: string, spender?: string) {
  const { address: account, chainId } = useAccount();

  const {
    data: hash,
    error,
    isPending,
    isError,
    isSuccess,
    writeContract,
  } = useWriteContract({});

  const { data: isApprovedForAll } = useReadContract({
    abi: erc721Abi,
    address: token as `0x${string}`,
    functionName: "isApprovedForAll",
    args: [token as `0x${string}`, spender as `0x${string}`],
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: erc20Abi,
    address: token as `0x${string}`,
    functionName: "allowance",
    args: [account as `0x${string}`, spender as `0x${string}`],
  });

  const approveToken = useCallback(
    (value?: bigint) => {
      writeContract({
        chainId: chainId,
        address: token as Address,
        abi: erc20Abi,
        functionName: "approve",
        args: [spender! as Address, value!],
      });
    },
    [chainId, account, spender, token, writeContract]
  );

  const approveNFT = useCallback(() => {
    writeContract({
      chainId: chainId,
      address: token as Address,
      abi: erc721Abi,
      functionName: "setApprovalForAll",
      args: [spender! as Address, true],
    });
  }, [chainId, account, spender]);

  return {
    approveToken,
    approveNFT,
    isApprovedForAll,
    allowance,
    refetchAllowance,
    hash,
    error: error as any,
    isPending,
    isSuccess,
    isError,
  };
}

export default useTokenApproval;
