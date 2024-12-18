import { Icon } from "@iconify/react/dist/iconify.js";
import { Image } from "@nextui-org/image";
import { AvatarComponent } from "@rainbow-me/rainbowkit";
import { useState } from "react";

import { AppConfig } from "@/config/AppConfig";
import { useAuth } from "@/context/AuthContext";

export const WalletAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const { account } = useAuth();
  const [avatarHolder, setAvatarHolder] = useState(!account?.avatar);
  const avatarUrl = account?.avatar
    ? account?.avatar.replace("https://ipfs.io", AppConfig.ipfsGateway)
    : "";
  const icon = avatarHolder ? (
    <Icon
      className="text-foreground-800"
      height={size || 48}
      width={size || 48}
      icon="carbon:user-avatar"
    ></Icon>
  ) : (
    <Image
      style={{ width: size, height: size }}
      className="rounded-full object-cover"
      src={avatarUrl}
      alt="avatar"
      onError={() => {
        setAvatarHolder(true);
      }}
    />
  );

  return ensImage ? (
    <Image
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
      alt="ens"
    />
  ) : (
    icon
  );
};
