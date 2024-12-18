import React, { createContext, useState, useContext } from "react";

export const RefetchContext = createContext<any>({});

export const useRefetchContext = () => useContext(RefetchContext);

export const RefetchProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [triggers, setTriggers] = useState({});

  const triggerRefetch = (key: string) => {
    setTriggers((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <RefetchContext.Provider value={{ triggers, triggerRefetch }}>
      {children}
    </RefetchContext.Provider>
  );
};
