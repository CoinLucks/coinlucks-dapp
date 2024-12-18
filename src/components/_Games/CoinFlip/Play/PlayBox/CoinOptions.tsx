import { Chip, Image } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import coinEdgeImg from "@/public/img/game/coin-edge.png";
import coinHeadImg from "@/public/img/game/coin-head.png";
import coinTailImg from "@/public/img/game/coin-tail.png";
import { FlipBetType, FlipBetTypeName } from "@/types/bet/bet";
import { cn } from "@/utils/cn";

import { calculateChance, calculateMultiplier } from "../../utils";



const CoinOptions = ({
  selected,
  setSelected,
}: {
  selected?: FlipBetType;
  setSelected?: any;
}) => {
  const images = [coinHeadImg, coinTailImg, coinEdgeImg];
  const t = useTranslations("games");
  return (
    <div className="flex relative flex-col gap-3 justify-center items-center justify-items-stretch px-10 w-full max-md:px-4 max-md:max-w-full">
      <div className="flex flex-row w-full">
        {[1, 2, 3].map((value, index) => (
          <div
            key={value}
            className={cn(
              `flex flex-col p-6 shrink-0 items-center justify-center mx-auto rounded-full aspect-square bg-background-700 bg-opacity-50 h-[108px] w-[108px] max-md:w-[96px] max-md:h-[96px]`,
              { "bg-gradient-blue": index == selected }
            )}
            onClick={() => {
              setSelected && setSelected(index);
            }}
          >
            <Image src={images[index].src} className={"w-20"} />
            <span
              className={cn("text-sm mt-1", {
                "text-white": index == selected,
              })}
            >
              {t(`CoinFlip.option.${FlipBetTypeName(index)}`)}
            </span>
          </div>
        ))}
      </div>
      {selected != undefined && (
        <div className="flex flex-row gap-2">
          <Chip size="md" variant="shadow" color="primary">
            <span className="font-semibold">
              {calculateMultiplier(selected)}x
            </span>
            <span className="ml-2 text-xs">{t("list.title_payout")}</span>
          </Chip>
          <Chip size="md" variant="shadow">
            <span className="font-semibold">{calculateChance(selected)}%</span>
            <span className="text-xs ml-1">{t("list.title_chance")}</span>
          </Chip>
        </div>
      )}
    </div>
  );
};

export default CoinOptions;
