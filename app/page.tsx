'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DraggableWindow } from '@/components/Window';
import { Dock, DockItem } from '@/components/Dock';
import { DesktopFolder } from '@/components/DesktopIcon';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DropdownMenu } from '@/components/DropdownMenu';
import { ControlPanel, ControlItem } from '@/components/ControlPanel';
import { Keyboard, type KeyboardInteractionEvent } from "@/components/ui/keyboard";

// Project Card Component
const ProjectCard = ({ name, description, language, languageColor, stars, forks, isFeatured }: any) => (
  <div className={`group relative bg-white/60 hover:bg-white/80 border border-gray-200/50 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 cursor-default flex flex-col h-full ${isFeatured ? 'col-span-2 row-span-1 shadow-md border-blue-200' : ''}`}>
    <div className="flex items-center space-x-4 mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${languageColor || 'bg-gray-100'} bg-opacity-10 text-xl`}>
        {name[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="text-[17px] font-bold text-gray-900 truncate tracking-tight">{name}</h3>
          {isFeatured && <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Featured</span>}
        </div>
        <p className="text-[12px] text-gray-500 font-medium truncate opacity-70 italic">{language || 'General Tool'}</p>
      </div>
    </div>
    <p className={`text-[14px] text-gray-600 mb-6 flex-grow leading-relaxed ${isFeatured ? 'line-clamp-2' : 'line-clamp-3'}`}>
      {description}
    </p>
    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100/30">
      <div className="flex items-center space-x-3 text-[12px] text-gray-400 font-semibold">
        {stars !== undefined && (
          <div className="flex items-center hover:text-blue-500 transition-colors">
            <svg className="w-4 h-4 mr-1 fill-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {stars}
          </div>
        )}
        {forks !== undefined && (
          <div className="flex items-center hover:text-blue-500 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {forks}
          </div>
        )}
      </div>
      <button className="text-[12px] font-bold text-blue-500 hover:text-blue-600 px-4 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full transition-all active:scale-95 group-hover:shadow-sm">
        View Project
      </button>
    </div>
  </div>
);

// Profile Window Content
const ProfileWindowContent = ({ isLinkedIn }: { isLinkedIn: boolean }) => (
  <div className="p-8 bg-white/40 rounded-b-xl max-h-[600px] overflow-y-auto custom-scrollbar">
    <div className="mb-6">
      <h1 className="font-serif-italic text-6xl text-gray-900 mb-4 tracking-tight">
        {isLinkedIn ? "HEY, i'm Dheeraj C.!" : "HEY, i'm @tomlin7!"}
      </h1>
      <div className="flex flex-wrap gap-2">
        <p className="font-mono-custom text-[13px] text-gray-500 bg-gray-100/50 inline-block px-3 py-1.5 rounded-md border border-gray-200/50">
          systems & software engineer // systems • compilers • full-stack
        </p>
        {isLinkedIn && (
          <p className="font-mono-custom text-[13px] text-blue-600 bg-blue-50/50 inline-block px-3 py-1.5 rounded-md border border-blue-200/50">
            ranchi, jh • +91-8304981017
          </p>
        )}
      </div>
    </div>
    <hr className="border-t border-gray-300/60 my-6" />
    <ul className="space-y-4 text-[15px] leading-relaxed text-gray-700">
      {isLinkedIn && (
        <li className="flex items-start bg-blue-50/30 p-4 rounded-xl border border-blue-100/50">
          <div className="grid grid-cols-2 gap-6 w-full text-[13px] font-medium">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Email</span>
              <a href="mailto:dheerajcofficial@gmail.com" className="text-blue-600 hover:underline">dheerajcofficial@gmail.com</a>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Github</span>
              <a href="https://github.com/tomlin7" className="text-blue-600 hover:underline">github.com/tomlin7</a>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">LinkedIn</span>
              <a href="https://linkedin.com/in/initdhee" className="text-blue-600 hover:underline">linkedin.com/in/initdhee</a>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Education</span>
              <span className="text-gray-900">BIT Mesra • B.Tech CSE (2027)</span>
            </div>
          </div>
        </li>
      )}
      <li className="flex items-start">
        <span className="text-blue-500 font-bold mr-3 mt-0.5">»</span>
        <span>i'm focused on building things close to the metal and shipping real products.</span>
      </li>
      <li className="flex items-start">
        <span className="text-blue-500 font-bold mr-3 mt-0.5">»</span>
        <span>i'm currently working on <a href="#" className="text-blue-600 hover:underline font-medium">ted.sh</a></span>
      </li>
      <li className="flex items-start">
        <span className="text-blue-500 font-bold mr-3 mt-0.5">»</span>
        <span>i work on sophisticated agentic code editors <span className="text-xs text-gray-400">[1]</span> <span className="text-xs text-gray-400">[2]</span> and devtools <span className="text-xs text-gray-400">[3]</span> <span className="text-xs text-gray-400">[4]</span>, game engines <span className="text-xs text-gray-400">[5]</span>, rendering <span className="text-xs text-gray-400">[6]</span>, compilers <span className="text-xs text-gray-400">[7]</span> <span className="text-xs text-gray-400">[8]</span> <span className="text-xs text-gray-400">[9]</span>, games, to scalable backend services and production web apps.</span>
      </li>
      <li className="flex items-start">
        <span className="text-blue-500 font-bold mr-3 mt-0.5">»</span>
        <span>i care about performance, clean architecture, and understanding how things actually work under the hood.</span>
      </li>
      <li className="flex items-start">
        <span className="text-blue-500 font-bold mr-3 mt-0.5">»</span>
        <span>occasionally, i log out and pick up a pencil 🎨</span>
      </li>
    </ul>

    {isLinkedIn && (
      <div className="mt-8 pt-8 border-t border-gray-300/60">
        <h4 className="text-[11px] font-bold text-gray-500/80 mb-4 uppercase tracking-tight">Core Competencies</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-[12px] font-bold text-gray-900 mb-2">Languages</h5>
            <p className="text-[13px] text-gray-600">Python, TypeScript, Go, C, C++, Rust, SQL</p>
          </div>
          <div>
            <h5 className="text-[12px] font-bold text-gray-900 mb-2">Systems</h5>
            <p className="text-[13px] text-gray-600">REST, RPC, PTY, Tree-sitter, Compiler Design</p>
          </div>
          <div>
            <h5 className="text-[12px] font-bold text-gray-900 mb-2">AI/ML</h5>
            <p className="text-[13px] text-gray-600">PyTorch, LangChain, Ollama, Pinecone</p>
          </div>
          <div>
            <h5 className="text-[12px] font-bold text-gray-900 mb-2">Infra</h5>
            <p className="text-[13px] text-gray-600">Docker, AWS, PostgreSQL, Kubernetes</p>
          </div>
        </div>
      </div>
    )}
  </div>
);

// Experience Window Content
const ExperienceWindowContent = () => {
    const experiences = [
        {
            title: "Full-Stack Developer Intern",
            company: "Morvion– ZH, Switzerland (Remote)",
            period: "Nov 2025– Feb 2026",
            description: [
                "Architected and deployed a full-scale CRM from scratch using NestJS and Drizzle, implementing multi-workspace collaboration, Kanban pipelines, and Gmail API sync for automated contact management.",
                "Engineered production-ready SaaS features including Stripe-integrated subscription/credit systems and administrative dashboards, while developing high-fidelity interactive UIs with Three.js, R3F."
            ]
        },
        {
            title: "Full-Stack Developer Intern",
            company: "Hooman Digital– India (Remote)",
            period: "July 2025– Sept 2025",
            description: [
                "Architected chartor.ai, an agentic trading platform with multimodal LLM layers to interpret live financial charts; managed a monorepo for cross-platform deployment across web, desktop, and browser extensions.",
                "Standardized internal company infrastructure by engineering provider-agnostic Agent SDKs in Python for cross-team LLM orchestration."
            ]
        },
        {
            title: "Deep Learning Research Intern",
            company: "NIT Calicut– Calicut, India",
            period: "May 2025– July 2025",
            description: [
                "Developed CNN-Transformer fusion models classifying EEG motor imagery across 2, 3, and 4-class tasks under cross-subject validation; generated attention topographic maps for interpretability"
            ]
        },
        {
            title: "Founding Software Engineer Intern",
            company: "OZi– Gurugram, India (Remote)",
            period: "Oct 2024– Jan 2025",
            description: [
                "Architected the zero-to-one MVP for a specialized quick-commerce platform, designing the core data models and business logic required to support high-concurrency ordering and real-time inventory tracking.",
                "Engineered the foundational full-stack infrastructure in Flutter and NodeJS, establishing the technical baseline that powered the startup’s growth."
            ]
        }
    ];

    return (
        <div className="flex h-[550px] bg-white rounded-b-xl overflow-hidden">
            {/* Finder-style Sidebar */}
            <div className="w-[180px] bg-[#EBEBEB]/80 backdrop-blur-xl p-4 flex flex-col border-r border-gray-200/50">
                <div className="space-y-6 flex-1 overflow-y-auto">
                    <div>
                        <h4 className="text-[11px] font-bold text-gray-500/80 mb-2 px-2 uppercase tracking-tight">Timeline</h4>
                        <div className="space-y-1">
                            <button className="w-full text-left px-2 py-1.5 text-[13px] font-medium bg-gray-200/60 rounded-lg flex items-center">
                                <span className="w-4 h-4 mr-2 text-blue-500 flex items-center justify-center">💼</span> Internships
                            </button>
                            <button className="w-full text-left px-2 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-200/40 rounded-lg flex items-center transition-colors">
                                <span className="w-4 h-4 mr-2 opacity-70 flex items-center justify-center">🎓</span> Education
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#FAFAFA]/50 custom-scrollbar">
                <div className="mb-10">
                    <h2 className="text-4xl font-serif-italic mb-2 tracking-tight">Experience</h2>
                    <p className="text-gray-500 text-[14px] font-medium max-w-lg">
                        My professional journey and roles i've undertaken.
                    </p>
                </div>

                <div className="space-y-10">
                    {experiences.map((exp, i) => (
                        <div key={i} className="relative pl-6 border-l-2 border-blue-500/20">
                            <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm" />
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">{exp.title}</h3>
                                <span className="text-[12px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{exp.period}</span>
                            </div>
                            <p className="text-[14px] font-bold text-blue-600 mb-3">{exp.company}</p>
                            <ul className="space-y-2">
                                {exp.description.map((bullet, j) => (
                                    <li key={j} className="text-[14px] text-gray-600 leading-relaxed flex items-start">
                                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Projects Window Content
const ProjectsWindowContent = ({ searchQuery }: { searchQuery: string }) => {
  const projects = [
    {
      name: 'biscuit',
      description: 'biscuit is a fast, extensible, native code editor with agents. lightweight <20 mb in size. install and start using in seconds.',
      language: 'Python',
      languageColor: 'bg-blue-500',
      stars: 254,
      forks: 32,
      isFeatured: true,
    },
    {
      name: 'ted-industries/ted',
      description: 'a minimal code editor for agents built with accessibility and performance in mind.',
      language: 'TypeScript',
      languageColor: 'bg-blue-600',
      stars: 12,
    },
    {
      name: 'Logicarium',
      description: 'Logicarium is a minimalist, performant, visual logic design environment. Design complex digital systems using a high-density, performant interface.',
      language: 'C++',
      languageColor: 'bg-pink-500',
      stars: 5,
    },
    {
      name: 'Positron',
      description: 'High-performance desktop applications with Python and modern web frameworks. Fast by design. Minimal by choice.',
      language: 'Python',
      languageColor: 'bg-blue-500',
      stars: 45,
    },
    {
      name: 'Ember',
      description: 'Game Engine written in C++ for real-time 3D rendering and physics simulation.',
      language: 'C++',
      languageColor: 'bg-pink-500',
      stars: 17,
    },
  ];

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[550px] bg-white rounded-b-xl overflow-hidden">
      {/* Finder-style Sidebar */}
      <div className="w-[180px] bg-[#EBEBEB]/80 backdrop-blur-xl p-4 flex flex-col border-r border-gray-200/50">
        <div className="space-y-6 flex-1 overflow-y-auto">
          <div>
            <h4 className="text-[11px] font-bold text-gray-500/80 mb-2 px-2 uppercase tracking-tight">Favorites</h4>
            <div className="space-y-1">
              <button className="w-full text-left px-2 py-1.5 text-[13px] font-medium bg-gray-200/60 rounded-lg flex items-center">
                <span className="w-4 h-4 mr-2 text-blue-500 flex items-center justify-center">🏠</span> All Projects
              </button>
              <button className="w-full text-left px-2 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-200/40 rounded-lg flex items-center transition-colors">
                <span className="w-4 h-4 mr-2 opacity-70 flex items-center justify-center">📁</span> Recents
              </button>
              <button className="w-full text-left px-2 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-200/40 rounded-lg flex items-center transition-colors">
                <span className="w-4 h-4 mr-2 opacity-70 flex items-center justify-center">🚀</span> Applications
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-gray-500/80 mb-2 px-2 uppercase tracking-tight">Tags</h4>
            <div className="space-y-1">
              <button className="w-full text-left px-2 py-1 text-[12px] text-gray-600 flex items-center hover:bg-gray-200/40 rounded-md">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></span> Personal
              </button>
              <button className="w-full text-left px-2 py-1 text-[12px] text-gray-600 flex items-center hover:bg-gray-200/40 rounded-md">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-2"></span> Work
              </button>
              <button className="w-full text-left px-2 py-1 text-[12px] text-gray-600 flex items-center hover:bg-gray-200/40 rounded-md">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2"></span> OSS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#FAFAFA]/50 custom-scrollbar">
        <div className="mb-10">
          <h2 className="text-4xl font-serif-italic mb-2 tracking-tight">My Craft</h2>
          <p className="text-gray-500 text-[14px] font-medium max-w-lg">
            A selection of my best work, ranging from systems engineering to creative tools.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 pb-8">
          {filtered.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 py-20 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-400 font-medium">No projects matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Constants for Text Generation
const WORD_POOL = ["here", "will", "which", "person", "must", "public", "other", "much", "about", "how", "come", "way", "after", "like", "each", "old", "there", "down", "very", "call", "than", "now", "word", "open", "all", "home", "school", "could", "number", "show", "into", "get", "make", "through", "find", "what", "with", "new", "point", "group", "since", "mean", "against", "right", "great"];
const PUNCTUATION = [".", ",", "!", "?", ";", ":"];

const generateTargetText = (isPunctuation: boolean, isNumbers: boolean) => {
  let text = [];
  for (let i = 0; i < 50; i++) {
    let word = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
    if (isPunctuation) {
      if (Math.random() > 0.8) word = word.charAt(0).toUpperCase() + word.slice(1);
      if (Math.random() > 0.9) word += PUNCTUATION[Math.floor(Math.random() * PUNCTUATION.length)];
    }
    if (isNumbers && Math.random() > 0.85) {
      text.push(Math.floor(Math.random() * 100).toString());
    }
    text.push(word);
  }
  return text.join(" ");
};

// Unified Compact Typing Module
const CompactTypingModule = ({ userInput, setUserInput }: { userInput: string; setUserInput: React.Dispatch<React.SetStateAction<string>> }) => {
  const [isPunctuation, setIsPunctuation] = useState(false);
  const [isNumbers, setIsNumbers] = useState(false);
  const [timeOption, setTimeOption] = useState(15);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [targetText, setTargetText] = useState("");
  const moduleRef = useRef<HTMLDivElement>(null);

  const restart = useCallback(() => {
    setTargetText(generateTargetText(isPunctuation, isNumbers));
    setTimeLeft(timeOption);
    setUserInput("");
    setIsActive(false);
    setIsFinished(false);
  }, [isPunctuation, isNumbers, timeOption, setUserInput]);

  useEffect(() => {
    restart();
  }, [restart]);

  // Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moduleRef.current && !moduleRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        setIsActive(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
      } else if (e.key === 'Escape') {
        restart();
      } else if (e.key.length === 1 && !isFinished) {
        if (!isActive) setIsActive(true);
        setUserInput(prev => prev + e.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, isActive, isFinished, userInput, setUserInput, restart]);

  const results = isFinished ? {
    wpm: Math.floor((userInput.trim().split(/\s+/).length / timeOption) * 60) || 0,
    acc: Math.floor((userInput.split("").filter((c, i) => c === targetText[i]).length / (userInput.length || 1)) * 100)
  } : { wpm: 0, acc: 0 };

  return (
    <div ref={moduleRef} className="w-full max-w-4xl mx-auto border border-white/10 rounded-[20px] overflow-hidden bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-white/20">
      {/* Settings Bar */}
      <div className={`flex items-center justify-between px-8 py-3 border-b border-white/5 text-[10px] uppercase tracking-[0.3em] font-medium transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex space-x-8">
          <button onClick={() => setIsPunctuation(!isPunctuation)} className={`${isPunctuation ? 'text-white' : 'text-white/20'} cursor-pointer hover:text-white/60 transition-colors`}>punctuation</button>
          <button onClick={() => setIsNumbers(!isNumbers)} className={`${isNumbers ? 'text-white' : 'text-white/20'} cursor-pointer hover:text-white/60 transition-colors`}>numbers</button>
        </div>
        <div className="flex space-x-5">
          {[15, 30, 60, 120].map(opt => (
            <button key={opt} onClick={() => setTimeOption(opt)} className={`${timeOption === opt ? 'text-white' : 'text-white/20'} cursor-pointer hover:text-white/60 transition-colors`}>{opt}</button>
          ))}
        </div>
      </div>

      {/* Hero Display */}
      <div className="relative px-12 py-12 bg-white/[0.01]">
        {isFinished ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center space-x-16">
            <div className="text-center">
              <span className="text-white/10 text-[9px] block mb-1">WPM</span>
              <span className="text-white text-6xl italic font-light tracking-tighter">{results.wpm}</span>
            </div>
            <div className="text-center">
              <span className="text-white/10 text-[9px] block mb-1">ACC</span>
              <span className="text-white text-6xl italic font-light tracking-tighter">{results.acc}%</span>
            </div>
            <button onClick={restart} className="text-white/30 hover:text-white/80 text-[10px] pt-4 tracking-widest uppercase cursor-pointer">Restart</button>
          </motion.div>
        ) : (
          <div className="relative h-14 w-full flex items-center justify-center">
            {isActive && <div className="absolute top-0 right-0 text-white/20 text-sm italic font-mono">{timeLeft}s</div>}

            <div
              onClick={() => setIsFocused(true)}
              className={`text-2xl font-mono leading-none transition-all duration-700 outline-none w-full text-center relative z-10 ${!isFocused ? 'blur-md opacity-20 cursor-pointer scale-95' : 'opacity-100 focus:outline-none'}`}
              onBlur={() => { setIsFocused(false); setIsActive(false); }}
              tabIndex={0}
            >
              <div className="flex items-center justify-center space-x-[2px] whitespace-nowrap overflow-visible">
                {targetText.split("").slice(Math.max(0, userInput.length - 20), userInput.length + 30).map((char, index) => {
                  const absoluteIndex = Math.max(0, userInput.length - 20) + index;
                  const isCurrent = absoluteIndex === userInput.length;
                  let color = "text-white/20";
                  if (absoluteIndex < userInput.length) {
                    color = userInput[absoluteIndex] === char ? "text-white/95" : "text-red-500/80";
                  }
                  return (
                    <span key={absoluteIndex} className={`inline-block whitespace-pre relative ${color} transition-colors duration-100`}>
                      {isCurrent && isFocused && (
                        <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="absolute -left-[1px] top-[10%] w-[2px] h-[80%] bg-blue-500 z-10" />
                      )}
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>
            {!isFocused && <div onClick={() => setIsFocused(true)} className="absolute inset-0 flex items-center justify-center text-white/10 text-[9px] uppercase tracking-[0.5em] z-20 cursor-pointer">Click to Focus</div>}
          </div>
        )}
      </div>

      {/* Mechanical Keyboard Section */}
      <div className="p-8 pb-10 bg-white/[0.02] border-t border-white/5 flex justify-center overflow-hidden">
        <div className="scale-90 md:scale-95 origin-center pointer-events-auto">
          <Keyboard theme="classic" enableHaptics enableSound onKeyEvent={(e) => {
            if (isFocused && !isFinished && e.source === 'pointer' && e.phase === 'down') {
              if (e.code === 'Backspace') {
                setUserInput(prev => prev.slice(0, -1));
              } else if (e.code === 'Space') {
                if (!isActive) setIsActive(true);
                setUserInput(prev => prev + " ");
              } else if (e.code.startsWith('Key')) {
                if (!isActive) setIsActive(true);
                setUserInput(prev => prev + e.code.slice(3).toLowerCase());
              } else if (e.code.startsWith('Digit')) {
                if (!isActive) setIsActive(true);
                setUserInput(prev => prev + e.code.slice(5));
              }
            }
          }} />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}

import Minecraft from "@/components/Game/Minecraft";

// Dynamic Game Screen Overlay
const GameScreen = ({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={false}
      animate={{
        clipPath: isOpen ? 'circle(150% at 100% 100%)' : 'circle(0% at 100% 100%)'
      }}
      transition={{
        duration: 1.2,
        ease: [0.77, 0, 0.175, 1]
      }}
      className="fixed inset-0 z-[200] bg-[#050505] overflow-hidden select-none"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      {/* Voxel Style Exit button */}
      <div className="absolute top-10 left-10 z-[250]">
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, y: 4, x: 4 }}
          className="relative w-12 h-12 flex items-center justify-center cursor-pointer pointer-events-auto"
        >
          <div className="absolute inset-0 bg-red-600 border-b-4 border-r-4 border-red-900 shadow-[4px_4px_0_rgba(0,0,0,0.5)]" />
          <span className="relative text-white font-mono text-xl font-bold">X</span>
        </motion.button>
      </div>

      <div className="w-full h-full bg-black">
        {isOpen && (
          <React.Suspense fallback={<div className="flex items-center justify-center h-full text-white/20 font-mono text-[9px] uppercase tracking-[0.5em]">Loading World...</div>}>
            <Minecraft onClose={onClose} />
          </React.Suspense>
        )}
      </div>

    </motion.div>
  );
};

function PageContent() {
  const searchParams = useSearchParams();
  const isLinkedIn = searchParams.get('source') === 'linkedin';

  const [clockText, setClockText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWindow, setActiveWindow] = useState('profile');
  const [zIndexMap, setZIndexMap] = useState<Record<string, number>>({ profile: 40, projects: 39, experience: 38 });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({ profile: true, projects: false, experience: false });
  const [minimizedWindows, setMinimizedWindows] = useState<Record<string, boolean>>({ profile: false, projects: false, experience: false });
  const [hoveredAboutIcon, setHoveredAboutIcon] = useState<number | null>(null);
  const [hoveredDots, setHoveredDots] = useState(false);
  const [typingInput, setTypingInput] = useState("");
  const [showGame, setShowGame] = useState(false);
  const zCounter = useRef(40);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.85, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4, 1], [0, 40, 40]);
  const bezelRing = useTransform(scrollYProgress, [0, 0.3, 1], [0, 16, 16]);

  // Smooth BG blend values
  const pageBg = useTransform(scrollYProgress, [0.4, 0.7], ["#050505", "#000000"]);
  const dotOpacity = useTransform(scrollYProgress, [0.4, 0.75], [0, 0.15]);

  const finderMenuItems = [
    { label: 'About Finder' },
    { label: '', isSeparator: true },
    { label: 'Settings...', shortcut: '⌘,' },
    { label: '', isSeparator: true },
    { label: 'Empty Trash...', shortcut: '⇧⌘⌫' },
    { label: '', isSeparator: true },
    { label: 'Hide Finder', shortcut: '⌘H' },
    { label: 'Hide Others', shortcut: '⌥⌘H' },
    { label: 'Show All' },
  ];

  const fileMenuItems = [
    { label: 'New Window', shortcut: '⌘N' },
    { label: 'New Tab', shortcut: '⌘T' },
    { label: '', isSeparator: true },
    { label: 'Download Resume', shortcut: '⌘R' },
    { label: '', isSeparator: true },
    { label: 'Share Portfolio', shortcut: '⇧⌘C' },
    { label: '', isSeparator: true },
    { label: 'Print...', shortcut: '⌘P' },
    { label: '', isSeparator: true },
    { label: 'Close Window', shortcut: '⌘W' },
  ];

  const editMenuItems = [
    { label: 'Undo', shortcut: '⌘Z' },
    { label: 'Redo', shortcut: '⇧⌘Z' },
    { label: '', isSeparator: true },
    { label: 'Cut', shortcut: '⌘X' },
    { label: 'Copy', shortcut: '⌘C' },
    { label: 'Paste', shortcut: '⌘V' },
    { label: 'Select All', shortcut: '⌘A' },
  ];

  const viewMenuItems = [
    { label: 'as Icons', shortcut: '⌘1' },
    { label: 'as List', shortcut: '⌘2' },
    { label: 'as Columns', shortcut: '⌘3' },
    { label: 'as Gallery', shortcut: '⌘4' },
    { label: '', isSeparator: true },
    { label: 'Sort By' },
    { label: 'Clean Up' },
    { label: '', isSeparator: true },
    { label: 'Hide Sidebar', shortcut: '⌥⌘S' },
    { label: 'Show Path Bar', shortcut: '⌥⌘P' },
  ];

  const windowMenuItems = [
    { label: 'Minimize', shortcut: '⌘M' },
    { label: 'Zoom' },
    { label: '', isSeparator: true },
    { label: 'Bring All to Front' },
    { label: '', isSeparator: true },
    { label: 'tomlin.jpg (bio)', shortcut: activeWindow === 'profile' ? '✓' : '' },
    { label: 'major projects', shortcut: activeWindow === 'projects' ? '✓' : '' },
  ];

  const helpMenuItems = [
    { label: 'Search' },
    { label: '', isSeparator: true },
    { label: 'Next.js Documentation' },
    { label: 'macOS Portfolio Tips' },
  ];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const day = days[now.getDay()];
      const dayNum = now.getDate();
      const month = now.toLocaleString('default', { month: 'short' });
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setClockText(`${day} ${month} ${dayNum}  ${hours}:${minutes} ${ampm}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const activateWindow = useCallback((id: string) => {
    zCounter.current += 1;
    setZIndexMap(prev => ({ ...prev, [id]: zCounter.current }));
    setActiveWindow(id);
    setMinimizedWindows(prev => ({ ...prev, [id]: false }));
    setOpenWindows(prev => ({ ...prev, [id]: true }));
  }, []);

  const closeWindow = (id: string) => {
    setOpenWindows(prev => ({ ...prev, [id]: false }));
  };

  const minimizeWindow = (id: string) => {
    setMinimizedWindows(prev => ({ ...prev, [id]: true }));
  };

  const WifiIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );

  const BatteryIcon = () => (
    <svg className="w-5 h-5 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
      <line x1="22" y1="11" x2="22" y2="13" />
      <rect x="4" y="9" width="10" height="6" rx="1" fill="currentColor" />
    </svg>
  );

  return (
    <>
      <GameScreen
        isOpen={showGame}
        onClose={() => setShowGame(false)}
      />
      <motion.div
        ref={containerRef}
        style={{ backgroundColor: pageBg }}
        className="relative font-sans selection:bg-blue-500/30 overflow-x-hidden"
      >
        {/* Hero Section Container */}
        <div ref={heroRef} className="h-[130vh] relative w-full overflow-visible">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            <motion.div
              style={{
                scale,
                borderRadius,
                boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5)",
                padding: bezelRing,
                backgroundColor: "rgba(0,0,0,0.9)",
                position: 'relative'
              }}
              className="w-full h-full desktop-bg"
            >
              {/* Border/Bezel content */}
              <div className="text-gray-800 h-full w-full flex flex-col relative overflow-hidden bg-white/5 rounded-[inherit]">
                {/* Inner screen content */}
                <div className="h-full w-full flex flex-col relative bg-transparent">
                  {/* Menu Bar */}
                  <nav className="glass w-full h-7 flex items-center justify-between px-4 text-xs font-medium z-50 absolute top-0 left-0">
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center space-x-4 pr-3">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/en/8/8e/AppleSiriIcon2017.png"
                          alt="Siri"
                          className="w-4 h-4 cursor-pointer"
                        />
                        <div className="relative">
                          <span
                            className={`font-bold cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'Finder' ? 'bg-black/5' : 'hover:bg-black/5'}`}
                            onMouseDown={() => setActiveMenu(activeMenu === 'Finder' ? null : 'Finder')}
                          >
                            Finder
                          </span>
                          <DropdownMenu isOpen={activeMenu === 'Finder'} items={finderMenuItems} onClose={() => setActiveMenu(null)} />
                        </div>
                      </div>

                      <div className="relative">
                        <span
                          className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'File' ? 'bg-black/5' : 'hover:bg-black/5'}`}
                          onMouseDown={() => setActiveMenu(activeMenu === 'File' ? null : 'File')}
                        >
                          File
                        </span>
                        <DropdownMenu isOpen={activeMenu === 'File'} items={fileMenuItems} onClose={() => setActiveMenu(null)} />
                      </div>

                      <div className="relative">
                        <span
                          className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'Edit' ? 'bg-black/5' : 'hover:bg-black/5'}`}
                          onMouseDown={() => setActiveMenu(activeMenu === 'Edit' ? null : 'Edit')}
                        >
                          Edit
                        </span>
                        <DropdownMenu isOpen={activeMenu === 'Edit'} items={editMenuItems} onClose={() => setActiveMenu(null)} />
                      </div>

                      <div className="relative">
                        <span
                          className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'View' ? 'bg-black/5' : 'hover:bg-black/5'}`}
                          onMouseDown={() => setActiveMenu(activeMenu === 'View' ? null : 'View')}
                        >
                          View
                        </span>
                        <DropdownMenu isOpen={activeMenu === 'View'} items={viewMenuItems} onClose={() => setActiveMenu(null)} />
                      </div>

                      <div className="relative">
                        <span
                          className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'Window' ? 'bg-black/5' : 'hover:bg-black/5'}`}
                          onMouseDown={() => setActiveMenu(activeMenu === 'Window' ? null : 'Window')}
                        >
                          Window
                        </span>
                        <DropdownMenu isOpen={activeMenu === 'Window'} items={windowMenuItems} onClose={() => setActiveMenu(null)} />
                      </div>

                      <div className="relative">
                        <span
                          className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === 'Help' ? 'bg-black/5' : 'hover:bg-black/5'}`}
                          onMouseDown={() => setActiveMenu(activeMenu === 'Help' ? null : 'Help')}
                        >
                          Help
                        </span>
                        <DropdownMenu isOpen={activeMenu === 'Help'} items={helpMenuItems} onClose={() => setActiveMenu(null)} />
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <div className="relative">
                        <button
                          className={`p-1.5 rounded-md ${activeMenu === 'Wifi' ? 'bg-black/5' : 'hover:bg-black/5'}`}
                          onMouseDown={() => setActiveMenu(activeMenu === 'Wifi' ? null : 'Wifi')}
                        >
                          <WifiIcon />
                        </button>
                        <ControlPanel isOpen={activeMenu === 'Wifi'} onClose={() => setActiveMenu(null)} title="Wi-Fi">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[13px] font-bold">Wi-Fi</span>
                            <div className="w-10 h-5 bg-blue-500 rounded-full relative p-0.5">
                              <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 shadow-sm"></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <ControlItem icon={<WifiIcon />} label="Fiber" sublabel="Saved" isActive />
                            <ControlItem icon={<WifiIcon />} label="Guest_Access" />
                            <ControlItem icon={<WifiIcon />} label="Starlink_99" />
                          </div>
                          <div className="h-[1px] bg-gray-200/60 my-3" />
                          <button className="text-[12px] text-gray-500 hover:text-black hover:underline px-2">Wi-Fi Settings...</button>
                        </ControlPanel>
                      </div>

                      <div className="relative">
                        <button
                          className={`p-1.5 rounded-md ${activeMenu === 'Power' ? 'bg-black/5' : 'hover:bg-black/5'}`}
                          onMouseDown={() => setActiveMenu(activeMenu === 'Power' ? null : 'Power')}
                        >
                          <BatteryIcon />
                        </button>
                        <ControlPanel isOpen={activeMenu === 'Power'} onClose={() => setActiveMenu(null)} title="Battery">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-gray-800">100% Charged</span>
                            <BatteryIcon />
                          </div>
                          <div className="text-[11px] text-gray-500 mb-4 bg-black/[0.03] p-2 rounded-lg">Power Source: Power Adapter</div>
                          <div className="space-y-1">
                            <ControlItem icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>} label="Low Power Mode" />
                          </div>
                          <div className="h-[1px] bg-gray-200/60 my-3" />
                          <button className="text-[12px] text-gray-500 hover:text-black hover:underline px-2">Battery Settings...</button>
                        </ControlPanel>
                      </div>

                      <div className="relative">
                        <span
                          className={`cursor-pointer px-2 py-1 rounded-md text-[13px] hover:bg-black/5 ${activeMenu === 'Clock' ? 'bg-black/5' : ''}`}
                          onMouseDown={() => setActiveMenu(activeMenu === 'Clock' ? null : 'Clock')}
                        >
                          {clockText}
                        </span>
                        <ControlPanel isOpen={activeMenu === 'Clock'} onClose={() => setActiveMenu(null)}>
                          <div className="flex flex-col items-center">
                            <div className="text-3xl font-serif-italic mb-2">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            <div className="text-xs text-gray-500 mb-6">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                            <div className="w-full h-40 bg-black/5 rounded-2xl flex items-center justify-center text-gray-400">
                              <div className="text-[11px] uppercase tracking-widest font-bold">No Notifications</div>
                            </div>
                          </div>
                          <div className="h-[1px] bg-gray-200/60 my-4" />
                          <button className="w-full text-[12px] text-gray-500 hover:text-black py-1">Open Calendar...</button>
                        </ControlPanel>
                      </div>
                    </div>
                  </nav>

                  {/* Desktop Area */}
                  <main className="flex-1 relative w-full h-full pt-7 pb-20 overflow-hidden">
                    {/* Desktop Folders */}
                    <DesktopFolder label="projects" initialPos={{ top: '15%', left: '80%' }} onDoubleClick={() => activateWindow('projects')} />
                    <DesktopFolder label="about me" initialPos={{ top: '35%', left: '75%' }} onDoubleClick={() => activateWindow('profile')} />
                    {isLinkedIn && <DesktopFolder label="experience" initialPos={{ top: '15%', left: '40%' }} onDoubleClick={() => activateWindow('experience')} />}
                    <DesktopFolder label="resume" initialPos={{ top: '55%', left: '45%' }} />
                    {!isLinkedIn && <DesktopFolder label="graphic design" initialPos={{ top: '15%', left: '40%' }} />}

                    {/* Profile Window */}
                    {openWindows['profile'] && !minimizedWindows['profile'] && (
                      <DraggableWindow
                        id="win-profile"
                        initialPos={{ x: 80, y: 100 }}
                        width="w-[550px]"
                        zIndex={zIndexMap['profile']}
                        isActive={activeWindow === 'profile'}
                        onActivate={() => activateWindow('profile')}
                        onClose={() => closeWindow('profile')}
                        onMinimize={() => minimizeWindow('profile')}
                        title="tomlin.jpg"
                        titleIcon={
                          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        }
                      >
                        <ProfileWindowContent isLinkedIn={isLinkedIn} />
                      </DraggableWindow>
                    )}

                    {/* Experience Window */}
                    {isLinkedIn && openWindows['experience'] && !minimizedWindows['experience'] && (
                      <DraggableWindow
                        id="win-experience"
                        initialPos={{ x: 200, y: 120 }}
                        width="w-[850px]"
                        zIndex={zIndexMap['experience']}
                        isActive={activeWindow === 'experience'}
                        onActivate={() => activateWindow('experience')}
                        onClose={() => closeWindow('experience')}
                        onMinimize={() => minimizeWindow('experience')}
                        title="experience"
                        headerCenter={
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z" />
                            </svg>
                            <span>experience</span>
                          </div>
                        }
                      >
                        <ExperienceWindowContent />
                      </DraggableWindow>
                    )}

                    {/* Projects Window */}
                    {openWindows['projects'] && !minimizedWindows['projects'] && (
                      <DraggableWindow
                        id="win-projects"
                        initialPos={{ x: 350, y: 150 }}
                        width="w-[850px]"
                        zIndex={zIndexMap['projects']}
                        isActive={activeWindow === 'projects'}
                        onActivate={() => activateWindow('projects')}
                        onClose={() => closeWindow('projects')}
                        onMinimize={() => minimizeWindow('projects')}
                        title="some of his major projects"
                        headerCenter={
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z" />
                            </svg>
                            <span>some of his major projects</span>
                          </div>
                        }
                        headerRight={
                          <div className="relative">
                            <svg className="w-4 h-4 absolute left-2 top-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                              type="text"
                              placeholder="Search"
                              value={searchQuery}
                              onChange={e => setSearchQuery(e.target.value)}
                              className="pl-8 pr-2 py-1 bg-white/50 border border-gray-300/50 rounded-md text-xs w-28 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                              onMouseDown={e => e.stopPropagation()}
                            />
                          </div>
                        }
                      >
                        <ProjectsWindowContent searchQuery={searchQuery} />
                      </DraggableWindow>
                    )}
                  </main>

                  {/* Dock */}
                  <Dock>
                    {/* Projects */}
                    <DockItem tooltip="Projects" dot={openWindows['projects']} onClick={() => activateWindow('projects')}>
                      <img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853981255cc36b3a37af_finder.png" alt="Finder" className="w-full h-full object-contain" />
                    </DockItem>

                    {/* Launchpad */}
                    <DockItem tooltip="Launchpad">
                      <img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853943597517f128b9b4_launchpad.png" alt="Launchpad" className="w-full h-full object-contain" />
                    </DockItem>

                    {/* Safari */}
                    <DockItem tooltip="Safari">
                      <img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ddd826358438eda6d_safari.png" alt="Safari" className="w-full h-full object-contain" />
                    </DockItem>

                    {/* Experience (Conditional) */}
                    {isLinkedIn && (
                      <DockItem tooltip="Experience" dot={openWindows['experience']} onClick={() => activateWindow('experience')}>
                        <img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f708537c3548849fcac9764_pages.png" alt="Experience" className="w-full h-full object-contain" />
                      </DockItem>
                    )}

                    {/* Messages */}
                    <DockItem tooltip="Messages">
                      <img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853a55558a68e192ee08_messages.png" alt="Messages" className="w-full h-full object-contain" />
                    </DockItem>

                    {/* Photos */}
                    <DockItem tooltip="Photos">
                      <img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853c55558a2e1192ee09_photos.png" alt="Photos" className="w-full h-full object-contain" />
                    </DockItem>

                    {/* Music */}
                    <DockItem tooltip="Music">
                      <img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ba0782d6ff2aca6b3_music.png" alt="Music" className="w-full h-full object-contain" />
                    </DockItem>

                    <div className="h-10 w-[1px] bg-black/10 mx-1"></div>

                    {/* Profile (About Me) */}
                    <DockItem tooltip="About Me" dot={openWindows['profile']} onClick={() => activateWindow('profile')}>
                      <img src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853743597518c528b9b3_contacts.png" alt="About Me" className="w-full h-full object-contain" />
                    </DockItem>

                    <div className="h-10 w-[1px] bg-black/10 mx-1"></div>

                    {/* Trash */}
                    <DockItem tooltip="Trash" shake={true}>
                      <img src="https://findicons.com/files/icons/569/longhorn_objects/128/trash.png" alt="Trash" className="w-full h-full object-contain" />
                    </DockItem>
                  </Dock>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* About Me Section (Dark Mode) */}
        <div className="relative z-20 bg-transparent py-16 flex items-center justify-center overflow-hidden">
          {/* Subtle dot grid with scroll-driven reveal */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              opacity: dotOpacity
            }}
          ></motion.div>

          <motion.section
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto px-6 text-center relative z-10"
          >
            {/* Headline with spotlight blur */}
            <motion.div
              animate={{
                filter: hoveredAboutIcon !== null ? 'blur(24px)' : 'blur(0px)',
                opacity: hoveredAboutIcon !== null ? 0.15 : 1
              }}
              transition={{ duration: 0.2 }}
              style={{ willChange: 'filter, opacity' }}
              className="mb-20"
            >
              <h2 className="text-5xl md:text-6xl text-white/90 font-caveat tracking-normal mb-2">
                welcome to my corner
                <br />
                on the internet :)
              </h2>
            </motion.div>

            {/* Project Row / Icon Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-14 my-24 max-w-3xl mx-auto">
              {[
                { label: 'biscuit', color: 'bg-orange-500/5', accent: 'bg-orange-500/40', icon: '🍪' },
                { label: 'ted.sh', color: 'bg-blue-500/5', accent: 'bg-blue-500/40', icon: '🛠️' },
                { label: 'logic', color: 'bg-purple-500/5', accent: 'bg-purple-500/40', icon: '🧩' },
                { label: 'collab', color: 'bg-white/5', accent: 'bg-white/20', icon: '✉️' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredAboutIcon(i)}
                  onMouseLeave={() => setHoveredAboutIcon(null)}
                  className="flex flex-col items-center relative"
                >
                  {/* Bouncy Hover Reveal (Mockups) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 0 }}
                    animate={{
                      opacity: hoveredAboutIcon === i ? 1 : 0,
                      scale: hoveredAboutIcon === i ? 1 : 0.5,
                      y: hoveredAboutIcon === i ? -140 : 0
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute pointer-events-none z-30"
                  >
                    <div className="relative w-40 h-28">
                      <div className={`absolute inset-0 ${item.accent} backdrop-blur-md rounded-xl shadow-2xl border border-white/10`} />
                      <div className={`absolute inset-0 translate-x-4 -translate-y-4 ${item.accent} brightness-125 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 rotate-3`} />
                    </div>
                  </motion.div>

                  {/* Main Icon */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.5, y: 100 },
                      show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 25 } }
                    }}
                    animate={{
                      filter: (hoveredAboutIcon !== null && hoveredAboutIcon !== i) ? 'blur(24px)' : 'blur(0px)',
                      opacity: (hoveredAboutIcon !== null && hoveredAboutIcon !== i) ? 0.1 : 1,
                      scale: hoveredAboutIcon === i ? 1.25 : 1
                    }}
                    whileHover={{ y: -20, rotate: i % 2 === 0 ? 5 : -5 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    style={{ willChange: 'filter, transform, opacity' }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`w-24 h-24 md:w-28 md:h-28 rounded-3xl border border-white/10 flex items-center justify-center shadow-lg transition-all duration-500 group-hover:shadow-white/10 ${item.color}`}>
                      <div className="text-4xl">{item.icon}</div>
                    </div>
                    <span className="mt-5 text-[11px] font-bold text-white/30 group-hover:text-white/60 transition-colors uppercase tracking-[0.25em]">
                      {item.label}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Bio text with spotlight blur */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
              }}
              animate={{
                filter: hoveredAboutIcon !== null ? 'blur(24px)' : 'blur(0px)',
                opacity: hoveredAboutIcon !== null ? 0.15 : 1
              }}
              transition={{ duration: 0.2 }}
              style={{ willChange: 'filter, opacity' }}
              className="max-w-xl mx-auto"
            >
              <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light">
                hey there! i'm <span className="text-white/90 font-medium tracking-tight">{isLinkedIn ? "Dheeraj" : "tom"}</span> — a software engineer with a deep love for systems and performance. i currently build tools for the next generation of developers and occasionally dive into graphics, compilers, and games.
              </p>
            </motion.div>

            {/* Bouncy Contact Reveal */}
            <motion.div
              onMouseEnter={() => setHoveredDots(true)}
              onMouseLeave={() => setHoveredDots(false)}
              className="mt-16 flex flex-col items-center relative"
            >
              {/* Dark Mode Contact Panel (The Morph Target) */}
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredDots ? 1 : 0,
                  scale: hoveredDots ? 1 : 0.2,
                  y: hoveredDots ? -10 : 0,
                  pointerEvents: hoveredDots ? 'auto' : 'none'
                }}
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
                style={{ originY: 'bottom', willChange: 'transform, opacity' }}
                className="absolute bottom-0 bg-black border border-white/10 text-white p-8 rounded-[48px] shadow-2xl flex flex-col items-center min-w-[360px] z-50 overflow-hidden"
              >
                <div className="flex items-center space-x-9 mb-8 font-sans">
                  {/* Reach Out */}
                  <div className="flex flex-col items-center group cursor-pointer transition-all">
                    <div className="w-13 h-13 md:w-14 md:h-14 bg-blue-600 rounded-full flex items-center justify-center text-white mb-2 shadow-lg transition-transform group-hover:scale-110">
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Reach out</span>
                  </div>
                  {/* X (Twitter) */}
                  <div className="flex flex-col items-center group cursor-pointer transition-all">
                    <div className="w-13 h-13 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white mb-2 shadow-lg transition-transform group-hover:scale-110">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Twitter (X)</span>
                  </div>
                  {/* GitHub */}
                  <div className="flex flex-col items-center group cursor-pointer transition-all">
                    <div className="w-13 h-13 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white mb-2 shadow-lg transition-transform group-hover:scale-110">
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.523-4.477-10-10-10z" /></svg>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">GitHub</span>
                  </div>
                  {/* LinkedIn */}
                  <div className="flex flex-col items-center group cursor-pointer transition-all">
                    <div className="w-13 h-13 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white mb-2 shadow-lg transition-transform group-hover:scale-110">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">LinkedIn</span>
                  </div>
                </div>
                <span className="text-[9px] text-white/20 font-medium uppercase tracking-[0.3em] font-mono">© 2026 tomlin7. Built with precision.</span>
              </motion.div>

              {/* Three dots (The Morph Origin) */}
              <motion.div
                animate={{
                  opacity: hoveredDots ? 0 : (hoveredAboutIcon !== null ? 0.15 : 1),
                  scale: hoveredDots ? 1.2 : 1,
                  filter: hoveredAboutIcon !== null ? 'blur(24px)' : 'blur(0px)',
                }}
                transition={{ duration: 0.2 }}
                className="flex justify-center items-center space-x-1.5 cursor-pointer px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-full z-40 relative backdrop-blur-md hover:bg-white/[0.08] transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              </motion.div>
            </motion.div>

            {/* Integrated Typing & Keyboard Module */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-32 w-full max-w-5xl mx-auto pb-12 overflow-x-auto custom-scrollbar flex flex-col items-center"
            >
              <CompactTypingModule userInput={typingInput} setUserInput={setTypingInput} />
            </motion.div>
          </motion.section>



          <motion.div
            onClick={() => setShowGame(true)}
            className="absolute bottom-0 right-0 w-24 h-24 pointer-events-auto group z-[50] cursor-pointer overflow-visible"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover="hover"
            viewport={{ once: true }}
          >
            {/* Handwritten CTA */}
            <div className="absolute bottom-20 right-25 w-32 pointer-events-none select-none">
              <div className="font-caveat text-white/50 text-2xl -rotate-12 flex flex-col items-center">
                <span className="whitespace-nowrap mb-1">Click to open</span>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57.31711644535244 67.15526532639706" width="57.31711644535244" height="67.15526532639706">
                  <rect x="0" y="0" width="57.31711644535244" height="67.15526532639706"></rect><g transform="translate(10 10) rotate(0 16.87751402869253 22.22064661063996)" stroke="none"><path fill="#d3d3d371" d="M 1.77,-0.49 Q 1.77,-0.49 2.28,1.62 2.80,3.73 4.00,7.16 5.21,10.59 7.29,15.09 9.38,19.59 12.26,23.82 15.14,28.06 18.35,31.37 21.57,34.69 24.25,36.76 26.94,38.83 28.83,40.00 30.72,41.16 32.63,42.09 34.54,43.03 34.75,43.19 34.95,43.36 35.09,43.58 35.23,43.80 35.30,44.05 35.36,44.30 35.34,44.56 35.32,44.82 35.22,45.06 35.11,45.30 34.94,45.50 34.76,45.69 34.54,45.82 34.31,45.95 34.05,46.00 33.80,46.05 33.54,46.02 33.28,45.98 33.04,45.87 32.81,45.75 32.62,45.57 32.44,45.38 32.32,45.15 32.21,44.91 32.17,44.65 32.13,44.39 32.18,44.14 32.23,43.88 32.36,43.65 32.49,43.43 32.68,43.25 32.88,43.08 33.12,42.97 33.36,42.87 33.62,42.85 33.88,42.83 34.13,42.89 34.39,42.95 34.61,43.09 34.83,43.23 34.99,43.44 35.16,43.64 35.25,43.88 35.34,44.13 35.34,44.39 35.35,44.65 35.28,44.90 35.20,45.15 35.05,45.36 34.89,45.58 34.68,45.73 34.47,45.88 34.22,45.96 33.97,46.04 33.71,46.03 33.45,46.02 33.20,45.93 32.96,45.84 32.96,45.84 32.96,45.84 31.13,44.67 29.29,43.50 27.27,42.27 25.25,41.04 22.39,38.86 19.53,36.67 16.13,33.19 12.73,29.72 9.69,25.30 6.64,20.89 4.43,16.29 2.21,11.69 0.87,8.17 -0.46,4.65 -1.11,2.57 -1.77,0.49 -1.80,0.27 -1.84,0.05 -1.82,-0.16 -1.80,-0.38 -1.72,-0.59 -1.65,-0.80 -1.53,-0.99 -1.41,-1.17 -1.25,-1.33 -1.09,-1.48 -0.89,-1.59 -0.70,-1.70 -0.49,-1.76 -0.27,-1.82 -0.05,-1.82 0.16,-1.83 0.38,-1.78 0.60,-1.74 0.79,-1.64 0.99,-1.54 1.16,-1.40 1.34,-1.26 1.47,-1.08 1.60,-0.90 1.68,-0.69 1.77,-0.49 1.77,-0.49 L 1.77,-0.49 Z"></path></g><g transform="translate(28.828181479249906 56.81601881325696) rotate(0 9.244467483051267 -7.8874814304945176)" stroke="none"><path fill="#d3d3d379" d="M 0,-2.12 Q 0,-2.12 2.19,-2.01 4.38,-1.90 6.44,-1.84 8.49,-1.78 10.29,-1.79 12.09,-1.80 13.71,-1.80 15.34,-1.79 14.30,-3.45 13.26,-5.10 12.44,-6.73 11.62,-8.35 10.96,-9.51 10.31,-10.67 9.48,-13.10 8.66,-15.54 8.62,-15.90 8.59,-16.27 8.67,-16.62 8.76,-16.98 8.95,-17.29 9.15,-17.60 9.43,-17.84 9.71,-18.07 10.05,-18.20 10.40,-18.33 10.76,-18.34 11.13,-18.36 11.48,-18.26 11.83,-18.15 12.13,-17.94 12.43,-17.73 12.65,-17.44 12.87,-17.14 12.98,-16.79 13.09,-16.44 13.09,-16.07 13.08,-15.71 12.96,-15.36 12.84,-15.02 12.61,-14.73 12.38,-14.44 12.08,-14.24 11.77,-14.04 11.42,-13.94 11.06,-13.85 10.70,-13.88 10.33,-13.90 9.99,-14.04 9.65,-14.19 9.38,-14.43 9.10,-14.67 8.92,-14.99 8.73,-15.30 8.66,-15.66 8.59,-16.02 8.63,-16.39 8.68,-16.75 8.84,-17.08 8.99,-17.41 9.25,-17.67 9.51,-17.93 9.83,-18.10 10.16,-18.27 10.52,-18.32 10.89,-18.38 11.25,-18.31 11.61,-18.25 11.93,-18.07 12.25,-17.89 12.50,-17.62 12.75,-17.35 12.90,-17.02 13.04,-16.68 13.04,-16.68 13.04,-16.68 13.62,-14.68 14.20,-12.67 14.76,-11.49 15.31,-10.31 16.19,-8.73 17.07,-7.15 18.02,-5.45 18.96,-3.76 19.36,-2.13 19.77,-0.50 17.49,0.74 15.22,1.99 13.66,1.89 12.09,1.80 10.29,1.79 8.49,1.78 6.44,1.84 4.38,1.90 2.19,2.01 0,2.12 -0.25,2.09 -0.50,2.05 -0.74,1.96 -0.98,1.87 -1.19,1.73 -1.40,1.58 -1.57,1.39 -1.74,1.20 -1.86,0.97 -1.98,0.75 -2.04,0.50 -2.10,0.25 -2.10,-0.00 -2.10,-0.25 -2.04,-0.50 -1.98,-0.75 -1.86,-0.97 -1.74,-1.20 -1.57,-1.39 -1.40,-1.58 -1.19,-1.73 -0.98,-1.87 -0.74,-1.96 -0.50,-2.05 -0.25,-2.09 0.00,-2.12 0.00,-2.12 L 0,-2.12 Z"></path></g></svg>
              </div>
            </div>

            {/* Peeling Corner Corner Dog-Ear */}
            <motion.div
              className="absolute bottom-0 right-0 w-full h-full bg-white shadow-inner origin-top-left blur"
              style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
              variants={{
                hover: { width: '140%', height: '140%' }
              }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />

            {/* The 'peeled up' triangle pointing towards the center */}
            <motion.div
              className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent backdrop-blur-xl shadow-[-15px_-15px_40px_rgba(0,0,0,0.6)] border-b border-r border-white/10 origin-bottom-right"
              style={{ clipPath: 'polygon(100% 0, 0 100%, 0 0)' }}
              variants={{
                hover: { width: '140%', height: '140%', rotate: 0 }
              }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

