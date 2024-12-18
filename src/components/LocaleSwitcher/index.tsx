
import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  type Selection,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { SUPPORTED_LANGUAGES } from "@/constants/locale";
import { usePathname, useRouter } from "@/libs/i18nNavigation";
import { cn } from "@/utils/cn";

export default function LocaleSwitcher({
  showLabel,
  className,
  isCompact,
}: {
  showLabel?: boolean;
  className?: any;
  isCompact?: boolean;
}) {
  const t = useTranslations("menu");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(keys: Selection) {
    const nextLocale = Object.values(keys)[0];

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
      router.refresh();
    });
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className={cn(
            "flex gap-2 items-center justify-start relative px-2 pl-3 py-1.5 w-full",
            {
              "justify-center": isCompact,
            }
          )}
          isDisabled={isPending}
          variant="light"
          isIconOnly={isCompact}
        >
          <Icon
            className="rotate-180 text-default-500"
            icon="material-symbols-light:language"
            width={24}
          />
          {!isCompact && SUPPORTED_LANGUAGES[locale].long}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Languages"
        variant="light"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[locale]}
        onSelectionChange={onSelectChange}
      >
        {Object.values(SUPPORTED_LANGUAGES).map((item) => (
          <DropdownItem key={item.code}>{item.long}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
