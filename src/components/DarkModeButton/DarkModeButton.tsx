"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import React from "react";

const DarkModeButton = ({ showLabel }: { showLabel?: boolean }) => {
  const t = useTranslations("settings");
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };

  return (
    <>
      <Button
        size={"sm"}
        variant="light"
        onClick={toggle}
        className="custom-button"
      >
        {theme == "dark" ? (
          <Icon
            className="rotate-180 text-default-500"
            icon="material-symbols:light-mode"
            width={24}
          />
        ) : (
          <Icon
            className="rotate-180 text-default-500"
            icon="material-symbols:dark-mode"
            width={24}
          />
        )}

        {showLabel ? <div>{t("theme_label")}</div> : ""}
      </Button>
    </>
  );
};

export default DarkModeButton;
