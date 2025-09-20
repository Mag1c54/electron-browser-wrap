import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
  
  on: (channel: string, cb: (...args: any[]) => void) =>
    ipcRenderer.on(channel, (_e, ...args) => cb(...args)),

  getWebviewPreloadPath: (cb: (path: string) => void) =>
    ipcRenderer.once("webview-preload-path", (_e, path) => cb(path)),

  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  toggleMaximizeWindow: () => ipcRenderer.send("toggle-maximize-window"),
  closeWindow: () => ipcRenderer.send("close-window"),
});
