import React, { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import Button from "@/shared/ui/button/Button";
import "./AddressBar.scss";
import { useTabsStore } from "@/store/tabs";

interface Props {
  address: string;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
}

export default function AddressBar({
  address,
  onNavigate,
  onBack,
  onForward,
  onReload,
}: Props) {
  const [input, setInput] = useState(address);
  const { searchEngine, nextSearchEngine } = useTabsStore();

  useEffect(() => {

    if (address !== input) {
      setInput(address);
    }
  }, [address]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const isURL = input.includes(".") && !input.includes(" ");
      if (isURL && !input.startsWith("app://")) {

        const url = input.startsWith("http://") || input.startsWith("https://") ? input : `https://${input}`;
        onNavigate(url);
      } else {
        const url = searchEngine.url.replace("{query}", encodeURIComponent(input));
        onNavigate(url);
      }
    }
  };


  const handleSearchEngineButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    nextSearchEngine();
  };

  return (
    <div className="address-bar">
      <div className="nav-buttons">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeftIcon />
        </Button>
        <Button variant="ghost" onClick={onForward}>
          <ChevronRightIcon />
        </Button>
        <Button variant="ghost" onClick={onReload}>
          <ReloadIcon />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="address-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Search or type URL (${searchEngine.name})`}
        />
       
      </form>
      <Button variant="ghost" onClick={handleSearchEngineButtonClick} className="search-engine-button">
          {searchEngine.name.substring(0, 2)}
      </Button>
    </div>
  );
}