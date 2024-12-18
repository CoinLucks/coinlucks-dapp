"use client";

import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

const LoadMore = ({ hasNextPage, isFetchingNextPage, fetchNextPage }: { hasNextPage: boolean, isFetchingNextPage: boolean, fetchNextPage: any }) => {
    const t = useTranslations("common");
    if (!hasNextPage) return <></>;
    return (
        <div className="flex items-end justify-center">
            <Button
                size="sm"
                radius="full"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
            >
                {isFetchingNextPage ? t("loading_more") : t("load_more")}
            </Button>
        </div>
    );
};

export default LoadMore;
