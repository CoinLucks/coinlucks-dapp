"use client";

import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionItem,
  type ListboxProps,
  type ListboxSectionProps,
  type Selection,
} from "@nextui-org/react";
import {
  Listbox,
  Tooltip,
  ListboxItem,
  ListboxSection,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";


import { useRoutePreloader } from "@/context/RouteContext";
import { useRouter } from "@/libs/i18nNavigation";
import { cn } from "@/utils/cn";

export enum SidebarItemType {
  Nest = "nest",
  Normal = "normal",
}

export type SidebarItem = {
  key: string;
  title: string;
  icon?: string;
  href?: string;
  type?: SidebarItemType.Normal | string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  items?: SidebarItem[];
  className?: string;
  onPress?: any;
};

export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children"> & {
  items: SidebarItem[];
  showNest?: boolean;
  isCompact?: boolean;
  hideEndContent?: boolean;
  iconClassName?: string;
  sectionClasses?: ListboxSectionProps["classNames"];
  classNames?: ListboxProps["classNames"];
  defaultSelectedKey: string;
  onSelect?: (key: string) => void;
  onAction?: (key: string) => void;
};

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      isCompact,
      defaultSelectedKey,
      onSelect,
      onAction,
      hideEndContent,
      sectionClasses: sectionClassesProp = {},
      itemClasses: itemClassesProp = {},
      iconClassName,
      classNames,
      className,
      ...props
    },
    ref
  ) => {
    const router = useRouter();
    const t = useTranslations("menu");
    const [selected, setSelected] =
      React.useState<React.Key>(defaultSelectedKey);

    const { preloadRoutes } = useRoutePreloader();
    
    useEffect(() => {
      preloadRoutes(items.flatMap((it: SidebarItem) => it.href!));
    }, [preloadRoutes]);

    const sectionClasses = {
      ...sectionClassesProp,
      base: cn(sectionClassesProp?.base, {
        "p-0 max-w-[44px]": isCompact,
      }),
      group: cn(sectionClassesProp?.group, {
        "flex flex-col gap-1": isCompact,
      }),
      heading: cn(sectionClassesProp?.heading, {
        hidden: isCompact,
      }),
    };

    const itemClasses = {
      ...itemClassesProp,
      base: cn(itemClassesProp?.base, {
        "w-11 h-11 gap-0 p-0": isCompact,
      }),
    };

    const renderNestItem = React.useCallback(
      (item: SidebarItem) => {
        const isNestType =
          item.items &&
          item.items?.length > 0 &&
          item?.type === SidebarItemType.Nest;

        if (isNestType) {
          // Is a nest type item , so we need to remove the href
          delete item.href;
        }

        return (
          <ListboxItem
            {...item}
            key={item.key}
            classNames={{
              base: cn(
                {
                  "h-auto p-0": !isCompact && isNestType,
                },
                {
                  "inline-block w-11": isCompact && isNestType,
                }
              ),
            }}
            endContent={
              isCompact || isNestType || hideEndContent
                ? null
                : item.endContent ?? null
            }
            startContent={
              isCompact || isNestType ? null : item.icon ? (
                <Icon
                  className={cn(
                    "text-foreground-800 group-data-[selected=true]:text-foreground",
                    iconClassName
                  )}
                  icon={item.icon}
                  width={20}
                />
              ) : (
                item.startContent ?? null
              )
            }
            title={isCompact || isNestType ? null : t(item.title)}
          >
            {isCompact ? (
              <Tooltip content={t(item.title)} placement="right">
                <div className="flex w-full items-center justify-center">
                  {item.icon ? (
                    <Icon
                      className={cn(
                        "text-foreground-800 group-data-[selected=true]:text-foreground",
                        iconClassName
                      )}
                      icon={item.icon}
                      width={20}
                    />
                  ) : (
                    item.startContent ?? null
                  )}
                </div>
              </Tooltip>
            ) : null}
            {!isCompact && isNestType ? (
              <Accordion className={"p-0"}>
                <AccordionItem
                  key={item.key}
                  aria-label={t(item.title)}
                  classNames={{
                    heading: "pr-3",
                    trigger: "p-0",
                    content: "py-0 pl-4",
                  }}
                  title={
                    item.icon ? (
                      <div
                        className={"flex h-11 items-center gap-2 px-2 py-1.5"}
                      >
                        <Icon
                          className={cn(
                            "text-foreground-800 group-data-[selected=true]:text-foreground",
                            iconClassName
                          )}
                          icon={item.icon}
                          width={20}
                        />
                        <span className="text-pm font-semibold text-foreground-800 group-data-[selected=true]:text-foreground">
                          {t(item.title)}
                        </span>
                      </div>
                    ) : (
                      item.startContent ?? null
                    )
                  }
                >
                  {item.items && item.items?.length > 0 ? (
                    <Listbox
                      className={"mt-0.5"}
                      classNames={{
                        list: cn("border-l border-default-200 pl-4"),
                      }}
                      items={item.items}
                      variant="flat"
                    >
                      {item.items.map(renderItem)}
                    </Listbox>
                  ) : (
                    renderItem(item)
                  )}
                </AccordionItem>
              </Accordion>
            ) : null}
          </ListboxItem>
        );
      },
      [isCompact, hideEndContent, iconClassName, items]
    );

    const renderItem = React.useCallback(
      (item: SidebarItem) => {
        const isNestType =
          item.items &&
          item.items?.length > 0 &&
          item?.type === SidebarItemType.Nest;

        if (isNestType) {
          return renderNestItem(item);
        }

        if (item.href) {
          // use router.push for href
          item.onPress = (e: any) => {
            router.push(item.href!);
          };
        }

        return (
          <ListboxItem
            {...item}
            href={undefined}
            key={item.key}
            classNames={{
              base: cn("min-h-10 my-1", itemClasses?.base),
            }}
            endContent={
              isCompact || hideEndContent ? null : item.endContent ?? null
            }
            startContent={
              isCompact ? null : item.icon ? (
                <Icon
                  className={cn(
                    "text-foreground-800 group-data-[selected=true]:text-foreground",
                    iconClassName
                  )}
                  icon={item.icon}
                  width={20}
                />
              ) : (
                item.startContent ?? null
              )
            }
            selectedIcon={
              isCompact ? null : (
                <Icon
                  className="invisible group-data-[selected=true]:visible"
                  icon="mingcute:right-line"
                  width={16}
                />
              )
            }
            textValue={t(item.title)}
            title={isCompact ? null : t(item.title)}
          >
            {isCompact ? (
              <Tooltip content={t(item.title)} placement="right">
                <div className="flex w-full items-center justify-center">
                  {item.icon ? (
                    <Icon
                      className={cn(
                        "text-foreground-800 group-data-[selected=true]:text-foreground",
                        iconClassName
                      )}
                      icon={item.icon}
                      width={20}
                    />
                  ) : (
                    item.startContent ?? null
                  )}
                </div>
              </Tooltip>
            ) : null}
          </ListboxItem>
        );
      },
      [isCompact, hideEndContent, iconClassName, itemClasses?.base]
    );

    return (
      <Listbox
        key={isCompact ? "compact" : "default"}
        ref={ref}
        hideSelectedIcon={isCompact}
        as="nav"
        className={cn("list-none", className)}
        classNames={{
          ...classNames,
          list: cn("items-center", classNames?.list),
        }}
        color="default"
        itemClasses={{
          ...itemClasses,
          base: cn(
            "px-3 rounded-large h-[44px] data-[selected=true]:bg-default-100",
            itemClasses?.base
          ),
          title: cn(
            "text-pm font-semibold text-foreground-800 group-data-[selected=true]:text-foreground",
            itemClasses?.title
          ),
        }}
        items={items}
        selectedKeys={[selected] as unknown as Selection}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0];
          setSelected(key as React.Key);
          onSelect?.(key as string);
        }}
        onAction={onAction}
        {...props}
      >
        {(item) => {
          return item.items &&
            item.items?.length > 0 &&
            item?.type === SidebarItemType.Nest ? (
            renderNestItem(item)
          ) : item.items && item.items?.length > 0 && props.showNest ? (
            <ListboxSection
              key={item.key}
              classNames={sectionClasses}
              showDivider={isCompact}
              title={t(item.title)}
            >
              {item.items.map(renderItem)}
            </ListboxSection>
          ) : (
            renderItem(item)
          );
        }}
      </Listbox>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
