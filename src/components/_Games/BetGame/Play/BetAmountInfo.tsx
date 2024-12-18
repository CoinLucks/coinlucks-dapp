import { Chip } from "@nextui-org/react";
import BigNumber from "bignumber.js";
import { useTranslations } from "next-intl";
import React from "react";
import { formatEther } from "viem";

const BetAmountInfo = ({
  token,
  amount,
  balance,
  payout,
  jackpot
}: {
  token: string,
  amount: any;
  balance: any;
  payout: any;
  jackpot?: BigNumber
}) => {
  const t = useTranslations("games");
  return (
    <div className="flex flex-col">
      {Number(amount) > 0 && (
        <span className="flex flex-wrap text-md gap-1 text-primary">
          <Chip variant="flat" color="primary" radius="sm" size="md">
            <div className="flex gap-1">
              <span>{t("list.title_bet")}</span>
              <span className="font-semibold">
                {amount} {token}
              </span>
              <span>{t("list.title_to_win")}</span>
              <span className="font-semibold">{`${payout} ${token
                }`}</span>
            </div>
          </Chip>
          {jackpot && jackpot.toNumber() > 0 ? (
            <>
              <span>+</span>
              <Chip variant="flat" color="primary" radius="sm" size="md">
                <span className="font-semibold mr-1">
                  {`${jackpot} ${token}`}
                </span>
                <span>{t("jackpot")}</span>
              </Chip>
            </>
          ) : (
            ""
          )}
        </span>
      )}

      {Number(formatEther(balance)) < Number(amount) && (
        <Chip variant="light" color="danger" radius="sm" size="md" className="mt-2">
          {t("list.error_insufficient_balance")} {Number(formatEther(balance)).toFixed(5)}{" "}
          {token}
        </Chip>
      )}
    </div>
  );
};

export default BetAmountInfo;
