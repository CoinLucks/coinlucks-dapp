"use client";

import { Button } from "@nextui-org/react";
import React from "react";

import { useRouter } from "@/libs/i18nNavigation";
import { cn } from "@/utils/cn";

const Caption = ({
  title,
  desc,
  more,
  endContent,
  className,
  textClassName
}: {
  title?: string;
  desc?: string;
  more?: string;
  endContent?: any;
  className?: any;
  textClassName?: any;
}) => {
  const router = useRouter();

  return (
    <div className={cn("flex relative gap-4 justify-between w-full max-md:flex-wrap max-md:max-w-full", className)}>
      <div className="flex-grow-1 text-foreground">
        <span className={cn("text-h6 font-bold", textClassName)}>{title}</span>
        {desc && (
          <div className={"mt-2 justify-start text-pm text-foreground-800"}>
            {desc}
          </div>
        )}
      </div>
      <div className="flex gap-2 max-sm: absolute max-sm: right-0 max-sm: top-0">
        {endContent}
        {more && (
          <Button
            size="sm"
            onPress={() => {
              router.push(more);
            }}
          >
            See All
          </Button>
        )}
      </div>
    </div>
  );
};

export default Caption;
