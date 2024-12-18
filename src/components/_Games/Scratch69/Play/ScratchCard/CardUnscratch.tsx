import React from "react";

import Scratcher from "@/components/Scratcher";
import { BetStats } from "@/types/bet/bet";

import ScratchNumbers from "./ScratchNumbers";

const CardUnscratch = ({ bet }: { bet?: BetStats }) => {
  return (
    <Scratcher
      width={480}
      height={128}
      classNames={{
        container:
          "flex relative flex-row justify-center items-center justify-items-stretch bg-stone-400 bg-opacity-50 w-full",
        scratch: "px-10 py-4 justify-center align-middle",
      }}
      theme={{
        background: "bg-stone-400 bg-opacity-50",
        textColor: "text-white",
        coverImage: "",
        maskColor: "rgba(168, 162, 158, 1)",
      }}
      finishRatio={0.3}
    >
      <ScratchNumbers numbers={bet?.drawNumbers} />
    </Scratcher>
  );
};

export default CardUnscratch;
