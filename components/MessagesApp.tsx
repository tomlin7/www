"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";

interface Contact {
  id: string;
  name: string;
  memoji: string;
  snippet: string;
  time: string;
}

interface Message {
  sender: "user" | "them";
  text: string;
  timestamp: number;
  hasImage?: boolean;
}

interface MessagesAppContentProps {
  activeContact: Contact;
  onSelectContact: (c: Contact) => void;
  chatInput: string;
  setChatInput: (s: string) => void;
  chatMessages: Message[];
  onSendMessage: () => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  contacts: Contact[];
  isTyping: boolean;
}

export const MessagesHeaderCenter = ({
  activeContact,
  onMenuClick,
  onComposeClick,
}: {
  activeContact: Contact;
  onMenuClick: () => void;
  onComposeClick: () => void;
}) => {
  return (
    <div className="flex items-center w-full h-full select-none">
      {/* Left panel header area (aligned with left panel: 96px traffic lights + 164px = 260px) */}
      <div className="w-[164px] h-12 flex items-center justify-end pr-3 shrink-0">
        <button
          onClick={onMenuClick}
          className="text-white/60 hover:text-white p-1.5 cursor-pointer transition-colors rounded-lg hover:bg-white/5 active:scale-95"
        >
          <svg
            className="w-4.5 h-4.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Right panel header area (aligned with right panel) */}
      <div className="flex-1 flex items-center justify-between px-4 h-12">
        <button
          onClick={onComposeClick}
          className="text-white/60 hover:text-white p-1.5 cursor-pointer transition-colors rounded-lg hover:bg-white/5 active:scale-95"
          title="Chat with Willy (AI)"
        >
          <svg
            className="w-4.5 h-4.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        {/* Contact detail badge */}
        <div className="flex items-center space-x-1.5 cursor-pointer group bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1 rounded-full border border-white/5 transition-all active:scale-98">
          {activeContact.id === "aileen" ? (
            <div className="relative w-5 h-5 shrink-0">
              <div className="absolute top-0 left-0 w-3.5 h-3.5 rounded-full border border-white/10 overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/adventurer/svg?seed=Aileen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border border-white/10 overflow-hidden z-10">
                <img
                  src="https://api.dicebear.com/7.x/adventurer/svg?seed=Rich"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <img
              src={activeContact.memoji}
              className="w-5 h-5 rounded-full object-cover border border-white/10"
            />
          )}
          <span className="text-[11.5px] font-semibold text-white/90 group-hover:text-white transition-colors">
            {activeContact.name}
          </span>
          <span className="text-[9px] text-white/40 group-hover:text-white/60 transition-colors">
            &gt;
          </span>
        </div>
        <div className="w-6" /> {/* Balance space */}
      </div>
    </div>
  );
};

