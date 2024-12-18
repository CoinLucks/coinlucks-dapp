import { createContext } from "react";
import { FieldValues, UseFormReturn, useForm } from "react-hook-form";

export const FormContext = createContext<UseFormReturn<FieldValues, any, undefined>>(
  {} as UseFormReturn<FieldValues, any, undefined>
);

export const FormProvider = ({ children }: { children?: any }) => {
  const methods = useForm();
  return (
    <FormContext.Provider value={methods}>{children}</FormContext.Provider>
  );
};
