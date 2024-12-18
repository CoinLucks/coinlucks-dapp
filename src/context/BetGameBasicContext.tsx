"use client";

import React, { createContext, useContext } from "react";

import { ContractNames } from "@/constants/contracts/names";

interface BetGameBasicContextType {
  chainId: number;
  gameName: ContractNames;
}

const BetGameBasicContext = createContext<BetGameBasicContextType | undefined>(
  undefined
);

export const useBetGameBasicContext = () => {
  const context = useContext(BetGameBasicContext);
  if (context === undefined) {
    throw new Error(
      "useBetGameBasicContext must be used within a BetGameBasicProvider"
    );
  }
  return context;
};

export const BetGameBasicProvider: React.FC<{
  chainId: number;
  gameName: ContractNames;
  children?: React.ReactNode;
}> = ({ chainId, gameName, children }) => {
  return (
    <BetGameBasicContext.Provider
      value={{
        chainId,
        gameName,
      }}
    >
      {children}
    </BetGameBasicContext.Provider>
  );
};

export default BetGameBasicContext;
