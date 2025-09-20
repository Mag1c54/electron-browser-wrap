import { useCallback } from "react";
import { useTabsStore } from "@/store/tabs";

export function useNavigate() {
  const { tabs, activeTabId, updateTabUrl } = useTabsStore();

  const navigate = useCallback((raw: string) => {
    let url = raw.trim();


    if (!/^https?:\/\//i.test(url)) {
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    }


    const activeTab = tabs.find((t) => t.id === activeTabId);
    if (activeTab) {
      updateTabUrl(activeTab.id, url);
    }
  }, [tabs, activeTabId, updateTabUrl]);

  return navigate;
}
