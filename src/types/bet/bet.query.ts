import { BetStatus } from "./bet";

export type BetQueryOpts = {
  chainIds?: string;
  betStatus?: BetStatus;
  game?: string;
  player?: string;
  orderBy?: string;
  orderDirection?: string;
  sort?: string;
  first?: number;
  skip?: number;
};

export type BetPlayerQueryOpts = {
  chainIds?: string;
  game?: string;
  player?: string;
  orderBy?: string;
  orderDirection?: string;
  sort?: string;
  first?: number;
  skip?: number;
};

export type BetGameQueryOpts = {
  chainIds?: string;
  game?: string;
  orderBy?: string;
  orderDirection?: string;
  sort?: string;
  first?: number;
  skip?: number;
};
