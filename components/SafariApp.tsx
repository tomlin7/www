"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconRefresh,
  IconLock,
  IconWorld,
  IconLayoutSidebar,
  IconX,
  IconPlus,
} from "@tabler/icons-react";

export interface SafariTab {
  id: string;
  title: string;
  url: string;
  history: string[];
  historyIndex: number;
}

interface SafariAppProps {
  tabs: SafariTab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string, e: React.MouseEvent) => void;
  onAddTab: () => void;
  addressInput: string;
  setAddressInput: (s: string) => void;
  onNavigate: (url: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (b: boolean) => void;
  refreshTrigger?: number;
}

// Generic favicon using Google's favicon service
const SiteFavicon = ({ url }: { url: string }) => {
  const [failed, setFailed] = useState(false);
  let domain = "";
  try {
    const u = url.startsWith("http") ? url : `https://${url}`;
    domain = new URL(u).hostname;
  } catch {
    domain = "";
  }

  if (!domain || failed) {
    return <IconWorld className="w-3 h-3 text-neutral-400 shrink-0" stroke={1.5} />;
  }

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
      className="w-3 h-3 shrink-0"
      onError={() => setFailed(true)}
      alt=""
    />
  );
};

// Safari Header Component
export const SafariHeaderCenter = ({
  tabs,
  activeTabId,
  addressInput,
  setAddressInput,
  onNavigate,
  onGoBack,
  onGoForward,
  onRefresh,
  isSidebarOpen,
  setIsSidebarOpen,
}: SafariAppProps) => {
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const canGoBack = activeTab ? activeTab.historyIndex > 0 : false;
  const canGoForward = activeTab
    ? activeTab.historyIndex < activeTab.history.length - 1
    : false;
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      onNavigate(addressInput.trim());
      inputRef.current?.blur();
    }
  };

  return (
    <div className="flex items-center w-full gap-2 select-none text-neutral-800 font-sans px-1">
      {/* Sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
          isSidebarOpen
            ? "bg-neutral-200/80 text-neutral-700"
            : "text-neutral-500 hover:bg-neutral-200/60 hover:text-neutral-700"
        }`}
        title="Toggle Sidebar"
      >
        <IconLayoutSidebar className="w-[15px] h-[15px]" stroke={1.8} />
      </button>

      {/* Back / Forward */}
      <div className="flex items-center gap-0.5 shrink-0">
        <button
          onClick={onGoBack}
          disabled={!canGoBack}
          className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
            canGoBack
              ? "text-neutral-600 hover:bg-neutral-200/60 cursor-pointer"
              : "text-neutral-300 cursor-default"
          }`}
          title="Back"
        >
          <IconChevronLeft className="w-[16px] h-[16px]" stroke={2} />
        </button>
        <button
          onClick={onGoForward}
          disabled={!canGoForward}
          className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
            canGoForward
              ? "text-neutral-600 hover:bg-neutral-200/60 cursor-pointer"
              : "text-neutral-300 cursor-default"
          }`}
          title="Forward"
        >
          <IconChevronRight className="w-[16px] h-[16px]" stroke={2} />
        </button>
      </div>

      {/* Address Bar */}
      <form onSubmit={handleSubmit} className="flex-1 min-w-0 max-w-[480px] mx-auto">
        <div
          className={`flex items-center gap-1.5 rounded-[7px] px-2.5 h-[26px] transition-all ${
            isFocused
              ? "bg-white border border-blue-400/60 shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
              : "bg-neutral-200/60 border border-neutral-300/40 hover:bg-neutral-200/80"
          }`}
        >
          {isFocused ? (
            <IconWorld className="w-3 h-3 text-neutral-400 shrink-0" stroke={1.8} />
          ) : (
            <IconLock className="w-3 h-3 text-neutral-500 shrink-0" stroke={1.8} />
          )}

          <input
            ref={inputRef}
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              inputRef.current?.select();
            }}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-none text-[11px] text-neutral-800 focus:outline-none min-w-0 text-center focus:text-left"
            placeholder="Search or enter website name"
            spellCheck={false}
            autoComplete="off"
          />

          {/* Refresh — inside address bar */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onRefresh();
            }}
            className="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer p-0.5 rounded"
            title="Reload"
          >
            <IconRefresh className="w-3 h-3" stroke={2} />
          </button>
        </div>
      </form>

      {/* Spacer to balance traffic lights on left */}
      <div className="shrink-0 w-[66px]" />
    </div>
  );
};

