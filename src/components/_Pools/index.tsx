"use client";

import React, { Suspense } from "react";

import Container from "@/components/Container";

import BetGamePools from "./BetGamePools";

const PoolsPage = () => {
  return (
    <Container>
      <Suspense>
        <BetGamePools />
      </Suspense>
    </Container>
  );
};

export default PoolsPage;
