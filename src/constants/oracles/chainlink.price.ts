import { Address } from "viem";

import { ChainId } from "../chains/chainId";

export const chainlinkOracleBNB: Record<string, Address> = {
    [ChainId.BNB]: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
    [ChainId.OPBNB]: '0x',
} as const;

export const chainlinkOracleETH: Record<string, Address> = {
    [ChainId.BNB]: '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e',
    [ChainId.OPBNB]: '0x',
} as const;

export const chainlinkOracleWBTC: Record<string, Address> = {
    [ChainId.BNB]: '0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf',
    [ChainId.OPBNB]: '0x',
} as const;