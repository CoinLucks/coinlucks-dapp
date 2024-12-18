import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, useDisclosure } from "@nextui-org/react";
import { useAccount } from "wagmi";

import { useAuth } from "@/context/AuthContext";

import ProfileEditModal from "./ProfileEditModal";



const ProfileEditButton = ({ id, className }: { id: string; className?: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account } = useAuth();
  const { address } = useAccount();
  if (
    account &&
    address &&
    account.id.toLowerCase() == address.toLocaleLowerCase() &&
    id.toLocaleLowerCase()==address.toLocaleLowerCase()
  ) {
    return (
      <>
        <Button
          className={className}
          title="Edit Profile"
          isIconOnly
          // variant="flat"
          size="md"
          onClick={onOpen}
          startContent={<Icon icon={"flowbite:edit-outline"} width={22} />}
        ></Button>
        <ProfileEditModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  } else {
    return <></>;
  }
};

export default ProfileEditButton;
