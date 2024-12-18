"use client";


import { NextUIProvider } from "@nextui-org/system";
import {
  DisclaimerComponent,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  type Locale,
} from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode, useState, useEffect } from "react";
import { WagmiProvider } from "wagmi";

// import { useRouter } from "next/navigation";
import { WalletAvatar } from "@/components/Avatar/WalletAvatar";
import { AppConfig } from "@/config";
import MomentConfig from "@/constants/momentjs";
import { AmountDisplayProvider } from "@/context/AmountDisplayContext";
import { AuthProvider } from "@/context/AuthContext";
import { CryptoPriceProvider } from "@/context/CryptoPrice/CryptoPriceProvider";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { RefetchProvider } from "@/context/RefetchContext";
import { RouteProvider } from "@/context/RouteContext";
import { useDidMount } from "@/hooks/useDidMount";
import { useRouter } from "@/libs/i18nNavigation";
import { config } from "@/wagmi";

export function Providers({
  locale,
  children,
}: {
  locale?: Locale;
  children: ReactNode;
}) {
  const router = useRouter();

  const didMount = useDidMount();

  const appInfo = {
    appName: "CoinLucks",
  };

  MomentConfig();

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider
          attribute="class"
          defaultTheme={"light"}
          enableColorScheme={true}
        >
          <RouteProvider>
            <QueryClientProvider client={queryClient}>
              {didMount && (
                <RainbowKitProvider
                  modalSize="compact"
                  appInfo={appInfo}
                  locale={locale}
                  theme={{
                    darkMode: darkTheme(),
                    lightMode: lightTheme(),
                  }}
                  avatar={WalletAvatar}
                  initialChain={AppConfig.defaultChainId}
                >
                  <ReactQueryProvider>
                    <RefetchProvider>
                      <CryptoPriceProvider>
                        <AmountDisplayProvider>
                          <AuthProvider> {children}</AuthProvider>
                        </AmountDisplayProvider>
                      </CryptoPriceProvider>
                    </RefetchProvider>
                  </ReactQueryProvider>
                </RainbowKitProvider>)}
            </QueryClientProvider>
          </RouteProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </WagmiProvider>
  );
}
