import { create } from "zustand";
import React from "react";

interface WebviewStore {
  webviewRef: React.RefObject<Electron.WebviewTag> | null;
  setWebviewRef: (ref: React.RefObject<Electron.WebviewTag>) => void;
}

export const useWebviewStore = create<WebviewStore>((set) => ({
  webviewRef: null,
  setWebviewRef: (ref) => set({ webviewRef: ref }),
}));
// later be used
