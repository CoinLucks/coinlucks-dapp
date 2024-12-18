import { AppConfig } from "@/config/AppConfig";
import { ChainId } from "@/constants";
import bscTestImg from "@/public/img/bnbchain-fill.svg";
import bscImg from "@/public/img/bnbchain.svg";
import logoImg from "@/public/img/logo.png";

export const LogoUrl = {
    Logo: `${AppConfig.host}${logoImg.src}`,
    Chain: {
        [ChainId.BNB]: `${AppConfig.host}${bscImg.src}`,
        [ChainId.BNB_TESTNET]: `${AppConfig.host}${bscTestImg.src}`
    } as Record<number, string>
}