// Safari Content component
export const SafariAppContent = ({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onAddTab,
  onNavigate,
  isSidebarOpen,
  refreshTrigger,
}: SafariAppProps) => {
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      setIframeKey((k) => k + 1);
    }
  }, [refreshTrigger]);

  return (
    <div className="flex flex-col h-[520px] w-full font-sans relative overflow-hidden bg-[#f0f0f0]">

      {/* Tab Bar */}
      <div className="flex items-end h-8 px-2 gap-0.5 bg-[#e8e8e8] select-none shrink-0 overflow-x-auto overflow-y-visible">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              style={{
                background: isActive ? "#ffffff" : "transparent",
                borderRadius: "7px 7px 0 0",
              }}
              className={`group flex items-center gap-1.5 px-2.5 h-[28px] min-w-[80px] max-w-[160px] cursor-pointer shrink-0 ${
                isActive ? "text-neutral-800" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {/* Close button */}
              <button
                onClick={(e) => onCloseTab(tab.id, e)}
                className={`shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? "opacity-0 group-hover:opacity-100 hover:bg-neutral-200 text-neutral-500"
                    : "opacity-0 group-hover:opacity-60 hover:bg-neutral-300/60 text-neutral-400"
                }`}
              >
                <IconX className="w-2 h-2" stroke={2.5} />
              </button>

              {/* Favicon + Title */}
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <SiteFavicon url={tab.url} />
                <span className="text-[11px] truncate leading-none font-[450]">
                  {tab.title}
                </span>
              </div>
            </div>
          );
        })}

        {/* New Tab button */}
        <button
          onClick={onAddTab}
          className="ml-1 mb-1 shrink-0 w-5 h-5 flex items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-300/60 hover:text-neutral-700 transition-colors cursor-pointer"
          title="New Tab"
        >
          <IconPlus className="w-3 h-3" stroke={2} />
        </button>
      </div>

      {/* Hairline separator */}
      <div className="w-full h-px bg-neutral-300/70 shrink-0" />

      {/* Main content zone */}
      <div className="flex flex-1 w-full overflow-hidden bg-white">

        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-[176px] h-full bg-[#f0f0f0] border-r border-neutral-300/60 py-3 px-2.5 flex flex-col gap-3 text-xs shrink-0 overflow-y-auto">
            <div>
              <p className="font-semibold text-neutral-400 uppercase tracking-wider text-[9px] mb-2 px-1">
                Favorites
              </p>
              <div className="flex flex-col gap-0.5">
                {[
                  { label: "Google", url: "https://www.google.com" },
                  { label: "Wikipedia", url: "https://en.wikipedia.org" },
                  { label: "GitHub", url: "https://github.com" },
                  { label: "YouTube", url: "https://www.youtube.com" },
                ].map(({ label, url }) => (
                  <button
                    key={url}
                    onClick={() => onNavigate(url)}
                    className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-md hover:bg-neutral-200/70 text-neutral-700 font-medium"
                  >
                    <SiteFavicon url={url} />
                    <span className="truncate">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Browser iframe */}
        <div className="flex-1 h-full overflow-hidden bg-white">
          <iframe
            key={iframeKey}
            src={
              activeTab.url.includes("localhost") || activeTab.url.includes("127.0.0.1")
                ? activeTab.url
                : `/api/proxy?url=${encodeURIComponent(activeTab.url)}`
            }
            className="w-full h-full border-none"
            title="Safari Web Content"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
          />
        </div>
      </div>
    </div>
  );
};
