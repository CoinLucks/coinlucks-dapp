"use client";

import { redirect } from "next/navigation";
import { useAccount } from "wagmi";

import Layout from "@/components/Layout";
import WalletConnector from "@/components/WalletConnector";

export default function Account() {
  const { address } = useAccount();
  if (address) {
    redirect(`/account/${address}`);
  }
  return <Layout><WalletConnector /></Layout>;
}
