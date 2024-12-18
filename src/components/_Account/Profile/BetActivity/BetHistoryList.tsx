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
import { useWindowSize } from "@/hooks";
import { Bet } from "@/types/bet";
import { Native } from "@/types/token/native";
import { getShortAddress } from "@/utils/address";
import { cn } from "@/utils/cn";
import { chains } from "@/wagmi";

import BetHistoryListMobile from "./BetHistoryListMobile";



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
  const chain = chains.find((it) => it.id == chainId);
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

  const { isMobile } = useWindowSize();
  if (isMobile) {
    return (
      <BetHistoryListMobile
        chainId={chainId}
        isLoading={isLoading}
        error={error}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        queryError={queryError}
        items={items}
        refetch={refetch}
      />
    );
  }

  return (
    <>
      <div className="flex flex-row items-center justify-start border-b border-divider p-2 text-pm text-foreground-800 gap-2">
        <div className="basis-1/5">{t("list.title_date")}</div>
        <div className="basis-1/5">{t("list.title_player")}</div>
        <div className="basis-1/5 flex-grow">{t("list.title_game")}</div>
        <div className="basis-1/5 flex flex-row items-center">{t("list.title_bet_amount")}<AmountSwitcher token={token.symbol} /></div>
        <div className="basis-1/5">{t("list.title_payout")}</div>
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
                  "flex flex-row items-center justify-start border-b border-divider py-2 px-2 text-pm text-foreground",
                  [{ "border-none": index == items.length - 1 }]
                )}
              >
                <div className="basis-1/5">
                  <AppLink
                    className="text-primary"
                    href={`${chain?.blockExplorers?.default.url}/tx/${x.txHash}`}
                  >
                    <CountDown eventTime={x.createdAt} showOutdate={true} />
                  </AppLink>
                </div>
                <div className="basis-1/5">
                  <UserLink
                    className="justify-start min-h-[48px]"
                    textWrapperClassName="flex flex-col text-sm justify-center"
                    textClassName="whitespace-nowrap text-ellipsis overflow-hidden max-w-32"
                    id={x.player?.id}
                    name={x.player?.name || getShortAddress(x.player?.id)}
                    address={x.player?.id}
                    avatar={x.player?.avatar}
                    showIcon={true}
                    showName={true}
                    size={{ width: 32, height: 32 }}
                  ></UserLink>
                </div>
                <div className="basis-1/5 flex flex-grow">
                  <AppLink
                    href={`/games/${x.game.name.toLocaleLowerCase()}`}
                  >
                    {t(`${x.game.name}.name`)}
                  </AppLink>
                </div>
                <div className="basis-1/5 flex flex-col items-start gap-1">
                  <CryptoCurrency
                    className="flex flex-row"
                    token={Native.onChain(x.chainId!).symbol}
                    value={x.betAmount}
                    display={display}
                    showSuffix={true}
                    showIcon={false}
                    iconSize={{ width: "18px", height: "18px" }}
                  />
                </div>
                <div className="basis-1/5 flex flex-col gap-1 items-start">
                  <AppLink
                    className=""
                    href={`${chain?.blockExplorers?.default.url}/tx/${x.closeTx}`}
                  >
                    <Chip
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
