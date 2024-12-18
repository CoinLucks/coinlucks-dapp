import { Icon } from "@iconify/react";
import { Link } from "@nextui-org/react";

export enum SocialLinkType {
  "X",
  "TG",
  "Discord",
}

const links = {
  [SocialLinkType.X]: {
    SocialIcon: <Icon icon="ri:twitter-x-line" width={16} />,
    url: "https://x.com/",
  },
  [SocialLinkType.TG]: {
    SocialIcon: <Icon icon="la:telegram-plane" width={18} />,
    url: "https://t.me/",
  },
  [SocialLinkType.Discord]: {
    SocialIcon: <Icon icon="ic:outline-discord" width={18} />,
    url: "https://discord.com/",
  },
};

const SocialLink = ({
  type,
  className,
  textClassName,
  name,
  showEmpty = true,
  showText = false,
  showNotset = false,
}: {
  type: SocialLinkType;
  className?: any;
  textClassName?: any;
  name?: string;
  showEmpty?: boolean;
  showText?: boolean;
  showNotset?: boolean;
}) => {
  const text = name || (showNotset && "Not set");
  const item = links[type];
  if(!name && !showEmpty){
    return <></>;
  }
  return (
    <Link
      className={className}
      href={`${item.url}${name}`}
      target="_blank"
      isDisabled={!name}
    >
      {item.SocialIcon}
      {text && showText && <span className={textClassName}>{text}</span>}
    </Link>
  );
};

export default SocialLink;
