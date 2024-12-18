"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { MenuItem } from "@/components/Menu";
import { usePathname, useRouter } from "@/libs/i18nNavigation";

const NavTabs = () => {
  const pathname = usePathname();
  const currentPath = pathname.split("/")?.[1];
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(currentPath);
  const t = useTranslations("menu");

  const handleTabClick = (key: any) => {
    setActiveTab(key);
    router.push(`/${key}`);
  };

  return (
    <Tabs
      size="lg"
      aria-label="Options"
      selectedKey={activeTab}
      onSelectionChange={handleTabClick}
      classNames={{
        tabList: "gap-3 self-start px-5 pl-0 bg-transparent",
        cursor: "whitespace-nowrap rounded-xl bg-gradient-yellow",
        tab: "justify-center px-5 py-5 bg-background-600 rounded-xl",
        tabContent: "!text-pm font-bold text-white",
      }}
    >
      <Tab key="games" title="All"></Tab>
      {MenuItem("games")?.items?.map((it) => {
        return <Tab key={it.key} title={t(it.title)}></Tab>;
      })}
    </Tabs>
  );
};

export default NavTabs;
