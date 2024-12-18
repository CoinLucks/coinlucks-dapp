"use client";

import { Spacer } from "@nextui-org/react";
import React from "react";

import { DarkModeButton } from "@/components/DarkModeButton";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import SocialMedia from "@/components/SocialMedia";

export const SettingItems = () => {
  return (
    <div className={"flex flex-col py-4 gap-2 w-full"}>
      {/* Language Settings */}
      <div className={`flex flex-row items-center border-b border-divider`}>
        <h3 className="font-semibold flex-grow">Language</h3>
        <div className="flex justify-between items-center">
          <LocaleSwitcher isCompact={false} />
        </div>
      </div>
      {/* Theme Settings */}
      <div
        className={`flex flex-row pb-2 border-b border-divider items-center`}
      >
        <h3 className="font-semibold flex-grow">Theme</h3>
        <div className="flex justify-between items-center">
          <DarkModeButton showLabel={true} />
        </div>
      </div>

      <div className={`flex flex-row items-center`}>
        <h3 className="flex-grow">Contact</h3>
        <div className="flex justify-between items-center">
          <SocialMedia className="flex gap-4 self-start mt-2" />
        </div>
      </div>
    </div>
  );
};
