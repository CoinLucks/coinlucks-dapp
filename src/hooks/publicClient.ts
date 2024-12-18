import { createPublicClient, http } from "viem";

import { ChainId } from "@/constants";
import { chains } from "@/wagmi";

export const publicClient = (chainId: ChainId) => {
    const chain = chains.find((x) => x.id == chainId);
    return createPublicClient({ chain: chain, transport: http(chain?.rpcUrls.default.http[0]) })
}

export const publicClientByUrl = (url: string) => {
    return createPublicClient({ transport: http(url) })
}