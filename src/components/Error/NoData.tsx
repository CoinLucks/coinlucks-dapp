import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import { LogoGray } from "../Logo";

function NoData({
  className,
  message,
  visible = true,
}: {
  className?: string;
  message?: any;
  visible?: boolean;
}) {
  const t = useTranslations("common");
  if (visible == false) {
    return <></>;
  }
  return (
    <div
      className={cn(
        "flex flex-col p-4 items-center justify-items-center text-foreground-700 max-md:text-ps",
        className
      )}
    >
      <LogoGray size={{ width: "32", height: "32" }} />
      <span>{message || t("no_data")}</span>
    </div>
  );
}

export default NoData;
