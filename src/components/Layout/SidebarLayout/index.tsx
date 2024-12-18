"use client";

import { Icon } from "@iconify/react";
import { Button, ScrollShadow, Spacer, useDisclosure } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import AppLink from "@/components/AppLink";
import { DarkModeButton } from "@/components/DarkModeButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { Logo } from "@/components/Logo";
import { MenuItem, MenuItems as items } from "@/components/Menu";
import ScrollToTop from "@/components/ScrollToTop";
import { AppConfig } from "@/config";
import { isTestnet } from "@/constants";
import { useWindowSize } from "@/hooks/useWindowSize";
import { usePathname } from "@/libs/i18nNavigation";
import { cn } from "@/utils/cn";

import SidebarDrawer from "./SidebarDrawer";
import Sidebar from "./SidebarNav";



/**
 *  This example requires installing the `usehooks-ts` package:
 * `npm install usehooks-ts`
 *
 * import {useMediaQuery} from "usehooks-ts";
 *
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function SidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  let currentPath = pathname.split("/")?.[1] || "home";
  const currentMenu = MenuItem(currentPath);
  if (currentMenu && currentMenu.key != currentPath) {
    currentPath = currentMenu.key;
  }
  const { isMobile, isTablet, isDesktop } = useWindowSize();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure(); // for mobile
  const [isCollapsed, setIsCollapsed] = React.useState(isTablet); // for tablet
  const isCompact = isCollapsed && !isMobile;

  const onToggle = React.useCallback(() => {
    if (isMobile) {
      onOpen();
    } else {
      setIsCollapsed((prev) => !prev);
    }
  }, [isMobile, isTablet, isDesktop, onOpen]);

  const leftPanel = (
    <div
      className={cn(
        "z-50 flex fixed left-0 top-0 h-dvh flex-col border-divider p-6 px-3 transition-width bg-background-700",
        {
          "min-w-left-nav-lg": !isMobile && !isCompact,
          "w-16 items-center px-2 py-6": isCompact,
          "!border-r-0": !isMobile,
        }
      )}
    >
      <AppLink
        href="/"
        className={cn(
          "flex items-center gap-3 px-3",

          {
            "justify-center gap-0": isCompact,
          }
        )}
      >
        <div className="flex h-8 w-auto items-center justify-center">
          <Logo size={40} className="text-background" />
        </div>
        <div
          className={cn("flex flex-row text-lg relative uppercase", {
            "hidden": isCompact,
          })}
        >
          <span className="font-normal opacity-75">Coin</span>
          <span className="font-bold opacity-90">Lucks</span>
          {isTestnet(AppConfig.defaultChainId) && <div className="absolute normal-case top-[-8px] right-0 h-3 text-start leading-3 text-[8px] bg-warning rounded-md py-0 px-2">Testnet</div>}
        </div>
      </AppLink>
      <ScrollShadow className="-mr-6 h-full max-h-full pt-2 pb-6 pl-1 pr-6">
        <Sidebar
          defaultSelectedKey="home"
          selectedKeys={[currentPath]}
          isCompact={isCompact}
          showNest={false}
          items={items()}
          onAction={() => {
            if (isMobile) {
              onClose();
            }
          }}
        />
      </ScrollShadow>
      <Spacer y={2} />
      <div
        className={cn("mt-auto flex flex-col", {
          "items-center": isCompact,
        })}
      >
        <LocaleSwitcher isCompact={isCompact} />
        <div>
          <DarkModeButton showLabel={!isCompact} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-dvh w-full relative flex">
      {/* Left Sidebar  */}
      {isMobile == true ? (
        <SidebarDrawer
          className="!border-r-small border-divider bg-background-700"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          {leftPanel}
        </SidebarDrawer>
      ) : (
        <div
          className={cn("relative h-full", {
            "min-w-left-nav-lg w-left-nav-lg": !isMobile && !isCompact,
            "w-16 items-center px-2 py-6": isCompact,
            "w-0": isMobile,
          })}
        >
          {leftPanel}
        </div>
      )}
      {/* Right Panel  */}
      <div className={cn("relative w-full flex flex-col bg-background", {})}>
        <header
          className={cn(
            "sticky z-40 top-0 w-full flex flex-row justify-center items-center gap-1 !border-b-small border-divider p-3 bg-background"
          )}
        >
          <Button
            className="sticky mr-2 z-10"
            isIconOnly
            size="sm"
            variant="light"
            onPress={onToggle}
          >
            <Icon
              className="text-default-500"
              height={24}
              icon="solar:hamburger-menu-outline"
              width={24}
            />
          </Button>
          <Header />
        </header>
        <div className="flex-grow mt-2 px-2 xl:px-5 pb-5 relative z-0 w-full mx-auto">{children}</div>
        <Footer />
        <ScrollToTop />
        <Toaster />
      </div>
    </div>
  );
}
