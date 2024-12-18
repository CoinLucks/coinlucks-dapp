'use client';

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  okxWallet,
  binanceWallet,
  oneKeyWallet,
  coinbaseWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
  coin98Wallet
} from "@rainbow-me/rainbowkit/wallets";
import {
  opBNB,
  opBNBTestnet,
  // localhost,
} from "wagmi/chains";

import { AppConfig } from "./config";
import { uxuyWallet } from "./wallets/uxuyWallet";

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!alchemyApiKey || !walletConnectProjectId) {
  throw new Error("Some ENV variables are not defined");
}

const config = getDefaultConfig({
  appName: AppConfig.name,
  appIcon: "/img/logo.svg",
  projectId: walletConnectProjectId,
  // @ts-ignore ignore
  chains: [
    // ...(process.env.NODE_ENV === "production"
    //   ? [{
    //     ...opBNB,
    //     iconUrl: `/img/bnbchain-fill.svg`,

    //   }]
    //   : [
    //     {
    //       ...opBNBTestnet,
    //       iconUrl: `/img/bnbchain-fill.svg`,
    //     },
    //   ]),
    {
      ...opBNBTestnet,
      iconUrl: `/img/bnbchain-fill.svg`,
    }
    // {
    //   ...localhost,
    //   rpcUrls: {
    //     default: {
    //       http: ["http://192.168.31.47:8545"],
    //     },
    //   },
    //   blockExplorers: {
    //     default: {
    //       name: "localhost",
    //       url: "http://192.168.31.47",
    //     },
    //   },
    //   id: 1337,
    //   nativeCurrency: {
    //     name: "ETH",
    //     symbol: "ETH",
    //     decimals: 18,
    //   },
    //   testnet: true,
    // },
  ],
  wallets: [
    {
      groupName: "Recommended",
      wallets: [uxuyWallet, metaMaskWallet, walletConnectWallet],
    },
    {
      groupName: "More",
      wallets: [
        okxWallet,
        binanceWallet,
        oneKeyWallet,
        ledgerWallet,
        coinbaseWallet,
        trustWallet,
        coin98Wallet
      ],
    },
  ],
  ssr: true,
});

const { chains } = config;

export { config, chains };
