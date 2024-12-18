import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const changeWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", changeWindowSize);
    return () => window.removeEventListener("resize", changeWindowSize);
  }, []);

  const isMobile = windowSize.width <= 768;
  const isTablet = windowSize.width < 1024 && !isMobile;
  const isDesktop = windowSize.width >= 1280;

  return { ...windowSize, isMobile, isTablet, isDesktop };
};
