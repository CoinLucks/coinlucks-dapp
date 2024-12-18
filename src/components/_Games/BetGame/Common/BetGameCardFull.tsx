"use client";

import { Button, cn } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
import { formatEther } from "viem/utils";

import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import CryptoCurrency from "@/components/CryptoCurrency";
import { ContractNames } from "@/constants/contracts/names";
import useBetGameStats from "@/hooks/game/useBetGameStats";
import { useRouter } from "@/libs/i18nNavigation";
import { BetGame } from "@/types/bet/bet";
import { Native } from "@/types/token/native";

const BetGameCardFull = ({
  game,
  url,
  image,
  className,
  tags,
}: {
  game: BetGame;
  url: string;
  image?: string;
  className?: any;
  tags?: any;
}) => {
  const router = useRouter();
  const { gameStats } = useBetGameStats(
    game.chainId,
    ContractNames[game.name as keyof typeof ContractNames]
  );
  const t = useTranslations("games");
  const t2 = useTranslations("form");
  return (
    <div
      className={cn(
        `w-full flex flex-col relative p-2 rounded-2xl border border-divider bg-background-700 shadow-lg`,
        className
      )}
    >
      <AppLink
        className="w-full flex flex-row flex-grow m-0 border-0 text-foreground"
        href={url}
      >
        <div className="flex flex-col h-full rounded-xl relative overflow-hidden">
          <AppImage
            className={"w-full relative h-auto object-cover p-0"}
            classNames={{
              box: "flex max-w-28 items-center justify-center",
            }}
            src={image}
            alt={game.name}
          />
        </div>
        {tags && <div className="z-10 absolute right-0 top-0">{tags}</div>}
        <div className="flex text-pm p-2 pl-4 flex-grow flex-col items-start justify-items-start">
          <div className="text-lg font-semibold">{t(`${game.name}.name`)}</div>
          {game.desc && (
            <span className="w-full text-foreground-800">{t.rich(`${game.name}.desc`, { strong: (children) => <strong>{children}</strong> })}</span>
          )}
          {/* <CryptoCurrency
            className="flex flex-row w-full font-semibold"
            token={Native.onChain(game.chainId).symbol}
            value={formatEther(gameStats.gamePool ?? 0n)}
            display="USD"
            showSuffix={false}
            showIcon={false}
            iconSize={{ width: "18px", height: "18px" }}
            startContent={<span className="flex-grow">Pool:</span>}
          /> */}
          <CryptoCurrency
            className="flex flex-row w-full font-semibold mt-1"
            token={Native.onChain(game.chainId).symbol}
            value={formatEther(gameStats.jackpotPool ?? 0n)}
            display="USD"
            showSuffix={false}
            showIcon={false}
            iconSize={{ width: "18px", height: "18px" }}
            startContent={<span className="flex-grow">{t("jackpot")}:</span>}
          />
        </div>
      </AppLink>

      <Button
        className="w-full mt-2 hidden"
        color="primary"
        onPress={() => {
          router.push(url);
        }}
      >
        {t2("btn_play")}
      </Button>
    </div>
  );
};

export default BetGameCardFull;
