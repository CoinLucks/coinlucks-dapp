'use client';

import { backButton, isMiniAppMounted } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';

import { useRouter } from "@/libs/i18nNavigation";

export function BackButton({ back }: { back?: boolean }) {
    const router = useRouter();

    useEffect(() => {
        if (isMiniAppMounted()) {
            if (back) {
                backButton && backButton.show();
            }
            else {
                backButton && backButton.hide();
            }
        }
    }, [back]);

    useEffect(() => {
        if (isMiniAppMounted()) {
            return backButton && backButton.onClick(() => {
                router.back();
            });
        }
    }, [router]);

    return <></>;
}