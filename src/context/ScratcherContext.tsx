"use client";

import React, { createContext, useState, useContext } from "react";

import { ScratchStatus } from "@/types/bet/bet";

interface ScratcherContextType {
  status: ScratchStatus;
  setStatus: (scratchStatus: ScratchStatus) => void;
}

const ScratcherContext = createContext<ScratcherContextType | undefined>(
  undefined
);

export const useScratcherContext = () => {
  const context = useContext(ScratcherContext);
  if (context === undefined) {
    throw new Error(
      "useScratcherContext must be used within a ScratcherProvider"
    );
  }
  return context;
};

export const ScratcherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setScratchStatus] = useState<ScratchStatus>(
    ScratchStatus.DEFAULT
  );

  const setStatus = (scratchStatus: ScratchStatus) => {
    setScratchStatus(scratchStatus);
  };

  return (
    <ScratcherContext.Provider
      value={{
        status,
        setStatus,
      }}
    >
      {children}
    </ScratcherContext.Provider>
  );
};

export default ScratcherContext;
