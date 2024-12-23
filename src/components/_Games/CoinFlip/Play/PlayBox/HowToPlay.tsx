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

        <div className="mx-auto py-2 px-0 text-pm">
            <h3 className="text-lg font-bold text-indigo-600 mb-2">
                How to Play CoinFlip
            </h3>
            <div className="space-y-2">
                <div>
                    <p>
                        <span className="font-bold">CoinFlip</span> is an exciting cryptocurrency game where players bet
                        Heads, Tails, or Edge. Predict correctly
                        and win rewards based on your bet multiplier!
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                        How to Win
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                        <li>
                            The VRF generates a random number between 1 and 1000 for each
                            bet.
                        </li>
                        <li>
                            <strong>Edge:</strong> Numbers 333, 666, 888, or 999.
                        </li>
                        <li>
                            <strong>Heads:</strong> Any even number except for Edge
                            cases.
                        </li>
                        <li>
                            <strong>Tails:</strong> Any odd number except for Edge
                            cases.
                        </li>

                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                        Prizes and Rewards
                    </h3>
                    <table className="table-auto border-collapse">
                        <thead>
                            <tr className="bg-indigo-100 text-gray-800 text-sm font-medium">
                                <th className="px-2 text-left">
                                    Outcome
                                </th>
                                <th className="px-2 text-left">
                                    Probability
                                </th>
                                <th className="px-2 text-left">
                                    Multiplier
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-ps">
                            <tr className="border-t">
                                <td className="px-2 font-semibold">Edge</td>
                                <td className="px-2">0.4%</td>
                                <td className="px-2">48.25x</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 font-semibold">Heads</td>
                                <td className="px-2">49.8%</td>
                                <td className="px-2">2x</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-2 font-semibold">Tails</td>
                                <td className="px-2">49.8%</td>
                                <td className="px-2">2x</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-indigo-600 mb-4">
                        Special Features
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-ps">
                        <li>
                            <strong>Winning Streak Bonus:</strong> Win 5 rounds in a row to
                            earn extra rewards!
                        </li>
                        <li>
                            <strong>Losing Streak Bonus:</strong> Lose 5 rounds in a row and
                            receive a 1x reward to encourage you to try again!
                        </li>
                        <li>
                            <strong>Jackpot Pool:</strong> If you win and the result is a
                            Jackpot number (69 or 420), you earn an extra 50% of the Jackpot
                            Prize!
                        </li>
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
                // placement="top"
                backdrop='opaque'
                size="xs"
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
