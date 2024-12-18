import { cn } from "@/utils/cn";

const WinningPrizes = ({ className }: { className?: any }) => {
  return (
    <div className={cn("flex flex-col gap-3 max-md:min-w-[280px]", className)}>
      <div className="flex flex-row items-center justify-between">
        <div className="font-semibold">Grand Prize</div>
        <div className="flex flex-row gap-1 items-center text-xs">
          <span>10000x</span>
          <span>+ 30% jackpot</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="font-semibold">First Prize</div>
        <div className="flex flex-row gap-1 items-center text-xs">
          <span>5000x</span>
          <span>+ 15% jackpot</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="font-semibold">Second Prize</div>
        <div className="flex flex-row gap-1 items-center text-xs">
          <span>200x</span>
          <span>+ 7.5% jackpot</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="font-semibold">Third Prize</div>
        <div className="text-xs">20x</div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="font-semibold">Fourth Prize</div>
        <div className="text-xs">5x</div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="font-semibold">Fifth Prize</div>
        <div className="text-xs">2x</div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="font-semibold">Sixth Prize</div>
        <div className="text-xs">1.5x</div>
      </div>
    </div>
  );
};

export default WinningPrizes;
