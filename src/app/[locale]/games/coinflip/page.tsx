"use client";

import CoinFlipGame from "@/components/_Games/CoinFlip";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { AppConfig } from "@/config";

export default function CoinFlip() {
  return (
    <Layout back={true}>
      <Container className="section">
        <CoinFlipGame chainId={AppConfig.defaultChainId} />
      </Container>
    </Layout>
  );
}
