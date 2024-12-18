"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { useTranslations } from "next-intl";

import ReferreeRecord from "./ReferreeRecord";
import RewardsRecord from "./RewardsRecord";

const ReferralRecords = () => {
  const t = useTranslations("referral");
  return (
    <div className="rounded-xl bg-background-700 mt-4 p-2 py-2">
      <Tabs
        variant='light'
        size="md"
        aria-label="Options"
        classNames={{
          cursor: "whitespace-nowrap rounded-xl"
        }}
      >
        <Tab key="referred" title={t("friends_referred")} className="py-0">
          <ReferreeRecord />
        </Tab>
        <Tab key="rewards" title={t("lifetime_rewards")} className="py-0">
          <RewardsRecord />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReferralRecords;
