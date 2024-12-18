import { ChainId } from '../chains'

import { bscTokens } from './chains/bsc'
import { bscTestnetTokens } from './chains/bscTestnet'
import { ethereumTokens } from './chains/eth'
import { opBnbTokens } from './chains/opBNB'
import { opBnbTestnetTokens } from './chains/opBnbTestnet'

export const allTokens = {
    [ChainId.BNB]: bscTokens,
    [ChainId.BNB_TESTNET]: bscTestnetTokens,
    [ChainId.ETHEREUM]: ethereumTokens,
    [ChainId.OPBNB]: opBnbTokens,
    [ChainId.OPBNB_TESTNET]: opBnbTestnetTokens,
    [ChainId.LOCALHOST]: []
}