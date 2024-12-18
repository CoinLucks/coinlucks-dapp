"use client";

import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

import { AppConfig } from "@/config";
import { GameLogo } from "@/constants/contracts/gameLogo";
import { instantGames } from "@/constants/contracts/instantGames";
import { useRoutePreloader } from "@/context/RouteContext";

import BetGameCardFull from "../_Games/BetGame/Common/BetGameCardFull";

import Caption from "./Caption";

const HotInstants = () => {
  const chainId = AppConfig.defaultChainId;
  const games = instantGames(chainId);
  const urls = games.flatMap((it) => `/games/${it.name.toLocaleLowerCase()}`);
  const { preloadRoutes } = useRoutePreloader();
  useEffect(() => {
    preloadRoutes(urls);
  }, [preloadRoutes]);
  const t = useTranslations("games");

  return (
    <div className="p-0 mb-4">
      <Caption
        title={t("instants")}
        desc={t("instants_desc")}
      />
      <div className="flex flex-row max-md:flex-col mt-3 w-full gap-4 max-md:gap-3">
        {games.map((it, index) => (
          <BetGameCardFull
            key={index}
            game={it}
            url={`/games/${it.name.toLocaleLowerCase()}`}
            image={GameLogo[it.name]}
          />
        ))}
      </div>
    </div>
  );
};

export default HotInstants;
