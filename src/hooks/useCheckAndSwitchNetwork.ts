import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useSwitchChain, useConnections, useConnect } from "wagmi";

import { LogoUrl } from "@/components/Logo/LogoUrl";
import { findChain } from "@/utils/address";

export const useCheckAndSwitchNetwork = (chainId: number) => {

  const { isConnected, chainId: selectedChainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const connections = useConnections()

  const checkAndSwithNetwork = (e: any) => {

    // check network connection
    if (isConnected == false) {
      openConnectModal && openConnectModal();
      return false;
    }
    // check connected network
    if (chainId != selectedChainId) {
      switchChain(
        { chainId: chainId! },
        {
          onSuccess: () => {
            if (e && e.target) {
              setTimeout(() => {
                // reinvoke
                e.target.click();
              }, 100);
            }
          },
          onError: async (error: any) => {

            if (error.code == 4902) {

              try {
                const connector: any = await connections[0].connector.getProvider();
                const chain = findChain(chainId);
                await connector.request({
                  "method": "wallet_addEthereumChain",
                  "params": [
                    {
                      "chainId": chainId,
                      "chainName": chain?.name,
                      "rpcUrls": chain?.rpcUrls.default.http,
                      "nativeCurrency": chain?.nativeCurrency,
                      "blockExplorerUrls": [chain?.blockExplorers?.default.url],
                      "iconUrl": LogoUrl.Chain[chainId],
                    }
                  ],
                });
              } catch (ex) {
                console.error(ex);
              }

            }
            console.error(`checkAndSwithNetwork to ${chainId} error >`, error);
          }

        }
      );
      return false;
    }

    return true;
  };

  return { checkAndSwithNetwork };
};
