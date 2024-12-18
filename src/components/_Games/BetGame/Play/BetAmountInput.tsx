import { Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import { ChainCoinIcon } from "@/components/Chains";
import CryptoCurrency from "@/components/CryptoCurrency";
import { useBetGameBasicContext } from "@/context/BetGameBasicContext";

const BetAmountInput = ({
  token,
  amount,
  setAmount,
}: {
  token: string,
  amount: any;
  setAmount?: any;
}) => {
  const { chainId } = useBetGameBasicContext();
  const t = useTranslations("form");

  return (
    <div className="flex flex-row items-end gap-2">
      <Input
        size="lg"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        value={amount}
        onValueChange={setAmount}
        label={
          <div className="flex flex-row justify-between">
            <span>{t("title_bet")}</span>
          </div>
        }
        labelPlacement="outside"
        placeholder={t("field_bet_amount")}
        classNames={{
          label: "!text-pm w-full",
          mainWrapper: "w-[92%] max-md:w-full",
          inputWrapper: "bg-background-600",
        }}
        variant="bordered"
        startContent={<ChainCoinIcon chainId={chainId} />}
        endContent={
          amount && (
            <CryptoCurrency
              className="text-ps text-foreground-700 px-2"
              token={token}
              value={amount}
              display="USD"
              showSuffix={true}
              startContent={"≈"}
            />
          )
        }
      />
    </div>
  );
};

export default BetAmountInput;
