import { Icon } from "@iconify/react/dist/iconify.js";
import { Spinner } from "@nextui-org/react";
import React from "react";

const CardError = () => {
  return (
    <div className="flex relative flex-row justify-center items-center justify-items-stretch bg-stone-400 bg-opacity-50 px-10 py-4 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex shrink-0 items-center justify-center mx-auto rounded-full aspect-square h-[96px] max-md:h-[72px]">
        <Icon icon={"eos-icons:timeout"} color="secondary" width={48} />
      </div>
    </div>
  );
};

export default CardError;
