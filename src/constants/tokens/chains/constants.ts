import { Address, Hash } from 'viem'

import { ERC20Token } from '@/types/token'

import { ChainId } from '../../chains'

export const FACTORY_ADDRESS = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'

const FACTORY_ADDRESS_ETH = '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362'

export const FACTORY_ADDRESS_MAP = {
  [ChainId.LOCALHOST]: FACTORY_ADDRESS_ETH,
  [ChainId.ETHEREUM]: FACTORY_ADDRESS_ETH,
  [ChainId.BNB]: FACTORY_ADDRESS,
  [ChainId.BNB_TESTNET]: '0x6725F303b657a9451d8BA641348b6761A6CC7a17',
  [ChainId.OPBNB]: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
  [ChainId.OPBNB_TESTNET]: '0x776e4bD2f72de2176A59465e316335aaf8ed4E8F',

} as const satisfies Record<ChainId, Address>

export const INIT_CODE_HASH = '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5'

const INIT_CODE_HASH_ETH = '0x57224589c67f3f30a6b0d7a1b54cf3153ab84563bc609ef41dfb34f8b2974d2d'
export const INIT_CODE_HASH_MAP = {
  [ChainId.ETHEREUM]: INIT_CODE_HASH_ETH,
  [ChainId.BNB]: INIT_CODE_HASH,
  [ChainId.BNB_TESTNET]: '0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66',
  [ChainId.OPBNB]: INIT_CODE_HASH_ETH,
  [ChainId.OPBNB_TESTNET]: INIT_CODE_HASH_ETH,

  [ChainId.LOCALHOST]: INIT_CODE_HASH_ETH

} as const satisfies Record<ChainId, Hash>

export const WETH9 = {
  [ChainId.LOCALHOST]: new ERC20Token(
    ChainId.LOCALHOST,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),

  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),

  [ChainId.BNB]: new ERC20Token(
    ChainId.BNB,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'ETH',
    'Binance-Peg Ethereum Token',
    'https://ethereum.org'
  ),
  [ChainId.BNB_TESTNET]: new ERC20Token(
    ChainId.BNB,
    '0xE7bCB9e341D546b66a46298f4893f5650a56e99E',
    18,
    'ETH',
    'ETH',
    'https://ethereum.org'
  ),
  [ChainId.OPBNB_TESTNET]: new ERC20Token(
    ChainId.OPBNB_TESTNET,
    '0x584f7b986d9942B0859a1E6921efA5342A673d04',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.OPBNB]: new ERC20Token(
    ChainId.OPBNB,
    '0xE7798f023fC62146e8Aa1b36Da45fb70855a77Ea',
    18,
    'ETH',
    'Binance-Peg Ethereum Token',
    'https://ethereum.org'
  ),
}

export const WBNB = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0x418D75f65a02b3D53B2418FB8E1fe493759c7605',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.BNB]: new ERC20Token(
    ChainId.BNB,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.BNB_TESTNET]: new ERC20Token(
    ChainId.BNB_TESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.OPBNB_TESTNET]: new ERC20Token(
    ChainId.OPBNB_TESTNET,
    '0x4200000000000000000000000000000000000006',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.OPBNB]: new ERC20Token(
    ChainId.OPBNB,
    '0x4200000000000000000000000000000000000006',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
}

export const WNATIVE = {
  [ChainId.LOCALHOST]: WETH9[ChainId.LOCALHOST],
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],

  [ChainId.BNB]: WBNB[ChainId.BNB],
  [ChainId.BNB_TESTNET]: WBNB[ChainId.BNB_TESTNET],

  [ChainId.OPBNB_TESTNET]: WBNB[ChainId.OPBNB_TESTNET],
  [ChainId.OPBNB]: WBNB[ChainId.OPBNB]

} satisfies Record<ChainId, ERC20Token>

const ETHER = { name: 'Ether', symbol: 'ETH', decimals: 18 } as const
const BNB = {
  name: 'Binance Chain Native Token',
  symbol: 'BNB',
  decimals: 18,
} as const

export const NATIVE = {
  [ChainId.ETHEREUM]: ETHER,
  [ChainId.BNB]: BNB,
  [ChainId.BNB_TESTNET]: {
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
    decimals: 18,
  },

  [ChainId.OPBNB]: BNB,
  [ChainId.OPBNB_TESTNET]: {
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
    decimals: 18,
  },
  [ChainId.LOCALHOST]: {
    name: 'ETH LOCALHOST',
    symbol: 'ETH',
    decimals: 18,
  },

} satisfies Record<
  ChainId,
  {
    name: string
    symbol: string
    decimals: number
  }
>

export { ERC20Token }