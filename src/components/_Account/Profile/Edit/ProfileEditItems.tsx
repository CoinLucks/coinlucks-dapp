"use client";

import { Button, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { AppConfig } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { useRefetchContext } from "@/context/RefetchContext";
import { useNotify } from "@/hooks";
import { useUpdateProfile } from "@/hooks/data/useAccountQuery";

import EditFieldTG from "../../../Telegram/EditFieldTG";
import AvatarUpload from "../Avatar/AvatarUpload";


export const ProfileEditItems = ({ onClose }: { onClose?: any }) => {
  const { account: user, updateAccount } = useAuth();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState<any>(user?.avatar);
  const [nickname, setNickname] = useState<any>(user?.name);
  const [tg, setTg] = useState<any>(user?.tg);
  const { mutate } = useUpdateProfile();
  const { notifySuccess } = useNotify();
  const { triggerRefetch } = useRefetchContext();
  const t = useTranslations("form");

  const handleImageSelect = (imageData: any) => {
    setSelectedImage(imageData);
    setError("");
  };

  const handleError = (errorMessage: any) => {
    setError(errorMessage);
  };

  const hasChanged = () => {
    return (
      user?.avatar != avatarUrl || user?.name != nickname || user?.tg != tg
    );
  };

  const handleSave = async () => {
    setError("");
    setIsSaving(true);

    const newUrl = await uploadAvatar();

    if (avatarUrl != newUrl || hasChanged()) {
      mutate(
        {
          id: user?.id!,
          name: nickname,
          avatar: newUrl,
          tg: tg,
          token: user?.token,
        },
        {
          onSettled(data, error, variables, context) {
            if (data) {
              if (data.state) {
                // success
                updateAccount({
                  ...user!,
                  name: nickname,
                  avatar: newUrl,
                  tg: tg,
                });
                onClose();
                notifySuccess({
                  title: t("success"),
                  message: t("form_saved"),
                });
                triggerRefetch("profile");

              } else {
                setError(data.message!);
              }
            } else {
              console.error("Failed to save:", error);
              setError(t("form_saved_fail"));
            }

            setIsSaving(false);
          },
        }
      );
    } else {
      setIsSaving(false);
    }
  };

  const uploadAvatar = async (): Promise<any> => {
    if (!selectedImage?.file) return avatarUrl;

    try {
      const formData = new FormData();
      formData.append("file", selectedImage.file);

      const response = await fetch(`${AppConfig.apiHost}/api/ipfs/file`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      if (!response.ok) throw new Error(t("upload_fail"));

      const { data: cid, state, message } = await response.json();
      if (state) {
        const newUrl = `https://ipfs.io/ipfs/${cid}`;
        setAvatarUrl(newUrl);
        return newUrl;
      } else {
        setError(`${t("upload_fail")}: ${message}`);
        return null;
      }
    } catch (error) {
      console.error("Failed to upload:", error);
      setError(t("upload_fail"));
      return null;
    }
  };

  return (
    <div className="flex flex-col p-4 basis-0 w-full">
      <div className="flex gap-2 items-center w-full">
        <AvatarUpload
          defaultImage={user?.avatar}
          selectedImage={selectedImage}
          onImageSelect={handleImageSelect}
          onError={handleError}
        />
      </div>
      <div className="flex flex-col mt-6 w-full">
        <div className="flex flex-col w-full">
          <div className="flex items-start py-3 w-full text-sm font-semibold text-foreground rounded-xl">
            <Input
              variant="bordered"
              value={nickname}
              onValueChange={setNickname}
              label={t("field_nickname")}
            />
          </div>
        </div>
        <EditFieldTG fieldValue={tg} setFieldValue={setTg} />
      </div>
      {error && <div className="text-danger text-sm">{error}</div>}
      <div className="flex flex-col mt-4 w-full">
        <Button
          className="w-full"
          color="primary"
          size="md"
          onPress={handleSave}
          isLoading={isSaving}
        >
          {t("btn_save")}
        </Button>
      </div>
    </div>
  );
};
