"use client";

import { Button, Chip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

import { SkeletonReferreeItems } from "@/components/_Referrals/loading";
import CryptoCurrency from "@/components/CryptoCurrency";
import NoData from "@/components/Error/NoData";
import ServerError from "@/components/Error/ServerError";
import LoadMore from "@/components/LoadMore";
import UserLink from "@/components/UserLink";
import { AmountSwitcher, useAmountDisplay } from "@/context/AmountDisplayContext";
import { useRefetchContext } from "@/context/RefetchContext";
import { useWindowSize } from "@/hooks";
import { BetGamePlayer } from "@/types/bet";
import { Native } from "@/types/token/native";
import { getShortAddress } from "@/utils/address";
import { cn } from "@/utils/cn";

import TopPlayerListMobile from "./TopPlayerListMobile";



const TopPlayerList = ({
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
  const t = useTranslations("games");
  const token = Native.onChain(chainId);
  const { display } = useAmountDisplay();

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
      <TopPlayerListMobile
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
      <div className="flex flex-row items-center justify-start mt-0 border-b border-divider p-2 text-pm text-foreground-800 gap-2">
        <div className="basis-1/5">{t("list.title_player")}</div>
        <div className="basis-1/5">{t("list.title_bet_amount")}/{t("list.title_times")}</div>
        <div className="basis-1/5 flex-grow flex-row items-center">{t("list.title_payout")}/{t("list.title_profit")}/RIO<AmountSwitcher token={token.symbol} /></div>
        <div className="basis-1/5">{t("list.title_won")}/{t("list.title_lost")}/{t("list.title_winrate")}</div>
      </div>

      <div className="flex flex-col overflow-y-auto">
        <ServerError error={error?.message || queryError} />
        {isLoading && SkeletonReferreeItems}
        {!isLoading &&
          (items?.length ? (
            items.map((x: BetGamePlayer, index: number) => (
              <div
                key={index}
                className={cn(
                  "flex flex-row items-center justify-start border-b border-divider py-2 px-2 text-pm text-foreground",
                  [{ "border-none": index == items.length - 1 }]
                )}
              >
                <div className="basis-1/5 flex items-start">
                  <UserLink
                    className="justify-start min-h-[48px]"
                    textWrapperClassName="flex flex-col justify-center"
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
                <div className="basis-1/5 flex flex-col items-start">
                  <CryptoCurrency
                    className="flex flex-row"
                    token={token.symbol}
                    value={Number(x.playAmounts).toFixed(4)}
                    display={display}
                    showSuffix={true}
                    showIcon={false}
                    iconSize={{ width: "18px", height: "18px" }}
                  />
                  <Chip size="sm">{x.playCount}</Chip>
                </div>
                <div className="basis-1/5 flex flex-col gap-1 items-start flex-grow">
                  <div className="flex flex-row gap-3">
                    <CryptoCurrency
                      className="flex flex-row"
                      token={token.symbol}
                      value={Number(x.payouts).toFixed(4)}
                      display={display}
                      showSuffix={true}
                      showIcon={false}
                      iconSize={{ width: "18px", height: "18px" }}
                    />
                    <CryptoCurrency
                      className="flex flex-row"
                      token={token.symbol}
                      value={Number(x.payouts! - x.playAmounts!).toFixed(4)}
                      display={display}
                      showSuffix={true}
                      showIcon={false}
                      iconSize={{ width: "18px", height: "18px" }}
                    />
                  </div>
                  <Chip
                    variant="flat"
                    size="sm"
                    color={
                      x.payouts! - x.playAmounts! > 0n ? "success" : "danger"
                    }
                  >
                    ROI:
                    {(
                      Number((x.payouts! - x.playAmounts!) / x.playAmounts!) *
                      100
                    ).toFixed(2)}
                    %
                  </Chip>
                </div>
                <div className="basis-1/5 flex flex-col gap-1 items-start">
                  <div className="flex flex-row gap-1">
                    <Chip size="md">{t("list.title_won")}: {x.winCount}</Chip>
                    <Chip size="md">{t("list.title_lost")}: {x.LossCount}</Chip>
                  </div>
                  <Chip
                    variant="flat"
                    size="sm"
                    color={x.winCount! >= x.LossCount! ? "success" : "danger"}
                  >
                    {t("list.title_winrate")}:
                    {Number((x.winCount! / x.playCount!) * 100).toFixed(2)}%
                  </Chip>
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

export default TopPlayerList;
