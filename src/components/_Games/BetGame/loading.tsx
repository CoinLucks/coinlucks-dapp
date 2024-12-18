"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip, Skeleton } from "@nextui-org/react";

import Tips from "@/components/Tips";

export const StakePoolLoading = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col mt-4 gap-1 p-2 w-full border border-divider rounded-xl">
      <Chip size="md" variant="flat" radius="sm" className="bg-background-600">
        {title}
      </Chip>
      <div className="flex gap-2 items-center my-2 w-full">
        <div className="flex flex-col flex-1 shrink justify-center self-stretch basis-0 min-w-[240px]">
          <div className="text-xl font-semibold leading-snug text-foreground">
            <Skeleton className="w-3/5 h-7 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const StakeInfoLoading = () => {
  return (
    <div className="flex flex-col gap-2 px-1 w-full text-pm">
      <div className="flex flex-row w-full justify-between">
        <span>Staked Amount</span>
        <Skeleton className="w-2/5 rounded-md" />
      </div>
      <div className="flex flex-row w-full justify-between">
        <span>Pending Rewards</span>
        <Skeleton className="w-2/5 rounded-md" />
      </div>
      <div className="flex flex-row w-full justify-between">
        <span>Auto Compound</span>
        <Skeleton className="w-2/5 rounded-md"></Skeleton>
      </div>
      <div className="flex flex-row w-full justify-between">
        <span>Share of Pool</span>
        <Skeleton className="w-2/5 rounded-md" />
      </div>
      <div className="flex flex-row w-full justify-between">
        <span>APR (14 day)</span>
        <Skeleton className="w-2/5 rounded-md" />
      </div>
    </div>
  );
};

export const FeatrueLoading = () => {
  return (
    <div className="flex flex-col justify-start gap-1 items-center w-full rounded-xl pr-4">
      <div className="flex flex-row gap-1 items-center">
        <Icon icon={"flowbite:gift-box-outline"} width={20} />
        <Tips startContent="Jackpot" />
      </div>
      <Skeleton className="w-1/2 h-7 rounded-xl" />
      <Skeleton className="w-1/3 h-6 rounded-xl" />
    </div>
  );
};
