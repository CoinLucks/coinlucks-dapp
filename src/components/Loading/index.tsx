import { Icon } from "@iconify/react";
import React from "react";


const Loading = ({ size, className }: { size?: any; className?: any }) => {
  return (
    <div className={className}>
      <Icon icon="eos-icons:loading" width={size || 26} />
    </div>
  );
};

export default Loading;
