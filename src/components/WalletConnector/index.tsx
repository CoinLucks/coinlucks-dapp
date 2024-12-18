"use client";

import { Spacer } from "@nextui-org/react";
import { useAccount } from "wagmi";

import WalletConnectButton from "./WalletConnectButton";

const WalletConnector = () => {
  // network connect status
  const { isConnected } = useAccount();

  // Need wallet connected
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <span className="text-xl">Please Connect Wallet</span>
        <Spacer y={8} />
        <WalletConnectButton />
      </div>
    );
  }
};

export default WalletConnector;
