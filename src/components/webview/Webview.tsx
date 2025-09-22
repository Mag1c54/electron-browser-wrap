import { useRef, useState, useEffect } from "react";
import { useTabsStore } from "@/store/tabs";
import { useNavigate } from "@/hooks/useNavigate";
import WebViewContextMenu from "@/components/web-view-context-menu/WebViewContextMenu";
import AddressBar from "@/components/address-bar/AddressBar";
import { HomePage } from "@/pages/home-page/HomePage";
import { ErrorPage } from "@/pages/error-page/ErrorPage";
import "./Webview.scss";

const HOME_PAGE_URL = "app://home";

export default function WebView() {
  const { tabs, activeTabId, updateTabUrl } = useTabsStore();
  const activeTab = tabs.find((t) => t.id === activeTabId) ?? null;
  const navigate = useNavigate();

  const webviewRef = useRef<Electron.WebviewTag>(null);
  const [webviewPreloadPath, setWebviewPreloadPath] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (window.electronAPI?.getWebviewPreloadPath) {
      window.electronAPI.getWebviewPreloadPath(setWebviewPreloadPath);
    }
  }, []);

  useEffect(() => {
    const webview = webviewRef.current;
    if (!webview || !activeTab) return;
  
    const handleNavigate = (event: Electron.DidNavigateEvent) => {
      updateTabUrl(activeTab.id, event.url);
      setHasError(false);
    };
  
    const handleFailLoad = (event: Electron.DidFailLoadEvent) => {
      // Игнорируем ERR_ABORTED (-3), они появляются при переходах, которые мы сами инициируем
      if (
        event.isMainFrame &&
        event.errorCode !== -3 &&
        event.validatedURL !== HOME_PAGE_URL
      ) {
        setHasError(true);
      }
    };
  
    webview.addEventListener("did-navigate", handleNavigate);
    webview.addEventListener("did-navigate-in-page", handleNavigate);
    webview.addEventListener("did-fail-load", handleFailLoad);
  
    return () => {
      webview.removeEventListener("did-navigate", handleNavigate);
      webview.removeEventListener("did-navigate-in-page", handleNavigate);
      webview.removeEventListener("did-fail-load", handleFailLoad);
    };
  }, [activeTab, updateTabUrl]);

  const goBack = () => webviewRef.current?.canGoBack() && webviewRef.current.goBack();
  const goForward = () => webviewRef.current?.canGoForward() && webviewRef.current.goForward();
  const reload = () => {
    if (activeTab?.url === HOME_PAGE_URL) return;
    setHasError(false); // сброс ошибки перед перезагрузкой
    webviewRef.current?.reload();
  };

  if (!webviewPreloadPath) return <div>Loading webview...</div>;

  return (
    <div className="webview-container">
      {tabs.length === 0 || !activeTab ? (
        <HomePage />
      ) : (
        <>
          <AddressBar
            address={activeTab.url}
            onNavigate={navigate}
            onBack={goBack}
            onForward={goForward}
            onReload={reload}
          />

          <div className="webview-wrapper">
            {hasError ? (
              <ErrorPage url={activeTab.url} />
            ) : activeTab.url === HOME_PAGE_URL ? (
              <HomePage />
            ) : (
              <webview
                ref={webviewRef}
                key={activeTab.id}
                src={activeTab.url}
                {...({ allowpopups: "true" } as any)}
                preload={webviewPreloadPath}
                className="webview-active"
              />
            )}
            <WebViewContextMenu webviewRef={webviewRef} />
          </div>
        </>
      )}
    </div>
  );
}
