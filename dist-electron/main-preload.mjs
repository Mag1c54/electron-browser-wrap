"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel, ...args) => electron.ipcRenderer.send(channel, ...args),
  on: (channel, cb) => electron.ipcRenderer.on(channel, (_e, ...args) => cb(...args)),
  getWebviewPreloadPath: (cb) => electron.ipcRenderer.once("webview-preload-path", (_e, path) => cb(path)),
  minimizeWindow: () => electron.ipcRenderer.send("minimize-window"),
  toggleMaximizeWindow: () => electron.ipcRenderer.send("toggle-maximize-window"),
  closeWindow: () => electron.ipcRenderer.send("close-window")
});
