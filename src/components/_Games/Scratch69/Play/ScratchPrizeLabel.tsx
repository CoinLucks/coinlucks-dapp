import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip } from "@nextui-org/react";
import React from "react";

import { ScratchPrize, ScratchPrizeName } from "@/types/bet";

const ScratchPrizeLabel = ({ prize }: { prize?: ScratchPrize }) => {
  if (prize == ScratchPrize.None) {
    return <></>;
  }

  return (
    <Chip
      className="max-w-full"
      radius="sm"
      variant="solid"
      startContent={
        <Icon icon="material-symbols:rewarded-ads-rounded" height={22} />
      }
    >
      {ScratchPrizeName(prize!)}
    </Chip>
  );
};

export default ScratchPrizeLabel;
