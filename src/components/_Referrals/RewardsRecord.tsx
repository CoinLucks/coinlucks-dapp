"use client";

import { Icon } from "@iconify/react";
import { Chip } from "@nextui-org/react";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

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
  const { isMobile } = useWindowSize();
  const { address } = useAccount();

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
  return (
    <>
      <div className="flex flex-row items-center mt-0 border-b border-divider p-2 gap-2 text-foreground-800 text-pm">
        <div className="basis-1/3 flex-grow">{t("referree")}</div>
        <div className="basis-1/3">{t("purchase")}/{t("earn")}</div>
        <div className="basis-1/3">{t("date")}</div>
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
                {isMobile ? (
                  <>
                    <div className="flex-grow flex flex-col items- justify-start gap-2">
                      <div className="flex flex-row items-center gap-2">
                        <Chip>{x.playType}</Chip>
                        <UserLink
                          className="justify-start min-h-[48px]"
                          textWrapperClassName="flex flex-col"
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
                      <div className="flex flex-row gap-2">
                        <CryptoCurrency
                          token={Native.onChain(x.chainId).symbol}
                          value={formatEther(x.value.valueOf())}
                          display="Crypto"
                          showIcon={true}
                          showSuffix={true}
                        />
                        <CryptoCurrency
                          className={"text-warning"}
                          token={Native.onChain(x.chainId).symbol}
                          value={formatEther(x.amount.valueOf())}
                          display="Crypto"
                          showIcon={true}
                          showSuffix={true}
                        />
                      </div>
                      <div className="flex justify-end gap-1">
                        <AppLink
                          className="text-primary text-sm"
                          href={getTxUrl(x.chainId, x.txHash)}
                        >
                          <CountDown
                            eventTime={x.createdAt}
                            showOutdate={true}
                          />
                          <Icon
                            className="text-primary-500"
                            icon="fluent:share-16-regular"
                            width={18}
                          />
                        </AppLink>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="basis-1/3 flex-grow flex flex-row items-center  gap-2">
                      <Chip>{x.playType}</Chip>
                      <UserLink
                        className="justify-start min-h-[48px]"
                        textWrapperClassName="flex flex-col"
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
                    <div className="basis-1/3">
                      <div className="flex flex-col">
                        <CryptoCurrency
                          token={Native.onChain(x.chainId).symbol}
                          value={formatEther(x.value.valueOf())}
                          display="Crypto"
                          showIcon={true}
                          showSuffix={true}
                        />
                        <CryptoCurrency
                          token={Native.onChain(x.chainId).symbol}
                          value={formatEther(x.amount.valueOf())}
                          display="Crypto"
                          showIcon={true}
                          showSuffix={true}
                        />
                      </div>
                    </div>
                    <div className="basis-1/3 flex items-end gap-1">
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
                  </>
                )}
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