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
  ReferralListQueryOpts,
  UserReferral,
  UserReferreeCount,
  UserReferrerIncome,
  UserReferrerPaid,
} from "@/types/referral";
import { formatQueryParams } from "@/utils/queryParams";

const DEFAULT_STALE_TIME = 60 * 1000; // 60 seconds

export function useReferreeCountQuery(id?: string) {
  return useQuery(
    ["referreeCount", id],
    async () => {
      return axios
        .get<ApiRsp<UserReferreeCount>>(
          `${AppConfig.apiHost}/api/referrals/referreeCount?${formatQueryParams(
            { id: id }
          )}`
        )
        .then(async (res) => {
          return res.data;
        });
    },
    {
      enabled: !isEmpty(id),
      staleTime: DEFAULT_STALE_TIME,
    }
  );
}

export function useReferreesQuery(
  opts: ReferralListQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    UserReferral[],
    Error,
    UserReferral[],
    UserReferral[],
    readonly [string, ReferralListQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["useReferrees", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<UserReferral[]>(
            `${AppConfig.apiHost}/api/referrals/referrees?${formatQueryParams({
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

export function useReferrerIncomeQuery(
  opts: ReferralListQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    UserReferrerIncome[],
    Error,
    UserReferrerIncome[],
    UserReferrerIncome[],
    readonly [string, ReferralListQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["useReferrerIncome", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<UserReferrerIncome[]>(
            `${AppConfig.apiHost}/api/referrals/incomes?${formatQueryParams({
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

export function useReferrerPaidsQuery(
  opts: ReferralListQueryOpts,
  reactQueryOptions?: UseInfiniteQueryOptions<
    UserReferrerPaid[],
    Error,
    UserReferrerPaid[],
    UserReferrerPaid[],
    readonly [string, ReferralListQueryOpts]
  >
) {
  let first = opts.first || 10;
  if (first > 100) {
    first = 100;
  }
  return formatApiRsp(
    useInfiniteQuery(
      ["useReferrerPaids", opts],
      async ({ queryKey, pageParam }) => {
        const { ...evaluatedOpts } = queryKey[1];
        return axios
          .get<UserReferrerPaid[]>(
            `${AppConfig.apiHost}/api/referrals/paids?${formatQueryParams({
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
