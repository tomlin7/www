"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  IconCompass,
  IconSend,
  IconSignature,
  IconExternalLink,
  IconDeviceDesktop,
  IconUser,
  IconBrain,
  IconLoader2,
  IconAlertCircle,
  IconCheck,
} from "@tabler/icons-react";
import FishPond from "@/components/FishPond";

interface Message {
  sender: "user" | "ai";
  text: string;
  timestamp: number;
}

interface GuestSign {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

// Basic Profanity word list
const PROFANITY_WORDS = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "crap",
  "bastard",
  "dick",
  "pussy",
  "cunt",
  "nigger",
  "nigga",
  "faggot",
  "chink",
  "fuc",
  "sh1t",
  "b1tch",
  "retard",
];

const containsProfanity = (text: string) => {
  const words = text
    .toLowerCase()
    .split(/[\s,._\-]+/)
    .filter(Boolean);
  // Check if any word contains a profane term (or exactly matches one).
  // Avoid matching short benign words that are substrings of profane words (e.g. "hi" in "shit").
  return words.some((w) =>
    PROFANITY_WORDS.some((p) => w === p || w.includes(p)),
  );
};

export default function MiscPage() {
  // --- Env config ---
  const JSONBIN_BIN_ID = process.env.NEXT_PUBLIC_JSONBIN_BIN_ID;
  // --- AI Chat State ---
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hey! 👋 I'm Willy, a bot designed by Dheeraj. Ask me anything about his projects, background, skills, or professional experience!",
      timestamp: Date.now(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- Guestbook State ---
  const [guestSigns, setGuestSigns] = useState<GuestSign[]>([]);
  const [signName, setSignName] = useState("");
  const [signMessage, setSignMessage] = useState("");
  const [signError, setSignError] = useState("");
  const [signSuccess, setSignSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // --- Initialize Lists ---
  useEffect(() => {
    const load = async () => {
      if (JSONBIN_BIN_ID) {
        const ok = await fetchFromJSONBin(JSONBIN_BIN_ID);
        // if (!ok) {
        //   // fallback to defaults if fetch failed
        //   setGuestSigns(defaults);
        // }
      }
    };
    load();
  }, []);

  // --- Auto-scroll Chat ---
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages, isTyping]);

  // --- JSONBin Fetching & Syncing ---
  const fetchFromJSONBin = async (binId: string) => {
    console.log("fetchFromJSONBin (proxy) called", { binId });
    try {
      const res = await fetch(`/api/jsonbin?bin=${encodeURIComponent(binId)}`);
      if (res.ok) {
        const result = await res.json();
        const messages: GuestSign[] =
          result.record?.messages ||
          result.messages ||
          result.messages ||
          result.messages ||
          result.messages ||
          result.messages ||
          result;
        // jsonbin proxy returns the raw response from JSONBin; try to normalize
        if (Array.isArray(messages)) {
          setGuestSigns(messages);
        } else if (
          result?.record?.messages &&
          Array.isArray(result.record.messages)
        ) {
          setGuestSigns(result.record.messages);
        } else if (Array.isArray(result.messages)) {
          setGuestSigns(result.messages);
        } else {
          console.warn("Unexpected JSONBin proxy payload:", result);
          return false;
        }
      } else {
        console.warn("JSONBin proxy fetch failed:", res.status, res.statusText);
        const text = await res.text();
        console.warn(text);
        return false;
      }
    } catch (err) {
      console.error("JSONBin proxy load error:", err);
      return false;
    }

    return true;
  };

  const syncToJSONBin = async (id: string, data: GuestSign[]) => {
    setIsSyncing(true);
    console.log("syncToJSONBin (proxy) called", {
      id,
      count: data.length,
    });
    try {
      const res = await fetch(`/api/jsonbin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bin: id, messages: data }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.warn(
          "JSONBin proxy sync failed:",
          res.status,
          res.statusText,
          text,
        );
        return false;
      } else {
        console.log("JSONBin proxy sync success");
        return true;
      }
    } catch (err) {
      console.error("JSONBin proxy sync error:", err);
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  // --- AI Logic ---
  const handleAISend = (textToSend?: string) => {
    const rawInput = textToSend || chatInput;
    if (!rawInput.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: "user",
      text: rawInput.trim(),
      timestamp: Date.now(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const responseText = generateResponse(rawInput);
      const aiMsg: Message = {
        sender: "ai",
        text: responseText,
        timestamp: Date.now(),
      };
      setChatMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const generateResponse = (input: string): string => {
    const query = input.toLowerCase();

    if (query.includes("biscuit")) {
      return "Biscuit is my native, lightweight code editor written in Python and Tree-sitter. It operates under 20MB, features integrated AI coding agents, and has collected 256+ stars on GitHub.";
    }
    if (query.includes("ted")) {
      return "ted is an agent-native IDE platform built with Tauri, Rust, and WebAssembly. It streamlines agentic code-manipulation loops, yielding 30% faster execution and a 40% reduction in startup lag.";
    }
    if (query.includes("hypercode")) {
      return "Hypercode is a lightweight autonomous CLI coding framework utilizing a ReAct reasoning loop, Gemini 2.0, and Pinecone, yielding a 35% higher code-generation success rate.";
    }
    if (
      query.includes("neurodriver") ||
      query.includes("autonomous") ||
      query.includes("driving")
    ) {
      return "NeuroDriver is a 3D WebGL physics-based simulation engine built for neural research and autonomous vehicles. In safety testing, it demonstrated a 99.8% collision prevention rate.";
    }
    if (query.includes("campfire") || query.includes("discord")) {
      return "Campfire is a serverless Discord clone built with Next.js and Supabase in 2 days. It handles real-time message sync, global avatar hosting, and active session tokens.";
    }
    if (
      query.includes("experience") ||
      query.includes("work") ||
      query.includes("internship") ||
      query.includes("intern")
    ) {
      return "My professional experience includes:\n• Morvion (Software Engineer Intern, Dec '25 – Mar '26): Built scalable backend architectures.\n• Hooman Digital (Full-Stack Developer Intern, Jul '25 – Oct '25): Developed responsive client interfaces.\n• NIT Calicut (Deep Learning Research Intern, May '25 – Jul '25): Focused on computer vision and neural systems.\n• Ozi (Software Engineer Intern, Nov '24 – Feb '25): Built backend endpoints and scripting.";
    }
    if (
      query.includes("skills") ||
      query.includes("languages") ||
      query.includes("tech") ||
      query.includes("stack")
    ) {
      return "Here's my core technical stack:\n• Languages: Python, Go (Golang), Modern C++ (C++17/20), TypeScript, Rust, Assembly (x86/ARM), SQL, Bash\n• Backend & Architecture: Microservices, REST/gRPC/GraphQL API Design, Protobuf, WebSockets, IPC, Ledgers\n• Data & Streaming: Apache Kafka, RabbitMQ (AMQP), Redis Pub/Sub, Asynchronous Event-Driven Architecture\n• Storage & Reliability: Distributed SQL (Cloud Spanner, CockroachDB), PostgreSQL, pgvector, Redis Cluster, Database Sharding, Connection Pooling, Rate-Limiting, Idempotency Patterns\n• AI & Agentic Infrastructure: Agentic AI, Multi-Agent Systems (LangGraph), Tool Calling, Model Context Protocol (MCP), Context Engineering, Retrieval-Augmented Generation (RAG), Vector Search Systems (Pinecone/Qdrant), LLMs, PyTorch\n• Systems & Tooling: Linux Systems Programming, LLVM, Concurrency & Multithreading\n• Infrastructure & DevOps: Docker, Kubernetes, OpenTelemetry, Grafana, CI/CD, GitHub Actions, Shell Scripting";
    }
    if (
      query.includes("hello") ||
      query.includes("hi") ||
      query.includes("hey")
    ) {
      return "Hello! 👋 I'm Willy, a bot designed by Dheeraj. Feel free to ask me about my key projects, workspace setup, engineering intern experience, or core programming skills!";
    }
    if (query.includes("contact") || query.includes("email")) {
      return "You can get in touch with me directly at hello@tomlin7.com. Let's build something cool!";
    }
    if (
      query.includes("education") ||
      query.includes("college") ||
      query.includes("bit")
    ) {
      return "I am currently pursuing my Bachelor's degree in Computer Science and Engineering at BIT Mesra, graduating in 2027.";
    }
    if (query.includes("lemon")) {
      return "Lemon is an interpreted programming language written from scratch in Go, achieving a 20% runtime performance advantage over similar basic engines.";
    }
    if (query.includes("ember")) {
      return "Ember is a modular, real-time C++ game engine with OpenGL, GLFW, and an ImGui debug overlay that cuts prototyping cycles by 25%.";
    }

    return "I'm Willy, a bot designed by Dheeraj. Try asking me about:\n• Key projects (like Biscuit, ted, Hypercode)\n• Work history (Morvion, Hooman Digital)\n• Tech stack and skills\n• Contact details";
  };

  // --- Guestbook Logic ---
  const handleGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignError("");
    setSignSuccess(false);

    const name = signName.trim();
    const msg = signMessage.trim();

    if (!name || !msg) {
      setSignError("Both name and message fields are required.");
      return;
    }

    if (name.length > 30) {
      setSignError("Name must be 30 characters or less.");
      return;
    }

    if (msg.length > 200) {
      setSignError("Message must be 200 characters or less.");
      return;
    }

    if (containsProfanity(name) || containsProfanity(msg)) {
      setSignError("Keep it clean! Cursing/profanity is not allowed.");
      return;
    }

    const newSign: GuestSign = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      message: msg,
      timestamp: Date.now(),
    };

    const updated = [newSign, ...guestSigns];
    setGuestSigns(updated);

    setSignName("");
    setSignMessage("");
    setSignSuccess(true);

    if (JSONBIN_BIN_ID) {
      console.log("syncing to JSONBin...");
      const ok = await syncToJSONBin(JSONBIN_BIN_ID, updated);
      if (!ok) {
        setSignError("Failed to sync to remote bin. See console for details.");
      }
    } else {
      setSignError(
        "No JSONBin BIN ID configured (NEXT_PUBLIC_JSONBIN_BIN_ID). Unable to save remotely.",
      );
    }

    setTimeout(() => setSignSuccess(false), 2000);
  };

  // --- PC Desktop Launcher ---
  const launchPC = () => {
    window.dispatchEvent(new CustomEvent("open-desktop-reveal"));
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-20 space-y-6 font-sans">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1 mb-1">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-7 h-7 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
              <IconCompass className="w-4 h-4 text-white/90" />
            </div>
            <span className="text-white text-sm uppercase tracking-widest font-semibold">
              MISCELLANEOUS
            </span>
          </div>
          <p className="text-white/70 text-[13px] leading-snug tracking-normal max-w-xl">
            Talk to my persona, check guestbook, and my virtual desktop.
          </p>
        </div>
        <div className="bg-[#111111]/80 px-3.5 py-1.5 rounded-xl w-fit shrink-0 shadow-md">
          <span className="text-[12px] text-[#a1a1aa] uppercase tracking-normal">
            Modules:{" "}
          </span>
          <span className="text-[13px] text-white font-bold font-mono">4</span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-1">
        {/* Module 1: AI Chat Widget */}
        <div className="bg-[#111111] rounded-[24px] p-5 h-[520px] flex flex-col justify-between border border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.1)] relative">
          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto py-3 space-y-3 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent"
          >
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                    msg.sender === "user"
                      ? "bg-white/10 text-white"
                      : "bg-[#162a1f] text-[#10b981]"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <IconUser className="w-3 h-3" />
                  ) : (
                    "WI"
                  )}
                </div>
                <div
                  className={`p-3 rounded-2xl text-[12.5px] leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-white/[0.07] text-white rounded-tr-none"
                      : "bg-white/[0.03] text-white/90 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                <div className="w-6 h-6 rounded-full bg-[#162a1f] text-[#10b981] flex items-center justify-center text-[10px] font-bold">
                  AI
                </div>
                <div className="bg-white/[0.03] p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <IconLoader2 className="w-3.5 h-3.5 text-white/40 animate-spin" />
                  <span className="text-white/40 text-[11px] font-medium font-mono">
                    Thinking...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-1.5 pb-2.5 pt-1">
            {[
              { label: "What is Biscuit?", query: "Tell me about Biscuit" },
              { label: "Skills", query: "What are Dheeraj's skills?" },
              { label: "Experience", query: "View Work Experience" },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => handleAISend(s.query)}
                className="focus:outline-none bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] rounded-full px-2.5 py-1 text-[10px] text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex gap-2 pt-2 border-t border-white/[0.04]">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAISend()}
              placeholder="Ask me something..."
              className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2 text-[12.5px] text-white focus:outline-none focus:border-white/10 transition-colors placeholder:text-white/20"
            />
            <button
              onClick={() => handleAISend()}
              className="bg-white hover:bg-white/90 text-black p-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center shrink-0 cursor-pointer"
            >
              <IconSend className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Module 2: Guestbook Widget */}
        <div className="bg-[#111111] rounded-[24px] p-5 h-[520px] flex flex-col justify-between border border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.1)] relative">
          <div className="flex items-center gap-2 pb-3 border-b border-white/[0.04]">
            <div className="w-6 h-6 rounded-md bg-[#162a1f] text-[#10b981] flex items-center justify-center">
              <IconSignature className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-white text-[14px] font-bold tracking-tight">
              Guestbook
            </h3>
            {isSyncing && (
              <span className="flex items-center gap-1 text-[10px] text-white/40 ml-auto animate-pulse">
                <IconLoader2 className="w-3.5 h-3.5 animate-spin" /> Syncing...
              </span>
            )}
          </div>

          <div className="relative flex-1 overflow-hidden flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent max-h-[300px]">
              {guestSigns.map((sign) => (
                <div
                  key={sign.id}
                  className="bg-white/[0.02] p-3 rounded-2xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-[12.5px] font-bold tracking-tight">
                      {sign.name}
                    </span>
                    <span className="text-white/20 text-[10px]">
                      {new Date(sign.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-white/70 text-[12px] leading-relaxed">
                    {sign.message}
                  </p>
                </div>
              ))}
            </div>

            {/* Submission Form */}
            <form
              onSubmit={handleGuestSubmit}
              className="pt-3 border-t border-white/[0.04] space-y-2 mt-2 bg-[#111111] z-10"
            >
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={signName}
                  onChange={(e) => setSignName(e.target.value)}
                  className="col-span-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2 text-[12px] text-white focus:outline-none focus:border-white/10 placeholder:text-white/20"
                />
                <input
                  type="text"
                  placeholder="Leave a message..."
                  value={signMessage}
                  onChange={(e) => setSignMessage(e.target.value)}
                  className="col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2 text-[12px] text-white focus:outline-none focus:border-white/10 placeholder:text-white/20"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-[10px] text-white/30 flex items-center gap-1">
                  <span>No signup required</span>
                </div>
                <button
                  type="submit"
                  className="bg-white hover:bg-white/90 text-black text-[11.5px] font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                >
                  Sign Book
                </button>
              </div>

              {signError && (
                <div className="flex items-center gap-1 text-red-400 text-[11px] font-medium pt-1">
                  <IconAlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{signError}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Module 3: Explore my PC */}
        <div
          onClick={launchPC}
          data-haptic="success"
          className="relative group w-full cursor-pointer z-10 hover:z-20 focus:outline-none"
        >
          {/* Main Card Container */}
          <div className="bg-[#111111] rounded-[24px] p-5 h-[220px] flex flex-col justify-between transition-all duration-300 relative z-10 group-hover:bg-[#151515] group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Card visual contents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            <div className="flex flex-col gap-1 z-10">
              <span className="text-white text-[15px] font-bold tracking-tight">
                My Desktop
              </span>
              <p className="text-white/50 text-[12px] max-w-sm">
                Boot into a virtual desktop, open file managers, and inspect
                shell terminals.
              </p>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-bold text-white/40 group-hover:text-white transition-colors uppercase tracking-wider z-10">
              <span>Launch Desktop</span>
              <IconExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Sliding Tab for Hover State */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full group-hover:translate-y-[-2px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-0 bg-[#151515] text-[10px] tracking-wider uppercase font-semibold text-white/45 px-4 pt-2 pb-1.5 rounded-b-xl pointer-events-none whitespace-nowrap shadow-md flex items-center gap-1">
            <span>Click to Launch Desktop</span>
            <IconExternalLink className="w-3 h-3 text-white/40" />
          </div>
        </div>

        {/* Module 4: Interactive Koi Fish Pond */}
        <div className="bg-[#111111] rounded-[24px] h-[220px] flex flex-col relative overflow-hidden border border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <FishPond />
        </div>
      </div>
    </div>
  );
}