export const MessagesAppContent = ({
  activeContact,
  onSelectContact,
  chatInput,
  setChatInput,
  chatMessages,
  onSendMessage,
  searchQuery,
  setSearchQuery,
  contacts,
  isTyping,
}: MessagesAppContentProps) => {
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  return (
    <div className="flex h-[480px] w-full text-white bg-[#121214] font-sans relative overflow-hidden select-none">
      {/* Left panel - Contacts list */}
      <div className="w-[260px] h-full relative border-r border-white/[0.06] bg-[#1a1a1e] shrink-0">
        {/* Sidebar Header + Searchbar Unified Dark to Transparent Fade */}
        <div className="absolute top-0 left-0 w-full h-[120px] z-10 bg-gradient-to-b from-[#1a1a1e] via-[#1a1a1e]/95 to-transparent pointer-events-none" />

        {/* Transparent Search Bar (Content sits at z-20) */}
        <div className="absolute top-8 left-0 w-full h-14 z-20 bg-transparent p-3 flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="bg-zinc-800 focus:bg-zinc-600 rounded-lg text-xs py-2 pl-8 pr-3 w-full text-white placeholder-white/30 focus:outline-none transition-all duration-200"
            />
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <IconX className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Contacts list (Scrolls underneath header & search bar) */}
        <div className="absolute inset-0 pt-[90px] overflow-y-auto custom-scrollbar flex flex-col z-0">
          {filteredContacts.map((c) => {
            const isActive = c.id === activeContact.id;
            return (
              <div
                key={c.id}
                onClick={() => onSelectContact(c)}
                className={`flex items-center space-x-3 p-3.5 text-left w-full hover:bg-white/[0.04] transition-colors duration-150 relative cursor-default select-none border-b border-white/[0.02] shrink-0 ${
                  isActive ? "bg-[#0a84ff] text-white hover:bg-[#0a84ff]" : ""
                }`}
              >
                {/* Memoji avatar */}
                {c.id === "aileen" ? (
                  <div className="relative w-11 h-11 shrink-0">
                    <div className="absolute top-0 left-0 w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-white/5">
                      <img
                        src="https://api.dicebear.com/7.x/adventurer/svg?seed=Aileen"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-white/5 z-10">
                      <img
                        src="https://api.dicebear.com/7.x/adventurer/svg?seed=Rich"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative shrink-0 w-11 h-11 rounded-full overflow-hidden bg-white/5 flex items-center justify-center border border-white/10">
                    <img
                      src={c.memoji}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {/* Contact details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="text-[12.5px] font-semibold truncate pr-2 leading-tight">
                      {c.name}
                    </h4>
                    <span
                      className={`text-[10px] shrink-0 font-medium ${isActive ? "text-white/80" : "text-white/40"}`}
                    >
                      {c.time}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] truncate leading-normal ${isActive ? "text-white/90" : "text-white/40"}`}
                  >
                    {c.snippet}
                  </p>
                </div>
              </div>
            );
          })}
          {filteredContacts.length === 0 && (
            <div className="p-8 text-center text-xs text-white/30 select-none">
              No results found
            </div>
          )}
        </div>
      </div>

      {/* Right panel - Chat messages */}
      <div className="flex-1 h-full relative bg-[#0e0e10]">
        {/* Right Panel Header Unified Dark to Transparent Fade */}
        <div className="absolute top-0 left-0 w-full h-[100px] z-10 bg-gradient-to-b from-[#0e0e10] via-[#0e0e10]/90 to-transparent pointer-events-none" />

        {/* Messages list (Scrolls underneath header & input bar) */}
        <div className="absolute inset-0 pt-[72px] pb-20 overflow-y-auto custom-scrollbar px-5 py-4 space-y-3.5 z-0">
          {chatMessages.map((msg, idx) => {
            const isMe = msg.sender === "user";

            // Render custom attachment image
            if (msg.hasImage) {
              return (
                <div key={idx} className="flex justify-end pr-2">
                  <div className="w-[240px] rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-neutral-900">
                    <img
                      src="https://res.cloudinary.com/dwmxbkhch/image/upload/v1779531121/mac-sequoia-wallpaper-1152x648_dk1qwt.jpg"
                      alt="Sand Dunes attachment"
                      className="w-full h-[150px] object-cover"
                    />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-2.5 px-4 rounded-[19px] text-[13px] max-w-[75%] leading-relaxed break-words shadow-sm whitespace-pre-wrap ${
                    isMe
                      ? "bg-[#30d158] text-white rounded-br-[4px]"
                      : "bg-[#262629]/95 text-white/95 rounded-bl-[4px]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#262629]/95 p-3 px-4 rounded-[19px] rounded-tl-[4px] flex items-center space-x-1 shadow-sm">
                <span
                  className="w-1.5 h-1.5 bg-white/45 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-white/45 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-white/45 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}

          {/* Read Receipt */}
          {chatMessages.length > 0 &&
            chatMessages[chatMessages.length - 1].sender === "user" &&
            !isTyping && (
              <div className="text-[10px] text-white/35 text-right pr-2 select-none">
                Read
              </div>
            )}

          <div ref={messagesEndRef} />
        </div>

        {/* DARK INPUT BAR (Sticky at bottom) */}
        <div className="absolute bottom-0 left-0 w-full bg-[#0e0e10] border-t border-white/[0.04] p-3 px-4 flex items-center space-x-3.5 z-10">
          <button className="text-white/60 hover:text-white shrink-0 cursor-pointer p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all active:scale-95">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

          <div className="flex-grow relative flex items-center bg-white/[0.06] border border-white/[0.04] rounded-full px-4 py-1.5 focus-within:border-white/15 focus-within:bg-white/[0.09] transition-all">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
              placeholder="iMessage"
              className="flex-1 bg-transparent border-none text-[13px] text-white placeholder-white/25 focus:outline-none pr-10"
            />
            {/* Audio Waveform icon & Emoji button */}
            <div className="absolute right-3.5 flex items-center space-x-2 text-white/35">
              <button className="hover:text-white cursor-pointer transition-colors p-0.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
              <button className="hover:text-white cursor-pointer transition-colors p-0.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
