import { useMemo } from "react";
import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";

function useTokenAllowance(
  token?: string,
  owner?: string,
  spender?: string
): {
  allowance: bigint | undefined;
} {
  const inputs = useMemo(
    () => [owner, spender] as [`0x${string}`, `0x${string}`],
    [owner, spender]
  );

  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    address: token as `0x${string}`,
    functionName: "allowance",
    args: inputs,
  });

  return {
    allowance:
      token && typeof allowance !== "undefined" ? allowance : undefined,
  };
}

export default useTokenAllowance;
