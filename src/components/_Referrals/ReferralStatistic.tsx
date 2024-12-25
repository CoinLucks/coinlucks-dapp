"use client";

import { Chip, Divider } from "@nextui-org/react";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import {
  useReferreeCountQuery, useReferrerIncomeQuery
} from "@/hooks/data/useReferralQuery";
import { UserReferrerIncome } from "@/types/referral";
import { Native } from "@/types/token";

import CryptoCurrency from "../CryptoCurrency";
import Loading from "../Loading";
import Tips from "../Tips";

const ReferralStatistic = () => {
  const t = useTranslations("referral");
  const { address } = useAccount();

  const {
    data: referreeCount,
    isLoading: referreeCountLoading,
    error: referreeCountError,
  } = useReferreeCountQuery(address);

  const { data: dataIncome, isLoading: isLoadingIncome, error: errorIncome } = useReferrerIncomeQuery({
    id: address,
  });

  const info = referreeCount?.state ? referreeCount.data : null;
  const incomes = dataIncome?.pages
    .flatMap((it: any) => it.data)
    .filter((it: any) => !isEmpty(it));

  const referredCount = `${(info?.firstLevelCount ?? 0)} / ${(info?.secondLevelCount ?? 0)}`
  return (
    <div className="flex flex-col gap-2 items-start max-md:items-center justify-center p-3 mt-4 h-full rounded-xl bg-background-700 max-md:px-5 max-md:max-w-full text-sm overflow-x-scroll scrollbar-hide">
      <div className="flex flex-row items-center justify-center text-center gap-3">
        <div className="flex flex-col gap-2 py-4 px-2">
          {!isLoadingIncome &&
            incomes?.length > 0 ?
            incomes.map((x: UserReferrerIncome, index: number) => (
              <div key={index} className="flex flex-col gap-2 py-0 px-2 rounded-2xl items-center text-center text-nowrap">
                <CryptoCurrency
                  className={"font-semibold"}
                  token={Native.onChain(x.chainId).symbol}
                  value={formatEther(x.amount)}
                  display="Crypto"
                  showIcon={true}
                  showSuffix={true}
                />
                <Chip 
                  variant="flat"
                  color="success">
                  <CryptoCurrency
                    token={Native.onChain(x.chainId).symbol}
                    value={formatEther(x.amount)}
                    display="USD"
                  />
                </Chip>
              </div>
            )) : <span className="font-semibold">$0</span>}
          <span className="pl-4 text-pm">{t("lifetime_rewards")}</span>
        </div>
        <Divider className="h-24" orientation="vertical" />
        <div className="flex flex-col gap-2 py-4 px-2 rounded-2xl">
          <span className="font-semibold">
            {referreeCountLoading && <Loading />}
            {!referreeCountLoading && referredCount}
          </span>
          <Tips className="pl-4 pt-0" text={t("friends_referred_tip")} startContent={t("friends_referred")} />
        </div>
      </div>
    </div>
  );
};

export default ReferralStatistic;
