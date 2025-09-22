import React, { useState } from "react";
import "./HomePage.scss";
import { useTabsStore } from "@/store/tabs";
import { useNavigate } from "@/hooks/useNavigate";
import Button from "@/shared/ui/button/Button";
import logo from "../../assets/logo.ico";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { activeTabId, searchEngine } = useTabsStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && activeTabId) {
      const url = searchEngine.url.replace(
        "{query}",
        encodeURIComponent(searchQuery)
      );
      navigate(url);
    }
  };

  return (
    <div className="home-page">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        width={80}
        height={80}
      />
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search with ${searchEngine.name}...`}
          className="search-input"
        />
        <Button type="submit" className="search-button">
          Search
        </Button>
      </form>
    </div>
  );
}
