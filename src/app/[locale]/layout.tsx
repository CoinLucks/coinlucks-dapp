import type { Locale } from "@rainbow-me/rainbowkit";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type ReactNode } from "react";

import "@rainbow-me/rainbowkit/styles.css";
import PageFirstLoading from "@/components/Loading/PageFirstLoading";
import { SUPPORTED_LOCALES } from "@/constants/locale";

import { Providers } from "./providers";
import "@/styles/globals.scss";


export const metadata = async (): Promise<Metadata> => {
  const t = await getTranslations("site")
  return {
    title: {
      template: "%s",
      default: t("title")
    },
    applicationName: "CoinLucks",
    description: t("description"),
    authors: {
      name: "CoinLucks",
      url: "https://github.com/CoinLucks/coinlucks-webapp",
    },

    icons: "/favicon.ico",
    manifest: "/site.webmanifest",
    openGraph: {
      type: "website",
      url: "https://coinlucks.com",
      title: t("title"),
      description: t("description"),
      siteName: "CoinLucks",
      images: [
        {
          url: `/img/logo.png`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@CoinLucks",
      creator: "@CoinLucks",
      title: {
        template: "%s",
        default: t("title"),
      },
      images: `/img/logo.png`,
    },
  }
};


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout(props: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!SUPPORTED_LOCALES.includes(props.params.locale)) notFound();

  // Using internationalization in Client Components
  const messages = useMessages();

  return (
    <html lang={props.params.locale} suppressHydrationWarning>
      <head><link rel="preload" href="/img/logo-gray.png" as="image" /></head>
      <body>
        <PageFirstLoading />
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          <Providers locale={props.params.locale}>
            {props.children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
