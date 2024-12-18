"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip, Skeleton } from "@nextui-org/react";

import Tips from "@/components/Tips";

export const ProfileLoading = () => {
  return (
    <div className="flex flex-col p-4 basis-0 w-full rounded-xl bg-background-700">
      <div className="flex gap-2 items-center w-full">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex flex-col gap-2 justify-center self-stretch my-auto">
          <Skeleton className="w-36 h-8 rounded-md" />
          <Skeleton className="w-40 h-6 rounded-md" />
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-4 w-full">
        <Skeleton className="w-full h-8 rounded-md" />
        <Skeleton className="w-full h-8 rounded-md" />
      </div>
      <div className="flex flex-wrap gap-2 pb-1 pt-2 mt-2">
        <Skeleton className="w-1/4 h-8 rounded-md" />
        <Skeleton className="w-1/4 h-8 rounded-md" />
        <Skeleton className="w-1/4 h-8 rounded-md" />
      </div>
    </div>
  );
};

export const StatisticLoading = () => {
  const statisticsData = [
    { label: "Total Wins / Bets" },
    { label: "Total Wagered" },
    { label: "Total Winnings" },
  ];
  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-col gap-0 items-start mt-0 p-4 w-full rounded-xl bg-background-700 ">
        <h2 className="self-stretch my-auto text-lg font-bold text-foreground">
          Statistic
        </h2>
        {statisticsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-row w-full justify-between items-center p-2 border-b border-divider last:border-0"
          >
            <h3 className="text-sm leading-6 text-foreground-600">
              {stat.label}
            </h3>
            <div className="mt-1 text-md font-bold leading-loose text-foreground">
              <Skeleton className="w-36 h-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
