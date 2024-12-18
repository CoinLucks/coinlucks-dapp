import axios from "axios";
import { isEmpty } from "lodash";
import {
  useInfiniteQuery,
  useQuery,
  type UseInfiniteQueryOptions,
} from "react-query";

import { AppConfig } from "@/config";
import { ApiRsp, formatApiRsp } from "@/types/api.rsp";
import {
  BetQueryOpts,
  BetPlayerQueryOpts,
  BetGameQueryOpts,
  Bet,
  BetGamePlayer,
  BetGameClaim,
  StakingPool,
  StakingPlayer,
  StakingStake,
  StakingUnStake,
  StakingClaim,
} from "@/types/bet";
import { formatQueryParams } from "@/utils/queryParams";

const DEFAULT_STALE_TIME = 60 * 1000; // 60 seconds

export function useBetsQuery(
  opts: BetQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    Bet[],
    Error,
    Bet[],
    Bet[],
    readonly [string, BetQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["useBets", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<Bet[]>(
            `${AppConfig.apiHost}/api/betgame/bets?${formatQueryParams({
              ...evaluatedOpts,
              skip: pageParam ?? 0,
              first: first,
            })}`
          )
          .then((res) => {
            return res.data;
          });
      },
      {
        staleTime: DEFAULT_STALE_TIME,
        ...reactQueryOptions,
        // Don't allow this function to be overwritten by reactQueryOptions
        getNextPageParam: (lastPage) => {
          // If the last page contains less than the expected page first,
          // it's safe to assume you're at the end.

          // @ts-ignore ignore
          if (lastPage.hasNext == true) {
            // @ts-ignore ignore
            return (lastPage.page + 1) * first;
          } else {
            return false;
          }
        },
      }
    )
  );
}

export function useBetPlayersQuery(
  opts: BetPlayerQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    BetGamePlayer[],
    Error,
    BetGamePlayer[],
    BetGamePlayer[],
    readonly [string, BetPlayerQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["useBetPlayers", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<BetGamePlayer[]>(
            `${AppConfig.apiHost}/api/betgame/bet/players?${formatQueryParams({
              ...evaluatedOpts,
              skip: pageParam ?? 0,
              first: first,
            })}`
          )
          .then((res) => {
            return res.data;
          });
      },
      {
        staleTime: DEFAULT_STALE_TIME,
        ...reactQueryOptions,
        // Don't allow this function to be overwritten by reactQueryOptions
        getNextPageParam: (lastPage) => {
          // If the last page contains less than the expected page first,
          // it's safe to assume you're at the end.

          // @ts-ignore ignore
          if (lastPage.hasNext == true) {
            // @ts-ignore ignore
            return (lastPage.page + 1) * first;
          } else {
            return false;
          }
        },
      }
    )
  );
}

export function useBetGameClaimsQuery(
  opts: BetPlayerQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    BetGameClaim[],
    Error,
    BetGameClaim[],
    BetGameClaim[],
    readonly [string, BetPlayerQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["useBetGameClaims", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<BetGameClaim[]>(
            `${AppConfig.apiHost}/api/betgame/bet/claims?${formatQueryParams({
              ...evaluatedOpts,
              skip: pageParam ?? 0,
              first: first,
            })}`
          )
          .then((res) => {
            return res.data;
          });
      },
      {
        enabled: !isEmpty(opts.chainIds),
        staleTime: DEFAULT_STALE_TIME,
        ...reactQueryOptions,
        // Don't allow this function to be overwritten by reactQueryOptions
        getNextPageParam: (lastPage) => {
          // If the last page contains less than the expected page first,
          // it's safe to assume you're at the end.

          // @ts-ignore ignore
          if (lastPage.hasNext == true) {
            // @ts-ignore ignore
            return (lastPage.page + 1) * first;
          } else {
            return false;
          }
        },
      }
    )
  );
}

export function useStakingPoolsQuery(
  opts: BetGameQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    StakingPool[],
    Error,
    StakingPool[],
    StakingPool[],
    readonly [string, BetGameQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["useStakingPools", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<StakingPool[]>(
            `${AppConfig.apiHost}/api/betgame/staking/pools?${formatQueryParams(
              {
                ...evaluatedOpts,
                skip: pageParam ?? 0,
                first: first,
              }
            )}`
          )
          .then((res) => {
            return res.data;
          });
      },
      {
        enabled: !isEmpty(opts.chainIds),
        staleTime: DEFAULT_STALE_TIME,
        ...reactQueryOptions,
        // Don't allow this function to be overwritten by reactQueryOptions
        getNextPageParam: (lastPage) => {
          // If the last page contains less than the expected page first,
          // it's safe to assume you're at the end.

          // @ts-ignore ignore
          if (lastPage.hasNext == true) {
            // @ts-ignore ignore
            return (lastPage.page + 1) * first;
          } else {
            return false;
          }
        },
      }
    )
  );
}

