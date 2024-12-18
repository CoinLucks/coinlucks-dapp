import axios from "axios";
import { isEmpty } from "lodash";
import {
  useInfiniteQuery,
  useQuery,
  type UseInfiniteQueryOptions,
} from "react-query";

import { AppConfig } from "@/config";
import { formatApiRsp } from "@/types/api.rsp";
import {
  Raffle,
  RaffleDetailListQueryOpts,
  RaffleDetailQueryOpts,
  RaffleQueryOpts,
  RaffleTicket,
  type RaffleParticipant,
  type RaffleActivity,
  TEN_MINS,
} from "@/types/raffle";
import { formatQueryParams } from "@/utils/queryParams";

const DEFAULT_STALE_TIME = 60 * 1000; // 60 seconds

const processRaffleQueryOpt = (opt: any) => {
  if (opt.sort) {
    switch (opt.sort) {
      case "time-remaining":
      default:
        opt.orderBy = "endTime";
        opt.orderDirection = "asc";
        opt.endTime = new Date().getTime() + TEN_MINS;
        break;
      case "newest":
        opt.orderBy = "createdAt";
        opt.orderDirection = "desc";
        break;
      case "oldest":
        opt.orderBy = "createdAt";
        opt.orderDirection = "asc";
        break;
    }
  }
  return opt;
};

const getRaffleJoinStatesQuerys = (
  wallet: string,
  raffles: Raffle[]
): { chainId: number; wallet: string; ids: string[] }[] => {
  const grouped = raffles.reduce((acc, raffle) => {
    const { chainId, id } = raffle;
    if (!acc[chainId]) {
      acc[chainId] = { chainId, wallet, ids: [] };
    }
    acc[chainId].ids.push(id);

    return acc;
  }, {} as { [key: number]: { chainId: number; wallet: string; ids: string[] } });

  return Object.values(grouped);
};

const getRaffleJoinStates = async (
  subs: { chainId: number; wallet: string; ids: string[] }[]
) => {
  const subPromises: any[] = [];
  subs.forEach((sub) => {
    subPromises.push(
      axios
        .get(
          `${AppConfig.apiHost}/api/raffles/joinstates?${formatQueryParams(
            sub
          )}`
        )
        .then((res) => res.data?.data)
    );
  });
  return Promise.all(subPromises);
};

const loadRaffleJoinStates = async (rsp: any, walletAddress?: string) => {
  if (walletAddress && rsp.state && rsp.data) {
    const items = Array.isArray(rsp.data) ? rsp.data : [rsp.data];
    // fetch user's join-state
    const subQuerys = getRaffleJoinStatesQuerys(walletAddress, items);

    const subItems: any = await getRaffleJoinStates(subQuerys);

    if (subItems) {
      subItems
        .flatMap((sub: any) => sub)
        .forEach((joinstate: any) => {
          let item = items.find((raffle: any) => raffle.id == joinstate.id);
          if (item) {
            item.joinState = "Joined";
          }
        });
    }
  }
};

export function useRaffleQuery(
  opts: RaffleQueryOpts,
  walletAddress?: string,
  reactQueryOptions?: UseInfiniteQueryOptions<
    Raffle[],
    Error,
    Raffle[],
    Raffle[],
    readonly [string, RaffleQueryOpts, string?]
  >
) {
  let first = opts.first || 20;
  if (first > 100) {
    first = 100;
  }

  return formatApiRsp(
    useInfiniteQuery(
      ["raffles", opts, walletAddress],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        processRaffleQueryOpt(evaluatedOpts);

        return axios
          .get<Raffle[]>(
            `${AppConfig.apiHost}/api/raffles?${formatQueryParams({
              ...evaluatedOpts,
              skip: pageParam ?? 0,
              first: first,
            })}`
          )
          .then(async (res) => {
            const rsp: any = res.data;
            await loadRaffleJoinStates(rsp, walletAddress);
            return rsp;
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
          // const totalPage = Math.ceil(lastPage.total / first) - 1;
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

export function useRaffleDetaiQuery(
  opts: RaffleDetailQueryOpts,
  walletAddress?: string
) {
  return formatApiRsp(
    useQuery(
      ["raffleDetail", opts, walletAddress],
      async () => {
        return axios
          .get<Raffle>(
            `${AppConfig.apiHost}/api/raffles/${opts.chainId}/${opts.chainId}_${opts.id}`
          )
          .then(async (res) => {
            const rsp: any = res.data;
            await loadRaffleJoinStates(rsp, walletAddress);
            return rsp;
          });
      },
      {
        enabled: !isEmpty(opts.id),
        staleTime: DEFAULT_STALE_TIME,
      }
    )
  );
}

export function useRaffleActivityQuery(
  opts: RaffleDetailListQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    RaffleActivity[],
    Error,
    RaffleActivity[],
    RaffleActivity[],
    readonly [string, RaffleDetailListQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["raffleActivity", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<RaffleActivity[]>(
            `${AppConfig.apiHost}/api/raffles/activity?${formatQueryParams({
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
        enabled: !isEmpty(opts.id),
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

export function useRaffleParticipantsQuery(
  opts: RaffleDetailListQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    RaffleParticipant[],
    Error,
    RaffleParticipant[],
    RaffleParticipant[],
    readonly [string, RaffleDetailListQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["raffleParticipants", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<RaffleParticipant[]>(
            `${AppConfig.apiHost}/api/raffles/participants?${formatQueryParams({
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
        enabled: !isEmpty(opts.id),
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

export function useRaffleTicketsQuery(
  opts: RaffleDetailListQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    RaffleTicket[],
    Error,
    RaffleTicket[],
    RaffleTicket[],
    readonly [string, RaffleDetailListQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["raffleTickets", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<RaffleTicket[]>(
            `${AppConfig.apiHost}/api/raffles/tickets?${formatQueryParams({
              ...evaluatedOpts,
              wallet: opts.wallet,
              skip: pageParam ?? 0,
              first: first,
            })}`
          )
          .then((res) => {
            return res.data;
          });
      },
      {
        enabled: !isEmpty(opts.id),
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
