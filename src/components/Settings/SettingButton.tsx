import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, useDisclosure } from "@nextui-org/react";

import SettingModal from "./SettingModal";

const SettingButton = ({ className }: { className?: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button className={className} isIconOnly variant="flat" size="md" onClick={onOpen}>
        <Icon icon={"uil:setting"} width={24} />
      </Button>
      <SettingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SettingButton;
