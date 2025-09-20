import { useRef, useState, useEffect } from "react";
import { useTabsStore } from "../../store/tabs";
import { useNavigate } from "@/hooks/useNavigate";
import WebViewContextMenu from "@/components/web-view-context-menu/WebViewContextMenu";
import AddressBar from "@/components/address-bar/AddressBar";
import "./Webview.scss";

export default function WebView() {
  const { tabs, activeTabId, updateTabUrl } = useTabsStore();
  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];
  const navigate = useNavigate();

  const webviewRef = useRef<Electron.WebviewTag>(null);
  const [webviewPreloadPath, setWebviewPreloadPath] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (window.electronAPI?.getWebviewPreloadPath) {
      window.electronAPI.getWebviewPreloadPath(setWebviewPreloadPath);
    }
  }, []);


  useEffect(() => {
    const webview = webviewRef.current;
    if (!webview) return;

    const handleNavigate = (event: Electron.DidNavigateEvent) => {
      if (activeTab) {
        updateTabUrl(activeTab.id, event.url);
      }
    };

    webview.addEventListener("did-navigate", handleNavigate);
    webview.addEventListener("did-navigate-in-page", handleNavigate);

    return () => {
      webview.removeEventListener("did-navigate", handleNavigate);
      webview.removeEventListener("did-navigate-in-page", handleNavigate);
    };
  }, [activeTabId, activeTab]);

  const goBack = () =>
    webviewRef.current?.canGoBack() && webviewRef.current.goBack();
  const goForward = () =>
    webviewRef.current?.canGoForward() && webviewRef.current.goForward();
  const reload = () => webviewRef.current?.reload();

  if (!webviewPreloadPath) {
    return <div>Loading webview...</div>;
  }

  return (
    <div>
      <AddressBar
        address={activeTab?.url ?? ""}
        onNavigate={navigate}
        onBack={goBack}
        onForward={goForward}
        onReload={reload}
      />

      <div>
        {tabs.map((tab) => (
          <webview
            key={tab.id}
            ref={tab.id === activeTabId ? webviewRef : undefined}
            src={tab.url}
            {...({ allowpopups: "true" } as any)}
            preload={webviewPreloadPath}
            className={
              tab.id === activeTabId ? "webview-active" : "webview-hidden"
            }
          />
        ))}
        <WebViewContextMenu webviewRef={webviewRef} />
      </div>
    </div>
  );
}
