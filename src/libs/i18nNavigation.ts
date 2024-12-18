import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { DEFAULT_LOCALE, LOCALE_PREFIX, SUPPORTED_LOCALES } from "@/constants/locale";

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: SUPPORTED_LOCALES,
  localePrefix: LOCALE_PREFIX,
  defaultLocale: DEFAULT_LOCALE,
});
