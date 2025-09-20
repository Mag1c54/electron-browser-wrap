import { useState, useEffect, useCallback } from "react";

export const useWebViewContextMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const showContextMenu = useCallback((coords: { x: number; y: number }) => {

    setPosition({ x: coords.x, y: coords.y });
    setIsVisible(true);
  }, []);

  const hideContextMenu = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".webview-context-menu")) {
        hideContextMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hideContextMenu]);


  return { isVisible, position, showContextMenu, hideContextMenu };
};
