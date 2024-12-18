import memoize from "lodash/memoize";
import { getAddress } from "viem";

import { ChainId } from "../chains";
import { chainNames } from "../chains/chainName";

import { Currency, Token } from "./_base";
import { allTokens } from "./allTokens";
import { bscTokens, ethereumTokens } from "./chains";
import { NATIVE } from "./chains/constants";
import { getTokenIconByName } from "./tokenIcon";

const mapping: { [key: number]: string } = {
  [ChainId.BNB]: "smartchain",
  [ChainId.ETHEREUM]: "ethereum",
  [ChainId.OPBNB]: "opbnb",
  [ChainId.LOCALHOST]: "ethereum",
};

export const getTokenLogoURL = memoize(
  (token?: Token) => {
    if (token && mapping[token.chainId]) {
      if (token.chainId == ChainId.LOCALHOST) {
        return getTokenIconByName(token.symbol);
      }
      return `https://assets-cdn.trustwallet.com/blockchains/${mapping[token.chainId]
        }/assets/${getAddress(token.address)}/logo.png`;
    }
    return null;
  },
  (t) => `${t?.chainId}#${t?.address}`
);

export const getTokenLogoURLByAddress = memoize(
  (address?: string, chainId?: number) => {
    if (address && chainId && mapping[chainId]) {
      return `https://assets-cdn.trustwallet.com/blockchains/${mapping[chainId]
        }/assets/${getAddress(address)}/logo.png`;
    }
    return null;
  },
  (address, chainId) => `${chainId}#${address}`
);

// TODO: move to utils or token-list
export const getTokenListBaseURL = (chainId: number) =>
  `https://tokens.pancakeswap.finance/images/${chainNames[chainId]}`;

export const getTokenListTokenUrl = (token: Token) =>
  Object.keys(chainNames).includes(String(token.chainId))
    ? `https://tokens.pancakeswap.finance/images/${token.chainId === ChainId.BNB ? "" : `${chainNames[token.chainId]}/`
    }${token.address}.png`
    : null;

const commonCurrencySymbols = [
  NATIVE[ChainId.ETHEREUM],
  ethereumTokens.usdt,
  ethereumTokens.usdc,
  bscTokens.cake,
  ethereumTokens.wbtc,
  ethereumTokens.weth,
  NATIVE[ChainId.BNB],
  bscTokens.busd,
  ethereumTokens.dai,
].map(({ symbol }) => symbol);

export const getCommonCurrencyUrl = memoize(
  (currency?: Currency): string | undefined =>
    getCommonCurrencyUrlBySymbol(currency?.symbol),
  (currency?: Currency) => `logoUrls#${currency?.chainId}#${currency?.symbol}`
);

export const getCommonCurrencyUrlBySymbol = memoize(
  (symbol?: string): string | undefined =>
    symbol && commonCurrencySymbols.includes(symbol)
      ? `https://tokens.pancakeswap.finance/images/symbol/${symbol.toLocaleLowerCase()}.png`
      : undefined,
  (symbol?: string) => `logoUrls#symbol#${symbol}`
);

type GetLogoUrlsOptions = {
  useTrustWallet?: boolean;
};

export const getCurrencyLogoUrls = memoize(
  (
    currency: Currency | undefined,
    { useTrustWallet = true }: GetLogoUrlsOptions = {}
  ): string[] => {
    const trustWalletLogo = getTokenLogoURL(currency?.wrapped);
    const logoUrl = currency ? getTokenListTokenUrl(currency.wrapped) : null;
    const tokenIcon = currency ? getTokenIconByName(currency?.symbol) : null;
    return [
      tokenIcon,
      getCommonCurrencyUrl(currency),
      useTrustWallet ? trustWalletLogo : undefined,
      logoUrl,
    ].filter((url): url is string => !!url);
  },
  (currency: Currency | undefined, options?: GetLogoUrlsOptions) =>
    `logoUrls#${currency?.chainId}#${currency?.wrapped?.address}#${options ? JSON.stringify(options) : ""
    }`
);

export function getTokensByChain(chainId?: ChainId): Currency[] {
  if (!chainId) {
    return [];
  }

  const tokenMap = allTokens[chainId];
  return Object.values(tokenMap);
}
