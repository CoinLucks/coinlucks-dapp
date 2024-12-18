import {
  Modal,
  ModalContent,
  ModalBody,
} from "@nextui-org/react";

import { SettingItems } from "./SettingItems";

const SettingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen?: any;
  onClose?: any;
}) => {
  return (
    <>
      <Modal
        // backdrop='opaque'
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          header: "bg-background-800 flex flex-row items-center gap-2",
          body: "bg-background-800",
        }}
      >
        <ModalContent>
          <ModalBody>
            <SettingItems />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingModal;
