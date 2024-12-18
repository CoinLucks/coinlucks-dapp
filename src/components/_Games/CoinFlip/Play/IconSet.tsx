import { Icon } from "@iconify/react";
import React from "react";

import { HowToPlayButton } from "./PlayBox/HowToPlay";

const IconSet: React.FC = () => (
  <div className="flex flex-wrap justify-end gap-4 items-center w-full rounded-xl max-md:max-w-full">
    {/* <Icon icon={"carbon:security"} width={28} />
    <Icon icon={"bi:question-circle"} width={28} />
    <Icon icon={"pepicons-pencil:music-note-double-circle"} width={28} /> */}
    <HowToPlayButton />
  </div>
);

export default IconSet;
