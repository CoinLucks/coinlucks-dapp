import { Icon } from "@iconify/react";

import { IconSize } from "@/types/props";

export const IconCheck = ({
  size,
  className,
}: {
  size?: IconSize;
  className?: any;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size?.width}
    height={size?.height}
    viewBox="0 0 32 32"
    className={className}
  >
    <path
      fill="green"
      d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13s13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5c0 6.102-4.898 11-11 11S5 22.102 5 16S9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3m11.281 4.281L16 18.563l-4.281-4.282l-1.438 1.438l5 5l.719.687l.719-.687l12-12z"
    />
  </svg>
);

export const IconNo = ({
  size,
  className,
}: {
  size?: IconSize;
  className?: any;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size?.width}
    height={size?.height}
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fill="red"
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m3.7 12.3c.4.4.4 1 0 1.4c-.4.4-1 .4-1.4 0L12 13.4l-2.3 2.3c-.4.4-1 .4-1.4 0c-.4-.4-.4-1 0-1.4l2.3-2.3l-2.3-2.3c-.4-.4-.4-1 0-1.4c.4-.4 1-.4 1.4 0l2.3 2.3l2.3-2.3c.4-.4 1-.4 1.4 0c.4.4.4 1 0 1.4L13.4 12z"
    />
  </svg>
);

export const IconReward = ({
  size,
  className,
  color,
}: {
  size?: IconSize;
  className?: any;
  color?: string;
}) => (
  <Icon
    className={className}
    icon={"fa-solid:award"}
    width={size?.width || "18"}
    color={color || "#FAAE0A"}
  />
);

export const VerifyIcon = ({
  verifyed,
  size = "16",
}: {
  verifyed?: boolean;
  size?: string;
}) => {
  return (
    <>
      {verifyed ? (
        <Icon
          color="rgba(29,155,240,1.00)"
          height={size}
          icon="mage:verified-check-fill"
          width={size}
        />
      ) : (
        ""
      )}
    </>
  );
};
