"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import React from "react";

import { AppConfig } from "@/config";
import { GameLogo } from "@/constants/contracts/gameLogo";
import { instantGames } from "@/constants/contracts/instantGames";
import { Native } from "@/types/token";

import BetGamePoolCard from "../_Games/BetGame/Stake/BetGamePoolCard";
import Caption from "../_Home/Caption";
import AppLink from "../AppLink";

const BetGamePools = () => {
    const t = useTranslations("pool");
    const chainId = AppConfig.defaultChainId;
    const games = instantGames(chainId);
    const token = Native.onChain(chainId);

    return (
        <div className="p-0 mb-4">
            <Caption
                title={t("staking_pool")}
                desc={t("staking_pool_desc", { token: token.symbol })}
                endContent={
                    <AppLink href="https://docs.coinlucks.com/staking" className="absolute right-0 top-0 underline">
                        <span className="max-md:text-pm text-nowrap mr-2">{t("how_it_work")}</span>
                        <Icon icon={"bi:question-circle"} width={18} />
                    </AppLink>
                }
            />
            <div className="flex flex-row max-md:flex-col mt-3 w-full gap-4 max-md:gap-3">
                {games.map((it, index) => (
                    <BetGamePoolCard
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

export default BetGamePools;
