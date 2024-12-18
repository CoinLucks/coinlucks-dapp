import { Icon } from "@iconify/react/dist/iconify.js";
import { Checkbox } from "@nextui-org/react";
import { useSignal, initData } from "@telegram-apps/sdk-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { isTelegramWebView } from "@/hooks/useTelegramMiniApp";

const EditFieldTG = ({
  fieldValue,
  setFieldValue,
}: {
  fieldValue?: any;
  setFieldValue?: any;
}) => {
  const t = useTranslations("account");
  const tgUser = useSignal(initData.user);
  const [isSelected, setIsSelected] = useState(fieldValue == tgUser?.username);
  const isTelegram = isTelegramWebView();

  if (!isTelegram) {
    return <></>;
  }
  return (
    <div className="flex flex-col w-full p-3 border border-divider text-foreground rounded-xl">
      <span className="text-foreground-700 text-xs font-semibold">{t("bind_telegram")}</span>
      <div className="flex flex-row items-center w-full text-sm mt-1">
        <Icon className="text-primary" icon="la:telegram-plane" width={28} />
        <Checkbox
          className="ml-2"
          isSelected={isSelected}
          onValueChange={(state) => {
            setIsSelected(state);
            setFieldValue && setFieldValue(state ? tgUser?.username : "");
          }}
          size="md"
        >
          {tgUser?.username}
        </Checkbox>
      </div>
    </div>
  );
};

export default EditFieldTG;
