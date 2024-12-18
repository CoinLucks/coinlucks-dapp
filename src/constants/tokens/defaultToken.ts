import { ChainId } from "../chains"

import { Token } from "./_base/token"
import { USDC, USDT, WBTC_ETH, bscTokens, bscTestnetTokens, opBnbTokens, opBnbTestnetTokens } from "./chains"
import { WNATIVE } from "./chains/constants"

// a list of tokens by chain
export type ChainMap<T> = {
    readonly [chainId in ChainId]: T
}

export type ChainTokenList = ChainMap<Token[]>


// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
    [ChainId.ETHEREUM]: [USDC[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM], WNATIVE[ChainId.ETHEREUM], WBTC_ETH],

    [ChainId.BNB]: [bscTokens.usdt, bscTokens.usdc, bscTokens.eth, bscTokens.sol, bscTokens.btcb, bscTokens.doge],
    [ChainId.BNB_TESTNET]: [bscTestnetTokens.wbnb, bscTestnetTokens.cake, bscTestnetTokens.busd],

    [ChainId.OPBNB]: [opBnbTokens.usdt, opBnbTokens.fdusd, opBnbTokens.wbnb],
    [ChainId.OPBNB_TESTNET]: [
        opBnbTestnetTokens.wbnb,
        opBnbTestnetTokens.usdt,
        opBnbTestnetTokens.usdc,
        opBnbTestnetTokens.weth,
    ],
    [ChainId.LOCALHOST]: [USDT[ChainId.LOCALHOST]]
}