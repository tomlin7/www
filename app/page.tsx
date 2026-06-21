"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurImage } from "@/components/BlurImage";
import {
  IconUser,
  IconBolt,
  IconComponents,
  IconExternalLink,
  IconBriefcase,
  IconCode,
  IconBrowser,
  IconGlobe,
  IconWorld,
  IconBrandVscode,
  IconCompass,
  IconCompassFilled,
  IconChevronLeft,
  IconChevronRight,
  IconArrowUpRight,
  IconBrandGithub,
} from "@tabler/icons-react";
import Image from "next/image";
import { allProjectsList } from "@/components/portfolio-data";

const getProjectGradient = (id: string) => {
  const gradients: Record<string, string> = {
    ted: "bg-gradient-to-br from-slate-900 via-indigo-950/80 to-purple-950/80",
    biscuit:
      "bg-gradient-to-br from-amber-950/60 via-zinc-900 to-orange-950/60",
    hypercode:
      "bg-gradient-to-br from-purple-950/60 via-neutral-900 to-violet-950/60",
    lemon: "bg-gradient-to-br from-emerald-950/60 via-zinc-900 to-teal-950/60",
    ember: "bg-gradient-to-br from-red-950/60 via-neutral-900 to-rose-950/60",
    positron: "bg-gradient-to-br from-blue-950/60 via-zinc-900 to-cyan-950/60",
    logicarium:
      "bg-gradient-to-br from-cyan-950/60 via-neutral-900 to-blue-950/60",
    "ecommerce-chatbot":
      "bg-gradient-to-br from-violet-950/60 via-zinc-900 to-fuchsia-950/60",
    "debug-adapter-client":
      "bg-gradient-to-br from-gray-900 via-neutral-800 to-zinc-950",
    cupcake: "bg-gradient-to-br from-pink-950/40 via-zinc-900 to-rose-950/40",
    bunch: "bg-gradient-to-br from-indigo-950/60 via-neutral-900 to-sky-950/60",
    neurodriver:
      "bg-gradient-to-br from-green-950/50 via-zinc-900 to-emerald-950/50",
    trinity:
      "bg-gradient-to-br from-teal-950/40 via-neutral-900 to-emerald-950/40",
    campfire:
      "bg-gradient-to-br from-orange-950/40 via-zinc-900 to-amber-950/40",
  };
  return gradients[id] || "bg-neutral-900";
};

