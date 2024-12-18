'use client';

import {
  backButton,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
  useLaunchParams, isTMA
} from "@telegram-apps/sdk-react";
import { useEffect } from "react";

import { useClientOnce } from "@/hooks/useClientOnce";


/**
 * Check isTelegramWebView
 * Disable the Telegram feature if not in Telegram webview, but only in production mode, if needed
 * @returns 
 */
export const isTelegramWebView = () => {
  
  return isTMA('simple');
  // @ts-ignore ignore
  // return (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp && typeof window.Telegram.WebApp.init === 'function');
}

/**
 * Initializes the application and configures its dependencies.
 */
export function initTG(debug: boolean): void {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  initSDK();
  // Mount all components used in the project.
  backButton.isSupported() && backButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();

  // Add Eruda if needed.
  debug &&
    import("eruda").then((lib) => lib.default.init()).catch(console.error);
}

export function useTelegramMiniApp(): any {

  const isDev = process.env.NODE_ENV === "development";

  // Mock Telegram environment in development mode if needed.
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useTelegramMock();
  }

  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === "debug";
  // Initialize the library.
  useClientOnce(() => {
    initTG(debug);
  });

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    debug && import("eruda").then((lib) => lib.default.init());
  }, [debug]);
}
