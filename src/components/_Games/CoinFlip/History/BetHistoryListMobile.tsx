"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Chip } from "@nextui-org/react";
import { useTranslations } from "next-intl";

import { SkeletonReferreeItems } from "@/components/_Referrals/loading";
import AppLink from "@/components/AppLink";
import CountDown from "@/components/CountDown";
import CryptoCurrency from "@/components/CryptoCurrency";
import NoData from "@/components/Error/NoData";
import ServerError from "@/components/Error/ServerError";
import LoadMore from "@/components/LoadMore";
import UserLink from "@/components/UserLink";
import { AmountSwitcher, useAmountDisplay } from "@/context/AmountDisplayContext";
import { Bet, BetStatus, FlipBetTypeName } from "@/types/bet";
import { Native } from "@/types/token/native";
import { findChain } from "@/utils/address";
import { getShortAddress } from "@/utils/address";
import { cn } from "@/utils/cn";

const BetHistoryListMobile = ({
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

  return (
    <>
      <div className="flex flex-row items-center justify-start mt-0 border-b border-divider p-2 pt-0 text-ps text-foreground-800 gap-2">
        <div className="basis-1/2">{t("list.title_player")}/{t("list.title_bet_amount")}<AmountSwitcher token={token.symbol} /></div>
        <div className="basis-1/2 flex-grow text-right">
          {t("list.title_date")}/{t("list.title_multiplier")}/{t("list.title_payout")}
        </div>
      </div>

      <div className="flex flex-col overflow-y-auto text-sm">
        <ServerError error={error?.message || queryError} />
        {isLoading && SkeletonReferreeItems}
        {!isLoading &&
          (items?.length ? (
            items.map((x: Bet, index: number) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col justify-start border-b border-divider py-2 px-2 text-ps text-foreground",
                  [{ "border-none": index == items.length - 1 }]
                )}
              >
                <div className="flex flex-row relative">
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
                      <span>
                        [{t(`CoinFlip.option.${FlipBetTypeName(x.betType!)}`)}]
                      </span>
                    </div>
                  </UserLink>
                  <AppLink
                    className="text-primary text-xs absolute top-0 right-0"
                    href={`${chain?.blockExplorers?.default.url}/tx/${x.txHash}`}
                  >
                    <CountDown eventTime={x.createdAt} showOutdate={true} />
                  </AppLink>
                  <Chip variant="flat" size="sm" radius="sm" className="absolute top-5 right-0">
                    x{(x.multiplier! / 10000).toFixed(2)}
                  </Chip>
                </div>

                <div className="flex flex-row gap-1 ml-8 text-ps">
                  <div className="flex flex-row gap-1 ml-1 items-start">
                    {x.drawNumbers && x.drawNumbers.length > 0 && (
                      <div className="flex flex-row gap-1 items-center">
                        <span>{t("list.title_draw_number")}</span>
                        <AppLink
                          className="text-primary"
                          href={`${chain?.blockExplorers?.default.url}/tx/${x.closeTx}`}
                        >
                          <Chip variant='flat' size="sm" radius="full" className="underline">
                            {x.drawNumbers?.[0]}
                          </Chip>
                        </AppLink>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row gap-1 items-end justify-end flex-grow">
                    {x.betStatus == BetStatus.Pending ? (
                      <Chip
                        size="sm"
                        startContent={
                          <Icon
                            icon={"ion:dice-outline"}
                            width={20}
                            className="animate-spin-fast"
                          />
                        }
                      >
                        Pending Draw
                      </Chip>
                    ) : x.betStatus == BetStatus.Won ? (
                      <>
                        <Chip
                          size="sm"
                          radius="sm"
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
                            size="sm"
                            radius="sm"
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
                            size="sm"
                            radius="sm"
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
                          size="sm"
                          radius="sm"
                          startContent={
                            <Icon icon={"tabler:mood-sad-dizzy"} width={20} />
                          }
                        >
                          Lost
                        </Chip>
                        {x.streakBonus && x.streakBonus > "0" && (
                          <Chip
                            size="sm"
                            radius="sm"
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
export default BetHistoryListMobile;
