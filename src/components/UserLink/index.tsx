import { Icon } from "@iconify/react";
import { useState } from "react";

import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import { VerifyIcon } from "@/components/Icons";
import { AppConfig } from "@/config/AppConfig";
import { cn } from "@/utils/cn";

const UserLink = ({
  className,
  textClassName,
  textWrapperClassName,
  id,
  address,
  name,
  avatar,
  verify,
  showIcon = true,
  showName = true,
  size = { width: 32, height: 32 },
  children,
}: {
  className?: any;
  textClassName?: any;
  textWrapperClassName?: any;
  id?: any;
  address?: string;
  name?: string;
  avatar?: string;
  verify?: boolean;
  showIcon?: boolean;
  showName?: boolean;
  size?: any;
  children?: any;
}) => {
  const [avatarHolder, setAvatarHolder] = useState(showIcon && !avatar);

  const url = `/account/${id}`;
  const avatarUrl = avatar
    ? avatar.replace("https://ipfs.io", AppConfig.ipfsGateway)
    : "";
  const icon = showIcon ? (
    <AppLink href={url}>
      {avatarHolder ? (
        <Icon
          className="text-white from-purple-700 to-blue-600 bg-gradient-to-b rounded-full opacity-70"
          width={size?.width || 48}
          icon="carbon:user-avatar"
        ></Icon>
      ) : (
        <AppImage
          size={size}
          className="rounded-full"
          isZoomed={false}
          src={avatarUrl}
          onError={() => {
            setAvatarHolder(true);
          }}
        />
      )}
    </AppLink>
  ) : (
    <></>
  );

  const text =
    (name || address) && showName ? (
      <div className={cn("ml-1", textWrapperClassName)}>
        <AppLink className={textClassName} href={url} title={address || name}>
          {name || address}
        </AppLink>
        {children && children}
      </div>
    ) : (
      <></>
    );

  return (
    <div
      className={cn(
        "flex flex-row justify-center justify-items-center flex-grow",
        className
      )}
    >
      {icon} {text} <VerifyIcon verifyed={verify} size="16" />
    </div>
  );
};

export default UserLink;
