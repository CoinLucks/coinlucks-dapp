import { Modal, ModalContent, ModalBody } from "@nextui-org/react";

import { ProfileEditItems } from "./ProfileEditItems";

const ProfileEditModal = ({
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
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          header: "bg-background-800 flex flex-row items-center gap-2",
          body: "bg-background-800",
        }}
      >
        <ModalContent>
          <ModalBody>
            <ProfileEditItems onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileEditModal;
