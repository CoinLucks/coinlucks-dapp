import { Icon } from "@iconify/react";
import { Image } from "@nextui-org/image";
import { isEmpty } from "lodash";

import { AppConfig } from "@/config";
import { cn } from "@/utils/cn";

const Avatar = ({
  className,
  src,
  size = { width: 32, height: 32 },
}: {
  className?: any;
  src?: string;
  size?: any;
}) => {
  const avatarUrl = src
    ? src.replace("https://ipfs.io", AppConfig.ipfsGateway)
    : "";
  return isEmpty(src) ? (
    <Icon
      className={cn("text-foreground-800", className)}
      width={size?.width || 48}
      icon="carbon:user-avatar"
    ></Icon>
  ) : (
    <Image
      className={cn("rounded-full object-cover", className)}
      style={{ ...size }}
      src={avatarUrl}
      alt="avatar"
    />
  );
};

export default Avatar;
