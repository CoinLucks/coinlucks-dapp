import React from "react";

import LogoSvg from "@/public/img/logo-white.svg";

const Header: React.FC = () => {
  return (
    <div className="flex relative flex-row gap-5 p-5 items-center justify-between w-full text-white whitespace-nowrap">
      <h1 className="text-3xl font-bold">Scratch69</h1>
      <LogoSvg
        className="object-contain shrink-0 mt-1.5 max-w-full aspect-[0.96]"
        width={36}
      />
    </div>
  );
};

export default Header;
