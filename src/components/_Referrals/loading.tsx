"use client";

import { Skeleton } from "@nextui-org/react";

export const SkeletonReferreeItems = (
  <div>
    {Array.from({ length: 4 }, (_, index) => index + 1).map((idx: number) => (
      <div
        key={idx}
        className="flex w-full items-center justify-start border-b border-divider py-2 px-2 gap-2"
      >
        <Skeleton className="w-10 rounded-full">
          <div className="h-10 w-full rounded-full"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-full flex-grow">
          <div className="h-8 w-full rounded-full"></div>
        </Skeleton>
        <Skeleton className="w-1/5 rounded-full">
          <div className="h-8 w-full rounded-full"></div>
        </Skeleton>
      </div>
    ))}
  </div>
);
