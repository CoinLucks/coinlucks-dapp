import React from "react";

const CardDefault = () => {
  return (
    <div className="flex relative flex-row justify-center items-center justify-items-stretch px-10 py-4 w-full max-md:px-5 max-md:max-w-full">
      {[1, 2, 3].map((index) => (
        <div key={index} className="flex flex-col w-[30%]">
          <div
            className={`flex shrink-0 items-center justify-center mx-auto rounded-full aspect-square bg-zinc-50 bg-opacity-20 h-[96px] w-[96px] max-md:w-[72px] max-md:h-[72px]`}
          >
            <span className="text-4xl font-bold text-white">69</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardDefault;
