import React from 'react';

const NumberSet: React.FC = () => (
  <div className="flex flex-wrap gap-1 items-start mt-4 w-full text-base font-bold text-center whitespace-nowrap max-md:max-w-full">
    {[62, 62, 62, 62, 62].map((num, index) => (
      <div key={index} className="px-4 py-2 w-16 text-gray-700 rounded-xl bg-background-700 min-h-[40px]">
        {num}
      </div>
    ))}
    <div className="flex flex-col justify-center items-center px-4 py-2 w-16 rounded-xl bg-background-700 min-h-[40px]">
      <div className="bg-clip-text bg-[linear-gradient(84deg,#A070FF_-15.41%,#8873FF_3.43%,#6D75FF_31.27%,#4B76FE_71.52%,#0177FB_108.42%)]">
        51
      </div>
    </div>
  </div>
);

export default NumberSet;