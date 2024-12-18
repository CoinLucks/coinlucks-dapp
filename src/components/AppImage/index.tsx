"use client";

import { Image } from "@nextui-org/image";
import { useTheme } from "next-themes";
import React from "react";

import errorIcon from "@/public/img/error.png";

const AppImage = ({
  className,
  classNames = {
    // box: "flex w-full items-center justify-center",
    wrapper: "!min-w-full !min-h-full",
  },
  src,
  srcDark,
  fallbackSrc,
  alt,
  size,
  isZoomed = true,
  onError,
}: {
  className?: any;
  classNames?: {
    box?: string;
    wrapper?: string;
    image?: string;
  };
  src: any;
  srcDark?: string;
  fallbackSrc?: string;
  alt?: string;
  size?: { width?: string; height?: string };
  isZoomed?: boolean;
  onError?: any;
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme == "dark";
  return (
    <div className={classNames?.box}>
      <Image
        className={classNames.image || className}
        classNames={{
          wrapper: classNames.wrapper,
        }}
        aria-hidden="true"
        style={{ ...size }}
        isZoomed={isZoomed}
        isBlurred
        src={isDarkMode && srcDark ? srcDark : src}
        fallbackSrc={fallbackSrc || errorIcon.src}
        alt={alt ?? ""}
        onError={onError}
      />
    </div>
  );
};

export default AppImage;
