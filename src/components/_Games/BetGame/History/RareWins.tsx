"use client";

import { isEmpty } from "lodash";
import React, { useState } from "react";

import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useBetsQuery } from "@/hooks/data/useBetGameQuery";
import { BetQueryOpts, BetStatus } from "@/types/bet";

const RareWins = ({ ListTemplate }: { ListTemplate: any }) => {
  const { chainId, gameName } = useBetGameBasicContext();
  const [filters] = useState<BetQueryOpts>({
    chainIds: `${chainId}`,
    game: gameName,
    betStatus: BetStatus.Won,
    first: 10,
    orderBy: "multiplier",
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
  } = useBetsQuery(filters);

  const items = data?.pages
    .flatMap((it: any) => it.data)
    .filter((it: any) => !isEmpty(it))
    .sort((a: any, b: any) => a.status - b.status);

  return (
    <ListTemplate
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

export default RareWins;
