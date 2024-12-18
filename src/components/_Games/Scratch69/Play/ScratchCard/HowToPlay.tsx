import { Icon } from "@iconify/react/dist/iconify.js";
import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";

import { useWindowSize } from "@/hooks";

const HowToPlay = () => {
    return (
        <div className="mx-auto py-2 px-0 text-pm">
            <h3 className="text-lg font-bold text-foreground mb-2">How to Play Scratch69</h3>
            <div className="space-y-2">
                <div>
                    <p>
                        <span className="font-bold">Scratch69</span> is an innovative cryptocurrency scratcher game where players scratch three numbers, each ranging from 1 to 69.
                    </p>
                    <p>
                        Draw verified by Binance VRF (Verifiable Random Function).
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">How to Win</h3>
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-indigo-100 text-gray-800">
                                <th className="px-2 py-1 text-left text-sm font-medium">Prize</th>
                                <th className="px-2 py-1 text-left text-sm font-medium">Criteria</th>
                            </tr>
                        </thead>
                        <tbody className="text-ps">
                            <tr className="border-t">
                                <td className="px-2 py-1">Grand Prize</td>
                                <td className="px-2 py-1">Match three 69s</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">First Prize</td>
                                <td className="px-2 py-1">Match two 69s</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">Second Prize</td>
                                <td className="px-2 py-1">Match one 69</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">Third Prize</td>
                                <td className="px-2 py-1">Three numbers start-with 6</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">Fourth Prize</td>
                                <td className="px-2 py-1">Two numbers end-with 9</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">Fifth Prize</td>
                                <td className="px-2 py-1">Two numbers start-with 6</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">Sixth Prize</td>
                                <td className="px-2 py-1">One number end-with 9</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Prizes and Rewards</h3>
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-indigo-100 text-gray-800">
                                <th className="px-2 py-1 text-left text-sm font-medium">Prize</th>
                                <th className="px-2 py-1 text-left text-sm font-medium">Reward</th>
                            </tr>
                        </thead>
                        <tbody className="text-ps">
                            <tr className="border-t">
                                <td className="px-2 py-1">Grand Prize</td>
                                <td className="px-2 py-1">10,000x + 30% Jackpot</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">First Prize</td>
                                <td className="px-2 py-1">5,000x + 15% Jackpot</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">Second Prize</td>
                                <td className="px-2 py-1">200x + 7.5% Jackpot</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">Third Prize</td>
                                <td className="px-2 py-1">20x</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">Fourth Prize</td>
                                <td className="px-2 py-1">5x</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">Fifth Prize</td>
                                <td className="px-2 py-1">2x</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 py-1">Sixth Prize</td>
                                <td className="px-2 py-1">1.5x</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Special Features</h3>
                    <ul className="list-disc pl-6 space-y-2 text-ps">
                        <li><span className="font-semibold">Winning Streak Bonus:</span> Win 5 rounds in a row to get extra rewards!</li>
                        <li><span className="font-semibold">Losing Streak Bonus:</span> Lose 5 rounds consecutively for an encouragement reward!</li>
                        <li><span className="font-semibold">Jackpot Bonus:</span> Win a top 3 prize to receive an extra jackpot bonus!</li>
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
    const { isMobile } = useWindowSize();
    return (
        <>
            <Modal
                placement="top"
                size={isMobile ? "xs" : 'md'}
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
