import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const RENDERER_DIST = path.join(__dirname, "../dist");
const WEBVIEW_PRELOAD_PATH = path.join(__dirname, "webview-preload.mjs");

const MAIN_PRELOAD_PATH = path.join(__dirname, "main-preload.mjs");

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Damn Browser",
    icon: path.join(__dirname, "../public/assets/logo.ico"),
    titleBarStyle: "default",
    frame: false,
    webPreferences: {
      preload: MAIN_PRELOAD_PATH,
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
    },
  });
  win.webContents.once("did-finish-load", () => {
    win?.webContents.send("webview-preload-path", WEBVIEW_PRELOAD_PATH);
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  win.webContents.on("did-finish-load", () => {
    win?.webContents.insertCSS(`
      html, body {
        overflow: hidden !important;

      }
    `);
  });
}

ipcMain.on("show-webview-context-menu", (event, { x, y }) => {
  const template = [
    { label: "Reload", click: () => event.sender.reload() },
    {
      label: "Open DevTools",
      click: () => event.sender.openDevTools({ mode: "detach" }),
    },
    { type: "separator" as const },
    {
      label: "Inspect Element",
      click: () => event.sender.inspectElement(x, y),
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  menu.popup({
    window: BrowserWindow.fromWebContents(event.sender) || undefined,
  });
});

ipcMain.on("minimize-window", () => win?.minimize());
ipcMain.on("toggle-maximize-window", () => {
  if (!win) return;
  win.isMaximized() ? win.unmaximize() : win.maximize();
});
ipcMain.on("close-window", () => win?.close());

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
