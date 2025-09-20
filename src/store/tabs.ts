import { create } from "zustand";
import { nanoid } from "nanoid";

interface Tab {
  id: string;
  url: string;
}

interface TabsState {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (url?: string) => void;
  closeTab: (id: string) => void;
  switchTab: (id: string) => void;
  updateTabUrl: (id: string, url: string) => void;
}
const firstTab = { id: nanoid(), url: "https://duckduckgo.com" };


export const useTabsStore = create<TabsState>((set, _get) => ({
    tabs: [firstTab],
    activeTabId: firstTab.id,
  addTab: (url = "https://duckduckgo.com") =>
    set((state) => {
      const newTab = { id: nanoid(), url };
      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),
  closeTab: (id) =>
    set((state) => {
      const tabs = state.tabs.filter((t) => t.id !== id);
      const activeTabId =
        state.activeTabId === id && tabs.length > 0 ? tabs[0].id : state.activeTabId;
      return { tabs, activeTabId };
    }),
  switchTab: (id) => set(() => ({ activeTabId: id })),
  updateTabUrl: (id, url) =>
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, url } : t)),
    })),
}));
