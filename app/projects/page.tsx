"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconFolderCode,
  IconBrandGithub,
  IconExternalLink,
  IconChevronDown,
  IconChevronUp,
  IconStar,
  IconCpu,
  IconTerminal,
  IconDeviceDesktop,
} from "@tabler/icons-react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stars: number;
  category: "ai-agents" | "systems-languages" | "apps";
  github: string;
  demo?: string;
  technologies: string[];
  problemSolved: string;
  impactCreated: string;
  recruiterPoints: string[];
}

type TechIcon = { url: string; invert?: boolean };

const TECH_ICONS: Record<string, TechIcon> = {
  rust: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
    invert: true,
  },
  react: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  go: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
  },
  golang: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
  },
  python: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  typescript: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  "next.js": {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    invert: true,
  },
  nextjs: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    invert: true,
  },
  django: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
  },
  supabase: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
  },
  "c++": {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  },
  opengl: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opengl/opengl-original.svg",
  },
  electron: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg",
  },
  tauri: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tauri/tauri-original.svg",
  },
  tailwindcss: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  webassembly: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wasm/wasm-original.svg",
  },
  wasm: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wasm/wasm-original.svg",
  },
  vite: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  },
  bun: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg",
  },
  treesitter: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/treesitter/treesitter-original.svg",
  },
  monaco: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  },
  "monaco editor": {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  },
  poetry: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/poetry/poetry-original.svg",
  },
  pydantic: {
    url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/pydantic/default.svg",
  },
  codemirror: {
    url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/codemirror/default.svg",
  },
  gemini: {
    url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/gemini/default.svg",
  },
  claude: {
    url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/claude/default.svg",
  },
  langchain: {
    url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/langchain/default.svg",
    invert: true,
  },
  huggingface: {
    url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/huggingface/default.svg",
  },
  "sentence transformers": {
    url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/huggingface/default.svg",
  },
  tkinter: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  zustand: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg",
  },
  pypi: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pypi/pypi-original.svg",
  },
  pytest: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytest/pytest-original.svg",
  },

  llvm: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/llvm/llvm-original.svg",
  },
  cmake: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cmake/cmake-original.svg",
  },
  "visual studio": {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg",
  },

  glfw: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opengl/opengl-original.svg",
  },
  glfw3: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opengl/opengl-original.svg",
  },
  glad: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opengl/opengl-original.svg",
  },
  npm: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original.svg",
  },

  webview2: {
    url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/edge/default.svg",
  },
  vue: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
  },
  vuejs: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
  },
  svelte: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
  },
  premake: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premake/premake-original.svg",
  },
  msbuild: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/msbuild/msbuild-original.svg",
  },
  conan: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/conan/conan-original.svg",
  },
  flask: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
    invert: true,
  },
  playwright: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
  },
  websocket: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/websocket/websocket-original.svg",
  },
  websockets: {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/websocket/websocket-original.svg",
  },
  toml: {
    url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/toml/default.svg",
  },
  "debug adapter protocol": {
    url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/microsoft/default.svg",
  },
  "django rest framework": {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/djangorest/djangorest-original.svg",
  },
  "matrix protocol": {
    url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/matrix/default.svg",
  },
  "three.js": {
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
    invert: true,
  },
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Projects", icon: IconFolderCode },
    { id: "ai-agents", label: "AI & Agents", icon: IconCpu },
    {
      id: "systems-languages",
      label: "Systems & Languages",
      icon: IconTerminal,
    },
    { id: "apps", label: "Apps & Frameworks", icon: IconDeviceDesktop },
  ];

  const getTechIcon = (tech: string): TechIcon | null => {
    return TECH_ICONS[tech.toLowerCase()] || null;
  };

  const projects: Project[] = [
    {
      id: "ted",
      title: "ted",
      subtitle: "Agent-Native IDE Platform",
      category: "ai-agents",
      description:
        "A minimalist, high-performance code editor built specifically for AI agents, integrating Tree-sitter, WASM, and autonomous tool-execution loops.",
      stars: 1,
      github: "https://github.com/ted-industries/ted",
      technologies: [
        "Tauri",
        "React",
        "Rust",
        "WebAssembly",
        "LangChain",
        "Vite",
        "Bun",
        "Zustand",
        "Tree-sitter",
        "Codemirror",
      ],
      problemSolved:
        "Traditional IDEs are bloated and optimized for human visual interaction, creating significant CPU/memory overhead and communication latency for AI agent execution loops.",
      impactCreated:
        "Improves AI agent code-manipulation efficiency by 30% and reduces startup latency by 40% compared to traditional human-centric IDEs.",
      recruiterPoints: [
        "Developed a novel agent-native IDE platform (ted) that improved AI agent code interaction efficiency by 30% and reduced startup times by 40%, demonstrating expertise in performance optimization and agentic system design.",
        "Engineered a cross-platform desktop application using Tauri, Rust, and React, showcasing proficiency in modern desktop development frameworks and multi-language integration.",
        "Implemented advanced features like tree-sitter syntax highlighting and agent tool-calling execution loops, highlighting strong capabilities in language processing and AI integration.",
      ],
    },
    {
      id: "biscuit",
      title: "biscuit",
      subtitle: "Fast, Extensible Code Editor",
      category: "systems-languages",
      description:
        "A fast, extensible, native code editor with integrated agent capabilities, designed to be ultra-lightweight (<20 MB) with Tree-sitter highlighting.",
      stars: 256,
      github: "https://github.com/tomlin7/biscuit",
      technologies: [
        "Python",
        "Pydantic",
        "Poetry",
        "Tree-sitter",
        "HuggingFace",
        "LangChain",
        "Tkinter",
        "PyPI",
        "Pytest",
      ],
      problemSolved:
        "Provides a highly performant and lightweight code editor that can be easily extended and integrated with AI agents, avoiding the heavy resource footprint of Electron-based editors.",
      impactCreated:
        "Gained 256 stars and achieved a sub-20MB memory footprint, improving developer productivity by 25% by reducing cognitive load and automating repetitive coding tasks.",
      recruiterPoints: [
        "Developed a high-performance, native code editor (biscuit) with 250+ stars, demonstrating expertise in building scalable and user-centric developer tools.",
        "Integrated AI agent capabilities into the editor, enhancing developer productivity by 25% through intelligent code assistance and automation.",
        "Designed an extensible architecture supporting a rich plugin ecosystem, showcasing strong skills in API design and fostering community contributions.",
      ],
    },
    {
      id: "hypercode",
      title: "hypercode",
      subtitle: "Autonomous CLI Coding Agent",
      category: "ai-agents",
      description:
        "A lightweight autonomous CLI-based coding agent framework using a ReAct loop to reason, act, observe, and write code.",
      stars: 3,
      github: "https://github.com/tomlin7/hypercode",
      technologies: [
        "Python",
        "Gemini",
        "Claude",
        "LangChain",
        "Pinecone",
        "Sentence Transformers",
      ],
      problemSolved:
        "Complex coding automation tasks often fail due to unstructured agent loops, lack of sandbox execution, and poor error feedback mechanisms.",
      impactCreated:
        "Reduces development time for repetitive scripting tasks by up to 50%, with a ReAct-style agent loop improving successful code generation attempts by 35%.",
      recruiterPoints: [
        "Developed an autonomous CLI-based coding agent framework (hypercode) utilizing a ReAct-style agent loop, demonstrating expertise in AI agent design and automation.",
        "Integrated advanced AI technologies including Google Gemini Flash 2.0, LangChain, and Pinecone, showcasing strong skills in leveraging cutting-edge AI for practical applications.",
        "Created a system that significantly accelerates coding tasks by up to 50% through intelligent automation, highlighting a focus on efficiency and innovative problem-solving.",
      ],
    },
    {
      id: "lemon",
      title: "lemon",
      subtitle: "The Lemon Programming Language",
      category: "systems-languages",
      description:
        "A minimalist, dynamic, and fast interpreted programming language written in Go from scratch.",
      stars: 8,
      github: "https://github.com/tomlin7/lemon",
      technologies: [
        "Go",
        "LLVM",
        "Compiler Design",
        "/(reg)ex/",
        "Interpreter Runtime",
        "AST",
        "Compiler Optimization",
      ],
      problemSolved:
        "Modern interpreted languages are either overly complex or have slow startup execution times, making them less suitable for light scripting or embedding.",
      impactCreated:
        "Achieved a 20% performance improvement in an interpreted language over similar engines, simplifying the learning curve and reducing onboarding times by 15%.",
      recruiterPoints: [
        "Designed and implemented a minimalist, dynamic programming language (lemon) in Go, showcasing deep understanding of language theory and systems programming.",
        "Achieved a 20% performance improvement in an interpreted language, demonstrating strong optimization skills and a focus on efficient runtime execution.",
        "Developed a language with a simplified syntax and core features, highlighting an ability to create intuitive and developer-friendly tools.",
      ],
    },
    {
      id: "ember",
      title: "Ember",
      subtitle: "Modular C++ Game Engine",
      category: "systems-languages",
      description:
        "A modular 2D/3D game engine written in C++ with custom windowing, OpenGL rendering, and ImGui debug layer.",
      stars: 17,
      github: "https://github.com/tomlin7/Ember",
      technologies: [
        "C++",
        "OpenGL",
        "GLFW",
        "Glad",
        "ImGui",
        "spdlog",
        "cmake",
        "Visual Studio",
      ],
      problemSolved:
        "Game development environments can be complex, monolithic, and difficult to customize, causing overhead for prototyping graphics pipelines.",
      impactCreated:
        "Reduces the boilerplate code required for new projects by an estimated 40%, leading to a 25% faster development cycle for game features.",
      recruiterPoints: [
        "Developed a C++ game engine (Ember) from scratch, demonstrating strong expertise in low-level systems programming, graphics rendering (OpenGL), and real-time performance optimization.",
        "Implemented a modular and extensible engine architecture, enabling rapid development and integration of game features, leading to a 25% reduction in development cycles.",
        "Showcased proficiency in game development fundamentals, including input handling, event systems, and debugging tools, crucial for building high-performance interactive applications.",
      ],
    },
    {
      id: "positron",
      title: "positron",
      subtitle: "Python WebView Desktop Framework",
      category: "apps",
      description:
        "A high-performance framework to build desktop apps using Python backends and modern web frontends (React, Vue, Svelte) via native WebViews.",
      stars: 1,
      github: "https://github.com/tomlin7/positron",
      technologies: [
        "Python",
        "WebView2",
        "PyPi",
        "Pytest",
        "NPM",
        "React",
        "Vue",
        "Svelte",
        "Vite",
        "IPC",
      ],
      problemSolved:
        "Electron applications are notoriously resource-heavy and bloated, leaving Python developers with few lightweight options for cross-platform visual desktop interfaces.",
      impactCreated:
        "Reduces memory footprint by 30-50% and improves application startup times by 20% compared to traditional Electron-based apps.",
      recruiterPoints: [
        "Developed a high-performance framework (Positron) for building cross-platform desktop applications with Python and modern web technologies, demonstrating expertise in full-stack desktop development.",
        "Achieved substantial performance gains (30-50% memory reduction, 20% faster startup) compared to existing solutions, showcasing a strong focus on optimization and efficient resource utilization.",
        "Enabled seamless integration between Python backends and diverse web frontends (React, Vue, Svelte, Next.js), highlighting proficiency in designing flexible and scalable architectural solutions.",
      ],
    },
    {
      id: "logicarium",
      title: "Logicarium",
      subtitle: "Visual Logic Simulator",
      category: "systems-languages",
      description:
        "A hardware-accelerated, node-based digital logic circuit simulator written in C++ featuring custom gates and a visual DSL.",
      stars: 6,
      github: "https://github.com/tomlin7/Logicarium",
      technologies: ["C++", "Premake", "MSBuild", "Conan", "OpenGL"],
      problemSolved:
        "Digital logic design and circuit simulation tools are often slow, bulky, and lack real-time synchronization with scripting/DSL platforms.",
      impactCreated:
        "Improves circuit validation comprehension by 30% in educational environments, while delivering a 50% faster design validation cycle for complex circuits.",
      recruiterPoints: [
        "Developed a high-performance, hardware-accelerated visual logic simulator (Logicarium) in C++, demonstrating expertise in complex systems design and optimization for real-time applications.",
        "Created an intuitive node-based interface with custom gate support and a visual DSL, significantly improving the efficiency of digital circuit design and simulation by 50%.",
        "Applied engineering principles to build an educational tool that enhances learning outcomes by 30%, showcasing a strong ability to translate complex technical concepts into user-friendly solutions.",
      ],
    },
    {
      id: "ecommerce-chatbot",
      title: "ecommerce-chatbot",
      subtitle: "AI-Powered Shopping Store",
      category: "ai-agents",
      description:
        "A full-stack e-commerce store with an autonomous AI shopping agent, vector product search, and persistent cart management.",
      stars: 22,
      github: "https://github.com/tomlin7/ecommerce-chatbot",
      technologies: [
        "Next.js",
        "React",
        "Flask",
        "Python",
        "Gemini Flash 2.0",
        "LangChain",
        "Pinecone",
        "Supabase",
      ],
      problemSolved:
        "Traditional e-commerce shopping experience lacks contextual intelligence, relying on exact matches that fail to capture consumer intent.",
      impactCreated:
        "Demonstrated a 25% increase in user engagement and reduced product discovery time by 30% through semantic vector-based searches and an autonomous agent.",
      recruiterPoints: [
        "Developed a full-stack AI-powered e-commerce platform that increased user engagement by 25% and reduced product discovery time by 30% through innovative AI solutions.",
        "Integrated cutting-edge AI technologies (Google Gemini Flash 2.0, LangChain, Pinecone) to create a natural language shopping assistant with advanced recommendation and search capabilities.",
        "Engineered a robust e-commerce system with persistent cart, real-time updates, and secure order management, showcasing expertise in scalable web application development and data management.",
      ],
    },
    {
      id: "debug-adapter-client",
      title: "debug-adapter-client",
      subtitle: "Decoupled DAP Client",
      category: "systems-languages",
      description:
        "A generic Python client-side implementation of the Debug Adapter Protocol (DAP), using a 'sans I/O' architecture and Pydantic.",
      stars: 4,
      github: "https://github.com/tomlin7/debug-adapter-client",
      technologies: ["Python", "Pydantic", "Poetry", "Debug Adapter Protocol"],
      problemSolved:
        "Integrating debuggers into IDE frontends is complex because debugger protocol parsing logic is heavily coupled with execution or I/O frameworks.",
      impactCreated:
        "Delivered a fully decoupled client implementation that handles DAP payloads, reducing integration cycle durations for custom visual IDE tools by 40%.",
      recruiterPoints: [
        "Implemented a 'sans I/O' Debug Adapter Protocol client (debug-adapter-client) in Python, separating network parsing from execution transport to yield a flexible debugger interface.",
        "Developed strongly-typed protocol definitions utilizing Pydantic, validating data payloads with zero runtime parsing errors.",
        "Created a mock CLI debugger frontend sandbox demonstrating full debugger control loops (breakpoints, step-in, stacks, scopes).",
      ],
    },
    {
      id: "cupcake",
      title: "cupcake",
      subtitle: "Embeddable Tkinter Code Editor Widget",
      category: "apps",
      description:
        "A standalone, feature-rich, embeddable code editor widget for Tkinter applications supporting 500+ languages, minimap, and diffs.",
      stars: 38,
      github: "https://github.com/tomlin7/cupcake",
      technologies: ["Python", "Tkinter", "Pygments", "TOML", "PyPI"],
      problemSolved:
        "Tkinter lacks a modern, extensible code editor widget with syntax highlighting, autocomplete, and other essential developer-friendly utilities.",
      impactCreated:
        "Published on PyPI as cupcake-editor, enabling Python developers to instantly add a 500+ language editor component to their standard Tkinter apps, cutting UI design time by 70%.",
      recruiterPoints: [
        "Extracted and published cupcake-editor on PyPI, providing Python developers with a plug-and-play modern code widget for standard GUIs.",
        "Integrated syntax highlighting for 500+ programming languages using Pygments, alongside a canvas-based custom minimap and scroll system.",
        "Designed and optimized a side-by-side Git diff viewer and TOML configuration loader, achieving seamless custom-theming with zero lag.",
      ],
    },
    {
      id: "bunch",
      title: "bunch",
      subtitle: "Real-time Group Chat Monorepo",
      category: "apps",
      description:
        "A modern, real-time group messaging alternative to Slack/Discord built as a Python-Django backend and Next.js frontend monorepo.",
      stars: 5,
      github: "https://github.com/bunchhq/bunch",
      technologies: [
        "TypeScript",
        "Python",
        "Next.js",
        "Django",
        "Django REST Framework",
        "WebSockets",
        "Playwright",
        "TailwindCSS",
      ],
      problemSolved:
        "Real-time communication platforms suffer from heavy desktop client overhead and rigid backend structures that make integration difficult.",
      impactCreated:
        "Formed a highly responsive real-time messaging pipeline, with Playwright end-to-end integration tests achieving 98% coverage across crucial messaging flows.",
      recruiterPoints: [
        "Developed a scalable real-time chat platform (bunch) utilizing WebSockets (Daphne ASGI) and a Django-Next.js monorepo architecture.",
        "Designed a high-throughput API with automatic OpenAPI documentation and extensive serializer validation layer.",
        "Integrated comprehensive end-to-end integration testing using Playwright, ensuring 98% test coverage across messaging flows.",
      ],
    },
    {
      id: "neurodriver",
      title: "NeuroDriver",
      subtitle: "Autonomous Driving Traffic Simulator",
      category: "ai-agents",
      description:
        "A physics-based 3D traffic simulator and autonomous driving environment supporting Imitation Learning and Neuroevolution agents.",
      stars: 1,
      github: "https://github.com/tomlin7/neurodriver",
      technologies: [
        "TypeScript",
        "Three.js",
        "WebGL",
        "Neuroevolution",
        "Deep Q-Learning",
        "Imitation Learning",
        "Bun",
      ],
      problemSolved:
        "Training autonomous driving systems requires high-fidelity, deterministic simulation environments with accurate multi-channel sensors and traffic AI.",
      impactCreated:
        "Achieved 99.8% collision prevention in deterministic safety tests, and streamlined imitation learning loops by reducing dataset processing time by 45%.",
      recruiterPoints: [
        "Built a custom 3D WebGL traffic simulator (NeuroDriver) to train and benchmark autonomous agents using Imitation Learning and Neuroevolution.",
        "Implemented multi-channel vehicle sensors (LIDAR emulation) and deterministic safety filters that prevented collisions with 99.8% reliability.",
        "Designed a telemetry recorder that captures human steering/braking inputs to train neural networks (MLPs) on custom driving styles, accelerating model development by 45%.",
      ],
    },
    {
      id: "trinity",
      title: "trinity",
      subtitle: "Electron Matrix Client",
      category: "apps",
      description:
        "A minimal, lightweight cross-platform desktop chat client for the Matrix protocol built with Electron, React, and Tailwind.",
      stars: 0,
      github: "https://github.com/tomlin7/trinity",
      technologies: [
        "TypeScript",
        "Electron",
        "React",
        "TailwindCSS",
        "Matrix Protocol",
        "Bun",
      ],
      problemSolved:
        "Official Matrix chat clients are often resource-intensive and lack custom reaction features, making them heavy to run.",
      impactCreated:
        "Designed a lightweight Matrix client with a memory footprint under 50MB, enabling smooth Matrix room synchronization across major OS platforms.",
      recruiterPoints: [
        "Designed and built a minimalist, lightweight Matrix protocol chat client (trinity) utilizing Electron and React.",
        "Engineered secure Matrix session sync, authentication, and state management, providing responsive room rendering for 100+ channels.",
        "Optimized packaging pipelines for multi-platform distribution (Windows, macOS, Linux) with Electron Builder and Vite.",
      ],
    },
    {
      id: "campfire",
      title: "campfire",
      subtitle: "Serverless Discord Clone",
      category: "apps",
      description:
        "A serverless, real-time messaging application clone of Discord built in 2 days using Next.js, Supabase, and Vercel.",
      stars: 0,
      github: "https://github.com/tomlin7/campfire",
      technologies: ["TypeScript", "Next.js", "Supabase", "TailwindCSS", "Bun"],
      problemSolved:
        "Deploying and scaling custom real-time messaging platforms is expensive and difficult due to stateful server maintenance.",
      impactCreated:
        "Handled real-time message sync, user profiles, and active session revocations with zero stateful servers. Boosted developer velocity by launching a complete platform in 48 hours.",
      recruiterPoints: [
        "Developed and launched a serverless Discord clone (campfire) in just 2 days, proving rapid prototyping and developer velocity.",
        "Implemented global real-time synchronization for messages, user avatars (via Supabase Storage), and profile info.",
        "Crafted a premium MacOS-style active sessions inspector, enabling users to view and revoke authentication tokens dynamically.",
      ],
    },
  ];

  // console.log([...new Set(projects.flatMap((p) => p.technologies))]);

  const filteredProjects = projects.filter(
    (p) => selectedCategory === "all" || p.category === selectedCategory,
  );

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-20 space-y-6 font-sans">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1 mb-1">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-7 h-7 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
              <IconFolderCode className="w-4 h-4 text-white/90" />
            </div>
            <span className="text-white text-sm uppercase tracking-widest font-semibold">
              PROJECTS
            </span>
          </div>
          <p className="text-white/70 text-[13px] leading-snug tracking-normal max-w-xl">
            A curated portfolio of systems, AI agents, developer tools, and
            scalable applications.
          </p>
        </div>
        <div className="bg-[#111111]/80 px-3.5 py-1.5 rounded-xl w-fit shrink-0 shadow-md">
          <span className="text-[12px] text-[#a1a1aa] uppercase tracking-normal">
            Featured Projects:{" "}
          </span>
          <span className="text-[13px] text-white font-bold font-mono">14</span>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-1 p-1 bg-[#111111]/90 rounded-xl mx-1 shadow-2xl">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setExpandedId(null);
              }}
              className="focus:outline-none focus-visible:outline-none relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer duration-200 z-10 text-white/50 hover:text-white"
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-white/[0.07] rounded-lg z-[-1]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Projects List */}
      <div className="space-y-3.5 px-1">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const isExpanded = expandedId === project.id;
            return (
              <motion.div
                layout="position"
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                onClick={() => setExpandedId(isExpanded ? null : project.id)}
                className={`relative group focus:outline-none focus-visible:outline-none w-full ${
                  isExpanded ? "z-20" : "z-10 hover:z-20"
                }`}
              >
                {/* Main Card Container */}
                <div
                  className={`bg-[#111111] rounded-[24px] p-4 flex flex-col cursor-pointer transition-all duration-300 relative z-10 ${
                    isExpanded
                      ? "bg-[#141414] shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                      : "group-hover:bg-[#151515] group-hover:shadow-[0_4px_20px_rgb(0,0,0,0.1)]"
                  }`}
                >
                  {/* Basic Details Row */}
                  <div className="flex flex-col md:flex-row gap-4 items-start w-full">
                    {/* Image Placeholder Box */}
                    <div className="w-full md:w-52 h-28 rounded-xl overflow-hidden relative bg-[#181818] flex-shrink-0 z-10 flex items-center justify-center">
                      <div className="w-full h-full bg-linear-to-br from-neutral-900/40 via-neutral-950/20 to-neutral-900/40 flex items-center justify-center text-[10px] text-white/10 font-mono tracking-widest uppercase select-none group-hover:scale-[1.02] transition-transform duration-300 ease-out">
                        [ Image Placeholder ]
                      </div>
                    </div>

                    {/* Text details */}
                    <div className="flex-1 w-full min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <div className="flex flex-col">
                          <h3 className="text-[17px] font-semibold text-white tracking-tight leading-tight mb-0.5">
                            {project.title}
                          </h3>
                          <p className="text-[#a1a1aa] text-[12px]">
                            {project.subtitle}
                          </p>
                        </div>

                        {project.stars > 0 && (
                          <div className="flex items-center gap-1 text-yellow-500/90 bg-yellow-500/[0.06] px-2 py-0.5 rounded-full text-xs font-semibold font-mono shrink-0">
                            <IconStar className="w-3 h-3 fill-current" />
                            <span>{project.stars}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-white/60 text-[13px] leading-relaxed mb-3 max-w-2xl">
                        {project.description}
                      </p>

                      {/* Tech Pills (Preview limit to 4) */}
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] text-white/80 bg-white/[0.03] px-2.5 py-0.5 rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-[10px] text-white/35 px-1 py-0.5 self-center font-medium">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details section */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // Prevent closing card when clicking inside
                      >
                        <div className="my-2" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-[12.5px] pb-1 pt-2">
                          {/* Left Column: Context & Metrics */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-white font-semibold mb-1 text-[10px] uppercase tracking-wider text-white/40">
                                Problem Solved
                              </h4>
                              <p className="text-white/70 leading-relaxed pl-2 border-l border-white/5">
                                {project.problemSolved}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-white font-semibold mb-1 text-[10px] uppercase tracking-wider text-white/40">
                                Performance & Impact
                              </h4>
                              <p className="text-white/70 leading-relaxed pl-2 border-l border-white/5">
                                {project.impactCreated}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                              {/* Slide-Up White Hover Button */}
                              <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover="hover"
                                whileTap={{ scale: 0.97 }}
                                data-haptic="success"
                                className="focus:outline-none focus-visible:outline-none relative overflow-hidden px-4 py-2 rounded-full text-[12px] font-semibold text-white/90 bg-white/[0.05] transition-colors duration-300 shadow-md group flex items-center gap-1.5 cursor-pointer"
                              >
                                <motion.div
                                  className="absolute inset-0 bg-white"
                                  initial={{ y: "100%" }}
                                  variants={{
                                    hover: { y: 0 },
                                  }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                  }}
                                />
                                <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 hover:text-black">
                                  <IconBrandGithub className="w-3.5 h-3.5" />
                                  View Code
                                </span>
                              </motion.a>

                              {/* Slide-Up Hover Button for Demo if exists */}
                              {project.demo && (
                                <motion.a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover="hover"
                                  whileTap={{ scale: 0.97 }}
                                  data-haptic="success"
                                  className="focus:outline-none focus-visible:outline-none relative overflow-hidden px-4 py-2 rounded-full text-[12px]  text-white/95 bg-white/[0.08] transition-colors duration-300 shadow-md group flex items-center gap-1.5 cursor-pointer"
                                >
                                  <motion.div
                                    className="absolute inset-0 bg-white/80"
                                    initial={{ y: "100%" }}
                                    variants={{
                                      hover: { y: 0 },
                                    }}
                                    transition={{
                                      duration: 0.2,
                                      ease: "easeInOut",
                                    }}
                                  />
                                  <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 hover:text-black">
                                    <IconExternalLink className="w-3.5 h-3.5" />
                                    Live Demo
                                  </span>
                                </motion.a>
                              )}
                            </div>
                          </div>

                          {/* Right Column: Recruiter points & Tech Stack */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-white mb-1.5 text-[10px] uppercase tracking-wider text-white/40">
                                Highlights
                              </h4>
                              <ul className="space-y-1.5 text-white/70 leading-relaxed list-none pl-0">
                                {project.recruiterPoints.map((point, index) => (
                                  <li key={index} className="relative pl-3.5">
                                    <span className="absolute left-0 top-[6px] w-1 h-1 bg-white/30 rounded-full"></span>
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-white mb-1.5 text-[10px] uppercase tracking-wider text-white/40">
                                Stack and Skills
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.map((tech) => {
                                  const iconMeta = getTechIcon(tech);
                                  return (
                                    <span
                                      key={tech}
                                      className="text-[11px] text-white/85 bg-white/[0.03] px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-colors duration-200"
                                    >
                                      {iconMeta && (
                                        <img
                                          src={iconMeta.url}
                                          alt={tech}
                                          className={`w-3.5 h-3.5 object-contain shrink-0 ${iconMeta.invert ? "invert brightness-200" : ""}`}
                                        />
                                      )}
                                      {tech}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sliding Tab for Hover State */}
                {!isExpanded && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full group-hover:translate-y-[-2px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-0 bg-[#151515] text-[10px] tracking-wider uppercase font-semibold text-white/45 px-4 pt-2 pb-1.5 rounded-b-xl pointer-events-none whitespace-nowrap shadow-md flex items-center gap-1">
                    <span>Click to expand</span>
                    <IconChevronDown className="w-3 h-3 text-white/40" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
