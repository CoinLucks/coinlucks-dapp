import { Button, Divider, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { formatUnits } from "viem/utils";

import { ChainCoinIcon } from "@/components/Chains";
import CryptoCurrency from "@/components/CryptoCurrency";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import { useGetNativeTokenBalance } from "@/hooks/useTokenBalance";
import { Native } from "@/types/token/native";

import StakeBtnClaim from "./StakeBtnClaim";
import StakeBtnStake from "./StakeBtnStake";
import StakeBtnUnstake from "./StakeBtnUnstake";
import StakeInfo from "./StakeInfo";

const StakeSection = () => {
  const t = useTranslations("pool");
  const { chainId } = useBetGameBasicContext();
  const token = Native.onChain(chainId);
  const [amount, setAmount] = useState("");

  const { fetchStatus: nativeBalanceStatus, balance: nativeBalance } =
    useGetNativeTokenBalance();

  const isBalanceLoading = nativeBalanceStatus == "pending";

  const balance = isBalanceLoading
    ? "0"
    : Number(formatUnits(nativeBalance, token?.decimals!)).toFixed(4);

  return (
    <div className="flex flex-col mt-2 w-full">
      <div className="flex flex-col gap-2 items-start w-full">
        <div className="flex flex-row w-full justify-between text-sm">
          <span></span>
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
            <Button size="sm" onClick={() => setAmount(balance)}>
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
        <StakeBtnStake amount={amount} setAmount={setAmount} />
      </div>
      <Divider className="my-4 mt-6" />
      <StakeInfo />
      <div className="flex flex-row mt-4 gap-2 px-1 w-full justify-between">
        <StakeBtnClaim />
        <StakeBtnUnstake />
      </div>
    </div>
  );
};

export default StakeSection;
