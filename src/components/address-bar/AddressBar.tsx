import React, { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import Button from "@/shared/ui/button/Button";
import "./AddressBar.scss";

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

  useEffect(() => {
    setInput(address);
  }, [address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onNavigate(input);
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
          placeholder="Введите адрес или запрос"
        />
      </form>
    </div>
  );
}
