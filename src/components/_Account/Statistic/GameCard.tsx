import { useTranslations } from "next-intl";
import React from "react";

import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import { money } from "@/components/CryptoCurrency";


interface GameCardProps {
  chainId?: number;
  name: string;
  image: string;
  winnings: number;
  wagered: number;
}

const GameCard: React.FC<GameCardProps> = ({
  chainId,
  name,
  image,
  winnings,
  wagered,
}) => {
  const t = useTranslations("account");
  const tGame = useTranslations("games");
  return (
    <div className="flex flex-row w-full max-md:border-b max-md:border-divider pb-2">
      <AppLink
        className="flex flex-col p-0 m-0 border-0 text-foreground"
        href={`/games/${name.toLocaleLowerCase()}`}
      >
        <AppImage
          className={
            "flex object-contain max-w-24 rounded-xl aspect-square"
          }
          src={image}
          alt={name}
        />
      </AppLink>
      <div className="flex flex-col flex-grow justify-center gap-2 px-4">
        <span className="font-semibold">{tGame(`${name}.name`)}</span>
        <div className="flex flex-row justify-between">
          <div className="text-foreground-500">{t("wagered")}</div>
          <div className="font-bold text-foreground">
            {money.format(wagered)}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-foreground-500">{t("winnings")}</div>
          <div className="font-bold text-foreground">
            {money.format(winnings)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
