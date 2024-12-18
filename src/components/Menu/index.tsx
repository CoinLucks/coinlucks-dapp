"use client";

export const MenuItems = () => {
  return [
    {
      key: "home",
      href: "/",
      icon: "material-symbols-light:home",
      title: "home",
    },
    {
      key: "games",
      href: "/games",
      icon: "mdi:luck",
      title: "games",
      items: [
        {
          key: "raffles",
          href: "/raffles",
          title: "raffles",
        },
        {
          key: "instants",
          href: "/instants",
          title: "instants",
        },
      ],
    },
    {
      key: "pools",
      href: "/pools",
      icon: "grommet-icons:money",
      title: "pools",
    },
    {
      key: "referrals",
      href: "/referrals",
      icon: "solar:share-circle-bold",
      title: "referrals",
    },
    {
      key: "account",
      href: "/account",
      icon: "carbon:user-avatar",
      title: "account",
    },
  ];
};

export const MenuItem = (key: string) => {
  return (
    MenuItems().find((it) => it.key == key) ||
    MenuItems().find((it) => it.items?.find((item) => item.key == key))
  );
};
