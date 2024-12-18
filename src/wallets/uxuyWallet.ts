import { Wallet } from "@rainbow-me/rainbowkit";
import type { EIP1193Provider } from "viem";
import { createConnector } from "wagmi";
import { injected } from "wagmi/connectors";

// import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";
import { LogoUrl } from "@/components/Logo/LogoUrl";
import { AppConfig } from "@/config/AppConfig";

//simple wallet use rainbowkit
export const uxuyWallet = ({ walletConnectParameters }: any): Wallet => {
  let provider: unknown | EIP1193Provider;

  return {
    id: "uxuyWallet",
    name: "UXUY Wallet",
    iconUrl: "/img/wallet-uxuy.svg",
    installed: true,
    iconBackground: "#000000",
    createConnector: (walletDetails) => {
      return createConnector((config) => ({
        ...injected({
          shimDisconnect: false
        })(config),
        ...walletDetails,
        getProvider: async () => {
          if (provider) return provider;
          if (typeof window == 'undefined') return provider;
          const { WalletTgSdk } = (await import("@uxuycom/web3-tg-sdk"))
            .default;
          const sdk = new WalletTgSdk({
            // @ts-ignore
            metaData: {
              icon: LogoUrl.Logo,
              name: walletConnectParameters?.metadata?.name || AppConfig.name,
            },
          });
          provider = sdk.ethereum;
          return provider;
        },
      }));
    },
  };
};

// // only use wagmi for wallet connect
// export const uxuyWalletConnector = createConnector( (config) => {
//   const sdk = new WalletTgSdk();
//   return {
//     ...injected({
//       target: () => ({
//         id: "uxuyWallet",
//         name: "UXUY Wallet",
//         iconUrl: "/img/wallet-uxuy.svg",
//         provider: sdk.ethereum as EIP1193Provider,
//       }),
//     })(config),
//   };
// });
