"use client";

import { Button, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import { useAuth } from "@/context/AuthContext";

import WalletConnectButton from "../WalletConnector/WalletConnectButton";

import ReferralShare from "./ReferralShare";

const ReferralsIntro = () => {
  const t = useTranslations("referral");
  const { isConnected, account, open } = useAuth();
  const url = `${window.location.protocol}//${window.location.host}/t/${account?.refCode}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center bg-background-700 gap-2 p-4 rounded-2xl">
        <div className="flex flex-col relative gap-4 justify-between w-full max-md:flex-wrap max-md:max-w-full">
          <span className="text-h6 font-semibold">{t("referral_link")}</span>
          {isConnected == true && account ? (
            <div className="flex flex-row max-md:flex-col gap-2 justify-start">
              <Input
                size="md"
                classNames={{
                  base: "max-w-xs",
                  label: "!text-foreground-700 !text-pm",
                  inputWrapper: "border-divider",
                }}
                variant="bordered"
                readOnly
                value={url}
              />
              <ReferralShare />
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2">
              {isConnected == false && <WalletConnectButton label="Please Connect Wallet" />}
              {isConnected && (
                <Button color="primary" onPress={open}>
                  Sign in to get your referral link
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ReferralsIntro;
