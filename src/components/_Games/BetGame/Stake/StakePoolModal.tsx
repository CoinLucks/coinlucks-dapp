import { Modal, ModalContent, ModalBody, useDisclosure, Button, ModalHeader } from "@nextui-org/react";
import { useTranslations } from "next-intl";

import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useCheckAndSwitchNetwork } from "@/hooks/useCheckAndSwitchNetwork";

import StakeSection from "./StakeSection";

const StakePoolModal = ({

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
                backdrop='opaque'
                isOpen={isOpen}
                onClose={onClose}
                classNames={{
                    header: "bg-background-800 flex flex-row items-center gap-2",
                    body: "bg-background-800",
                }}
            >
                <ModalContent>
                    <ModalBody>
                        <StakeSection />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export const StakeNowButton = ({ className }: { className?: any }) => {
    const t = useTranslations("form")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { chainId } = useBetGameBasicContext();
    const { checkAndSwithNetwork } = useCheckAndSwitchNetwork(chainId);
    const onClick = (e: any) => {
        if (checkAndSwithNetwork(e)) {
            onOpen();
        }
    }
    return (
        <>
            <Button className={className} color="primary" size="md" onClick={onClick}>
                {t("btn_stake")}
            </Button>
            <StakePoolModal isOpen={isOpen} onClose={onClose} />
        </>
    )
};
