"use client";

import { Chip } from "@nextui-org/react";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";

import {
  useReferreesQuery
} from "@/hooks/data/useReferralQuery";
import { UserReferral } from "@/types/referral";
import { getShortAddress } from "@/utils/address";
import { cn } from "@/utils/cn";

import CountDown from "../CountDown";
import NoData from "../Error/NoData";
import ServerError from "../Error/ServerError";
import LoadMore from "../LoadMore";
import UserLink from "../UserLink";

import { SkeletonReferreeItems } from "./loading";

const ReferreeRecord = () => {
  const t = useTranslations("referral");
  const { address } = useAccount();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    queryError,
  } = useReferreesQuery({
    id: address,
    orderBy: "createdAt",
    orderDirection: "desc"
  });

  const items = data?.pages
    .flatMap((it: any) => it.data)
    .filter((it: any) => !isEmpty(it));

  return (
    <>
      <div
        className={
          "flex flex-row border-b border-divider p-2 mt-0 text-foreground-800 text-pm"
        }
      >
        <div className="flex w-full items-center justify-between">{t("recent_referree")}</div>
        <div className="flex flex-shrink-0 items-end">{t("joined_time")}</div>
      </div>
      <div className="flex flex-col overflow-y-auto text-foreground-800 text-pm">
        <ServerError error={error?.message || queryError} />
        {isLoading && SkeletonReferreeItems}
        {!isLoading &&
          (items?.length ? (
            items.map((x: UserReferral, index: number) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col border-b border-divider py-2 px-2",
                  [{ "border-none": index == items.length - 1 }]
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <UserLink
                    className="justify-start min-h-[48px]"
                    textWrapperClassName="flex flex-col text-sm justify-center"
                    textClassName="whitespace-nowrap text-ellipsis overflow-hidden max-w-32"
                    id={x.user?.id}
                    name={x.user?.name || getShortAddress(x.user?.id)}
                    address={x.user?.id}
                    avatar={x.user?.avatar}
                    showIcon={true}
                    showName={true}
                    size={{ width: 32, height: 32 }}
                  />
                  <Chip size="sm" className="justify-starr">
                    {x.referrer.id == address?.toLocaleLowerCase()
                      ? "T1"
                      : "T2"}
                  </Chip>
                  <div className="flex flex-row items-end gap-1">
                    <CountDown eventTime={x.createdAt} showOutdate={true} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoData visible={!error && !queryError} />
          ))}
        <LoadMore hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
      </div>
    </>
  );
};

export default ReferreeRecord;
