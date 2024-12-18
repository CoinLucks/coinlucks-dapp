"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Tabs, Tab, Spacer, Chip, Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import Container from "@/components/Container";
import { useRouter, usePathname } from "@/libs/i18nNavigation";
import LogoSvg from "@/public/img/logo.svg";

import { BNBCoinIcon } from "../Chains";

import ReferralsIntro from "./Intro";
import Leaderboard from "./Leaderboard";
import ReferralRecords from "./ReferralRecords";
import ReferralStatistic from "./ReferralStatistic";

const ReferralsPage = () => {
  const t = useTranslations("referral");
  const path = usePathname();
  const query = useSearchParams();
  const activeTab = query.get("tab") ?? "all";
  const router = useRouter();
  const handleTabClick = (key: any) => {
    const tab = key == "all" ? "" : `?tab=${key}`;
    router.push(`${path}${tab}`);
  };

  return (
    <Container>
      <div className="flex flex-row">
        <div className="flex-col text-left md:max-w-[65%] text-wrap">
          <h1 className="text-3xl max-md:text-2xl md:text-7xl font-bold tracking-tight">
            {t.rich("title", { span: (children) => <span className="text-warning">{children}</span> })}
          </h1>
          <Spacer y={2} />
          <h2 className="text-pl max-md:text-sm text-foreground-800 text-wrap">
            {t("sub_title")}
          </h2>
          <Spacer y={2} />
          <div className="flex gap-2 items-center justify-start flex-wrap">
            <Chip size="sm" radius='sm' color="default" variant="solid">
              {t("instanct_payout")}
            </Chip>
            <Chip size="sm" radius='sm' color="default" variant="solid">
              {t("two_tier_reward")}
            </Chip>
            <Chip size="sm" radius='sm' color="default" variant="solid">
              {t("commission_rate")}
            </Chip>
          </div>
        </div>
        <Spacer y={4} />
        <div className="flex justify-start relative">
          <BNBCoinIcon className="animate-pulse" size={{ width: '140', height: '140' }} />
          <LogoSvg
            className="max-xl:hidden absolute left-[80%] top-2 rotate-45 z-0"
            width={120}
          />
        </div>
      </div>
      <Spacer y={8} />
      <div className="relative">
        <Button variant="light" size="md" className="absolute right-[-12px] top-0 underline gap-1">
          <span className="max-md:text-ps">{t("how_to_invite")}</span>
          <Icon icon={"bi:question-circle"} width={18} />
        </Button>
        <Tabs
          size="lg"
          aria-label="Options"
          selectedKey={activeTab}
          onSelectionChange={handleTabClick}
          classNames={{
            cursor: "whitespace-nowrap rounded-xl bg-gradient-yellow",
          }}
        >
          <Tab key="all" title={t("tab_refer")}>
            <ReferralsIntro />
            <ReferralStatistic />
            <ReferralRecords />
          </Tab>
          <Tab key="leaderboard" title={t("tab_leaderboard")}>
            <Leaderboard />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default ReferralsPage;
