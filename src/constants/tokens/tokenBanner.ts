export const getTokenBannerByName = (symbol: string) => {
  const icon = banners[symbol];
  if (icon && icon.length > 0) {
    return icon[0];
  }
  return null;
};

const banners: Record<string, string[]> = {
  BTC: ["/img/token/BTC.png"],
  WBTC: ["/img/token/BTC.png"],
  BTCB: ["/img/token/BTC.png"],
  ETH: ["/img/token/ETH.png"],
  WETH: ["/img/token/ETH.png"],
  BNB: ["/img/token/BNB.png"],
  SOL: ["/img/token/SOL.png"],
  USDT: ["/img/token/USDT.png"],
  USDC: ["/img/token/USDC.png"],
  DOGE: ["/img/token/DOGE.png"],
  AVAX: ["/img/token/AVAX.png"],
  TRX: ["/img/token/TRX.png"],
  NEAR: ["/img/token/NEAR.png"],
  GALA: ["/img/token/GALA.png"],
};
