"use client";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

import { MenuItem, MenuItems as items } from "@/components/Menu";
import { useRoutePreloader } from "@/context/RouteContext";
import { usePathname, useRouter } from "@/libs/i18nNavigation";
import { cn } from "@/utils/cn";

export type NavbarItem = {
  key: string;
  title: string;
  icon?: string;
  href?: string;
  active?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  onPress?: any;
};

const Navbar = () => {
  const router = useRouter();
  const t = useTranslations("menu");

  const menus = items();
  const pathname = usePathname();
  let currentPath = pathname.split("/")?.[1] || "home";
  const currentMenu = MenuItem(currentPath);
  if (currentMenu && currentMenu.key != currentPath) {
    currentPath = currentMenu.key;
  }

  const { preloadRoutes } = useRoutePreloader();
  useEffect(() => {
    preloadRoutes(menus.flatMap((it) => it.href));
  }, [preloadRoutes])

  const NavButton = (props: NavbarItem) => (
    <button
      className={`flex flex-col gap-0 items-center text-sm ${props.active ? "text-blue" : "text-foreground-800"
        }`}
      onClick={
        props.onPress ??
        (props.href &&
          ((e: any) => {
            router.push(props.href!);
          }))
      }
    >
      {props.icon && (
        <Icon
          className={cn("text-foreground-800", {
            "text-blue-600": props.active,
          })}
          icon={props.icon}
          width={24}
          height={24}
        />
      )}
      <span className={cn("mt-1", { "text-blue-600": props.active })}>
        {t(props.title)}
      </span>
    </button>
  );

  return (
    <div className="w-full bg-background border-t border-divider flex justify-around p-2">
      {menus.map((item: NavbarItem, index: number) => (
        <NavButton {...item} key={item.key} active={currentPath == item.key} />
      ))}
    </div>
  );
};

export default Navbar;
