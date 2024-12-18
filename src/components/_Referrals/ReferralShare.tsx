"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import { shareURL, openLink } from '@telegram-apps/sdk';
import { useTranslations } from "next-intl";
import React from "react";

import { AppConfig } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { useNotify } from "@/hooks";
import { isTelegramWebView } from "@/hooks/useTelegramMiniApp";


const ReferralShare = () => {
    const t = useTranslations("share");
    const { notifySuccess } = useNotify();
    const { account } = useAuth();
    const shareLink = `${AppConfig.host}/t/${account?.refCode}`;
    const isTelegram = isTelegramWebView();

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            notifySuccess({
                title: t("copy_link"),
                message: t("copy_success"),
                duration: 3000,
            });
        } catch (err) { }
    };

    const shareText = (tags?: string) => {
        return t("share_text", { tags: tags });
    }

    const shareToTG = () => {
        isTelegram ? (shareURL && shareURL(
            shareLink,
            shareText(),
        )) : window.open(`https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(shareText())}`, "_blanck");
    }

    const shareToX = () => {
        const link = `https://x.com/intent/post?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(shareText("#LUCKS #BNB #Reward #Gaming"))}`;
        isTelegram ? (openLink && openLink(
            link, { tryInstantView: false }
        )) : window.open(link, "_blank");
    }

    return (
        <>
            <Button
                className="bg-gradient-blue font-bold text-white"
                onClick={copyToClipboard}
                endContent={<Icon icon="ph:copy-bold" width={20} />}
            >
                {t("copy_link")}
            </Button>
            <Button
                className=" bg-gradient-gray font-bold text-white"
                onClick={shareToTG}
                endContent={<Icon icon="la:telegram-plane" width={18} />
                }
            >
                {t("share_on")}
            </Button>
            <Button
                className=" bg-gradient-purple font-bold text-white"
                onClick={shareToX}
                endContent={<Icon icon="ri:twitter-x-line" width={18} />
                }>
                {t("share_on")}
            </Button>
        </>
    );
};

export default ReferralShare;
