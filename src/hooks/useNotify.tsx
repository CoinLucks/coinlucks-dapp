import { type ReactNode, useCallback } from "react";
import toast from "react-hot-toast";

import { IconCheck, IconNo } from "@/components/Icons";

interface NotifyProps {
  title: string;
  message: ReactNode;
  duration?: number;
}

export const useNotify = () => {
  const notifySuccess = useCallback(
    ({ title, message, duration }: NotifyProps) => {
      toast.custom(
        (t) =>
          customNotify({
            t,
            title,
            message,
            ring: "ring-success",
            icon: (
              <IconCheck
                size={{ width: "32", height: "32" }}
                className="text-success mr-2"
              />
            ),
          }),
        {
          position: "top-right",
          duration: duration ?? 6000,
          style: {
            wordBreak: "break-word",
          },
        }
      );
    },
    []
  );

  const notifyError = useCallback(
    ({ title, message, duration }: NotifyProps) => {
      toast.custom(
        (t) =>
          customNotify({
            t,
            title,
            message,
            ring: "ring-danger",
            icon: (
              <IconNo
                size={{ width: "32", height: "32" }}
                className="text-danger mr-2"
              />
            ),
          }),
        {
          position: "top-right",
          duration: duration ?? 6000,
          style: {
            wordBreak: "break-word",
          },
        }
      );
    },
    []
  );

  return {
    notifySuccess,
    notifyError,
  };
};

const customNotify = ({
  t,
  title,
  message,
  ring,
  icon,
}: {
  t: any;
  title?: string;
  message?: any;
  ring?: string;
  icon?: any;
}) => (
  <div
    className={`${
      t.visible ? "animate-enter" : "animate-leave"
    } max-w-md w-full bg-background shadow-lg rounded-lg pointer-events-auto flex ring-1 ${ring} ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4 overflow-x-scroll">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">{icon}</div>
        <div className="ml-3 flex-1">
          <div className="text-sm font-medium text-foreground">{title}</div>
          <div className="mt-1 text-sm text-foreground-800 break-wordsbreak-all">
            {message}
          </div>
        </div>
      </div>
    </div>
    <div className="flex border-l border-divider">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium"
      >
        Close
      </button>
    </div>
  </div>
);
