import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import BigNumber from "bignumber.js";
import React, { useState } from "react";

import { ChainCoinIcon } from "@/components/Chains";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { cn } from "@/utils/cn";

const BetAmountOptions = ({
  minBet,
  maxBet,
  setAmount,
}: {
  minBet: BigNumber;
  maxBet: BigNumber;
  setAmount?: any;
}) => {
  const { chainId } = useBetGameBasicContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const priceOpts1 = [1, 5, 10, 25, 50, 100];
  const priceOpts2 = [
    200,
    300,
    400,
    500,
    750,
    maxBet.dividedBy(minBet).toNumber(),
  ];

  const getPriceOpts = (opts: number[]) =>
    opts.map((it) => ({
      id: `p${it}`,
      recommend: it == 20,
      amount: minBet.multipliedBy(it),
    }));

  const isOpts2 = maxBet.dividedBy(minBet).gte(200);

  return (
    <div className="flex flex-wrap gap-1 items-center relative">
      {getPriceOpts(priceOpts1).map((x: any, index: number) => (
        <Button
          className={cn("w-[30%] max-md:w-[32%]", [{ hidden: isExpanded }])}
          size="md"
          key={x.id}
          onClick={() => {
            setAmount(`${x.amount}`);
          }}
          startContent={
            <ChainCoinIcon
              chainId={chainId}
              size={{ width: "18px", height: "18px" }}
            />
          }
        >
          {x.amount.toString()}
        </Button>
      ))}
      {isOpts2 &&
        getPriceOpts(priceOpts2).map((x: any, index: number) => (
          <Button
            className={cn("w-[30%] max-md:w-[32%]", [{ hidden: !isExpanded }])}
            size="md"
            key={x.id}
            onClick={() => {
              setAmount(`${x.amount}`);
            }}
            startContent={
              <ChainCoinIcon
                chainId={chainId}
                size={{ width: "16px", height: "16px" }}
              />
            }
          >
            {x.amount.toString()}
          </Button>
        ))}
      <Button
        size="sm"
        variant="light"
        isIconOnly={true}
        className={cn("absolute left-[-12px] z-10", [{ hidden: !isExpanded }])}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          className="text-foreground-600 rounded-full"
          height={24}
          icon="iconoir:page-left"
          width={24}
        />
      </Button>
      <Button
        size="sm"
        variant="light"
        isIconOnly={true}
        className={cn("absolute right-3 max-md:right-[-12px] z-10", [
          { hidden: isExpanded || !isOpts2},
        ])}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          className="text-foreground-600 rounded-full"
          height={24}
          icon="iconoir:page-right"
          width={24}
        />
      </Button>
    </div>
  );
};

export default BetAmountOptions;
