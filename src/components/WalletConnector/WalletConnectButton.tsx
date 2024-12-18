import {
  ConnectButton,
  DisclaimerComponent,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import React from "react";

import { WalletAvatar } from "@/components/Avatar/WalletAvatar";

const WalletConnectButton = ({ label }: { label?: string }) => {
  const t = useTranslations("settings");
  const { theme } = useTheme();

  return (
    <>
      <RainbowKitProvider
        modalSize="compact"
        theme={theme == "dark" ? darkTheme() : lightTheme()}
        avatar={WalletAvatar}
      >
        <ConnectButton
          chainStatus={{
            smallScreen: "icon",
            largeScreen: "full",
          }}
          accountStatus={{
            smallScreen: "full",
            largeScreen: "full",
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: false,
          }}
          label={label || t("connect_button")}
        />
      </RainbowKitProvider>
    </>
  );
};

export default WalletConnectButton;
