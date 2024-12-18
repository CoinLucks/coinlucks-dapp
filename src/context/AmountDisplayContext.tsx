"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import React, { createContext, useContext, useState } from "react";

interface AmountDisplayContextType {
  display: 'Crypto' | 'USD';
  toggle?: () => void;
}

export const AmountSwitcher = ({
  token,
  className
}: { token: string, className?: any }) => {

  const { display, toggle } = useAmountDisplay();
  return <Button size="sm" variant="light" radius="sm" className={className}
    onPress={toggle}><div className="flex flex-row gap-1">{display == "USD" ? "USD" : token}<Icon width={16} icon="ri:exchange-dollar-fill" /></div></Button>;
};

const AmountDisplayContext = createContext<AmountDisplayContextType | undefined>(
  undefined
);

export const useAmountDisplay = () => {
  const context = useContext(AmountDisplayContext);
  if (context === undefined) {
    throw new Error(
      "useAmountDisplayContext must be used within a AmountDisplayProvider"
    );
  }
  return context;
};

export const AmountDisplayProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [display, setDisplay] = useState<'Crypto' | 'USD'>('Crypto');
  const toggle = () => {
    const newState = display == 'USD' ? "Crypto" : 'USD';
    setDisplay(newState);
  };

  return (
    <AmountDisplayContext.Provider
      value={{
        display,
        toggle
      }}
    >
      {children}
    </AmountDisplayContext.Provider>
  );
};

export default AmountDisplayContext;