const renderMockup = (id: string) => {
  const windowFrame = (title: string, content: React.ReactNode) => (
    <div className="w-full max-w-[400px] bg-[#16161a] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-[10px]">
      <div className="bg-[#0f0f12] px-4 py-2 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-white/40 text-[9px] select-none truncate max-w-[180px]">
          {title}
        </span>
        <div className="w-10" />
      </div>
      <div className="p-4 overflow-y-auto leading-relaxed text-white/90">
        {content}
      </div>
    </div>
  );

  switch (id) {
    case "ted":
      return windowFrame(
        "ted ~/projects/ted",
        <div className="flex gap-4 h-[120px] text-white/80 select-none">
          <div className="w-1/4 border-r border-white/5 flex flex-col gap-1 pr-1.5 text-[8.5px] text-white/40">
            <span className="text-white/70">workspace/</span>
            <span> Cargo.toml</span>
            <span className="text-indigo-400"> src/main.rs</span>
            <span> src/editor.rs</span>
          </div>
          <div className="w-3/4 flex flex-col justify-between">
            <div className="text-indigo-300">
              <span className="text-purple-400">fn</span>{" "}
              <span className="text-blue-400">main</span>() {"{"}
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">let mut</span>{" "}
              editor = Ted::new();
              <br />
              &nbsp;&nbsp;editor.run_loop();
              <br />
              {"}"}
            </div>
            <div className="text-[8px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Agent Tool Loop: Active (120ms)</span>
            </div>
          </div>
        </div>,
      );
    case "biscuit":
      return windowFrame(
        "biscuit ~/editor/app.py",
        <div className="text-amber-300 text-left select-none leading-normal">
          <span className="text-orange-400">import</span> tkinter{" "}
          <span className="text-orange-400">as</span> tk
          <br />
          <span className="text-orange-400">from</span> biscuit{" "}
          <span className="text-orange-400">import</span> Editor
          <br />
          <br />
          app = tk.Tk()
          <br />
          editor = Editor(app)
          <br />
          editor.pack(fill=<span className="text-emerald-400">"both"</span>,
          expand=<span className="text-orange-400">True</span>)<br />
          app.mainloop()
        </div>,
      );
    case "hypercode":
      return windowFrame(
        "terminal ~",
        <div className="text-left select-none space-y-1 text-white/90">
          <div className="text-white/40">$ hypercode --task "fix tests"</div>
          <div className="text-purple-400">
            [thought] Next.js 16 app router detected.
          </div>
          <div className="text-blue-400">
            [action] WriteFile: app/api/auth/route.ts
          </div>
          <div className="text-emerald-400">
            [observe] Running lint checks... PASS.
          </div>
          <div className="text-white/40">$ _</div>
        </div>,
      );
    case "lemon":
      return windowFrame(
        "lemon ~/scripts/fact.lm",
        <div className="text-left select-none text-emerald-300">
          <span className="text-emerald-400">let</span> fact ={" "}
          <span className="text-teal-400">fn</span>(n) {"{"}
          <br />
          &nbsp;&nbsp;<span className="text-teal-400">if</span> (n == 0) {"{"}{" "}
          <span className="text-teal-400">return</span> 1; {"}"}
          <br />
          &nbsp;&nbsp;<span className="text-teal-400">return</span> n * fact(n -
          1);
          <br />
          {"}"};<br />
          print(fact(5)); <span className="text-white/30">// Output: 120</span>
        </div>,
      );
    case "ember":
      return (
        <div className="w-full max-w-[400px] bg-[#0c0c0e] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-[9px] relative h-[160px]">
          <div className="flex-1 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />
            <div className="w-10 h-10 border border-red-500/80 bg-red-500/10 rotate-12 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] font-bold">
              CUBE
            </div>

            <div className="absolute top-3 right-3 bg-neutral-900/90 border border-white/10 rounded p-2 text-white/80 w-[120px] shadow-lg">
              <div className="border-b border-white/10 pb-1 mb-1 font-bold text-white/50 text-[8px] flex items-center justify-between">
                <span>Ember Console</span>
                <span className="text-red-500">●</span>
              </div>
              <div>FPS: 144</div>
              <div>Draw Calls: 42</div>
              <div className="truncate">Shader: g_buffer</div>
            </div>
          </div>
        </div>
      );
    case "positron":
      return windowFrame(
        "positronapp.exe",
        <div className="flex flex-col items-center justify-center p-2 text-center select-none">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
              alt="Python"
              className="w-8 h-8"
            />
            <span className="text-white/30 text-lg">✦</span>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
              alt="React"
              className="w-8 h-8 animate-pulse"
            />
          </div>
          <div className="text-[11px] font-bold text-white">
            Python WebView Window
          </div>
          <div className="text-[9px] text-white/50 mt-1">
            IPC Bridge: Connected (0.8ms)
          </div>
        </div>,
      );
    case "logicarium":
      return (
        <div className="w-full max-w-[400px] bg-[#090b10] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-[9px] p-4 h-[160px] justify-between">
          <div className="flex items-center justify-between text-white/30 border-b border-white/5 pb-1 text-[8px]">
            <span>Logicarium Node Editor</span>
            <span className="text-cyan-400">● Live Sim</span>
          </div>
          <div className="flex items-center justify-between relative py-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/35 px-1 rounded font-bold">
                  A [1]
                </span>{" "}
                ──┐
              </div>
              <div className="flex items-center gap-1.5">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/35 px-1 rounded font-bold">
                  B [1]
                </span>{" "}
                ──┼──&gt;
              </div>
              <div className="flex items-center gap-1.5">
                <span className="bg-neutral-800 text-white/40 border border-white/5 px-1 rounded font-bold">
                  C [0]
                </span>{" "}
                ──┘
              </div>
            </div>

            <div className="bg-[#131722] border border-cyan-500/40 rounded px-2.5 py-1.5 text-cyan-300 font-bold shadow-md shadow-cyan-500/10">
              AND GATE
            </div>

            <div className="flex items-center gap-1">
              <span>──&gt;</span>
              <div className="w-4 h-4 rounded-full bg-red-500 border border-red-400 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              <span className="text-red-400 font-bold">LED [1]</span>
            </div>
          </div>
          <div className="text-[7.5px] text-white/30 text-right">
            Simulation time: 0.12ms
          </div>
        </div>
      );
    case "ecommerce-chatbot":
      return (
        <div className="w-[180px] bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans text-[8px] h-[165px]">
          <div className="bg-neutral-900 px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
            <span className="font-bold text-white/70">Shopbot AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <div className="flex-grow p-2 space-y-2 overflow-y-auto bg-neutral-950 flex flex-col">
            <div className="bg-white/5 text-white/70 rounded-lg p-1.5 self-end max-w-[80%]">
              Suggest shoes under $100
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 text-purple-200 rounded-lg p-1.5 self-start max-w-[85%] space-y-1">
              <p>Keychron Q1 Mechanical (98% Match)</p>
              <div className="bg-neutral-900 border border-white/5 rounded p-1 flex justify-between items-center text-[7px]">
                <span>Keychron Q1</span>
                <span className="text-emerald-400">$89.99</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "debug-adapter-client":
      return windowFrame(
        "dap-client stack",
        <div className="text-left select-none space-y-2 font-mono text-[9px] text-neutral-300">
          <div>
            <span className="text-neutral-500">[Stack Trace]</span>
            <div className="text-red-400">● dap.py:128 (send_request)</div>
            <div className="text-neutral-400"> client.py:45 (initialize)</div>
          </div>
          <div className="border-t border-white/5 pt-1.5">
            <span className="text-neutral-500">[Variables]</span>
            <div>self: &lt;DAPClient&gt;</div>
            <div>adapter_state: "RUNNING"</div>
          </div>
        </div>,
      );
    case "cupcake":
      return windowFrame(
        "cupcake-widget",
        <div className="flex gap-2 h-[120px] select-none text-[8.5px]">
          <div className="w-4/5 text-pink-300">
            <span className="text-purple-400">import</span> cupcake
            <br />
            editor = cupcake.Editor(root)
            <br />
            editor.config_theme(<span className="text-emerald-400">"dark"</span>
            )<br />
            editor.bind_key(
            <span className="text-emerald-400">"&lt;Control-s&gt;"</span>, save)
          </div>
          <div className="w-1/5 border-l border-white/5 pl-1.5 flex flex-col gap-0.5 opacity-40">
            <div className="h-2 bg-pink-500/40 rounded-sm w-full" />
            <div className="h-1 bg-white/20 rounded-sm w-3/4" />
            <div className="h-1 bg-white/20 rounded-sm w-1/2" />
            <div className="h-2 bg-pink-500/40 rounded-sm w-4/5" />
            <div className="h-1 bg-white/20 rounded-sm w-full" />
          </div>
        </div>,
      );
    case "bunch":
      return windowFrame(
        "bunch app",
        <div className="flex gap-2.5 h-[120px] text-[8.5px] select-none">
          <div className="w-1/3 border-r border-white/5 flex flex-col gap-1 pr-1 text-white/40">
            <span className="font-bold text-white/70">channels</span>
            <span className="text-indigo-400"># general</span>
            <span># bugs</span>
            <span># updates</span>
          </div>
          <div className="w-2/3 flex flex-col justify-between">
            <div className="space-y-1">
              <div>
                <span className="font-bold text-white/80">tomlin7 </span>
                <span className="text-[7.5px] text-white/30">10:04 AM</span>
                <p className="text-white/60">WebSocket sync is super fast!</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/5 rounded px-2 py-0.5 text-white/30 text-[7px]">
              Type a message...
            </div>
          </div>
        </div>,
      );
    case "neurodriver":
      return (
        <div className="w-full max-w-[400px] bg-[#08080a] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-[9px] relative h-[160px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="absolute w-full h-full opacity-30"
              viewBox="0 0 400 160"
            >
              <path
                d="M 50 160 Q 200 40 350 160"
                fill="none"
                stroke="white"
                strokeWidth="20"
                strokeDasharray="5,5"
              />
            </svg>
            <div className="absolute w-6 h-10 bg-red-500 rounded border border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)] flex flex-col items-center justify-between p-1 z-10">
              <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full" />
              <div className="w-1 h-3 bg-black/40 rounded-sm" />
              <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full" />
            </div>
            <div className="absolute w-[180px] h-[180px] rounded-full border border-emerald-500/10 pointer-events-none" />
            <div className="absolute w-12 h-px bg-emerald-400/30 origin-left rotate-[30deg] z-0" />
            <div className="absolute w-14 h-px bg-emerald-400/30 origin-left -rotate-[45deg] z-0" />
            <div className="absolute w-10 h-px bg-emerald-400/30 origin-left rotate-[12deg] z-0" />
          </div>
          <div className="absolute bottom-3 left-3 bg-neutral-900/80 border border-white/10 rounded p-1.5 text-white/70 text-[8px] space-y-0.5">
            <div>Sensor Array: LIDAR 360°</div>
            <div>NN Steering: 12° | Speed: 60 MPH</div>
          </div>
        </div>
      );
    case "trinity":
      return windowFrame(
        "trinity Matrix Client",
        <div className="flex flex-col items-center justify-center p-3 text-center select-none gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xs font-bold animate-pulse">
            M
          </div>
          <div className="text-[10px] font-bold text-white">
            Matrix Sync Engine
          </div>
          <div className="text-[8px] text-white/50">
            Room Synchronized Successfully
          </div>
        </div>,
      );
    case "campfire":
      return windowFrame(
        "campfire app",
        <div className="text-left select-none text-[8.5px] space-y-1.5 text-neutral-300">
          <div className="text-orange-400 font-bold">
            Campfire Serverless Client
          </div>
          <div className="bg-white/5 border border-white/5 rounded p-1.5 text-white/70 space-y-0.5">
            <div className="font-bold">Active Sessions:</div>
            <div>• Session #1: macOS (Tokyo, JP)</div>
            <div>• Session #2: Windows (Mumbai, IN)</div>
          </div>
        </div>,
      );
    default:
      return (
        <div className="text-white/40 text-[10px] uppercase font-mono">
          Mockup Unavailable
        </div>
      );
  }
};

const ProjectSlideshow = () => {
  const [current, setCurrent] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % allProjectsList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const project = allProjectsList[current];
  if (!project) return null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#111111] rounded-[32px] overflow-hidden relative flex flex-col md:flex-row p-8 gap-8 min-h-[420px] md:h-[380px] group/slider border border-white/[0.03]"
    >
      {/* Left Column (Content) */}
      <div className="md:w-2/5 flex flex-col justify-between h-full min-h-[220px] md:min-h-0 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex-grow flex flex-col justify-center"
          >
            <div className="flex items-baseline gap-2 mb-3">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h3>
              <span className="text-white/30 text-xs font-mono font-medium">
                {current + 1}/{allProjectsList.length}
              </span>
            </div>

            <p className="text-[#a1a1aa] text-[14px] leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-haptic="success"
              className="text-[#f97316] hover:text-orange-400 font-semibold text-[13px] flex items-center gap-1.5 w-fit transition-colors group/link pb-2"
            >
              <span>View project</span>
              <span className="inline-block transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                ↗
              </span>
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Indicator dots at the bottom */}
        <div className="flex items-center gap-1.5 mt-4 flex-wrap">
          {allProjectsList.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setCurrent(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === current
                  ? "w-5 bg-white"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Column (Preview) */}
      <div className="md:w-3/5 relative rounded-2xl overflow-hidden shadow-2xl h-[240px] md:h-full min-h-[220px] md:min-h-0 bg-neutral-950 flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className={`w-full h-full ${getProjectGradient(project.id)} p-5 flex items-center justify-center`}
          >
            {renderMockup(project.id)}
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next navigation arrow buttons (visible on hover) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent(
              (prev) =>
                (prev - 1 + allProjectsList.length) % allProjectsList.length,
            );
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 cursor-pointer border border-white/10"
        >
          <IconChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((prev) => (prev + 1) % allProjectsList.length);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 cursor-pointer border border-white/10"
        >
          <IconChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-6 py-32 space-y-4 font-sans">
      {/* Main Profile Card (Top) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111111] rounded-[32px] p-6 flex flex-col justify-between relative overflow-hidden h-[350px]"
      >
        <div className="absolute -inset-1 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-[#111111]/90 via-[#111111]/50 to-transparent z-10"></div>
          <BlurImage
            src="https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/IMG_8380min_po20c6"
            alt="Profile Background"
            className="w-full h-full object-cover object-[30%_35%] opacity-100"
          />
        </div>

        <div className="z-10 max-w-lg h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-white/90 text-sm  tracking-widest mb-4">
              <IconWorld className="w-5 h-5" />
              <span>ABOUT ME</span>
            </div>
            <h1 className="text-2xl md:text-4xl text-white mb-4 tracking-tight leading-none flex items-center gap-2">
              Hey, I'm Dheeraj{" "}
              <motion.span
                animate={{
                  rotate: [0, 14, -8, 14, -4, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                style={{ display: "inline-block", transformOrigin: "70% 70%" }}
              >
                👋
              </motion.span>
            </h1>
            <p className="text-white/90 text-[18px] leading-[1.6] max-w-[800px]">
              Computer Science student at BIT Mesra building AI-native systems
              and full-stack applications.
            </p>
          </div>

          <div className="bg-white/[0.07] backdrop-blur-xl rounded-2xl p-4 flex flex-col w-fit mt-auto shadow-2xl">
            <div className="flex items-center space-x-2 mb-3">
              <IconBolt className="w-5 h-5 text-white/90" />
              <span className="text-white/90 text-sm uppercase tracking-normal">
                HIGHLIGHTS
              </span>
            </div>
            <p className="text-white text-[16px] font-medium tracking-normal">
              250+ GitHub ★ · LeetCode Knight (Top 6%) · BIT Mesra CS '27
            </p>
          </div>
        </div>
      </motion.div>

      {/* Second Row: Design & Featured Project */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
        {/* Card wrapper: p-[2px] border ring, overflow-hidden clips snake */}
        <motion.div className="relative p-[2px] rounded-[32px] h-[340px] overflow-hidden group">
          {/* Layer 1: Crisp snake border — thin, sharp */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[180%] h-[180%] origin-center bg-[conic-gradient(from_0deg,#4285f4,#9b72cb,#d96570,#f4b400,transparent_28%,transparent)] blur-[2px]"
              animate={{ rotate: [0, 360], opacity: [0, 0, 1, 1, 0, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            />
          </div>

          {/* Inner Card: dark bg, but holds the snake bloom inside */}
          <div className="w-full h-full bg-[#111111] rounded-[30px] relative z-10 overflow-hidden">
            {/* Layer 2: Snake bloom — same rotation in sync, very heavy blur, bleeds through corners */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <motion.div
                className="w-[160%] h-[160%] origin-center bg-[conic-gradient(from_0deg,#4285f4,#9b72cb,#d96570,#f4b400,transparent_28%,transparent)] blur-[50px] opacity-60"
                animate={{ rotate: [0, 360], opacity: [0, 0, 0.5, 0.5, 0, 0] }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>

            {/* Card content sits above bloom */}
            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-7 h-7 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconCompass className="w-4 h-4 text-white/90" />
                  </div>
                  <h3 className="text-white/80 text-sm uppercase tracking-normal">
                    SYSTEMS × PRODUCT × ENGINEERING
                  </h3>
                </div>
                <p className="text-white text-lg leading-relaxed mb-4">
                  Focused on AI-native architectures, scalable backends, and
                  full-stack development.
                </p>
                <p className="text-[#a1a1aa] text-lg leading-relaxed">
                  Open to Software Engineer and Full-Stack / Backend Developer
                  roles at product-driven companies.
                </p>
              </div>
              <motion.a
                href="/Resume.pdf"
                download
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                data-haptic="success"
                className="relative overflow-hidden w-fit px-6 py-2.5 rounded-full text-[13px] font-semibold text-white/90 bg-[#222222] border border-white/[0.08] hover:border-white transition-colors duration-300 shadow-md group flex items-center gap-1.5 cursor-pointer"
              >
                {/* Smooth white slide-up background fill */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ y: "100%" }}
                  variants={{
                    hover: { y: 0 },
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />

                <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 group-hover:text-orange-600">
                  Download Resume
                  <motion.span
                    className="inline-block"
                    variants={{
                      hover: { y: 2 },
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    ↓
                  </motion.span>
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.a
          href="https://github.com/tomlin7/biscuit"
          target="_blank"
          rel="noopener noreferrer"
          data-haptic="success"
          className="relative group w-full cursor-pointer z-10 hover:z-20 focus:outline-none block border-none"
        >
          {/* Main Card Container */}
          <div className="bg-[#111111] rounded-[32px] h-[340px] flex flex-col justify-end transition-all duration-300 relative z-10 group-hover:bg-[#151515] group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden p-8">
            {/* Full Card Mockup Background */}
            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-50 transition-opacity duration-500 flex items-center justify-center">
              <div className="scale-[1.15] origin-center -translate-y-6 pointer-events-none">
                {renderMockup("biscuit")}
              </div>
            </div>

            {/* Dark Vignette Overlay towards the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-[#111111]/10 group-hover:from-[#151515] group-hover:via-[#151515]/75 group-hover:to-[#151515]/15 transition-colors duration-300 z-10 pointer-events-none" />

            {/* Bottom Text Content */}
            <div className="flex flex-col gap-2 z-20 relative pointer-events-none">
              <span className="text-white text-[18px] font-normal transition-colors group-hover:text-orange-400">
                Biscuit
              </span>
              <p className="text-white/80 text-[14px] leading-relaxed font-normal">
                An open-source AI code editor that autonomously understands
                repositories, writes code, and executes multi-step workflows.
              </p>
            </div>
          </div>

          {/* Sliding Tab for Hover State */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full group-hover:translate-y-[-2px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-0 bg-[#151515] text-[10px] tracking-wider uppercase font-semibold text-white/45 px-4 pt-2 pb-1.5 rounded-b-xl pointer-events-none whitespace-nowrap shadow-md flex items-center gap-1">
            <span>View Repository</span>
            <IconExternalLink className="w-3 h-3 text-white/40" />
          </div>
        </motion.a>
      </div>

      {/* Third Row: Large Project Showcase (Interactive Slideshow) */}
      <ProjectSlideshow />

      {/* Experience & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Work Experience Card */}
        <motion.div className="bg-[#111111] rounded-[32px] p-7 flex flex-col gap-5">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
                <IconBriefcase className="w-4 h-4 text-white/90" />
              </div>
              <span className="text-white text-sm uppercase tracking-wide">
                WORK EXPERIENCE
              </span>
            </div>
            <p className="text-white/80 text-sm leading-snug tracking-normal">
              Where I've worked, contributed, and created an impact.
            </p>
          </div>

          {/* Employment section */}
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-tight mb-3">
                Employment
              </p>
              <div className="flex flex-col gap-3">
                {[
                  {
                    company: "Morvion",
                    role: "Software Engineer Intern",
                    date: "Dec '25 – Mar '26",
                    logo: "https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304675/morvion_logo_qw4vfy.jpg",
                    link: "https://tomlin7.notion.site/Morvion-36c88f368552812c8553f551dc52b02c",
                  },
                  {
                    company: "Hooman Digital",
                    role: "Full-Stack Developer Intern",
                    date: "Jul '25 – Oct '25",
                    logo: "https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304319/hooman_digital_logo_qdclr3.jpg",
                    link: "https://tomlin7.notion.site/Hooman-Digital-36c88f3685528137b698e0e25e09c558",
                  },
                  {
                    company: "NIT Calicut",
                    role: "Deep Learning Research Intern",
                    date: "May '25 – Jul '25",
                    logo: "https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304559/gceknewlogos_glexcj.png",
                    link: "https://tomlin7.notion.site/NIT-Calicut-Research-Development-36c88f36855281d8ae14e6f9d61ec81f",
                  },
                  {
                    company: "Ozi",
                    role: "Software Engineer Intern",
                    date: "Nov '24 – Feb '25",
                    logo: "https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304733/ozi-logo_2025-10-07-072401_gxyx_fs76wl.png",
                    link: "https://tomlin7.notion.site/OZi-36c88f36855281a4a5bbf4285e861068",
                  },
                ].map((exp, i, arr) => (
                  <div key={i} className="flex flex-col gap-3">
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-haptic="nudge"
                      className="group/item flex items-center justify-between gap-2 p-2 -m-2 rounded-2xl hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#1a1a1a] shrink-0 border border-white/5 transition-transform group-hover/item:scale-105 duration-300">
                          <Image
                            width={40}
                            height={40}
                            src={exp.logo}
                            alt={exp.company}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white leading-none mb-1 group-hover/item:text-blue-400 transition-colors duration-300 flex items-center gap-1.5">
                            {exp.company}
                            <IconArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:translate-y-0 transition-all duration-300 text-blue-400" />
                          </p>
                          <p className="text-[12px] text-white/70 group-hover/item:text-white/80 transition-colors duration-300">
                            {exp.role}
                          </p>
                        </div>
                      </div>
                      <span className="text-[12px] text-white/50 group-hover/item:text-white/70 transition-colors duration-300 whitespace-nowrap shrink-0">
                        {exp.date}
                      </span>
                    </a>
                    {i < arr.length - 1 && (
                      <div className="h-px w-full bg-white/5" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notion Link Footer */}
            <div className="mt-6 pt-4 border-t border-white/5 w-full">
              <a
                href="https://tomlin7.notion.site/36c88f368552811b8cc8f8ad6e70a8e0?v=36c88f36855281d69853000ca2e6234b&pvs=74"
                target="_blank"
                rel="noopener noreferrer"
                data-haptic="success"
                className="w-full relative overflow-hidden rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-between group cursor-pointer h-12"
              >
                <span className="pl-4 text-[13px] font-normal text-white/80 group-hover:text-white transition-colors">
                  View Dheeraj&apos;s Work
                </span>

                <div className="pr-4">
                  <IconExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" />
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Skills Card */}
        <motion.div className="bg-[#111111] rounded-[32px] p-7 flex flex-col gap-5">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
                <IconCode className="w-4 h-4 text-white/90" />
              </div>
              <span className="text-white text-sm uppercase tracking-widest">
                SKILLS
              </span>
            </div>
            <p className="text-white/80 text-sm leading-snug">
              Tools and technologies I work with, and I'm good at.
            </p>
          </div>

          {/* Skill categories */}
          <div className="flex flex-col gap-3.5">
            {[
              {
                label: "Languages",
                skills: [
                  {
                    name: "Python",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
                  },
                  {
                    name: "Golang",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
                  },
                  {
                    name: "C++",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
                  },
                  {
                    name: "JavaScript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
                  },
                  {
                    name: "TypeScript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
                  },
                  {
                    name: "Rust",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
                    invert: true,
                  },
                  {
                    name: "Assembly",
                    icon: "",
                  },
                  {
                    name: "SQL",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
                  },
                  {
                    name: "Bash",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
                  },
                ],
              },
              {
                label: "Backend & Protocols",
                skills: [
                  {
                    name: "Node.js",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
                  },
                  {
                    name: "Express.js",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
                    invert: true,
                  },
                  {
                    name: "Django",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
                  },
                  {
                    name: "FastAPI",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
                  },
                  {
                    name: "Protobuf",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google/default.svg",
                  },
                  {
                    name: "WebSockets",
                    icon: "",
                  },
                  {
                    name: "gRPC",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/grpc/default.svg",
                  },
                  {
                    name: "GraphQL",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
                  },
                ],
              },
              {
                label: "Databases & Messaging",
                skills: [
                  {
                    name: "PostgreSQL",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
                  },
                  {
                    name: "Cloud Spanner",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
                  },
                  {
                    name: "CockroachDB",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/cockroach-labs/default.svg",
                  },
                  {
                    name: "Supabase",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
                  },
                  {
                    name: "Redis",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
                  },
                  {
                    name: "Kafka",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
                    invert: true,
                  },
                  {
                    name: "RabbitMQ",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg",
                  },
                ],
              },
              {
                label: "AI & Vector Search",
                skills: [
                  {
                    name: "LangChain",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/langchain/default.svg",
                    invert: true,
                  },
                  {
                    name: "MCP",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/model-context-protocol/default.svg",
                  },
                  {
                    name: "Pinecone",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/pinecone/mono.svg",
                    invert: true,
                  },
                  {
                    name: "Qdrant",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/qdrant/default.svg",
                  },
                  {
                    name: "PyTorch",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
                  },
                  {
                    name: "scikit-learn",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
                  },
                  {
                    name: "Claude",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/anthropic/default.svg",
                  },
                  {
                    name: "Gemini",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/gemini/default.svg",
                  },
                ],
              },
              {
                label: "Systems & DevOps",
                skills: [
                  {
                    name: "Linux",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/linux/default.svg",
                  },
                  {
                    name: "LLVM",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/llvm/llvm-original.svg",
                  },
                  {
                    name: "WebAssembly",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wasm/wasm-original.svg",
                  },
                  {
                    name: "Docker",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
                  },
                  {
                    name: "Kubernetes",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
                  },
                  {
                    name: "Terraform",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
                  },
                  {
                    name: "AWS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
                  },
                  {
                    name: "GCP",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
                  },
                  {
                    name: "OpenTelemetry",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opentelemetry/opentelemetry-original.svg",
                  },
                  {
                    name: "Grafana",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg",
                  },
                  {
                    name: "GitHub Actions",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
                    invert: true,
                  },
                ],
              },
            ].map(({ label, skills }) => (
              <div key={label}>
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1.5">
                  {label}
                </p>
                <div className="flex flex-wrap gap-1">
                  {skills.map((s) => (
                    <span
                      key={s.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/[0.03] rounded-full text-[11.5px] text-white/80 transition-colors duration-200 hover:bg-white/[0.06] hover:border-white/[0.08]"
                    >
                      {s.icon.startsWith("http") ? (
                        <img
                          src={s.icon}
                          alt={s.name}
                          className={`w-3.5 h-3.5 object-contain flex-shrink-0 ${(s as any).invert ? "invert brightness-200" : ""}`}
                        />
                      ) : (
                        <span className="text-[12.5px] leading-none shrink-0">
                          {s.icon}
                        </span>
                      )}
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
