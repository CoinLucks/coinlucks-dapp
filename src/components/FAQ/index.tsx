"use client";

import { Icon } from "@iconify/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

export default function FAQs() {
    const tCaption = useTranslations("menu");
    const t = useTranslations("faqs");
    const faqs = Array.from({ length: 13 }).map((_, i) => ({
        title: t(`q${i}.title`),
        content: t(`q${i}.content`)
    }));
    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
                <h2 className="w-full max-w-3xl bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text px-2 text-center text-3xl font-bold leading-7 tracking-tight text-transparent md:text-5xl">
                    <span className="inline-block">{tCaption("faq")}</span>
                </h2>
                <Accordion
                    fullWidth
                    keepContentMounted
                    itemClasses={{
                        base: "px-0 md:px-2 md:px-6",
                        title: "font-medium",
                        trigger: "py-6 flex-row-reverse",
                        content: "pt-0 pb-6 text-base text-default-500",
                        indicator: "rotate-0 data-[open=true]:-rotate-45",
                    }}
                    items={faqs}
                    selectionMode="multiple"
                >
                    {faqs.map((item, i) => (
                        <AccordionItem
                            key={i}
                            indicator={<Icon className="text-secondary" icon="lucide:plus" width={24} />}
                            title={item.title}
                        >
                            {item.content}
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
