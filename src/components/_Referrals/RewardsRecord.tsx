"use client";

import { Icon } from "@iconify/react";
import { Chip } from "@nextui-org/react";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import { AppConfig } from "@/config";
import { AmountSwitcher, useAmountDisplay } from "@/context/AmountDisplayContext";
import { useWindowSize } from "@/hooks";
import {
  useReferrerPaidsQuery
} from "@/hooks/data/useReferralQuery";
import { UserReferrerPaid } from "@/types/referral";
import { Native } from "@/types/token";
import { getShortAddress, getTxUrl } from "@/utils/address";
import { cn } from "@/utils/cn";

import AppLink from "../AppLink";
import CountDown from "../CountDown";
import CryptoCurrency from "../CryptoCurrency";
import NoData from "../Error/NoData";
import ServerError from "../Error/ServerError";
import LoadMore from "../LoadMore";
import UserLink from "../UserLink";

import { SkeletonReferreeItems } from "./loading";

const RewardsRecord = () => {
  const t = useTranslations("referral");
  const tGame = useTranslations("games");
  const { isMobile } = useWindowSize();
  const { address } = useAccount();

  const token = Native.onChain(AppConfig.defaultChainId);
  const { display } = useAmountDisplay();
  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    queryError,
  } = useReferrerPaidsQuery({
    id: address,
    orderBy: "createdAt",
    orderDirection: "desc",
  });

  const paids = data2?.pages
    .flatMap((it: any) => it.data)
    .filter((it: any) => !isEmpty(it));

  if (isMobile) {
    return (
      <>
        <div className="flex flex-row items-center mt-0 border-b border-divider p-2 gap-2 text-foreground-800 text-pm">
          <div className="basis-1/2">{t("referree")}/{tGame("list.title_game")}</div>
          <div className="basis-1/2 flex-grow text-right">{t("date")}/{t("earn")}<AmountSwitcher token={token.symbol} /></div>
        </div>
        <div className="flex flex-col overflow-y-auto text-foreground-800 text-pm">
          <ServerError error={error2?.message || queryError} />
          {isLoading2 && SkeletonReferreeItems}
          {!isLoading2 &&
            (paids?.length ? (
              paids.map((x: UserReferrerPaid, index: number) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col justify-start border-b border-divider p-2 text-ps text-foreground",
                    [{ "border-none": index == paids.length - 1 }]
                  )}
                >
                  <div className="flex flex-row items-center relative">
                    <UserLink
                      className="justify-start min-h-[48px]"
                      textWrapperClassName="flex flex-col text-sm"
                      textClassName="whitespace-nowrap text-ellipsis overflow-hidden max-w-32"
                      id={x.user?.id}
                      name={x.user?.name || getShortAddress(x.user?.id)}
                      address={x.user?.id}
                      avatar={x.user?.avatar}
                      showIcon={true}
                      showName={true}
                      size={{ width: 32, height: 32 }}
                    >
                      <div className="flex flex-row text-ps gap-1">
                        <span>{tGame("list.title_bet")}</span>
                        <CryptoCurrency
                          className="flex flex-row"
                          token={token.symbol}
                          value={formatEther(x.value.valueOf())}
                          display={display}
                          showSuffix={true}
                          showIcon={false}
                          iconSize={{ width: "18px", height: "18px" }}
                        />
                        <span>on</span>
                        <AppLink
                          className="flex flex-row flex-grow p-0 m-0 border-0 text-foreground text-ps underline"
                          href={`/games/${x.playType.toLocaleLowerCase()}`}
                        >
                          {tGame(`${x.playType}.name`)}
                        </AppLink>

                      </div>
                    </UserLink>
                    <AppLink
                      className="text-primary text-xs absolute top-0 right-0"
                      href={getTxUrl(x.chainId, x.txHash)}
                    >
                      <CountDown eventTime={x.createdAt} showOutdate={true} />
                    </AppLink>
                    <Chip
                      className="absolute right-0 top-5"
                      size="sm"
                      radius="sm"
                      variant="flat"
                      color="success"
                    >
                      <CryptoCurrency
                        className="flex flex-row"
                        token={token.symbol}
                        value={formatEther(x.amount.valueOf())}
                        display={display}
                        showSuffix={true}
                        showIcon={false}
                        iconSize={{ width: "18px", height: "18px" }}
                      />
                    </Chip>
                  </div>
                </div>
              ))
            ) : (
              <NoData visible={!error2 && !queryError} />
            ))}
          <LoadMore hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-row items-center mt-0 border-b border-divider p-2 gap-2 text-foreground-800 text-pm">
        <div className="basis-1/4 flex-grow">{t("referree")}</div>
        <div className="basis-1/4">{tGame("list.title_game")}</div>
        <div className="basis-1/4">{tGame("list.title_bet")}/{t("earn")}<AmountSwitcher token={token.symbol} /></div>
        <div className="basis-1/4">{t("date")}</div>
      </div>
      <div className="flex flex-col overflow-y-auto text-foreground-800 text-pm">
        <ServerError error={error2?.message || queryError} />
        {isLoading2 && SkeletonReferreeItems}
        {!isLoading2 &&
          (paids?.length ? (
            paids.map((x: UserReferrerPaid, index: number) => (
              <div
                key={index}
                className={cn(
                  "flex flex-row items-center gap-2 border-b border-divider py-2 px-2",
                  [{ "border-none": index == paids.length - 1 }]
                )}
              >
                <div className="basis-1/4 flex-grow flex flex-row items-center  gap-2">
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
                  ></UserLink>
                </div>
                <div className="basis-1/4 flex flex-grow">
                  <AppLink
                    href={`/games/${x.playType.toLocaleLowerCase()}`}
                  >
                    {tGame(`${x.playType}.name`)}
                  </AppLink>
                </div>
                <div className="basis-1/4">
                  <div className="flex flex-col">
                    <CryptoCurrency
                      token={Native.onChain(x.chainId).symbol}
                      value={formatEther(x.value.valueOf())}
                      display={display}
                      showIcon={false}
                      showSuffix={true}
                    />
                    <Chip
                      size="sm"
                      radius="sm"
                      variant="flat"
                      color="success"
                    >
                      <CryptoCurrency
                        token={Native.onChain(x.chainId).symbol}
                        value={formatEther(x.amount.valueOf())}
                        display={display}
                        showIcon={false}
                        showSuffix={true}
                      />
                    </Chip>
                  </div>
                </div>
                <div className="basis-1/4 flex items-end gap-1">
                  <AppLink
                    className="text-primary text-sm"
                    href={getTxUrl(x.chainId, x.txHash)}
                  >
                    <CountDown eventTime={x.createdAt} showOutdate={true} />
                    <Icon
                      className="text-primary-500"
                      icon="fluent:share-16-regular"
                      width={18}
                    />
                  </AppLink>
                </div>
              </div>
            ))
          ) : (
            <NoData visible={!error2 && !queryError} />
          ))}
        <LoadMore hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
      </div>
    </>
  );
};

export default RewardsRecord;