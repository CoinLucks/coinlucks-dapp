import { Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import * as React from "react";

import AppLink from "@/components/AppLink";
import Container from "@/components/Container";
import SocialMedia from "@/components/SocialMedia";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const year = currentYear > 2024 ? `2024-${currentYear}` : `${currentYear}`;

  const t = useTranslations("menu");
  const tGame = useTranslations("games");
  return (
    <Container className="bg-background-800">
      <div className="flex gap-5 justify-between pb-4 w-full max-md:pb-0 max-md:flex-wrap max-md:max-w-full">
        <SocialMedia className="flex gap-4 self-start mt-2 max-md:mt-0" />
      </div>
      <Divider className="max-md:hidden" />
      <div className="pb-10 mt-4 max-md:pb-4 max-md:mt-0 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-full">
            <div className="grow max-md:mt-2 max-md:max-w-full">
              <div className="flex gap-5 max-md:gap-0">
                <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-pm text-gray-400 max-md:mt-2">
                    <div className="text-tl max-md:text-pm font-bold text-foreground">
                      {t("games")}
                    </div>
                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="/games/scratch69"
                      >
                        {tGame("Scratch69.name")}
                      </AppLink>
                    </div>
                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="/games/coinflip"
                      >
                        {tGame("CoinFlip.name")}
                      </AppLink>
                    </div>
                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="/games/diceshake"
                      >
                        {tGame("DiceShake.name")}
                      </AppLink>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-pm text-gray-400 max-md:mt-2">
                    <div className="text-tl max-md:text-pm font-bold text-foreground">
                      {t("features")}
                    </div>

                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="/referrals"
                      >
                        {t("referrals")}
                      </AppLink>
                    </div>
                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="/pools"
                      >
                        {t("pools")}
                      </AppLink>
                    </div>
                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="https://docs.coinlucks.com/introduction/featrues"
                      >
                        {t("jackpot")}
                      </AppLink>
                    </div>
                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="https://docs.coinlucks.com/introduction/featrues"
                      >
                        {t("streakBonus")}
                      </AppLink>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col text-pm text-gray-400 max-md:mt-2">
                    <div className="text-tl max-md:text-pm font-bold text-foreground">
                      {t("about")}
                    </div>
                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="https://docs.coinlucks.com/get-started/about"
                      >
                        {t("about")}
                      </AppLink>
                    </div>

                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="https://docs.coinlucks.com/contacts"
                      >
                        {t("contact")}
                      </AppLink>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-pm text-gray-400 max-md:mt-2">
                    <div className="text-tl max-md:text-pm font-bold text-foreground">
                      {t("help")}
                    </div>
                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="https://docs.coinlucks.com"
                      >
                        {t("docs")}
                      </AppLink>
                    </div>
                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="https://docs.coinlucks.com/guides/faq"
                      >
                        {t("faq")}
                      </AppLink>
                    </div>
                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="https://docs.coinlucks.com/learn-more/privicy-policy"
                      >
                        {t("privicy_policy")}
                      </AppLink>
                    </div>
                    <div className="mt-4 max-md:mt-1">
                      <AppLink
                        className="text-pm max-md:text-ps text-foreground-800"
                        href="https://docs.coinlucks.com/learn-more/terms-of-use"
                      >
                        {t("terms_of_use")}
                      </AppLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Divider className="max-md:w-72 self-center opacity-40" />
      <div className="mt-4 text-xs leading-4 text-foreground-800 max-md:max-w-full max-md:text-center">
        Copyright © {year} CoinLucks. All rights reserved
      </div>
    </Container>
  );
};

export default Footer;
