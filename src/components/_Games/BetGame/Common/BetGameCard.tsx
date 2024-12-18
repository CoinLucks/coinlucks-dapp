"use client";

import { cn } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import { BetGame } from "@/types/bet/bet";

// import ChainIcon from "@/components/Chains/ChainIcon";

const BetGameCard = ({
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
  const t = useTranslations("games");
  return (
    <div
      className={cn(
        `w-full max-w-64 max-md:max-w-36 flex flex-col rounded-2xl border border-divider bg-background-700 shadow-md`,
        className
      )}
    >
      <AppLink
        className="w-full flex flex-col flex-grow p-0 m-0 border-0 text-foreground"
        href={url}
      >
        <div className="flex w-full h-full rounded-xl rounded-b-none relative overflow-hidden">
          <AppImage
            className={"w-full relative h-auto object-cover p-0"}
            classNames={{
              box: "flex w-full items-center justify-center",
            }}
            src={image}
            alt={game.name}
          />
          {/* <ChainIcon
            className="z-10 absolute top-1 left-1 w-auto h-auto"
            size={{ width: "22px", height: "22px" }}
            chainId={game.chainId}
          /> */}
        </div>
        {tags && <div className="z-10 absolute right-0 top-0">{tags}</div>}
        <div className="z-10 flex flex-row w-full items-center justify-center py-4 max-md:py-2 bg-background rounded-2xl rounded-t-none mt-[-12px]">
          <span className="text-sm font-semibold">{t(`${game.name}.name`)}</span>
        </div>
      </AppLink>
    </div>
  );
};

export default BetGameCard;
