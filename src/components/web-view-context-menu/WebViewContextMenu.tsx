import { useEffect } from "react";
import { useWebViewContextMenu } from "@/hooks/useWebViewContextMenu";
import WebViewContextMenuUI from "./WebViewContextMenuUI";

interface Props {
  webviewRef: React.RefObject<Electron.WebviewTag>;
}

export default function WebViewContextMenu({ webviewRef }: Props) {
  const { isVisible, position, showContextMenu, hideContextMenu } =
    useWebViewContextMenu();

    useEffect(() => {
      const webview = webviewRef.current;
      if (!webview) return;

      const handleIPC = (event: any) => {
        if (event.channel === "webview-context-menu") {
          const { x, y } = event.args[0];
          showContextMenu({ x, y });
        }
      };
    
      webview.addEventListener("ipc-message", handleIPC);
    
      return () => {
        webview.removeEventListener("ipc-message", handleIPC);
      };
    }, [webviewRef.current, showContextMenu]);


  if (!isVisible) return null;
  return (
<WebViewContextMenuUI
  x={position.x}
  y={position.y}
  onReload={() => webviewRef.current?.reload?.()}
  onBack={() => {
    if (webviewRef.current?.canGoBack?.()) {
      webviewRef.current?.goBack?.();
    }
  }}
  onForward={() => {
    if (webviewRef.current?.canGoForward?.()) {
      webviewRef.current?.goForward?.();
    }
  }}
  onInspect={() => webviewRef.current?.openDevTools?.()}
  hideContextMenu={hideContextMenu}
/>

  );
}
