import { useMemo } from "react"
import { useAccount } from "wagmi"

import { ChainId } from "@/constants/chains/chainId"
import { NativeCurrency } from "@/constants/tokens/_base"
import { Native } from "@/types/token"

export default function useNativeCurrency(overrideChainId?: ChainId): NativeCurrency {
    const { chainId } = useAccount()
    return useMemo(() => {
        try {
            return Native.onChain(overrideChainId ?? chainId ?? ChainId.BNB)
        } catch (e) {
            return Native.onChain(ChainId.BNB)
        }
    }, [overrideChainId, chainId])
}