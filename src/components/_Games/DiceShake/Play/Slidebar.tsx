import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Chip, Slider } from "@nextui-org/react";
import React from "react";

import Tips from "@/components/Tips";
import { cn } from "@/utils/cn";

import { calculateChance, calculateMultiplier } from "../utils";

const Slidebar = ({
  betOption,
  setBetOption,
}: {
  betOption: number[];
  setBetOption: any;
}) => {
  const invertSelection = () => {
    // 1~50, 90~100
    if (betOption[0] > 1) {
      const end = betOption[0] - 1;
      const start = end - 70 > 1 ? end - 70 : 1;
      setBetOption([start, end]);
    } else {
      const start = betOption[1] + 1;
      const end = start + 70 < 100 ? start + 70 : 100;
      setBetOption([start, end]);
    }
  };
  return (
    <Slider
      size="md"
      label={
        <Tips
          startContent="Select Range"
          text={
            <div>
              <p>Number from 1 to 100.</p>
              <p>Maximum range is 70s.</p>
              <p>(1-70,31-100,70-99 .etc).</p>
            </div>
          }
        />
      }
      minValue={1}
      maxValue={100}
      hideValue={true}
      step={1}
      defaultValue={[51, 100]}
      value={betOption}
      onChange={(v: any) => {
        if (v[1] - v[0] >= 29 && v[1] - v[0] < 70) {
          setBetOption(v);
        }
      }}
      classNames={{
        base: "mt-4 w-full gap-3",
        filler:
          "bg-gradient-to-r from-pink-300 to-cyan-300 dark:from-pink-600 dark:to-cyan-800",
      }}
      endContent={
        <Button
          size="sm"
          variant="flat"
          isIconOnly={true}
          radius="full"
          startContent={<Icon icon={"octicon:arrow-switch-16"} width={20} />}
          onClick={invertSelection}
        ></Button>
      }
      renderThumb={({ index, ...props }) => (
        <div
          {...props}
          className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
        >
          <span
            className={cn(
              "transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
              index === 0
                ? "from-pink-200 to-pink-500 dark:from-pink-400 dark:to-pink-600" // first thumb
                : "from-cyan-200 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800" // second thumb
            )}
          />
        </div>
      )}
      renderValue={({ ...props }) => (
        <div className="flex flex-row gap-2">
          <Chip size="md" variant="shadow" color="primary">
            <span className="font-semibold">
              x{calculateMultiplier(betOption[0], betOption[1])}
            </span>
          </Chip>
          <Chip size="md" variant="shadow">
            <span className="font-semibold">
              {calculateChance(betOption[0], betOption[1])}%
            </span>
            <span className="text-xs ml-1">Chance to win</span>
          </Chip>
        </div>
      )}
    />
  );
};

export default Slidebar;
