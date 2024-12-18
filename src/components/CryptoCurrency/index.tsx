import React from "react";

import { useCryptoPrice } from "@/context/CryptoPrice/useCryptoPrice";
import { IconSize } from "@/types/props";
import { cn } from "@/utils/cn";

import { ETHCoin, PolygonLogo, AvaxLogo, BNBCoinIcon } from "../Chains";

export const money = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  maximumSignificantDigits: 2,
  maximumFractionDigits: 2,
});

const CryptoCurrency = ({
  token,
  showSuffix = true,
  showIcon = false,
  display = "USD",
  value,
  className,
  startContent,
  endContent,
  iconSize,
}: {
  token: string;
  showSuffix?: boolean;
  showIcon?: boolean;
  display?: "Crypto" | "USD";
  value?: any;
  className?: any;
  startContent?: any;
  endContent?: any;
  iconSize?: IconSize;
}) => {
  if (token == "Ether") {
    token = "ETH";
  }
  const { data } = useCryptoPrice();

  let num, lable, icon;
  let price = data?.find((it: any) => it.name == token);

  if (["USDT", "USDC"].includes(token)) {
    price = { name: token, price: 1 };
  }

  if (display == "USD" && price) {
    num = Number(value) * Number(price?.price);
    lable = <span>{money.format(num)}</span>;
  } else {
    lable = (
      <span className="text-nowrap">
        {value} {showSuffix ? token : ""}
      </span>
    );
  }

  if (showIcon) {
    icon = getIcon(token, iconSize);
  }

  return (
    <div className={cn("flex flex-row items-center gap-1", className)}>
      {startContent}
      {icon}
      {lable}
      {endContent}
    </div>
  );
};

export const getIcon = (name: string, iconSize?: IconSize) => {
  let icon;
  switch (name) {
    case "ETH":
    case "Ether":
      icon = <ETHCoin size={iconSize} />;
      break;
    case "BNB":
    case "tBNB":
      icon = <BNBCoinIcon size={iconSize} />;
      break;
    case "MATIC":
      icon = <PolygonLogo size={iconSize} />;
      break;
    case "AVAX":
      icon = <AvaxLogo size={iconSize} />;
      break;
  }
  return icon;
};

export default CryptoCurrency;
