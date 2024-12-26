import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal, ModalContent, ModalBody, useDisclosure, Button, Divider, Input, Slider } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { formatEther, formatUnits } from "viem";

import { ChainCoinIcon } from "@/components/Chains";
import CryptoCurrency from "@/components/CryptoCurrency";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import useBetStakingPool from "@/hooks/game/useBetStakingPool";
import { useGetNativeTokenBalance } from "@/hooks/useTokenBalance";
import { Native } from "@/types/token";


import { calculateStakeROI, getROI } from "../utils";


const StakeYieldCalculator = () => {
    const t = useTranslations("pool");
    const { chainId, gameName } = useBetGameBasicContext();
    const token = Native.onChain(chainId);
    const [amount, setAmount] = useState("0.1");
    const [rewardPool, setRewardPool] = useState("0");
    const [stakeFor, setStakeFor] = useState<number>(3);

    const {
        poolStats,
        fetchStatus: poolFetchStatus,
        refetch: poolRefetch,
    } = useBetStakingPool(chainId, gameName);

    const { fetchStatus: nativeBalanceStatus, balance: nativeBalance } =
        useGetNativeTokenBalance();

    const isBalanceLoading = nativeBalanceStatus == "pending";

    const balance = isBalanceLoading
        ? "0"
        : Number(formatUnits(nativeBalance, token?.decimals!)).toFixed(4);

    const getDays = () => {
        let days = 0;
        switch (stakeFor) {
            case 1:
                days = 1;
                break;
            case 2:
                days = 7;
                break;
            case 3:
                days = 14;
                break;
            case 4:
                days = 30;
                break;
            case 5:
                days = 365;
                break;
        }
        return days;
    }

    const roi = calculateStakeROI(poolStats, Number(amount ?? 0), getDays(), rewardPool ?? "0");

    useEffect(() => {
        poolStats && poolStats.totalRewardsReceived && setRewardPool(formatEther(poolStats.totalRewardsReceived));
    }, [poolStats])

    return (
        <div className="flex flex-col mt-6 w-full">
            <div className="flex flex-col gap-2 items-start w-full">
                <div className="flex flex-row w-full justify-between text-sm">
                    <span> {t("field.stake_amount")}</span>
                    <span className="mr-1">
                        {t("field.balance")}:
                        <> {isBalanceLoading ? "Loading" : balance ? balance : "0"} {token.symbol}</>
                    </span>
                </div>
                <Input
                    size="md"
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={amount}
                    onValueChange={setAmount}
                    placeholder={t("field.stake_amount")}
                    classNames={{
                        label: "!text-pm w-full",
                        mainWrapper: ":w-full",
                        inputWrapper: "bg-background-600",
                    }}
                    variant="bordered"
                    startContent={<ChainCoinIcon chainId={chainId} />}
                    endContent={
                        <Button size="sm" onClick={() => setAmount(balance)} isDisabled={nativeBalanceStatus != 'success'}>
                            MAX
                        </Button>
                    }
                    description={
                        Number(amount) > 0 && (
                            <CryptoCurrency
                                className="text-sm mb-1 px-2"
                                token={token.symbol}
                                value={amount}
                                display="USD"
                                showSuffix={true}
                                startContent={"≈"}
                            />
                        )
                    }
                />
                <Input
                    size="md"
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={rewardPool}
                    onValueChange={setRewardPool}
                    label={t("field.est_reward_received")}
                    placeholder={t("field.est_reward_received")}
                    classNames={{
                        label: "!text-pm w-full",
                        mainWrapper: ":w-full",
                        inputWrapper: "bg-background-600",
                    }}
                    variant="bordered"
                    startContent={<ChainCoinIcon chainId={chainId} />}
                    description={
                        Number(amount) > 0 && (
                            <CryptoCurrency
                                className="text-sm mb-1 px-2"
                                token={token.symbol}
                                value={amount}
                                display="USD"
                                showSuffix={true}
                                startContent={"≈"}
                            />
                        )
                    }
                />
                <Slider
                    className="max-w-md"
                    defaultValue={stakeFor}
                    onChange={(v: any) => setStakeFor(v)}
                    label={t("field.stake_for")}
                    hideValue={true}
                    marks={[
                        {
                            value: 1,
                            label: "1D",
                        },
                        {
                            value: 2,
                            label: "7D",
                        },
                        {
                            value: 3,
                            label: "14D",
                        },
                        {
                            value: 4,
                            label: "30D",
                        },
                        {
                            value: 5,
                            label: "1Y",
                        },
                    ]}
                    maxValue={5}
                    minValue={1}
                    showOutline={false}
                    showTooltip={false}
                    showSteps={true}
                    step={1}
                />
            </div>

            <Divider className="my-4 mt-6" />

            <div className="flex flex-col gap-2 px-1 w-full text-pm">
                <div className="flex flex-row w-full justify-between">
                    <span>{t("field.share_of_pool")}</span>
                    <span className="font-semibold">
                        {amount ? (
                            (Number(amount) / (Number(formatEther(poolStats.totalStaked)) + Number(amount))) *
                            100
                        ).toFixed(4) + "%" : "-"}

                    </span>
                </div>
                <div className="flex flex-row w-full justify-between">
                    <span>{t("field.apr")}</span>
                    <span className="font-semibold">
                        {(roi.apr * 100).toFixed(4)}%
                    </span>
                </div>
                <div className="flex flex-row w-full justify-between">
                    <span>ROI</span>
                    <span className="font-semibold">
                        {(getROI(Number(amount), roi.projectedRewards)).toFixed(4)}%
                    </span>
                </div>
                <div className="flex flex-row w-full justify-between">
                    <span>{t("field.yield_amount")}</span>
                    <div className="flex flex-row items-center">
                        <span className="font-semibold">{roi.projectedRewards.toFixed(6)} {token.symbol}</span>
                    </div>
                </div>
            </div>
            <Divider className="my-4 mt-6" />
            <ul className="flex flex-col gap-2 px-1 pl-4 w-full text-pm text-foreground-800 list-disc">
                <li>{t("note.note1")}</li>
                <li>{t("note.note2")}</li>
                <li>{t("note.note3")}</li>
                <li>{t("note.note4")}</li>
            </ul>
        </div>
    );
};

const StakeYieldCalculatorModal = ({

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
                placement="top"
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
                        <StakeYieldCalculator />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export const StakeYieldCalculatorButton = ({ className }: { className?: any }) => {
    const t = useTranslations("form")
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const { chainId } = useBetGameBasicContext();
    // const { checkAndSwithNetwork } = useCheckAndSwitchNetwork(chainId);
    const onClick = (e: any) => {
        // if (checkAndSwithNetwork(e)) {
        onOpen();
        // }
    }
    return (
        <>
            <Button className={"p-0 m-0 h-4"} variant="light" isIconOnly size="md" onClick={onClick}>
                <Icon icon={"iconoir:calculator"} />
            </Button>
            <StakeYieldCalculatorModal isOpen={isOpen} onClose={onClose} />
        </>
    )
};
