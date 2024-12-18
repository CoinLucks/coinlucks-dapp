
import { useQuery } from '@tanstack/react-query'
import BigNumber from 'bignumber.js'
import { formatUnits } from 'viem'

import { ChainId } from '@/constants/chains/chainId'
import { chainlinkOracleABI } from '@/constants/contracts/abi'
import { FAST_INTERVAL } from '@/constants/interval'
import { chainlinkOracleBNB } from '@/constants/oracles/chainlink.price'
import { BIG_ZERO } from '@/utils/bigNumber'

import { publicClient, publicClientByUrl } from './publicClient'

// for migration to bignumber.js to avoid breaking changes
export const useBNBPrice = ({ enabled = true } = {}) => {
    const { data } = useQuery<BigNumber, Error>({
        queryKey: ['bnbPrice'],
        queryFn: async () => new BigNumber(await getBNBPriceFromOracle()),
        staleTime: FAST_INTERVAL,
        refetchInterval: FAST_INTERVAL,
        enabled,
    })
    return data ?? BIG_ZERO
}

export const getBNBPriceFromOracle = async () => {

    const data = await publicClientByUrl('https://bsc-dataseed1.bnbchain.org').readContract({
        abi: chainlinkOracleABI,
        address: chainlinkOracleBNB[ChainId.BNB],
        functionName: 'latestAnswer',
    })
    return formatUnits(data, 8)
}