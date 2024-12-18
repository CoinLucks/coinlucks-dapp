import { FlipBetType } from "@/types/bet";

const platformFee = 350;
const edgeNumbers = [333, 666, 888, 999];
const jackpotNumbers = [69, 420];

export const calculateMultiplier = (type: FlipBetType) => {
  return (betMultiplier(type) * (10000 - platformFee)) / 10000;
};

export const betMultiplier = (type: FlipBetType) => {
  if (type == FlipBetType.EDGE) return 50;
  return 2;
};

export const calculateChance = (type: FlipBetType) => {
  if (type == FlipBetType.EDGE) return "0.4";
  return "49.8";
};

export const calculateFlipType = (drawResult: number) => {
  if (edgeNumbers.includes(drawResult)) {
    return FlipBetType.EDGE;
  }

  return drawResult % 2 == 0 ? FlipBetType.HEAD : FlipBetType.TAIL;
};
