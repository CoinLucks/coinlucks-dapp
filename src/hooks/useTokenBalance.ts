import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { Address, erc20Abi } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

import { ChainId } from "@/constants/chains";
import { BIG_ZERO } from "@/utils/bigNumber";

const useTokenBalance = (tokenAddress: Address, forceBSC?: boolean) => {
  return useTokenBalanceByChain(
    tokenAddress,
    forceBSC ? ChainId.BNB : undefined
  );
};

export const useTokenBalanceByChain = (
  tokenAddress: Address,
  chainIdOverride?: ChainId
) => {
  const { address: account, chainId } = useAccount();

  const { data, status, refetch, ...rest } = useReadContract({
    chainId: chainIdOverride || chainId,
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "balanceOf",
    args: [account || "0x"],
    query: {
      enabled: !!account,
    },
  });

  return {
    ...rest,
    refetch,
    fetchStatus: status,
    balance: useMemo(
      () => (typeof data !== "undefined" ? BigInt(data.toString()) : 0n),
      [data]
    ),
  };
};

export const useGetBnbBalance = () => {
  const { address: account } = useAccount();

  const { status, refetch, data } = useBalance({
    chainId: ChainId.BNB,
    address: account,
    query: {
      enabled: !!account,
    },
  });

  return {
    balance: data?.value ? BigInt(data.value) : 0n,
    fetchStatus: status,
    refresh: refetch,
  };
};

export const useGetNativeTokenBalance = (address?: Address) => {
  const { address: account, chainId } = useAccount();
  const addr = address ?? account;
  const { status, refetch, data } = useBalance({
    chainId,
    address: addr,
    query: {
      enabled: !!addr,
    },
  });

  return {
    balance: data?.value ? BigInt(data.value) : 0n,
    fetchStatus: status,
    refresh: refetch,
  };
};

export default useTokenBalance;
