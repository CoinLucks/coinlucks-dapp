import { Icon } from "@iconify/react/dist/iconify.js";
import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";

const HowToPlay = () => {
    return (
        <div className="py-2 text-pm">
            <h2 className="text-lg font-bold text-indigo-600 mb-2">How to Play DiceShake</h2>
            <div className="space-y-2">
                <div>
                    <p>
                        <span className="font-bold">DiceShake</span> is an exciting cryptocurrency game where players can win crypto rewards by betting on the outcome of a 100-sided dice roll.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-indigo-600 mb-2">How to Win</h3>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                        <li>Bet on a range of numbers. </li>
                        <li>If the dice roll is within your chosen range, you win!</li>
                        <li>You can choose a range between 30 and 70 (e.g., 1-30, 1-70,50-70, etc.). </li>
                        <li>Payouts from 1.38x to 3.22x. </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-indigo-600 mb-2">Special Features</h3>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                        <li><span className="font-semibold">Winning Streak Bonus:</span> Win 5 rounds in a row to get extra rewards!</li>
                        <li><span className="font-semibold">Losing Streak Bonus:</span> Lose 5 rounds consecutively for an encouragement reward!</li>
                        <li><span className="font-semibold">Jackpot Pool: </span>Win by drawing the number 42 or 69 to to receive an extra jackpot bonus!</li>
                    </ul>
                </div>
            </div>
        </div>

    )
};

const HowToPlayModal = ({
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
                        <HowToPlay />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export const HowToPlayButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button isIconOnly variant="light" size="md" onClick={onOpen}>
                <Icon icon={"bi:question-circle"} width={28} />
            </Button>
            <HowToPlayModal isOpen={isOpen} onClose={onClose} />
        </>
    )
};
