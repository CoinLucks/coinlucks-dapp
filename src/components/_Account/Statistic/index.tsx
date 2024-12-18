"use client";

import { isEmpty, keyBy } from "lodash";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useAccount } from "wagmi";

import { money } from "@/components/CryptoCurrency";
import { AppConfig } from "@/config";
import { GameLogo } from "@/constants/contracts/gameLogo";
import { useCryptoPrice } from "@/context/CryptoPrice/useCryptoPrice";
import { useBetPlayersQuery, useBetsQuery } from "@/hooks/data/useBetGameQuery";
import { BetGamePlayer, BetPlayerQueryOpts, BetQueryOpts } from "@/types/bet";

import { StatisticLoading } from "../loading";

import GameCard from "./GameCard";
import StatCard from "./StatCard";
import { aggregateStatsByGame, aggregateTwoStats, initStats } from "./utils";

const Statistic = ({ id }: { id: string }) => {
  const t = useTranslations("account");
  const { data: prices } = useCryptoPrice();
  const { chainId } = useAccount();
  const [filters] = useState<BetPlayerQueryOpts>({
    chainIds: "",
    player: id,
    orderBy: "playAmounts",
    orderDirection: "desc",
    first: 10,
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
  } = useBetPlayersQuery(filters);

  const items: BetGamePlayer[] = data?.pages
    .flatMap((it: any) => it.data)
    .filter((it: any) => !isEmpty(it));

  if (!items) {
    return <StatisticLoading />;
  }

  const games = aggregateStatsByGame(items, prices);

  const player = Object.values(games).reduce(aggregateTwoStats, initStats());

  const statisticsData = [
    {
      label: `${t("total")} ${t("wins")} / ${t("bets")}`,
      value: `${player?.winCount} / ${player?.playCount}`,
    },
    { label: `${t("total")} ${t("wagered")}`, value: money.format(player?.playAmounts) },
    { label: `${t("total")} ${t("winnings")}`, value: money.format(player?.winnings) },
  ];

  const topGames = Object.keys(games)
    .map((gameName: string) => {
      const stats = games[gameName];
      return {
        chainId: chainId || AppConfig.defaultChainId,
        name: gameName,
        image: GameLogo[gameName],
        winnings: Number(stats?.winnings || 0n),
        wagered: Number(stats?.playAmounts || 0n),
      };
    })
    .sort((a, b) => b.wagered - a.wagered);

  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-col gap-0 items-start mt-0 p-4 w-full rounded-xl bg-background-700 ">
        <h2 className="self-stretch my-auto text-lg font-bold text-foreground">
          {t("statistic")}
        </h2>
        {statisticsData.map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value} />
        ))}
      </div>
      <div className="flex flex-col mt-4 w-full">
        <h2 className="text-lg font-bold text-foreground">
          {t("top_play_games")}
        </h2>
        <div className="flex flex-row max-md:flex-col gap-2 items-start mt-4 w-full text-sm leading-6 whitespace-nowrap max-w-full">
          {topGames.map((game, index) => (
            <GameCard
              key={index}
              chainId={game.chainId!}
              name={game.name}
              image={game.image}
              winnings={game.winnings}
              wagered={game.wagered}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistic;
