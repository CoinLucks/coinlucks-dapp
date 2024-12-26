import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import React, { useState } from "react";


import { SkeletonReferreeItems } from "@/components/_Referrals/loading";
import NoData from "@/components/Error/NoData";
import ServerError from "@/components/Error/ServerError";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useStakingPlayersQuery } from "@/hooks/data/useBetGameQuery";
import { StakingPlayer } from "@/types/bet";
import { BetPlayerQueryOpts } from "@/types/bet/bet.query";
import { Native } from "@/types/token/native";

import LeaderboardItem from "./LeaderboardItem";

const LeaderboardSection = () => {
  const t = useTranslations("games");
  const { chainId, gameName } = useBetGameBasicContext();
  const [filters] = useState<BetPlayerQueryOpts>({
    chainIds: `${chainId}`,
    game: gameName,
    first: 3,
    orderBy: "amount",
    orderDirection: "desc",
  });

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    queryError,
  } = useStakingPlayersQuery(filters);

  const items = data?.pages
    .flatMap((it: any) => it.data)
    .filter((it: any) => !isEmpty(it));
  // .sort((a: any, b: any) => a.claims - b.claims);

  const token = Native.onChain(chainId);

  return (
    <section className="flex flex-col mt-6 w-full bg-background-700 rounded-lg">
      <header className="flex gap-10 items-center pr-6 pl-16 w-full text-xs leading-none text-foreground-800 whitespace-nowrap max-md:px-4">
        <div className="flex-1 shrink self-stretch my-auto basis-0">
          {t("list.title_player")}/{t("list.title_stake")}
        </div>
        <div className="self-stretch my-auto">{t("list.title_earn")}/{t("list.title_pending")}</div>
      </header>
      <ServerError error={error?.message || queryError} />
      {isLoading && SkeletonReferreeItems}
      {!isLoading &&
        (items?.length ? (
          items.map((x: StakingPlayer, index: number) => (
            <LeaderboardItem
              key={index}
              rank={index + 1}
              item={x}
              token={token}
              gameName={gameName}
            />
          ))
        ) : (
          <NoData visible={!error && !queryError} />
        ))}

    </section>
  );
};

export default LeaderboardSection;
