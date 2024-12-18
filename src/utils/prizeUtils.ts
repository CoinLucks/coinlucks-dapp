import { formatEther } from "viem";

import { CHAIN_CURRENCY } from "@/constants/currency";
import { getTokenBannerByName } from "@/constants/tokens/tokenBanner";
import { PrizeType, Token, type Raffle } from "@/types";

export const getRafflePrizeToken = (item: Raffle) => {
  let name, value, image;
  switch (item?.prize?.prizeType) {
    case PrizeType.TOKEN:
      if (item.token) {
        name = item.token.symbol;
      }
      value = formatEther(BigInt(item.prize.amount!));
      image = getTokenBannerByName(name ?? "");
      break;
    case PrizeType.NFT:
      if (item.token) {
        name = item.token.name;
      }
      if (item.token?.metadata) {
        image = item.token.metadata.image;
      }
      break;
    case PrizeType.NATIVE:
      name = CHAIN_CURRENCY[item.chainId!];
      value = formatEther(BigInt((item.prize.amount || item.prize.value)!));
      image = getTokenBannerByName(name);
      break;
  }
  return { name, value, image: image };
};
