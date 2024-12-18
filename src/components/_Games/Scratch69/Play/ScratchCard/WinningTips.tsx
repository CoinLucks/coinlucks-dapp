import { Divider } from "@nextui-org/react";

import Tips from "@/components/Tips";
import { useWindowSize } from "@/hooks";

import WinningCriteria from "./WinningCriteria";
import WinningPrizes from "./WinningPrizes";

const WinningTips = () => {
  const { isMobile } = useWindowSize();

  if (isMobile) {
    return (
      <div className="flex flex-row gap-3 text-sm text-foreground-800 w-full px-4 max-md:pb-4">
        <Tips
          text={<WinningPrizes />}
          startContent={<span className="font-semibold">Winning Prizes</span>}
        />
        <Tips
          text={<WinningCriteria />}
          startContent={<span className="font-semibold">Winning Criteria</span>}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 text-sm text-foreground-800 min-w-[265px] w-full px-4 max-md:pb-4">
      <Tips
        text={<WinningCriteria />}
        startContent={
          <span className="font-semibold">Winning Prizes & Criteria</span>
        }
      />
      <Divider />
      <WinningPrizes />
    </div>
  );
};

export default WinningTips;
