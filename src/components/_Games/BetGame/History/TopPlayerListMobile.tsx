"use client";

import { Button, Chip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import { SkeletonReferreeItems } from "@/components/_Referrals/loading";
import CryptoCurrency from "@/components/CryptoCurrency";
import NoData from "@/components/Error/NoData";
import ServerError from "@/components/Error/ServerError";
import LoadMore from "@/components/LoadMore";
import UserLink from "@/components/UserLink";
import { AmountSwitcher, useAmountDisplay } from "@/context/AmountDisplayContext";
import { BetGamePlayer } from "@/types/bet";
import { Native } from "@/types/token/native";
import { getShortAddress } from "@/utils/address";
import { cn } from "@/utils/cn";


const TopPlayerListMobile = ({
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
  return (
    <>
      <div className="flex flex-row items-center justify-start mt-0 border-b border-divider p-2 text-ps text-foreground-800 gap-2">
        <div className="basis-1/2 flex flex-row items-center">{t("list.title_player")}/{t("list.title_bet")}/{t("list.title_payout")}<AmountSwitcher token={token.symbol} /></div>
        <div className="basis-1/2 flex-grow text-right">{t("list.title_profit")}/{t("list.title_winrate")}/RIO</div>
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
                  "flex flex-col gap-1 border-b border-divider py-2 px-2 text-ps text-foreground",
                  [{ "border-none": index == items.length - 1 }]
                )}
              >
                <div className="flex flex-row items-center justify-between text-ps">
                  <UserLink
                    className="justify-start"
                    textWrapperClassName="flex flex-col justify-center text-ps"
                    textClassName="whitespace-nowrap text-ellipsis overflow-hidden max-w-32"
                    id={x.player?.id}
                    name={x.player?.name || getShortAddress(x.player?.id)}
                    address={x.player?.id}
                    avatar={x.player?.avatar}
                    showIcon={true}
                    showName={true}
                    size={{ width: 28, height: 28 }}
                  ></UserLink>
                  <CryptoCurrency
                    className="flex flex-row text-ps"
                    token={token.symbol}
                    value={Number(x.payouts! - x.playAmounts!).toFixed(4)}
                    display={display}
                    showSuffix={true}
                    showIcon={false}
                    iconSize={{ width: "18px", height: "18px" }}
                  />
                </div>
                <div className="flex flex-row items-center justify-between text-ps">
                  <CryptoCurrency
                    className="flex flex-row"
                    token={token.symbol}
                    value={Number(x.playAmounts).toFixed(4)}
                    display={display}
                    showSuffix={true}
                    showIcon={false}
                    iconSize={{ width: "18px", height: "18px" }}
                  />
                  <Chip
                    variant="flat"
                    size="sm"
                    color={x.winCount! > x.LossCount! ? "success" : "danger"}
                  >
                    {t("list.title_winrate")}:
                    {Number((x.winCount! / x.playCount!) * 100).toFixed(2)}%
                  </Chip>
                </div>
                <div className="flex flex-row items-center justify-between text-ps">
                  <CryptoCurrency
                    className="flex flex-row"
                    token={token.symbol}
                    value={Number(x.payouts).toFixed(4)}
                    display={display}
                    showSuffix={true}
                    showIcon={false}
                    iconSize={{ width: "18px", height: "18px" }}
                  />
                  <Chip
                    variant="flat"
                    size="sm"
                    color={
                      x.payouts! - x.playAmounts! > 0!
                        ? "success"
                        : "danger"
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

export default TopPlayerListMobile;
