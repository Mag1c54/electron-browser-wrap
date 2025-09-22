import React, { useEffect } from "react";
import { useTabsStore } from "@/store/tabs";
import * as Tabs from "@radix-ui/react-tabs";
import "./TitleBar.scss";
import {
  CopyIcon,
  BorderSolidIcon,
  Cross1Icon,
  PlusIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";

const TitleBar: React.FC = () => {
  const { tabs, activeTabId, switchTab, addTab, closeTab } = useTabsStore();

  useEffect(() => {
    if (tabs.length === 0) {

      window.electronAPI?.closeWindow?.();
    }
  }, [tabs]);

  return (
    <div className="title-bar">
      <Tabs.Root
        className="tabs-root"
        value={activeTabId ?? (tabs[0]?.id || "")}
        onValueChange={(val) => switchTab(val)}
      >
        <Tabs.List className="tabs-list" aria-label="Tabs list">
          {tabs.map((tab) => (

            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className={`tab-trigger ${tab.id === activeTabId ? "active" : ""}`}
            >
              <span className="tab-label" title={tab.url}>
                {tab.url}
              </span>


              <span
                role="button"
                tabIndex={0}
                className="tab-close"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    closeTab(tab.id);
                  }
                }}
                aria-label={`Close tab ${tab.url}`}
              >
                <Cross2Icon />
              </span>
            </Tabs.Trigger>
          ))}

          <button
            type="button"
            className="tab-add-btn"
            onClick={() => addTab()}
            aria-label="Add tab"
          >
            <PlusIcon />
          </button>

          <div className="drag-spacer" />
        </Tabs.List>
      </Tabs.Root>

      <div className="window-controls">
        <button
          type="button"
          className="ctrl-btn"
          onClick={() => window.electronAPI?.minimizeWindow?.()}
        >
          <BorderSolidIcon />
        </button>
        <button
          type="button"
          className="ctrl-btn"
          onClick={() => window.electronAPI?.toggleMaximizeWindow?.()}
        >
          <CopyIcon />
        </button>
        <button
          type="button"
          className="ctrl-btn"
          onClick={() => window.electronAPI?.closeWindow?.()}
        >
          <Cross1Icon />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
