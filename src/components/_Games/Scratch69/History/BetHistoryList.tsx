"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
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
import { Bet, BetStatus } from "@/types/bet";
import { Native } from "@/types/token/native";
import { findChain } from "@/utils/address";
import { getShortAddress } from "@/utils/address";
import { cn } from "@/utils/cn";


import ScratchPrizeLabel from "../Play/ScratchPrizeLabel";

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
  const t = useTranslations("games");
  const chain = findChain(chainId);
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
      <div className="flex flex-row items-center justify-start mt-4 border-b border-divider p-2 text-pm text-foreground-800 gap-2">
        <div className="basis-1/5">{t("list.title_date")}</div>
        <div className="basis-1/5 flex-grow">{t("list.title_player")}</div>
        <div className="basis-1/5 flex flex-row items-center">{t("list.title_bet_amount")}<AmountSwitcher token={token.symbol} /></div>
        <div className="basis-1/5">{t("list.title_draw_number")}</div>
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
                <div className="basis-1/5 flex flex-grow">
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
                    value={x.betAmount}
                    display={display}
                    showSuffix={true}
                    showIcon={false}
                    iconSize={{ width: "18px", height: "18px" }}
                  />
                </div>
                <div className="basis-1/5 flex flex-col">
                  {/* <div>x{calculateMultiplier(x.betPrize!).toFixed(2)}</div> */}
                  <div className="flex flex-row gap-2 items-center mt-1 text-foreground-800">
                    <ScratchPrizeLabel prize={x.betPrize} />
                    <AppLink
                      className="text-primary"
                      href={`${chain?.blockExplorers?.default.url}/tx/${x.closeTx}`}
                    >
                      {x.drawNumbers &&
                        x.drawNumbers.length > 0 &&
                        x.drawNumbers.map((number, index) => (
                          <Chip key={index} size="sm" radius="full" className="min-w-7 h-7">
                            {number}
                          </Chip>
                        ))}
                    </AppLink>
                  </div>
                </div>
                <div className="basis-1/5 flex flex-col gap-1 items-start">
                  <div className="flex flex-wrap gap-1">
                    {x.betStatus == BetStatus.Pending ? (
                      <Chip
                        startContent={
                          <Icon
                            icon={"ion:dice-outline"}
                            width={22}
                            className="animate-spin-fast"
                          />
                        }
                      >
                        Pending Draw
                      </Chip>
                    ) : x.betStatus == BetStatus.Won ? (
                      <>
                        <Chip
                          startContent={
                            <Icon icon={"bx:wink-smile"} width={20} />
                          }
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
                        {x.streakBonus && x.streakBonus > "0" && (
                          <Chip
                            startContent={
                              <Icon
                                icon={"mingcute:ice-cream-line"}
                                width={20}
                              />
                            }
                            variant="flat"
                            color="warning"
                          >
                            <CryptoCurrency
                              className="flex flex-row"
                              token={token.symbol}
                              value={x.streakBonus}
                              display={display}
                              showSuffix={true}
                              showIcon={false}
                              iconSize={{ width: "18px", height: "18px" }}
                            />
                          </Chip>
                        )}
                        {x.jackpot && x.jackpot > "0" && (
                          <Chip
                            startContent={
                              <Icon
                                icon={"flowbite:gift-box-outline"}
                                width={20}
                              />
                            }
                            variant="flat"
                            color="warning"
                          >
                            <CryptoCurrency
                              className="flex flex-row"
                              token={token.symbol}
                              value={x.jackpot}
                              display={display}
                              showSuffix={true}
                              showIcon={false}
                              iconSize={{ width: "18px", height: "18px" }}
                            />
                          </Chip>
                        )}
                      </>
                    ) : (
                      <>
                        <Chip
                          variant="flat"
                          startContent={
                            <Icon icon={"tabler:mood-sad-dizzy"} width={20} />
                          }
                        >
                          Lost
                        </Chip>
                        {x.streakBonus && x.streakBonus > "0" && (
                          <Chip
                            startContent={
                              <Icon icon={"tabler:ice-cream"} width={20} />
                            }
                            variant="flat"
                            color="warning"
                          >
                            <CryptoCurrency
                              className="flex flex-row"
                              token={token.symbol}
                              value={x.streakBonus}
                              display={display}
                              showSuffix={true}
                              showIcon={false}
                              iconSize={{ width: "18px", height: "18px" }}
                            />
                          </Chip>
                        )}
                      </>
                    )}
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

export default BetHistoryList;
