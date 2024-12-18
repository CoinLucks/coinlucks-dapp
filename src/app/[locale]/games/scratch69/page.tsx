"use client";

import Scratch69Game from "@/components/_Games/Scratch69";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { AppConfig } from "@/config";

export default function Scratch69(props: {
  params: { chain: string };
}) {
  return (
    <Layout back={true}>
      <Container className="section">
        <Scratch69Game chainId={AppConfig.defaultChainId} />
      </Container>
    </Layout>
  );
}
