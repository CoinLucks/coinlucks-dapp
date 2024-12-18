"use client";

import { useEffect, useState, type ReactNode } from "react";

import { isTelegramWebView } from "@/hooks/useTelegramMiniApp";
import { useWindowSize } from "@/hooks/useWindowSize";

import { TelegramRoot } from "../Telegram/TelegramRoot";

import MobileLayout from "./MobileLayout";
import SidebarLayout from "./SidebarLayout";

const Layout = ({ children, navbar = true, back = false }: {

  children: ReactNode,

  /**
  * Show navbar if true.
  * @default true
  */
  navbar?: boolean

  /**
  * True if it is allowed to go back from this page.
  * @default false
  */
  back?: boolean
}) => {
  const isTelegram = isTelegramWebView();
  const { isMobile } = useWindowSize();

  if (isMobile) {
    return <MobileLayout navbar={navbar} back={back}>{isTelegram && <TelegramRoot />}{children}</MobileLayout>
  }
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default Layout;
