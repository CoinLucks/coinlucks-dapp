"use client";

import NavTabs from "@/components/_Games/NavTabs";
import HotInstants from "@/components/_Home/HotInstants";
import Container from "@/components/Container";
import Layout from "@/components/Layout";

export default function Instants() {
  return (
    <Layout>
      <Container className="section">
        <NavTabs />
      </Container>
      <Container>
        <HotInstants />
      </Container>
    </Layout>
  );
}
