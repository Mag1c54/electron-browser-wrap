import { create } from "zustand";
import { nanoid } from "nanoid";


interface SearchEngine {
  name: string;
  url: string;
}

interface Tab {
  id: string;
  url: string;
}

interface TabsState {
  tabs: Tab[];
  activeTabId: string | null;
  searchEngines: SearchEngine[];
  searchEngine: SearchEngine;
  addTab: (url?: string) => void;
  closeTab: (id: string) => void;
  switchTab: (id: string) => void;
  updateTabUrl: (id: string, url: string) => void;
  nextSearchEngine: () => void;
}


const HOME_PAGE_URL = "app://home";

const initialSearchEngines: SearchEngine[] = [
  { name: "DuckDuckGo", url: "https://duckduckgo.com/?q={query}" },
  { name: "Google", url: "https://www.google.com/search?q={query}" },
];

const firstTab: Tab = { id: nanoid(), url: HOME_PAGE_URL };

export const useTabsStore = create<TabsState>((set) => ({
  tabs: [firstTab],
  activeTabId: firstTab.id,
  searchEngines: initialSearchEngines,
  searchEngine: initialSearchEngines[0],

  addTab: (url = HOME_PAGE_URL) =>
    set((state) => {
      const newTab: Tab = { id: nanoid(), url };
      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),

  closeTab: (id) =>
    set((state) => {
      const tabs = state.tabs.filter((t) => t.id !== id);
      const activeTabId =
        state.activeTabId === id && tabs.length > 0
          ? tabs[0].id
          : state.activeTabId;
      return { tabs, activeTabId };
    }),

  switchTab: (id) => set(() => ({ activeTabId: id })),

  updateTabUrl: (id, url) =>
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, url } : t)),
    })),

  nextSearchEngine: () =>
    set((state) => {
      const currentIndex = state.searchEngines.findIndex(
        (engine) => engine.name === state.searchEngine.name
      );
      const nextIndex = (currentIndex + 1) % state.searchEngines.length;
      return { searchEngine: state.searchEngines[nextIndex] };
    }),
}));
