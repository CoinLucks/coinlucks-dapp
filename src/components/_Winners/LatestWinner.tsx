"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { AppConfig } from "@/config/AppConfig";
import { BetStatus } from "@/types/bet";

import BetActivity from "../_Account/Profile/BetActivity";
import BetHistoryList from "../_Account/Profile/BetActivity/BetHistoryList";
import Caption from "../_Home/Caption";

const LatestWinner = () => {
  const chainId = AppConfig.defaultChainId;
  const t = useTranslations("games");
  return (
    <div className="bg-background-700 rounded-lg shadow-md p-4 max-md:p-2 mb-4">
      <Caption title={t("list.latest_winner")}
        className={"p-2 pb-0"}
        textClassName={"max-md:text-lg"} />
      <BetActivity
        ListTemplate={BetHistoryList}
        filterOpt={{
          chainIds: chainId,
          first: 10,
          betStatus: BetStatus.Won,
          orderBy: "createdAt",
          orderDirection: "desc",
        }}
        reactQueryOptions={{ refetchInterval: 5000 }}
      />
    </div>
  );
};

export default LatestWinner;
