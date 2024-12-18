import React from "react";

import { IconSize } from "@/types/props";

import {
  ETHLogo,
  BNBLogo,
  AvaxLogo,
  PolygonLogo,
  DefaultSize,
  ETHCoin,
  BNBCoinIcon,
} from "./Logos";

const ChainIcon = ({
  chainId,
  className,
  size = DefaultSize,
}: {
  chainId?: any;
  className?: any;
  size?: IconSize;
}) => {
  let icon;
  switch (chainId?.toString()) {
    case "1":
    case "4":
    case "1337":
      icon = <ETHLogo size={size} />;
      break;
    case "56":
    case "97":
    case "204":
    case "5611":
      icon = <BNBLogo size={size} />;
      break;
    case "137":
    case "80001":
      icon = <PolygonLogo size={size} />;
      break;
    case "43114":
    case "43113":
      icon = <AvaxLogo size={size} />;
      break;
  }

  return <div className={className}>{icon}</div>;
};

export const ChainCoinIcon = ({
  chainId,
  className,
  size = DefaultSize,
}: {
  chainId?: any;
  className?: any;
  size?: IconSize;
}) => {
  let icon;
  switch (chainId?.toString()) {
    case "1":
    case "4":
    case "1337":
      icon = <ETHCoin size={size} />;
      break;
    case "56":
    case "97":
    case "204":
    case "5611":
      icon = <BNBCoinIcon size={size} />;
      break;
    case "137":
    case "80001":
      icon = <PolygonLogo size={size} />;
      break;
    case "43114":
    case "43113":
      icon = <AvaxLogo size={size} />;
      break;
  }

  return <div className={className}>{icon}</div>;
};

export default ChainIcon;
