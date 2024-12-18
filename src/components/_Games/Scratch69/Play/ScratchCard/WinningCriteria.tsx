import { Divider } from "@nextui-org/react";

const WinningCriteria = () => {
  return (
    <div className="flex flex-col gap-2 max-w-[320px]">
      <span className="font-semibold">Winning Criteria</span>
      <p className="text-xs">Three numbers from 1 to 69.</p>
      <p className="text-xs">(Draw verified by Binance VRF).</p>
      <Divider />
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="font-semibold">Grand Prize</div>
        <div className="text-xs">Three 69s</div>
      </div>
      <Divider />
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="font-semibold">First Prize</div>
        <div className="text-xs">Two 69s</div>
      </div>
      <Divider />
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="font-semibold">Second Prize</div>
        <div className="text-xs">One 69s</div>
      </div>
      <Divider />
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="font-semibold w-1/3">Third Prize</div>
        <div className="text-xs w-2/3 text-end">
          Three numbers start with 6
        </div>
      </div>
      <Divider />
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="font-semibold w-1/3">Fourth Prize</div>
        <div className="text-xs w-2/3 text-end">
          Two numbers end with 9
        </div>
      </div>
      <Divider />
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="font-semibold w-1/3">Fifth Prize</div>
        <div className="text-xs w-2/3 text-end">
          Two numbers start with 6
        </div>
      </div>
      <Divider />
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="font-semibold w-1/3">Sixth Prize</div>
        <div className="text-xs w-2/3 text-end">
          One number ends with 9
        </div>
      </div>
    </div>
  );
};

export default WinningCriteria;
