interface UIProps {
  x: number;
  y: number;
  onReload: () => void;
  onBack: () => void;
  onForward: () => void;
  onInspect: () => void;
  hideContextMenu: () => void;
}

export default function WebViewContextMenuUI({
  x,
  y,
  onReload,
  onBack,
  onForward,
  onInspect,
  hideContextMenu,
}: UIProps) {
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleMenuItemClick = (action: () => void) => {
    action();
    hideContextMenu();
  };

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        background: "#333",
        color: "#fff",
        borderRadius: 6,
        padding: "4px 0",
        zIndex: 9999,
        minWidth: 140,

      }}
      onClick={handleMenuClick}
      className="webview-context-menu"
    >
      <div
        style={{ padding: "6px 12px", cursor: "pointer" }}
        onClick={() => handleMenuItemClick(onReload)}
      >
        🔄 Reload
      </div>
      <div
        style={{ padding: "6px 12px", cursor: "pointer" }}
        onClick={() => handleMenuItemClick(onBack)}
      >
        ⬅ Back
      </div>
      <div
        style={{ padding: "6px 12px", cursor: "pointer" }}
        onClick={() => handleMenuItemClick(onForward)}
      >
        ➡ Forward
      </div>
      <div
        style={{ padding: "6px 12px", cursor: "pointer" }}
        onClick={() => handleMenuItemClick(onInspect)} 
      >
        🛠 Inspect
      </div>
    </div>
  );
}
