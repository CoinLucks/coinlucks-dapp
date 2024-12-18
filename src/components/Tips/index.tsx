import { Icon } from "@iconify/react";
import { Button, Tooltip } from "@nextui-org/react";
import { useState } from "react";

import { cn } from "@/utils/cn";

function Tips({
  className,
  text,
  startContent,
  placement,
}: {
  className?: string;
  text?: any;
  startContent?: any;
  placement?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={cn("flex flex-row items-center", className)}>
      {startContent}
      <Tooltip
        classNames={{ content: "p-3" }}
        showArrow={true}
        content={text}
        placement={placement}
        isOpen={isOpen}
        isDismissable={true}
        shouldCloseOnInteractOutside={() => { return true; }}
      >
        <Button
          size="sm"
          variant="light"
          isIconOnly={true}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Icon icon={"octicon:info-24"} width={16} />
        </Button>
      </Tooltip>
    </div>
  );
}

export default Tips;
