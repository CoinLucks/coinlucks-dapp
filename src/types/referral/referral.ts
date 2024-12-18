import { User } from "../user";

export type UserReferral = {
  user: User;
  referrer: User;
  referrer2?: User;
  createdAt: number;
  txHash?: string;
};

export type UserReferreeCount = {
  firstLevelCount: number;
  secondLevelCount: number;
};

export type UserReferrerIncome = {
  chainId: number;
  amount: bigint;
};

export type UserReferrerPaid = {
  chainId: number;
  playType: string;
  key: string;
  user: User;
  referrer: User;
  value: BigInt;
  amount: BigInt;
  createdAt: number;
  txHash?: string;
};
