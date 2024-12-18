import { TokenType } from "../token/type";

import { Eligibility, PrizeType } from ".";

export type RaffleCreateInputs = {
  hasFree: boolean;
  endTime: BigInt;
  maxPerUser: BigInt;
  price: BigInt;
  prize: {
    prizeType: PrizeType;
    token: string;
    amount: BigInt;
    tokenId?: BigInt;
  };
  eligibility: [Eligibility];
  note: string;
};

export type TokenEligibility = {
  type?: TokenType;
  address?: string;
  amount?: number;

  symbol?: string;
  name?: string;
  tokenId?: string;
};
