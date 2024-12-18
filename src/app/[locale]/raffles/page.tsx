"use client";

import { useTranslations } from "next-intl";

import Container from "@/components/Container";
import Layout from "@/components/Layout";

export default function Raffles() {
    const t = useTranslations("common");
    return <Layout back={true}>
        <Container>
            <div className="rounded-xl bg-background-700 mt-0 p-2 py-10 text-center">
                {t("coming_soon")}
            </div>
        </Container>
    </Layout>;
}
