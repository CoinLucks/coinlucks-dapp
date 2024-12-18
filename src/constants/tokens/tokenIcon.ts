export const getTokenIconByName = (symbol: string) => {
  const icon = icons[symbol];
  if (icon && icon.length > 0) {
    return icon[0];
  }
  return null;
};

const icons: Record<string, string[]> = {
  BTC: ["https://s2.coinmarketcap.com/static/img/coins/200x200/1.png"],
  ETH: [
    "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png",
    "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  ],
  BNB: ["https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png"],
  SOL: ["https://s2.coinmarketcap.com/static/img/coins/200x200/5426.png"],
  USDT: ["https://s2.coinmarketcap.com/static/img/coins/200x200/825.png"],
  USDC: ["https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png"],
};
