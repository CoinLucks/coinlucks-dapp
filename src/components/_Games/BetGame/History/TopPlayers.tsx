"use client";

import { isEmpty } from "lodash";
import React, { useState } from "react";

import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useBetPlayersQuery } from "@/hooks/data/useBetGameQuery";
import { BetPlayerQueryOpts } from "@/types/bet";

import TopPlayerList from "./TopPlayerList";

const TopPlayers = () => {
  const { chainId, gameName } = useBetGameBasicContext();
  const [filters] = useState<BetPlayerQueryOpts>({
    chainIds: `${chainId}`,
    game: gameName,
    first: 10,
    orderBy: "payouts",
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
  } = useBetPlayersQuery(filters);

  const items = data?.pages
    .flatMap((it: any) => it.data)
    .filter((it: any) => !isEmpty(it))
    .sort((a: any, b: any) => a.status - b.status);

  return (
    <TopPlayerList
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
};

export default TopPlayers;
