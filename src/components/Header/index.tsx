

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Chip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import AppLink from "@/components/AppLink";
import { Logo } from "@/components/Logo";
import SettingButton from "@/components/Settings/SettingButton";
import WalletConnectButton from "@/components/WalletConnector/WalletConnectButton";
import { AppConfig } from "@/config";
import { isTestnet } from "@/constants/chains";
import { useWindowSize } from "@/hooks";
import { useRouter, usePathname } from "@/libs/i18nNavigation";
import { cn } from "@/utils/cn";

const Header = () => {
  const t = useTranslations("menu");
  const router = useRouter();
  const path = usePathname();
  const { isMobile } = useWindowSize();

  return (
    <div className="flex gap-5 max-md:p-2 max-md:border-b max-md:border-divider justify-between w-full">
      <div className="flex gap-0 max-md:gap-2">
        <AppLink href="/" className={cn("hidden max-md:flex items-center gap-2 px-0", {})}>
          <div className="flex h-8 w-8 items-center justify-center">
            <Logo size={32} className="text-background" />
          </div>

          <div className={cn("flex flex-row text-lg relative uppercase", {})}>
            <span className="font-normal opacity-75">Coin</span>
            <span className="font-bold opacity-90">Lucks</span>
            {isTestnet(AppConfig.defaultChainId) && <div className="absolute normal-case top-[-8px] right-0 h-3 text-start leading-3 text-[8px] bg-warning rounded-md py-0 px-2">Testnet</div>}
          </div>
        </AppLink>

        {path != "/" && !isMobile && (
          <Button
            onClick={() => {
              //length > 2, cuz i18n redirect
              if (window.history?.length && window.history.length > 2) {
                router.back();
              } else {
                router.push("/");
              }
            }}
            variant="light"
            startContent={<Icon icon="ep:back" height={18} />}
          >
            Go Back
          </Button>
        )}
      </div>
      <div className="flex gap-2 pr-2">
        <div className="flex gap-5 justify-between my-auto">
          <WalletConnectButton />
        </div>
        <SettingButton />
      </div>
    </div>
  );
};

export default Header;
