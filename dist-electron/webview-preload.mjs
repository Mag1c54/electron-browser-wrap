"use strict";
const { ipcRenderer } = require("electron");
window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    ipcRenderer.sendToHost("webview-context-menu", {
      x: e.clientX,
      y: e.clientY
    });
  });
});
window.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.innerHTML = `
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      cursor: pointer;
    }

    ::-webkit-scrollbar-track {
      background: #0f111a;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-track-piece {
      background: #0f111a;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #1c1c2a;
      border: 2px solid transparent;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #2563eb;
    }

    ::-webkit-scrollbar-corner {
      background: transparent;
    }
  `;
  document.head.appendChild(style);
});
