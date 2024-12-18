import React from "react";

const CardRevealed = ({ numbers }: { numbers?: number[] }) => {
  return (
    <div className="flex relative flex-row justify-center items-center justify-items-stretch bg-stone-400 bg-opacity-80 px-10 py-4 w-full max-md:px-5 max-md:max-w-full">
      {numbers?.map((value, index) => (
        <div key={index} className="flex flex-col w-[30%]">
          <div
            className={`flex shrink-0 items-center justify-center mx-auto rounded-full aspect-square bg-zinc-50 bg-opacity-20 h-[96px] w-[96px] max-md:w-[72px] max-md:h-[72px]`}
          >
            <span className="text-4xl font-bold text-white">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardRevealed;
