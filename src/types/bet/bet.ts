import { User } from "@/types/user";

export const BetGameNames = {
  DiceShake: "DiceShake",
  CoinFlip: "CoinFlip",
  Scratch69: "Scratch69",
};

export enum BetStatus {
  Pending,
  Won,
  Lost,
}

export enum DiceBetType {
  SINGLE,
  RANGE,
  ODD,
  EVEN,
}

export enum FlipBetType {
  HEAD,
  TAIL,
  EDGE,
}
export function FlipBetTypeName(index: FlipBetType): string {
  return FlipBetType[index] as string;
}

export enum ScratchPrize {
  None,
  Grand, // Condition: Three 69s (0.0003%)
  First, // Condition: 6, 9, and 69 in any order (0.0019%)
  Second, // Condition: Two 69s (0.0214%)
  Third, // Condition: Sum of three numbers equals 69
  Fourth, // Condition: One 69 and the sum of the other two numbers equals 69
  Fifth, // Condition: Contains 6 or 9, and the sum of all three numbers is a multiple of 69
  Sixth, // Contains: Any 69 or the sum of three numbers is a multiple of 69
}

export enum ScratchStatus {
  DEFAULT, // not buy
  PENDING, // awaiting ticket
  UNSCRATCH, // ready to scratch
  SCRATCHING, // start scratching
  REVEALED, // finish scratch
  ERROR,
}

export function ScratchPrizeName(prize: ScratchPrize): string {
  return ScratchPrize[prize] as string;
}

export type BetGame = {
  id: string;
  chainId: number;
  playType: string;
  name: string;
  address: string;
  staking: string;
  desc?: any;
};

export type BetStats = {
  player: String;
  betAmount: bigint;
  betStatus: BetStatus;
  winAmount: bigint;
  drawNumbers: number[];
};

export type Bet = {
  id: string;
  chainId?: number;
  game: BetGame;
  betId: number; // smartcontract bet id
  betStatus: BetStatus;
  player: User;
  betAmount: string;

  payout?: string;
  jackpot?: string;
  streakBonus?: string;
  drawNumbers?: number[]; // win No.

  note: string; // description

  multiplier?: number;
  betType?: number;
  betNumber?: number;
  rangeEnd?: number;
  isOver?: boolean;
  betPrize?: number;

  createdAt: number;
  txHash: string;

  closeAt?: number;
  closeTx?: string;
};

export type BetGameClaim = {
  id: string;
  chainId?: number;
  game: BetGame;
  player: User;

  value: string;
  poolAmt: string;

  createdAt: number;
  txHash: string;
};

export type BetGamePlayerStats = {
  winnings: bigint;
  claims: bigint;
  winStreak: number;
  loseStreak: number;

  playCount?: number;
  winCount?: number;
  LossCount?: number;
  playAmounts?: bigint;
  payouts?: bigint;
};

export type BetGamePlayer = BetGamePlayerStats & {
  id: string;
  chainId?: number;
  game: BetGame;
  player: User;
};

export type BetGameStats = {
  currentId: bigint; // totalGames
  payouts: bigint; // total amount need to payout
  claims: bigint; // total amount of claimed
  gamePool: bigint; // total amount of game pool (add only)
  jackpotPool: bigint; // jackpotPool balance
};
