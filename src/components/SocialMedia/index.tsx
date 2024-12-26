import { Icon } from "@iconify/react";
import { Link } from "@nextui-org/react";

const socialMedia = [
  {
    SocialIcon: <Icon icon="ri:twitter-x-line" width={26} />,
    url: "https://twitter.com/CoinLucks",
  },
  {
    SocialIcon: <Icon icon="la:telegram-plane" width={28} />,
    url: "https://t.me/CoinLucksBot",
  },
  {
    SocialIcon: <Icon icon="tdesign:logo-youtube" width={28} />,
    url: "https://www.youtube.com/@CoinLucks",
  },
  {
    SocialIcon: <Icon icon="ic:round-alternate-email" width={28} />,
    url: "mailto:team@coinlucks.com",
  },
];

const SocialMedia = ({ className }: { className?: any }) => {
  return (
    <div className={className}>
      {socialMedia?.map(({ SocialIcon, url }, index) => (
        <Link key={index} href={url} target="_blank" className="text-foreground-800">
          {SocialIcon}
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;