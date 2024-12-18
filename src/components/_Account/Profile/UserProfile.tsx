import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect } from "react";

import Avatar from "@/components/Avatar";
import NoData from "@/components/Error/NoData";
import SocialLink, {
  SocialLinkType,
} from "@/components/SocialMedia/SocialLink";
import { MOMENTJS_LANGUAGES } from "@/constants/locale";
import { useRefetchContext } from "@/context/RefetchContext";
import { useProfileQuery } from "@/hooks/data/useAccountQuery";
import { useNotify } from "@/hooks/useNotify";
import { getShortAddress } from "@/utils/address";
import { dt } from "@/utils/formatters";

import { ProfileLoading } from "../loading";

import ProfileEditButton from "./Edit/ProfileEditButton";
import ProfileField from "./ProfileField";

const UserProfile = ({ id }: { id: string }) => {
  const { notifySuccess } = useNotify();
  const locale = useLocale();
  const locales = MOMENTJS_LANGUAGES as Record<string, string>;
  const { data, isLoading, refetch } = useProfileQuery(id);
  const user = data?.state == true ? data.data : null;
  const t = useTranslations("form");
  const { triggers } = useRefetchContext();
  useEffect(() => {
    if (triggers.profile !== undefined) {
      refetch();
    }
  }, [triggers.profile, refetch]);

  if (isLoading || !user) {
    return <ProfileLoading />;
  }

  if (!user) {
    return <NoData />;
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(user?.id);
      notifySuccess({
        title: t("copy_address"),
        message: t("success"),
        duration: 3000,
      });
    } catch (err) { }
  };

  return (
    <div className="flex flex-col p-4 basis-0 min-w-[350px] max-md:min-w-min max-md:w-full max-md:mt-4 rounded-xl bg-background-700">
      <div className="flex gap-2 items-center w-full relative">
        <Avatar size={{ width: 64, height: 64 }} src={user?.avatar} />
        <div className="flex flex-col justify-center self-stretch my-auto">
          <h1 className="text-base font-bold text-foreground">{user?.name}</h1>
          <p className="self-start text-sm leading-6 text-center text-foreground-700">
            {dt(locales[locale], "long", "short").format(
              Number(user?.createdAt)
            )}
          </p>
        </div>
        <ProfileEditButton id={id} className={"absolute flex top-0 right-0"} />
      </div>
      <div className="flex flex-col mt-4 w-full">
        <ProfileField label={t("field_nickname")} value={user?.name!} />
        <ProfileField
          label={t("field_address")}
          value={getShortAddress(user?.id)}
          endContent={
            <Button
              className="object-contain shrink-0 w-6 h-6 aspect-square"
              variant="light"
              size="sm"
              isIconOnly
              onClick={copyToClipboard}
            >
              <Icon icon={"ph:copy-bold"} width={20} />
            </Button>
          }
        />
      </div>
      <div className="flex flex-wrap gap-2 pb-1 pt-2 mt-1">
        <SocialLink
          type={SocialLinkType.TG}
          className={
            "flex gap-1 items-center border-1 border-divider rounded-md px-2 py-1"
          }
          textClassName={"text-foreground-800"}
          name={user?.tg}
          showText={true}
          showNotset={true}
        />
        {/* <SocialLink
          type={SocialLinkType.X}
          className={
            "flex gap-1 items-center border-1 border-divider rounded-md px-2 py-1"
          }
          textClassName={"text-foreground-800"}
          name={user?.x}
          showText={true}
          showNotset={true}
        />
        <SocialLink
          type={SocialLinkType.Discord}
          className={
            "flex gap-1 items-center border-1 border-divider rounded-md px-2 py-1"
          }
          textClassName={"text-foreground-800"}
          name={user?.discord}
          showText={true}
          showNotset={true}
        /> */}
      </div>
    </div>
  );
};

export default UserProfile;
