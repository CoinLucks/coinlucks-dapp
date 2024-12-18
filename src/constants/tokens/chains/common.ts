import { ChainId } from '../../chains'

import { ERC20Token } from './constants'

export const CAKE_MAINNET = new ERC20Token(
  ChainId.BNB,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://pancakeswap.finance/',
)

export const CAKE_TESTNET = new ERC20Token(
  ChainId.BNB_TESTNET,
  '0x8d008B313C1d6C7fE2982F62d32Da7507cF43551',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://pancakeswap.finance/',
)

export const USDC_BSC = new ERC20Token(
  ChainId.BNB,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_TESTNET = new ERC20Token(
  ChainId.BNB_TESTNET,
  '0x64544969ed7EBf5f083679233325356EbE738930',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD Coin',
)

export const USDT_BSC = new ERC20Token(
  ChainId.BNB,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const USDT_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const BUSD_BSC = new ERC20Token(
  ChainId.BNB,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_TESTNET = new ERC20Token(
  ChainId.BNB_TESTNET,
  '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD = {
  [ChainId.ETHEREUM]: BUSD_ETH,
  [ChainId.BNB]: BUSD_BSC,
  [ChainId.BNB_TESTNET]: BUSD_TESTNET,

}

export const CAKE = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/',
  ),
  [ChainId.BNB]: CAKE_MAINNET,
  [ChainId.BNB_TESTNET]: CAKE_TESTNET,
  [ChainId.OPBNB]: new ERC20Token(
    ChainId.OPBNB,
    '0x2779106e4F4A8A28d77A24c18283651a2AE22D1C',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/',
  ),
  [ChainId.OPBNB_TESTNET]: new ERC20Token(
    ChainId.OPBNB_TESTNET,
    '0xa11B290B038C35711eB309268a2460754f730921',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/',
  ),
}

export const USDC = {
  [ChainId.BNB]: USDC_BSC,
  [ChainId.BNB_TESTNET]: USDC_TESTNET,
  [ChainId.ETHEREUM]: USDC_ETH,
  [ChainId.OPBNB_TESTNET]: new ERC20Token(
    ChainId.OPBNB_TESTNET,
    '0x845E27B8A4ad1Fe3dc0b41b900dC8C1Bb45141C3',
    6,
    'USDC',
    'USD Coin',
  ),

}

export const USDT = {
  [ChainId.BNB]: USDT_BSC,
  [ChainId.ETHEREUM]: USDT_ETH,
  [ChainId.OPBNB_TESTNET]: new ERC20Token(
    ChainId.OPBNB_TESTNET,
    '0xCF712f20c85421d00EAa1B6F6545AaEEb4492B75',
    6,
    'USDT',
    'Tether USD',
  ),
  [ChainId.OPBNB]: new ERC20Token(
    ChainId.OPBNB,
    '0x9e5AAC1Ba1a2e6aEd6b32689DFcF62A509Ca96f3',
    18,
    'USDT',
    'Tether USD',
  ),
  [ChainId.LOCALHOST]: new ERC20Token(
    ChainId.LOCALHOST,
    '0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB',
    18,
    'USDT',
    'Tether USD',
  ),
}

export const WBTC_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC',
)

export const STABLE_COIN = {
  [ChainId.ETHEREUM]: USDT[ChainId.ETHEREUM],
  [ChainId.BNB]: USDT[ChainId.BNB],
  [ChainId.BNB_TESTNET]: BUSD[ChainId.BNB_TESTNET],
  [ChainId.OPBNB]: USDT[ChainId.OPBNB],
  [ChainId.OPBNB_TESTNET]: USDT[ChainId.OPBNB_TESTNET],
  [ChainId.LOCALHOST]: USDT[ChainId.LOCALHOST],
} satisfies Record<ChainId, ERC20Token>
