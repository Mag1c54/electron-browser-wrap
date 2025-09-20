// electron-env.d.ts
/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
    interface ProcessEnv {
      APP_ROOT: string
      VITE_PUBLIC: string
    }
  }


  interface Window {

    electronAPI: {
      send: (channel: string, ...args: any[]) => void;
      on: (channel: string, cb: (...args: any[]) => void) => void;
      getWebviewPreloadPath: (cb: (path: string) => void) => void;
      closeWindow: () => void;
      minimizeWindow: () => void;
      toggleMaximizeWindow: () => void;
    };
  }