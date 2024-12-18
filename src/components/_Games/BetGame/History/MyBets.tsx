"use client";

import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useAccount } from "wagmi";

import WalletConnector from "@/components/WalletConnector";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useBetsQuery } from "@/hooks/data/useBetGameQuery";
import { BetQueryOpts } from "@/types/bet";

const MyBets = ({ ListTemplate }: { ListTemplate: any }) => {
  const { chainId, gameName } = useBetGameBasicContext();
  const { isConnected, address } = useAccount();
  const [filters] = useState<BetQueryOpts>({
    chainIds: `${chainId}`,
    game: gameName,
    player: address,
    first: 10,
    orderBy: "createdAt",
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

  if (!isConnected) {
    return <WalletConnector />;
  }

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

export default MyBets;
