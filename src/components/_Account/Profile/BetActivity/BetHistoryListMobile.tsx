"use client";

import { Button, Chip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";


import { SkeletonReferreeItems } from "@/components/_Referrals/loading";
import AppLink from "@/components/AppLink";
import CountDown from "@/components/CountDown";
import CryptoCurrency from "@/components/CryptoCurrency";
import NoData from "@/components/Error/NoData";
import ServerError from "@/components/Error/ServerError";
import LoadMore from "@/components/LoadMore";
import UserLink from "@/components/UserLink";
import { AmountSwitcher, useAmountDisplay } from "@/context/AmountDisplayContext";
import { useRefetchContext } from "@/context/RefetchContext";
import { Bet } from "@/types/bet";
import { Native } from "@/types/token/native";
import { findChain } from "@/utils/address";
import { getShortAddress } from "@/utils/address";
import { cn } from "@/utils/cn";

const BetHistoryList = ({
  chainId,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  queryError,
  error,
  items,
  refetch,
}: {
  chainId: number;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage?: any;
  queryError?: any;
  error?: any;
  items?: any[];
  refetch?: any;
}) => {
  const chain = findChain(chainId);
  const token = Native.onChain(chainId);
  const { display } = useAmountDisplay();
  const t = useTranslations("games");
  // Use effect to refetch when triggers.payment changes
  const { triggers } = useRefetchContext();
  useEffect(() => {
    if (triggers.payment !== undefined) {
      refetch();
    }
  }, [triggers.payment, refetch]);
  console.log(queryError);
  return (
    <>
      <div className="flex flex-row items-center justify-start mt-2 border-b border-divider p-2 pt-0 text-ps text-foreground-800 gap-2">
        <div className="basis-1/2">{t("list.title_player")}/{t("list.title_game")}</div>
        <div className="basis-1/2 flex-grow text-right">{t("list.title_date")}/{t("list.title_payout")}<AmountSwitcher token={token.symbol} /></div>
      </div>

      <div className="flex flex-col overflow-y-auto">
        <ServerError error={error?.message || queryError} />
        {isLoading && SkeletonReferreeItems}
        {!isLoading &&
          (items?.length ? (
            items.map((x: Bet, index: number) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col justify-start border-b border-divider p-2 text-ps text-foreground",
                  [{ "border-none": index == items.length - 1 }]
                )}
              >
                <div className="flex flex-row items-center relative">
                  <UserLink
                    className="justify-start min-h-[48px]"
                    textWrapperClassName="flex flex-col text-sm"
                    textClassName="whitespace-nowrap text-ellipsis overflow-hidden max-w-32"
                    id={x.player?.id}
                    name={x.player?.name || getShortAddress(x.player?.id)}
                    address={x.player?.id}
                    avatar={x.player?.avatar}
                    showIcon={true}
                    showName={true}
                    size={{ width: 32, height: 32 }}
                  >
                    <div className="flex flex-row text-ps gap-1">
                      <span>{t("list.title_bet")}</span>
                      <CryptoCurrency
                        className="flex flex-row"
                        token={token.symbol}
                        value={x.betAmount}
                        display={display}
                        showSuffix={true}
                        showIcon={false}
                        iconSize={{ width: "18px", height: "18px" }}
                      />
                      <span>on</span>
                      <AppLink
                        className="flex flex-row flex-grow p-0 m-0 border-0 text-foreground text-ps underline"
                        href={`/games/${x.game.name.toLocaleLowerCase()}`}
                      >
                        {t(`${x.game.name}.name`)}
                      </AppLink>

                    </div>

                  </UserLink>
                  <AppLink
                    className="text-primary text-xs absolute top-0 right-0"
                    href={`${chain?.blockExplorers?.default.url}/tx/${x.txHash}`}
                  >
                    <CountDown eventTime={x.createdAt} showOutdate={true} />
                  </AppLink>
                  <AppLink
                    className="absolute right-0 top-5"
                    href={`${chain?.blockExplorers?.default.url}/tx/${x.closeTx}`}
                  >
                    <Chip
                      size="sm"
                      radius="sm"

                      variant="flat"
                      color="success"
                    >
                      <CryptoCurrency
                        className="flex flex-row"
                        token={token.symbol}
                        value={x.payout}
                        display={display}
                        showSuffix={true}
                        showIcon={false}
                        iconSize={{ width: "18px", height: "18px" }}
                      />
                    </Chip>
                  </AppLink>
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

export default BetHistoryList;
