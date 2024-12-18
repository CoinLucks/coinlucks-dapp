export type CurrencyName = "USD" | "ETH" | "BNB" | "AVAX" | "SOL";
type CurrencySymbol = "US$" | "Ξ" | "BNB" | "AVAX" | "SOL";

export type CurrencyMetadata = {
  name: CurrencyName;
  symbol: CurrencySymbol;
  price?: any;
  chainId?: any;
};

export const CURRENCY_METADATA: Record<CurrencyName, CurrencyMetadata> = {
  USD: {
    name: "USD",
    symbol: "US$",
  },
  ETH: {
    name: "ETH",
    symbol: "Ξ",
    chainId: 1
  },
  BNB: {
    name: "BNB",
    symbol: "BNB",
    chainId: 56
  },
  AVAX: {
    name: "AVAX",
    symbol: "AVAX",
    chainId: 41334
  },
  SOL: {
    name: "SOL",
    symbol: "SOL",
    chainId: 900
  },
};

export const CHAIN_CURRENCY: Record<string, string> = {
  "1": "ETH",
  "4": "ETH",
  "56": "BNB",
  "137": "MATIC",
  "43113": "AVAX",
  "41334": "AVAX",
  "900": "SOL",
  "1337": "ETH"
}

export const PRECISION_USD = 2;
export const PRECISION_ETH = 4;