export function useStakingPlayersQuery(
  opts: BetPlayerQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    StakingPlayer[],
    Error,
    StakingPlayer[],
    StakingPlayer[],
    readonly [string, BetPlayerQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["useStakingPlayers", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<StakingPlayer[]>(
            `${
              AppConfig.apiHost
            }/api/betgame/staking/players?${formatQueryParams({
              ...evaluatedOpts,
              skip: pageParam ?? 0,
              first: first,
            })}`
          )
          .then((res) => {
            return res.data;
          });
      },
      {
        enabled: !isEmpty(opts.chainIds),
        staleTime: DEFAULT_STALE_TIME,
        ...reactQueryOptions,
        // Don't allow this function to be overwritten by reactQueryOptions
        getNextPageParam: (lastPage) => {
          // If the last page contains less than the expected page first,
          // it's safe to assume you're at the end.

          // @ts-ignore ignore
          if (lastPage.hasNext == true) {
            // @ts-ignore ignore
            return (lastPage.page + 1) * first;
          } else {
            return false;
          }
        },
      }
    )
  );
}

export function useStakingStakesQuery(
  opts: BetPlayerQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    StakingStake[],
    Error,
    StakingStake[],
    StakingStake[],
    readonly [string, BetPlayerQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["useStakingStakes", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<StakingStake[]>(
            `${AppConfig.apiHost}/api/betgame/staking/stake?${formatQueryParams(
              {
                ...evaluatedOpts,
                skip: pageParam ?? 0,
                first: first,
              }
            )}`
          )
          .then((res) => {
            return res.data;
          });
      },
      {
        enabled: !isEmpty(opts.chainIds),
        staleTime: DEFAULT_STALE_TIME,
        ...reactQueryOptions,
        // Don't allow this function to be overwritten by reactQueryOptions
        getNextPageParam: (lastPage) => {
          // If the last page contains less than the expected page first,
          // it's safe to assume you're at the end.

          // @ts-ignore ignore
          if (lastPage.hasNext == true) {
            // @ts-ignore ignore
            return (lastPage.page + 1) * first;
          } else {
            return false;
          }
        },
      }
    )
  );
}

export function useStakingUnStakesQuery(
  opts: BetPlayerQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    StakingUnStake[],
    Error,
    StakingUnStake[],
    StakingUnStake[],
    readonly [string, BetPlayerQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["useStakingUnStakes", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<StakingUnStake[]>(
            `${
              AppConfig.apiHost
            }/api/betgame/staking/unstake?${formatQueryParams({
              ...evaluatedOpts,
              skip: pageParam ?? 0,
              first: first,
            })}`
          )
          .then((res) => {
            return res.data;
          });
      },
      {
        enabled: !isEmpty(opts.chainIds),
        staleTime: DEFAULT_STALE_TIME,
        ...reactQueryOptions,
        // Don't allow this function to be overwritten by reactQueryOptions
        getNextPageParam: (lastPage) => {
          // If the last page contains less than the expected page first,
          // it's safe to assume you're at the end.

          // @ts-ignore ignore
          if (lastPage.hasNext == true) {
            // @ts-ignore ignore
            return (lastPage.page + 1) * first;
          } else {
            return false;
          }
        },
      }
    )
  );
}

export function useStakingClaimQuery(
  opts: BetPlayerQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    StakingClaim[],
    Error,
    StakingClaim[],
    StakingClaim[],
    readonly [string, BetPlayerQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["useStakingClaims", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<StakingClaim[]>(
            `${
              AppConfig.apiHost
            }/api/betgame/staking/claims?${formatQueryParams({
              ...evaluatedOpts,
              skip: pageParam ?? 0,
              first: first,
            })}`
          )
          .then((res) => {
            return res.data;
          });
      },
      {
        enabled: !isEmpty(opts.chainIds),
        staleTime: DEFAULT_STALE_TIME,
        ...reactQueryOptions,
        // Don't allow this function to be overwritten by reactQueryOptions
        getNextPageParam: (lastPage) => {
          // If the last page contains less than the expected page first,
          // it's safe to assume you're at the end.

          // @ts-ignore ignore
          if (lastPage.hasNext == true) {
            // @ts-ignore ignore
            return (lastPage.page + 1) * first;
          } else {
            return false;
          }
        },
      }
    )
  );
}
