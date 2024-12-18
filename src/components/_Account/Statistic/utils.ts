import { useCryptoPrice } from "@/context/CryptoPrice/useCryptoPrice";
import { BetGamePlayer } from "@/types/bet/bet";
import { Native } from "@/types/token";

export const initStats = (): Omit<any, "game"> => ({
  chainId: 0,
  winnings: 0,
  claims: 0,
  playCount: 0,
  winCount: 0,
  LossCount: 0,
  playAmounts: 0,
  payouts: 0,
});

export const aggregateTwoStats = (
  acc: Omit<any, "game">,
  curr: any,
  prices: any
): Omit<any, "game"> => {
  return {
    winnings: getSumUsd(acc, curr, prices, "winnings"),
    claims: getSumUsd(acc, curr, prices, "claims"),
    playCount: (acc.playCount ?? 0) + (curr.playCount ?? 0),
    winCount: (acc.winCount ?? 0) + (curr.winCount ?? 0),
    LossCount: (acc.LossCount ?? 0) + (curr.LossCount ?? 0),
    playAmounts: getSumUsd(acc, curr, prices, "playAmounts"),
    payouts: getSumUsd(acc, curr, prices, "payouts"),
  };
};

export const aggregateStatsByGame = (
  items: BetGamePlayer[],
  prices: any
): Record<string, Omit<BetGamePlayer, "game">> => {
  return items.reduce((acc, curr) => {
    if (!acc[curr.game.name]) {
      acc[curr.game.name] = initStats();
    }

    acc[curr.game.name] = aggregateTwoStats(acc[curr.game.name], curr, prices);

    return acc;
  }, {} as Record<string, Omit<BetGamePlayer, "game">>);
};

const getSumUsd = (
  acc: Omit<BetGamePlayer, "game"> | any,
  curr: BetGamePlayer | any,
  prices: BetGamePlayer,
  field: string
) => {
  return (
    getUsd(acc.chainId, acc[field], prices) +
    getUsd(curr.chainId, curr[field], prices)
  );
};

const getUsd = (chainId?: number, value?: any, prices?: any): number => {
  if (chainId && chainId > 0 && prices) {
    const token = Native.onChain(chainId);
    let price = prices?.find((it: any) => it.name == token.symbol);
    return Number(value) * Number(price?.price || 1);
  } else return Number(value);
};
