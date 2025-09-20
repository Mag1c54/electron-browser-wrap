import React from "react";
import { useTabsStore } from "@/store/tabs";
import * as Tabs from "@radix-ui/react-tabs";
import "./TitleBar.scss";
import Button from "@/shared/ui/button/Button";
import {
  CopyIcon,
  BorderSolidIcon,
  Cross1Icon,
  PlusIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";

const TitleBar = () => {
  const { tabs, activeTabId, switchTab, addTab, closeTab } = useTabsStore();

  return (
    <div className="title-bar">
      <Tabs.Root
        className="tabs-root"
        value={activeTabId ?? (tabs[0]?.id || "")}
        onValueChange={(val) => switchTab(val)}
      >
        <Tabs.List className="tabs-list">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className={`tab ${tab.id === activeTabId ? "active" : ""}`}
            >
              <span className="tab-label">{tab.url}</span>
              <Button
                variant="ghost"
                className="tab-close-btn"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
              >
                <Cross2Icon />
              </Button>
            </Tabs.Trigger>
          ))}

          <Button
            variant="ghost"
            className="tab-add-btn"
            onClick={() => addTab()}
          >
            <PlusIcon />
          </Button>

          <div className="drag-spacer" />
        </Tabs.List>
      </Tabs.Root>

      <div className="window-controls">
        <Button
          variant="ghost"
          onClick={() => window.electronAPI.minimizeWindow()}
        >
          <BorderSolidIcon />
        </Button>
        <Button
          variant="ghost"
          onClick={() => window.electronAPI.toggleMaximizeWindow()}
        >
          <CopyIcon />
        </Button>
        <Button
          variant="ghost"
          onClick={() => window.electronAPI.closeWindow()}
        >
          <Cross1Icon />
        </Button>
      </div>
    </div>
  );
};

export default TitleBar;
