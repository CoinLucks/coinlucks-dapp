import { User } from "@/types";

import { BetGame } from "./bet";

export type StakingPoolStats = {
  accumulatedRewardsPerShare: bigint;
  lastUpdateTimestamp: number;
  totalStaked: bigint;
  totalWeightedStake: bigint;
  totalRewardsReceived: bigint;
  totalRewardsDistributed: bigint;

  apr?: bigint;
  payout?: bigint;
};

export type StakingPool = StakingPoolStats & {
  id: string;
  chainId?: number;
  game: BetGame;
};

export type StakingPlayerStats = {
  amount: bigint;
  weightedAmount: bigint;
  rewardDebt: bigint;
  lastUpdateTimestamp: number;
  autoCompound: boolean;

  pendingRewards?: bigint;
  stakes?: bigint;
  rewards?: bigint;
  claims?: bigint;
};

export type StakingPlayer = StakingPlayerStats & {
  id: string;
  chainId?: number;
  game: BetGame;
  player: User;
};

export type StakingStake = {
  id: string;
  chainId?: number;
  game: BetGame;
  player: User;
  amount: string;

  createdAt: number;
  txHash: string;
};

export type StakingUnStake = {
  id: string;
  chainId?: number;
  game: BetGame;
  player: User;

  amount: string;
  fee: string;
  reward: string;

  createdAt: number;
  txHash: string;
};

export type StakingClaim = {
  id: string;
  chainId?: number;
  game: BetGame;
  player: User;
  amount: string;
  createdAt: number;
  txHash: string;
};
