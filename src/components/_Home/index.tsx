"use client";

import React, { Suspense } from "react";

import LatestWinner from "@/components/_Winners/LatestWinner";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { useWindowSize } from "@/hooks";

import FAQs from "../FAQ";

import HotQuickGames from "./HotQuickGames";
import Landscape from "./Landscape";

const HomePage = () => {
  const { isMobile } = useWindowSize();
  return (
    <>
      <Container>
        <Landscape />
      </Container>
      <Container className={"pt-0 pb-2"}>
        <Suspense>
          <HotQuickGames />
        </Suspense>
      </Container>
      <Container className={"pt-0"}>
        <LatestWinner />
        <FAQs />
      </Container>
      {isMobile && <Footer />}
    </>
  );
};

export default HomePage;
