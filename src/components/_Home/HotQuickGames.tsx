"use client";

import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

import { AppConfig } from "@/config";
import { GameLogo } from "@/constants/contracts/gameLogo";
import { instantGames } from "@/constants/contracts/instantGames";
import { useRoutePreloader } from "@/context/RouteContext";

import BetGameCard from "../_Games/BetGame/Common/BetGameCard";

import Caption from "./Caption";


const HotQuickGames = () => {
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
      <Caption title={t("quickgame")} textClassName={"max-md:text-lg"} />
      <div className="flex flex-row mt-3 w-full gap-2">
        {games.map((it, index) => (
          <BetGameCard
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

export default HotQuickGames;
