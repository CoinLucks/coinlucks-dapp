import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useRef, useState, useEffect } from "react";

import { cn } from "@/utils/cn";

export const ScrollContainer = ({
  className,
  children,
  scrollThreshold = 500,
}: {
  className?: any;
  children: any;
  scrollThreshold?: number;
}) => {
  const containerRef = useRef<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const container: any = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowButton(container.scrollTop > scrollThreshold);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div ref={containerRef} className={cn("scrollContainer", className)}>
      {children}
      {showButton && (
        <Icon
          className="!fixed bottom-20 end-5 rounded-full bg-primary p-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          onClick={scrollToTop}
          icon="cil:arrow-circle-top"
          width={36}
        ></Icon>
      )}
    </div>
  );
};
