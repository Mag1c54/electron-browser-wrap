import { ipcMain as t, Menu as p, BrowserWindow as a, app as i } from "electron";
import n from "path";
import { fileURLToPath as w } from "url";
const l = n.dirname(w(import.meta.url)), s = process.env.VITE_DEV_SERVER_URL, f = n.join(l, "../dist"), h = n.join(l, "webview-preload.mjs"), E = n.join(l, "main-preload.mjs");
let e = null;
function d() {
  e = new a({
    width: 1200,
    height: 800,
    title: "Damn Browser",
    icon: n.join(l, "../public/assets/logo.ico"),
    titleBarStyle: "default",
    frame: !1,
    webPreferences: {
      preload: E,
      contextIsolation: !0,
      nodeIntegration: !1,
      webviewTag: !0
    }
  }), e.webContents.once("did-finish-load", () => {
    e == null || e.webContents.send("webview-preload-path", h);
  }), s ? e.loadURL(s) : e.loadFile(n.join(f, "index.html")).catch((o) => {
    console.error("Failed to load index.html:", o);
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.insertCSS(`
      html, body {
        overflow: hidden !important;
      }
    `);
  });
}
t.on("show-webview-context-menu", (o, { x: r, y: m }) => {
  const c = [
    { label: "Reload", click: () => o.sender.reload() },
    { label: "Open DevTools", click: () => o.sender.openDevTools({ mode: "detach" }) },
    { type: "separator" },
    { label: "Inspect Element", click: () => o.sender.inspectElement(r, m) }
  ];
  p.buildFromTemplate(c).popup({ window: a.fromWebContents(o.sender) || void 0 });
});
t.on("minimize-window", () => e == null ? void 0 : e.minimize());
t.on("toggle-maximize-window", () => {
  e && (e.isMaximized() ? e.unmaximize() : e.maximize());
});
t.on("close-window", () => e == null ? void 0 : e.close());
i.whenReady().then(d);
i.on("window-all-closed", () => {
  process.platform !== "darwin" && i.quit();
});
i.on("activate", () => {
  a.getAllWindows().length === 0 && d();
});
