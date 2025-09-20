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
    if (!webviewRef.current) return;

    const handleIPC = (event: any) => {
      if (event.channel === "webview-context-menu") {
        const { x, y } = event.args[0];

        showContextMenu({ x, y });
      }
    };

    webviewRef.current.addEventListener("ipc-message", handleIPC);

    return () => {
      webviewRef.current?.removeEventListener("ipc-message", handleIPC);
    };
  }, [webviewRef, showContextMenu]);

  if (!isVisible) return null;
console.log(webviewRef , 22)
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
