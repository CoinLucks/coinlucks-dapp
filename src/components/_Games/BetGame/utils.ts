import { formatEther, parseEther } from "viem";

import { StakingPoolStats } from "@/types/bet";

const platformFee = 350;

export const calculateMultiplier = (start: number, end: number) => {
  const base = 100;
  const feeMultiplier = 10000 - platformFee;
  return (((base / (end - start + 1)) * feeMultiplier) / 10000).toFixed(2);
};

export const calculateChance = (start: number, end: number) => {
  return (((end - start + 1) / 100) * 100).toFixed(0);
};

export const calculateStreakWinMultiplier = (
  baseWinStreak: number,
  winRate: number
) => {
  return (baseWinStreak - (winRate * 5) / 100).toFixed(2);
};

interface StakingData {
  totalWeightedStake: number; // Total weighted stake in the contract
  totalRewardsReceived: number; // Total rewards received by the pool
  totalRewardsDistributed: number; // Total rewards already distributed
  rewardReleasePeriod: number; // Reward release period in days
  baseRewardRate: number; // Base daily reward rate in percentage * 1e4
  maxRewardRate: number; // Max daily reward rate in percentage * 1e4
  maxRewardThreshold: number; // Max threshold for high rewards (ETH)
  precision: number; // Precision multiplier (e.g., 1e18)
}

function calculateROI(
  stakingAmount: number, // User's staking amount (ETH)
  stakingDays: number, // Duration of staking (days)
  contractData: StakingData // Current state of the staking contract
): { apr: number; projectedRewards: number } {
  let {
    totalWeightedStake, // Total weighted stake
    totalRewardsReceived, // Total rewards received by the pool
    totalRewardsDistributed, // Rewards already distributed
    rewardReleasePeriod, // Reward release period (e.g., 14 days)
    baseRewardRate, // Base daily reward rate in basis points
    maxRewardRate, // Maximum daily reward rate in basis points
    maxRewardThreshold, // Maximum reward threshold (ETH)
    precision, // Precision factor (e.g., 1e18)
  } = contractData;

  // Calculate remaining rewards in the pool
  const rewardsToDistribute = totalRewardsReceived - totalRewardsDistributed;

  if (totalWeightedStake === 0) {
    totalWeightedStake = stakingAmount * 1e18;
  }
  // If no rewards are available or total stake is zero, return zero results
  if (rewardsToDistribute <= 0) {
    return { apr: 0, projectedRewards: 0 };
  }

  // Determine the reward rate based on the user's staking amount
  const rewardRate =
    stakingAmount >= maxRewardThreshold
      ? maxRewardRate
      : baseRewardRate +
      ((maxRewardRate - baseRewardRate) * stakingAmount) / maxRewardThreshold;

  // Calculate the user's weighted stake
  const weightedStake = (stakingAmount * rewardRate) / baseRewardRate;

  // Calculate user's share of rewards per day
  const userSharePerDay =
    (weightedStake * rewardsToDistribute * precision) /
    (totalWeightedStake * rewardReleasePeriod);

  // Calculate the user's projected rewards
  let projectedRewards = 0;

  // Split staking period into complete reward cycles and remaining time
  const totalCycles = Math.floor(stakingDays / rewardReleasePeriod); // Calculate complete cycles in days
  const remainingDays = stakingDays % rewardReleasePeriod; // Remaining days after full cycles

  // Add rewards for full cycles, capped at the rewardsToDistribute per cycle
  projectedRewards += Math.min(
    totalCycles * rewardsToDistribute,
    userSharePerDay * rewardReleasePeriod * totalCycles
  );

  // Add rewards for the remaining days, also capped
  projectedRewards += Math.min(
    rewardsToDistribute,
    userSharePerDay * remainingDays // No need to convert to seconds, days is enough
  );

  // Calculate APR based on a single 14-day cycle
  const fourteenDayReturn =
    (rewardsToDistribute * precision) / totalWeightedStake / rewardReleasePeriod;
  const periodsPerYear = 365 / rewardReleasePeriod; // Convert to yearly periods based on days
  const apr = (fourteenDayReturn * periodsPerYear) / precision;

  // If staking period is less than 7 days, apply early unstake fee (5%) on the projected rewards
  if (stakingDays < 7) {
    const earlyUnstakeFee = 0.05; // 5% fee
    projectedRewards -= stakingAmount * precision * earlyUnstakeFee; // Subtract the fee from projected rewards
  }

  return {
    apr: apr / 100, // Convert APR to percentage
    projectedRewards: projectedRewards / precision, // Convert rewards to ETH
  };
}

export const calculateStakeROI = (
  pool: StakingPoolStats,
  stakingAmount: number, // User's staking amount in ETH
  stakingDays: number, // Number of staking days
  rewardPool?: string // totalRewardsReceived in ETH
) => {
  return calculateROI(stakingAmount, stakingDays, {
    totalWeightedStake: Number(pool.totalWeightedStake),
    totalRewardsReceived: rewardPool ? Number(rewardPool) * 1e18 : Number(pool.totalRewardsReceived),
    totalRewardsDistributed: Number(pool.totalRewardsDistributed),
    rewardReleasePeriod: 14,
    baseRewardRate: 100,
    maxRewardRate: 150,
    maxRewardThreshold: 100,
    precision: 1e18
  })
}

export const getROI = (stakingAmount: number, rewards: number) => {
  if (stakingAmount > 0)
    return (rewards / stakingAmount) * 100;
  else
    return 0;
}

export const get14DaySimpleAPR = (pool: StakingPoolStats) => {
  const roi = calculateStakeROI(pool, 0.1, 14);
  return roi.apr * 100;
}