"use client";

import DiceShakeGame from "@/components/_Games/DiceShake";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { AppConfig } from "@/config";

export default function DiceShake() {
  return (
    <Layout back={true}>
      <Container className="section">
        <DiceShakeGame chainId={AppConfig.defaultChainId} />
      </Container>
    </Layout>
  );
}
