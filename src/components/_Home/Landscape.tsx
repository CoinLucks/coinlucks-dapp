"use client";

import { Chip, Divider, Spacer } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import LogoSvg from "@/public/img/logo.svg";

import AppLink from "../AppLink";
import { BNBChainIcon } from "../Chains";

const Landscape = () => {
  const t = useTranslations("home");
  return (
    <div className="">
      <div className="flex flex-row">
        <div className="flex-col text-left md:max-w-[65%] text-wrap">
          <h1 className="text-3xl max-md:text-h6 md:text-7xl font-bold tracking-tight">
            {t.rich("title", { span: (children) => <span className='text-warning'>{children}</span> })}
          </h1>
          <Spacer y={2} />
          <h2 className="text-pl max-md:text-sm text-foreground-800 text-wrap">
            {t("sub_title")}
          </h2>
          <Spacer y={2} />
          <div className="flex gap-2 items-center justify-start flex-wrap">
            <Chip size="sm" radius='sm' color="default" variant="solid">
              {t("fairness")}
            </Chip>
            <Chip size="sm" radius='sm' color="default" variant="solid">
              {t("transparency")}
            </Chip>
            <Chip size="sm" radius='sm' color="default" variant="solid">
              {t("trustless")}
            </Chip>
            <Chip size="sm" radius='sm' color="default" variant="solid">
              {t("permissionless")}
            </Chip>
          </div>
        </div>
        <Spacer x={4} className="max-md:hidden" />
        <div className="max-md:hidden flex justify-start relative">
          <LogoSvg className="animate-pulse" width={120} />
          <LogoSvg
            className="max-xl:hidden absolute left-[80%] top-2 rotate-45 z-0"
            width={180}
          />
        </div>
      </div>
      <Spacer y={4} />
      <div className="flex flex-col md:flex-row gap-2 text-pm">
        <div className="flex flex-row gap-3">
          <h2 className="text-foreground-800 text-ps">{t("powered_by")}</h2>
          <AppLink href="https://opbnb.bnbchain.org">
            <Chip
              size="sm"
              color="warning"
              variant="flat"
              startContent={<BNBChainIcon size={{ width: "18", height: "18" }} />}
            >
              opBNB
            </Chip>
          </AppLink>
          <AppLink href="https://oracle.binance.com/docs/vrf/overview">
            <Chip size="sm" color="warning" variant="flat">
              Binance VRF
            </Chip>
          </AppLink>
        </div>
      </div>

      <Spacer y={4} />
      <Divider />
    </div>
  );
};

export default Landscape;
