import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

const Container = ({
  className,
  children,
}: {
  className?: any;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center px-16 pt-5 pb-5 max-md:px-5 max-md:max-w-full",
        className
      )}
    >
          <div className="flex flex-col w-full max-w-[1176px] max-md:max-w-full">
        {children}
      </div>
    </div>
  );
};

export default Container;
