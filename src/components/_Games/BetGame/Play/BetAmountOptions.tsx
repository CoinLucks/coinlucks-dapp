import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import { useState } from "react";

import { ChainCoinIcon } from "@/components/Chains";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { cn } from "@/utils/cn";

const BetAmountOptions = ({
  options1,
  options2,
  setAmount,
}: {
  options1: number[],
  options2?: number[],
  setAmount?: any;
}) => {
  const { chainId } = useBetGameBasicContext();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-wrap gap-1 items-center relative">
      {options1.map((x: number, index: number) => (
        <Button
          className={cn("w-[30%] max-md:w-[32%]", [{ hidden: isExpanded }])}
          size="md"
          key={`p1${index}`}
          onClick={() => {
            setAmount(`${x}`);
          }}
          startContent={
            <ChainCoinIcon
              chainId={chainId}
              size={{ width: "18px", height: "18px" }}
            />
          }
        >
          {x.toString()}
        </Button>
      ))}
      {options2 &&
        options2.map((x: number, index: number) => (
          <Button
            className={cn("w-[30%] max-md:w-[32%]", [{ hidden: !isExpanded }])}
            size="md"
            key={`p2${index}`}
            onClick={() => {
              setAmount(`${x}`);
            }}
            startContent={
              <ChainCoinIcon
                chainId={chainId}
                size={{ width: "16px", height: "16px" }}
              />
            }
          >
            {x.toString()}
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
          { hidden: isExpanded || !options2 },
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
