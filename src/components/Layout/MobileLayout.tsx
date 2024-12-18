"use client";

import React, { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import Header from "@/components/Header";
import { ScrollContainer } from "@/components/ScrollToTop/ScrollContainer";
import { BackButton } from "@/components/Telegram/BackButton";

import Footer from "../Footer";

import Navbar from "./Navbar";


const MobileLayout = ({ children, navbar = true, back = false }: {

  children: ReactNode,

  /**
  * Show navbar if true.
  * @default true
  */
  navbar?: boolean

  /**
  * True if it is allowed to go back from this page.
  * @default false
  */
  back?: boolean
}) => {

  return (
    <>
      <BackButton back={back} />
      <div className="w-full mx-auto h-screen flex flex-col relative">
        {/* Top Bar */}
        {<Header />}
        {/* Main Content */}
        <ScrollContainer className="flex-grow overflow-auto">
          {children}
        </ScrollContainer>
        {/* Bottom Navigation */}
        {navbar && <Navbar />}
      </div>
      <Toaster />
    </>
  );
};

export default MobileLayout;
