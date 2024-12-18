"use client";

import { useTranslations } from "next-intl";

const Leaderboard = () => {
  const t = useTranslations("common");
  return (
    <div className="rounded-xl bg-background-700 mt-0 p-2 py-10 text-center">
      {t("coming_soon")}
    </div>
  );
};

export default Leaderboard;
