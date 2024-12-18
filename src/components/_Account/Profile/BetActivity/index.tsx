"use client";

import { isEmpty } from "lodash";
import React, { useState } from "react";

import { AppConfig } from "@/config/AppConfig";
import { useBetsQuery } from "@/hooks/data/useBetGameQuery";
import { BetQueryOpts } from "@/types/bet";


const BetActivity = ({
  ListTemplate,
  filterOpt,
  reactQueryOptions
}: {
  ListTemplate: any;
  filterOpt?: any;
  reactQueryOptions?: any
}) => {
  const chainId = AppConfig.defaultChainId;
  const [filters] = useState<BetQueryOpts>(
    filterOpt || {
      chainIds: "",
      first: 10,
      orderBy: "createdAt",
      orderDirection: "desc",
    }
  );

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    queryError,
  } = useBetsQuery(filters, reactQueryOptions);

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

export default BetActivity;
