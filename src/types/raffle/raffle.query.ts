export type RaffleQueryOpts = {
  category?: string;
  chainIds?: string;
  status?: number;
  endTime?: number;
  orderBy?: string;
  orderDirection?: string;
  sort?: string;
  first?: number;
  skip?: number;
};

export type RaffleDetailQueryOpts = {
  id?: string;
  chainId?: string;
};

export type RaffleDetailListQueryOpts = {
  id?: string;
  chainId?: string;
  wallet?: string;
  orderBy?: string;
  orderDirection?: string;
  first?: number;
  skip?: number;
};
