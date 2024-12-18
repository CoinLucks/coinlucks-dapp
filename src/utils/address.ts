import invariant from "tiny-invariant";
import warning from "tiny-warning";
import { Address, getAddress } from "viem";

import { chains } from "@/wagmi";

// warns if addresses are not checksummed
// eslint-disable-next-line consistent-return
export function validateAndParseAddress(address: string): Address {
  try {
    const checksummedAddress = getAddress(address);
    warning(address === checksummedAddress, `${address} is not checksummed.`);
    return checksummedAddress;
  } catch (error) {
    invariant(false, `${address} is not a valid address.`);
  }
}

export function getShortAddress(address?: string) {
  if (address && address.length > 10) {
    return `${address.substring(0, 4)}...${address.substring(
      address.length - 4,
      address.length
    )}`;
  }
  return address;
}

export function getTxUrl(chainId: number, txHash?: string) {
  const chain = findChain(chainId);
  return `${chain?.blockExplorers?.default.url}/tx/${txHash}`;
}

export const findChain = (chainId: any) => {
  return chains.find((it) => it.id == chainId);
}
