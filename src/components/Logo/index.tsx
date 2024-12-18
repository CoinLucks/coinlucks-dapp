import { Image } from "@nextui-org/react";
import React from "react";

import img from "@/public/img/logo.png";
import { IconSize, IconSvgProps } from "@/types/props";
import { cn } from "@/utils/cn";

export const Logo = (props: IconSvgProps) => {
  return <Image src={img.src} width={props.size || 32} alt="Logo" />;
};

export const LogoText = (className?: any) => {
  return (
    <div className={cn("flex flex-row text-lg uppercase", className)}>
      <span className="font-normal opacity-75">Coin</span>
      <span className="font-bold opacity-90">Lucks</span>
    </div>
  );
};

export const LogoGray = ({
  size,
  className,
}: {
  size?: IconSize;
  className?: any;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 122.94 127.68"
    width={size?.width}
    height={size?.height}
    className={className}
  >
    <path
      fill="#52525B"
      d="M33.44,24.15C63.5,38.36,77.39,30,92.5,19.67L65.26,1.23a7.15,7.15,0,0,0-8,0L3.12,38.18a7.14,7.14,0,0,0,0,11.8L28,66.94l5-3.39C50.46,45.57,50.21,42.83,33.44,24.15Z"
    />
    <path
      fill="#52525B"
      d="M119.8,38.15,97.25,22.88C75.92,37.44,78.46,51.72,89.45,64c-30.06-14.21-46.37-7.34-61.48,3L57.44,87.05a7.13,7.13,0,0,0,8,0L80.82,76.59l39-26.62a7.14,7.14,0,0,0,0-11.82Z"
    />
    <path
      fill="#52525B"
      d="M65.35,102.35a7.15,7.15,0,0,1-8,0L.15,63.33V80.91a12,12,0,0,0,5.19,9.9l52,35.62a7.13,7.13,0,0,0,8.07,0l22.36-15.32,29.6-20.3a12,12,0,0,0,5.18-9.9V63.33Z"
    />
  </svg>
);

export default Logo;
