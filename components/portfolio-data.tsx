import React, { useState, useEffect, useRef } from "react";
import { useWebHaptics } from "web-haptics/react";
import {
  IconUser,
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBriefcase,
  IconCode,
  IconCpu,
  IconTerminal,
  IconDeviceDesktop,
  IconExternalLink,
  IconFolder,
  IconStar,
  IconGitFork,
  IconSettings,
  IconChevronRight,
  IconMapPin,
  IconPhone,
  IconSearch,
  IconFileText,
  IconClock,
  IconActivity,
  IconArrowLeft,
  IconArrowRight,
  IconFile,
  IconAppWindow,
  IconBrowser,
  IconCertificate,
  IconPencil,
  IconNotes,
  IconPlus,
  IconLayoutGrid,
  IconList,
  IconShare,
  IconTag,
  IconDots,
  IconChevronDown,
  IconDownload,
  IconTrash,
  IconDatabase,
  IconCopy,
  IconCheck,
  IconInfoCircle,
  IconFolderFilled,
  IconUsers,
} from "@tabler/icons-react";

export const finderMenuItems = [
  { label: "About This Mac", separator: true },
  { label: "System Settings..." },
  { label: "App Store...", separator: true },
  { label: "Recent Items" },
  { label: "Force Quit Finder", separator: true },
  { label: "Sleep" },
  { label: "Restart..." },
  { label: "Shut Down..." },
];

export const fileMenuItems = [
  { label: "New Finder Window" },
  { label: "New Folder" },
  { label: "Open" },
  { label: "Close Window" },
];
export const editMenuItems = [
  { label: "Undo" },
  { label: "Redo" },
  { label: "Cut" },
  { label: "Copy" },
  { label: "Paste" },
];
export const viewMenuItems = [
  { label: "As Icons" },
  { label: "As List" },
  { label: "As Columns" },
  { label: "As Gallery" },
];
export const windowMenuItems = [
  { label: "Minimize" },
  { label: "Zoom" },
  { label: "Cycle Through Windows" },
];
export const helpMenuItems = [
  { label: "Tips for Your Mac" },
  { label: "macOS Help" },
];

const TECH_ICONS: Record<string, { url: string; invert?: boolean }> = {
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

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stars: number;
  forks?: number;
  category: "ai-agents" | "systems-languages" | "apps";
  github: string;
  demo?: string;
  technologies: string[];
  problemSolved: string;
  impactCreated: string;
  recruiterPoints: string[];
  tags: string[];
  dateModified: string;
}

export const allProjectsList: Project[] = [
  {
    id: "ted",
    title: "ted",
    subtitle: "Agent-Native IDE Platform",
    category: "ai-agents",
    description:
      "A minimalist, high-performance code editor built specifically for AI agents, integrating Tree-sitter, WASM, and autonomous tool-execution loops.",
    stars: 12,
    forks: 3,
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
    tags: ["Urgent"],
    dateModified: "May 22, 2026 at 4:32 PM",
  },
  {
    id: "biscuit",
    title: "biscuit",
    subtitle: "Fast, Extensible Code Editor",
    category: "systems-languages",
    description:
      "A fast, extensible, native code editor with integrated agent capabilities, designed to be ultra-lightweight (<20 MB) with Tree-sitter highlighting.",
    stars: 256,
    forks: 32,
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
      "Developed a high-performance, native code editor (biscuit) with 250+ stars, demonstrating expertise in building scalable developer tools.",
      "Integrated AI agent capabilities into the editor, enhancing developer productivity by 25% through intelligent code assistance and automation.",
      "Designed an extensible architecture supporting a rich plugin ecosystem, showcasing strong skills in API design and community-focused builds.",
    ],
    tags: ["Urgent", "Work"],
    dateModified: "May 23, 2026 at 11:15 AM",
  },
  {
    id: "hypercode",
    title: "hypercode",
    subtitle: "Autonomous CLI Coding Agent",
    category: "ai-agents",
    description:
      "A lightweight autonomous CLI-based coding agent framework using a ReAct loop to reason, act, observe, and write code.",
    stars: 3,
    forks: 1,
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
      "Developed an autonomous CLI coding agent framework (hypercode) utilizing a ReAct-style agent loop, demonstrating expertise in AI agent design and automation.",
      "Integrated advanced AI technologies including Google Gemini Flash 2.0, LangChain, and Pinecone, leveraging cutting-edge tools for practical coding environments.",
      "Created a system that significantly accelerates scripting and editing tasks by up to 50% through intelligent task automation loops.",
    ],
    tags: ["Work"],
    dateModified: "May 20, 2026 at 2:05 PM",
  },
  {
    id: "lemon",
    title: "lemon",
    subtitle: "The Lemon Programming Language",
    category: "systems-languages",
    description:
      "A minimalist, dynamic, and fast interpreted programming language written in Go from scratch.",
    stars: 8,
    forks: 2,
    github: "https://github.com/tomlin7/lemon",
    technologies: [
      "Go",
      "LLVM",
      "Compiler Design",
      "Regex",
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
    tags: ["Work"],
    dateModified: "May 18, 2026 at 10:10 AM",
  },
  {
    id: "ember",
    title: "Ember",
    subtitle: "Modular C++ Game Engine",
    category: "systems-languages",
    description:
      "A modular 2D/3D game engine written in C++ with custom windowing, OpenGL rendering, and ImGui debug layer.",
    stars: 17,
    forks: 4,
    github: "https://github.com/tomlin7/Ember",
    technologies: [
      "C++",
      "OpenGL",
      "GLFW",
      "Glad",
      "ImGui",
      "Spdlog",
      "CMake",
      "Visual Studio",
    ],
    problemSolved:
      "Game development environments can be complex, monolithic, and difficult to customize, causing overhead for prototyping graphics pipelines.",
    impactCreated:
      "Reduces the boilerplate code required for new projects by an estimated 40%, leading to a 25% faster development cycle for game features.",
    recruiterPoints: [
      "Developed a C++ game engine (Ember) from scratch, demonstrating strong expertise in low-level systems programming, graphics rendering (OpenGL), and real-time performance optimization.",
      "Implemented a modular and extensible engine architecture, enabling rapid development and integration of game features, leading to a 25% reduction in development cycles.",
      "Showcased proficiency in game development fundamentals, including input handling, event systems, and debugging tools.",
    ],
    tags: ["Work"],
    dateModified: "May 15, 2026 at 6:40 PM",
  },
  {
    id: "positron",
    title: "positron",
    subtitle: "Python WebView Desktop Framework",
    category: "apps",
    description:
      "A high-performance framework to build desktop apps using Python backends and modern web frontends (React, Vue, Svelte) via native WebViews.",
    stars: 1,
    forks: 0,
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
      "Enabled seamless integration between Python backends and diverse web frontends (React, Vue, Svelte, Next.js).",
    ],
    tags: ["Work"],
    dateModified: "May 14, 2026 at 3:12 PM",
  },
  {
    id: "logicarium",
    title: "Logicarium",
    subtitle: "Visual Logic Simulator",
    category: "systems-languages",
    description:
      "A hardware-accelerated, node-based digital logic circuit simulator written in C++ featuring custom gates and a visual DSL.",
    stars: 6,
    forks: 1,
    github: "https://github.com/tomlin7/Logicarium",
    technologies: ["C++", "Premake", "MSBuild", "Conan", "OpenGL"],
    problemSolved:
      "Digital logic design and circuit simulation tools are often slow, bulky, and lack real-time synchronization with scripting/DSL platforms.",
    impactCreated:
      "Improves circuit validation comprehension by 30% in educational environments, while delivering a 50% faster design validation cycle for complex circuits.",
    recruiterPoints: [
      "Developed a high-performance, hardware-accelerated visual logic simulator (Logicarium) in C++, demonstrating expertise in complex systems design and optimization for real-time applications.",
      "Created an intuitive node-based interface with custom gate support and a visual DSL, significantly improving the efficiency of digital circuit design and simulation by 50%.",
      "Applied engineering principles to build an educational tool that enhances learning outcomes by 30%.",
    ],
    tags: ["Work"],
    dateModified: "May 10, 2026 at 9:02 AM",
  },
  {
    id: "ecommerce-chatbot",
    title: "ecommerce-chatbot",
    subtitle: "AI-Powered Shopping Store",
    category: "ai-agents",
    description:
      "A full-stack e-commerce store with an autonomous AI shopping agent, vector product search, and persistent cart management.",
    stars: 22,
    forks: 6,
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
      "Engineered a robust e-commerce system with persistent cart, real-time updates, and secure order management.",
    ],
    tags: ["Work", "Vacation"],
    dateModified: "May 08, 2026 at 1:40 PM",
  },
  {
    id: "debug-adapter-client",
    title: "debug-adapter-client",
    subtitle: "Decoupled DAP Client",
    category: "systems-languages",
    description:
      "A generic Python client-side implementation of the Debug Adapter Protocol (DAP), using a 'sans I/O' architecture and Pydantic.",
    stars: 4,
    forks: 1,
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
    tags: ["Work"],
    dateModified: "May 05, 2026 at 11:30 AM",
  },
  {
    id: "cupcake",
    title: "cupcake",
    subtitle: "Embeddable Tkinter Code Editor Widget",
    category: "apps",
    description:
      "A standalone, feature-rich, embeddable code editor widget for Tkinter applications supporting 500+ languages, minimap, and diffs.",
    stars: 38,
    forks: 5,
    github: "https://github.com/tomlin7/cupcake",
    technologies: ["Python", "Tkinter", "Pygments", "TOML", "PyPI"],
    problemSolved:
      "Tkinter lacks a modern, extensible code editor widget with syntax highlighting, autocomplete, and other essential developer-friendly utilities.",
    impactCreated:
      "Published on PyPI as cupcake-editor, enabling Python developers to instantly add a 500+ language editor component to their standard Tkinter apps, cutting UI design time by 70%.",
    recruiterPoints: [
      "Extracted and published cupcake-editor on PyPI, providing Python developers with a plug-and-play modern code widget for standard GUIs.",
      "Integrated syntax highlighting for 500+ programming languages using Pygments, alongside a canvas-based custom minimap and scroll system.",
      "Designed and optimized a side-by-side Git diff viewer and TOML configuration loader.",
    ],
    tags: ["Vacation"],
    dateModified: "May 02, 2026 at 4:55 PM",
  },
  {
    id: "bunch",
    title: "bunch",
    subtitle: "Real-time Group Chat Monorepo",
    category: "apps",
    description:
      "A modern, real-time group messaging alternative to Slack/Discord built as a Python-Django backend and Next.js frontend monorepo.",
    stars: 5,
    forks: 1,
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
    tags: ["Vacation"],
    dateModified: "April 29, 2026 at 10:15 AM",
  },
  {
    id: "neurodriver",
    title: "NeuroDriver",
    subtitle: "Autonomous Driving Traffic Simulator",
    category: "ai-agents",
    description:
      "A physics-based 3D traffic simulator and autonomous driving environment supporting Imitation Learning and Neuroevolution agents.",
    stars: 1,
    forks: 0,
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
      "Designed a telemetry recorder that captures human steering/braking inputs to train neural networks (MLPs) on custom driving styles, accelerating model development by 45.",
    ],
    tags: ["Work"],
    dateModified: "April 25, 2026 at 5:00 PM",
  },
  {
    id: "trinity",
    title: "trinity",
    subtitle: "Electron Matrix Client",
    category: "apps",
    description:
      "A minimal, lightweight cross-platform desktop chat client for the Matrix protocol built with Electron, React, and Tailwind.",
    stars: 0,
    forks: 0,
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
    tags: ["Vacation"],
    dateModified: "April 20, 2026 at 11:42 AM",
  },
  {
    id: "campfire",
    title: "campfire",
    subtitle: "Serverless Discord Clone",
    category: "apps",
    description:
      "A serverless, real-time messaging application clone of Discord built in 2 days using Next.js, Supabase, and Vercel.",
    stars: 0,
    forks: 0,
    github: "https://github.com/tomlin7/campfire",
    technologies: ["TypeScript", "Next.js", "Supabase", "TailwindCSS", "Bun"],
    problemSolved:
      "Deploying and scaling custom real-time messaging platforms is expensive and difficult due to stateful server maintenance.",
    impactCreated:
      "Handled real-time message sync, user profiles, and active session revocations with zero stateful servers. Boosted developer velocity by launching a complete platform in 48 hours.",
    recruiterPoints: [
      "Developed and launched a serverless Discord clone (campfire) in just 2 days, proving rapid prototyping and developer velocity.",
      "Implemented global real-time synchronization for messages, user avatars (via Supabase Storage), and profile info.",
      "Crafted a premium macOS-style active sessions inspector, enabling users to view and revoke authentication tokens dynamically.",
    ],
    tags: ["Vacation"],
    dateModified: "April 18, 2026 at 2:20 PM",
  },
];

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
  dateModified: string;
}

export const allExperiencesList: Experience[] = [
  {
    id: "exp_morvion",
    title: "Software Engineer Intern",
    company: "Morvion",
    location: "ZH, Switzerland (Remote)",
    period: "Dec 2025 – Mar 2026",
    bullets: [
      "Architected and deployed a full-scale CRM from scratch using Next.js, FastAPI, and PostgreSQL.",
      "Engineered production-ready SaaS features, improving client onboarding speeds by 35%.",
      "Optimized database queries and API endpoints, reducing page response latency by 20%.",
    ],
    tags: ["Work"],
    dateModified: "March 15, 2026 at 6:00 PM",
  },
  {
    id: "exp_hooman",
    title: "Full-Stack Developer Intern",
    company: "Hooman Digital",
    location: "India (Remote)",
    period: "Jul 2025 – Oct 2025",
    bullets: [
      "Architected chartor.ai, an AI-powered conversational search client for relational databases.",
      "Standardized internal company infrastructure with automated Docker deployment pipelines.",
      "Created custom dashboard widgets utilizing React and dynamic charting engines.",
    ],
    tags: ["Work"],
    dateModified: "October 05, 2025 at 5:00 PM",
  },
  {
    id: "exp_nitc",
    title: "Deep Learning Research Intern",
    company: "NIT Calicut",
    location: "Calicut, India",
    period: "May 2025 – Jul 2025",
    bullets: [
      "Developed CNN-Transformer fusion models for advanced computer vision and time-series analysis.",
      "Collaborated on neural research, accelerating model training steps by 30% via PyTorch optimizations.",
      "Preprocessed and cleaned large datasets of traffic and telemetry information.",
    ],
    tags: ["Work"],
    dateModified: "July 20, 2025 at 4:30 PM",
  },
  {
    id: "exp_ozi",
    title: "Software Engineer Intern",
    company: "Ozi",
    location: "Gurugram, India (Remote)",
    period: "Nov 2024 – Feb 2025",
    bullets: [
      "Architected the zero-to-one MVP for a social utility application.",
      "Engineered foundational full-stack infrastructure, handling secure user authentication and profiles.",
      "Designed real-time messaging services with persistent storage.",
    ],
    tags: ["Work"],
    dateModified: "February 15, 2025 at 12:00 PM",
  },
];

export const ProfileWindowContent = () => {
  const [activeTab, setActiveTab] = useState("apple-account");

  return (
    <div className="flex h-[550px] bg-[#1c1c1e] text-white rounded-b-xl overflow-hidden border-t border-white/5 font-sans">
      {/* System Settings Left Sidebar */}
      <div className="w-[200px] bg-[#2a2a2c] p-3 flex flex-col border-r border-[#1c1c1e] shrink-0 overflow-y-auto select-none">
        {/* Apple Account Sidebar Header */}
        <div
          onClick={() => setActiveTab("apple-account")}
          className={`flex items-center space-x-2.5 p-2 rounded-xl mb-4 cursor-pointer transition-colors ${activeTab === "apple-account" ? "bg-[#387bf6] text-white" : "hover:bg-white/5"}`}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3a1c1c] via-[#4d2a1c] to-[#1c3a4d] border border-white/10 flex items-center justify-center text-sm text-orange-200 shrink-0 relative">
            <img
              src="https://res.cloudinary.com/dwmxbkhch/image/upload/v1779538094/8588c8e8-e499-4a03-9e5e-8e1a491b9bf5.png"
              alt="Profile Picture"
              className="w-9 h-9 rounded-full select-none"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-[#2a2a2c] rounded-full" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] truncate leading-snug">Dheeraj C.</div>
            <div className="text-[10px] text-white/50 truncate leading-none mt-0.5">
              Account Info
            </div>
          </div>
        </div>

        {/* Sidebar Navigation Options */}
        <div className="space-y-1">
          {[
            {
              id: "apple-account",
              label: "Apple Account",
              icon: <IconUser className="w-4 h-4 text-orange-400" />,
            },
            {
              id: "tech-specs",
              label: "General / Specs",
              icon: <IconSettings className="w-4 h-4 text-[#8a8a8f]" />,
            },
            {
              id: "education",
              label: "Education & Stats",
              icon: <IconCertificate className="w-4 h-4 text-[#34c759]" />,
            },
            {
              id: "contact",
              label: "Contact Info",
              icon: <IconMail className="w-4 h-4 text-[#0a84ff]" />,
            },
            {
              id: "socials",
              label: "Internet Profiles",
              icon: <IconBrowser className="w-4 h-4 text-[#5856d6]" />,
            },
          ].map((tab) => {
            if (tab.id === "apple-account") return null;

            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-[13px] font-semibold text-left transition-colors cursor-pointer ${isSelected ? "bg-[#387bf6] text-white" : "text-white/80 hover:bg-white/5"}`}
              >
                {tab.icon}
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer label */}
        <div className="mt-auto pt-4 px-3 text-[9.5px] text-white/20 select-none text-center">
          macOS Sequoia 15.0
        </div>
      </div>

      {/* Main Settings Display Pane */}
      <div className="flex-1 bg-[#1c1c1e] p-6 overflow-y-auto custom-scrollbar">
        {activeTab === "apple-account" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <img
                src="https://res.cloudinary.com/dwmxbkhch/image/upload/v1779538094/8588c8e8-e499-4a03-9e5e-8e1a491b9bf5.png"
                alt="Profile Picture"
                className="w-20 h-20 rounded-full drop-shadow-sm select-none"
              />
              <h2 className="text-xl text-white">Dheeraj C.</h2>
              <p className="text-[12px] text-white/50">
                dheerajcofficial@gmail.com
              </p>
            </div>

            {/* Apple Account Info Rows */}
            <div className="space-y-4">
              <div className="bg-[#2a2a2c] rounded-xl border border-white/5 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5">
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold">
                      Personal Info
                    </span>
                    <span className="text-[13px] text-white font-medium">
                      systems & software engineer
                    </span>
                  </div>
                  <IconChevronRight className="w-4 h-4 text-white/25" />
                </div>
                <div className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5">
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold">
                      Location
                    </span>
                    <span className="text-[13px] text-white font-medium">
                      Bengaluru, India
                    </span>
                  </div>
                  <IconChevronRight className="w-4 h-4 text-white/25" />
                </div>
                <div className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors">
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold">
                      Current Focus
                    </span>
                    <span className="text-[13px] text-white font-medium">
                      building things close to the metal & devtools
                    </span>
                  </div>
                  <IconChevronRight className="w-4 h-4 text-white/25" />
                </div>
              </div>

              <div className="bg-[#2a2a2c] rounded-xl border border-white/5 overflow-hidden p-4">
                <h3 className="text-xs text-white/40 mb-2 uppercase tracking-wide">
                  BIO
                </h3>
                <p className="text-[12.5px] leading-relaxed text-white/80 font-medium">
                  i work on sophisticated agentic code editors, devtools, game
                  engines, rendering pipelines, compilers, and scalable backend
                  services. i care about performance, clean architecture, and
                  understanding how systems actually work under the hood.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tech-specs" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg text-white">General Specifications</h2>
              <p className="text-xs text-white/40">
                Technical capabilities and stack layout
              </p>
            </div>

            <div className="bg-[#2a2a2c] rounded-xl border border-white/5 overflow-hidden divide-y divide-white/5 text-[13px]">
              {[
                {
                  name: "Languages",
                  value: "Python, C++, Go, TypeScript, Rust, SQL, Bash",
                },
                {
                  name: "Frameworks & Backend",
                  value: "Node.js, Django, FastAPI, Express.js, Next.js, React",
                },
                {
                  name: "Systems & Graphics",
                  value:
                    "WebAssembly, compiler design, LLVM, OpenGL, GLFW, Glad",
                },
                {
                  name: "DevOps & Data",
                  value:
                    "PostgreSQL, Supabase, Redis, Docker, Kubernetes, AWS, Terraform, Kafka",
                },
                {
                  name: "AI & Neural Research",
                  value:
                    "Gemini, Claude, LangChain, Pinecone, PyTorch, HuggingFace",
                },
                {
                  name: "Work Environments",
                  value:
                    "Linux (Ubuntu / Arch), macOS, Windows, Neovim / VSCode",
                },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="flex py-3 px-4 items-start justify-between"
                >
                  <span className="text-white/40 font-semibold w-1/3 shrink-0">
                    {spec.name}
                  </span>
                  <span className="text-white font-medium w-2/3 text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg text-white">Education & Metrics</h2>
              <p className="text-xs text-white/40">
                Academic and programmatic benchmarks
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#2a2a2c] rounded-xl border border-white/5 p-4 flex items-start space-x-3.5">
                <img
                  src="https://res.cloudinary.com/dwmxbkhch/image/upload/v1779536812/Birla_Institute_of_Technology_Mesra_lmdwar.png"
                  alt="Birla Institute of Technology, Ranchi"
                  className="w-15 h-15 rounded-xl"
                />
                <div className="min-w-0">
                  <h3 className="text-[13.5px] text-white leading-none mb-1">
                    Birla Institute of Technology, Ranchi
                  </h3>
                  <p className="text-xs text-[#34c759] font-semibold">
                    B.Tech Computer Science & Engineering
                  </p>
                  <p className="text-[11px] text-white/40 font-medium mt-1">
                    2023 - 2027
                  </p>
                </div>
              </div>

              <div className="bg-[#2a2a2c] rounded-xl border border-white/5 p-4 flex items-start space-x-3.5">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/leetcode/leetcode-plain.svg"
                  alt="LeetCode"
                  className="w-13 h-13 rounded-xl"
                />
                <div className="min-w-0">
                  <h3 className="text-[13.5px] text-white leading-none mb-1">
                    LeetCode Competitive Rating
                  </h3>
                  <p className="text-xs text-blue-400 font-semibold">
                    Knight (Top 6%)
                  </p>
                  <p className="text-[11px] text-white/40 font-medium mt-1">
                    600+ problems solved, robust command of data structures &
                    algorithms
                  </p>
                </div>
              </div>

              <div className="bg-[#2a2a2c] rounded-xl border border-white/5 p-4">
                <h3 className="text-xs text-white/40 mb-2 uppercase tracking-wide">
                  Key Coursework Completed
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Operating Systems",
                    "Compiler Design",
                    "Data Structures & Algorithms",
                    "Database Management Systems",
                    "Artificial Intelligence",
                    "Machine Learning",
                    "Soft Computing",
                    "Discrete Mathematics",
                    "Data Communication",
                    "Computer Networks",
                    "Cryptography",
                    "Network Security",
                    "Design and Analysis of Algorithms",
                    "C++ Programming",
                    "Java Programming",
                  ].map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 bg-white/[0.04] rounded-full text-xs text-white/80 font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg text-white">Contact & Communication</h2>
              <p className="text-xs text-white/40">Contact info and Address</p>
            </div>

            <div className="bg-[#2a2a2c] rounded-xl border border-white/5 overflow-hidden divide-y divide-white/5">
              <a
                href="mailto:dheerajcofficial@gmail.com"
                className="flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <IconMail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold leading-none mb-0.5">
                      Email Address
                    </span>
                    <span className="text-[13px] text-white font-semibold group-hover:underline">
                      dheerajcofficial@gmail.com
                    </span>
                  </div>
                </div>
                <IconExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/45" />
              </a>

              <a
                href="tel:+918304981017"
                className="flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <IconPhone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold leading-none mb-0.5">
                      Phone Number
                    </span>
                    <span className="text-[13px] text-white font-semibold group-hover:underline">
                      +91 8304981017
                    </span>
                  </div>
                </div>
                <IconExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/45" />
              </a>

              <div className="flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <IconMapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold leading-none mb-0.5">
                      Location
                    </span>
                    <span className="text-[13px] text-white font-semibold">
                      Bengaluru (Bangalore), India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "socials" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg text-white">Internet Profiles</h2>
              <p className="text-xs text-white/40">
                GitHub, LinkedIn, and developer networks
              </p>
            </div>

            <div className="bg-[#2a2a2c] rounded-xl border border-white/5 overflow-hidden divide-y divide-white/5">
              {[
                {
                  name: "GitHub",
                  handle: "github.com/tomlin7",
                  link: "https://github.com/tomlin7",
                  icon: <IconBrandGithub className="w-4 h-4 text-white" />,
                  bg: "bg-[#24292e]",
                },
                {
                  name: "LinkedIn",
                  handle: "linkedin.com/in/initdhee",
                  link: "https://linkedin.com/in/initdhee",
                  icon: <IconBrandLinkedin className="w-4 h-4 text-white" />,
                  bg: "bg-[#0077b5]",
                },
                {
                  name: "Twitter / X",
                  handle: "x.com/tomfricks",
                  link: "https://x.com/tomfricks",
                  icon: <IconBrandX className="w-4 h-4 text-white" />,
                  bg: "bg-black",
                },
              ].map((soc, i) => (
                <a
                  key={i}
                  href={soc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg ${soc.bg} border border-white/10 flex items-center justify-center`}
                    >
                      {soc.icon}
                    </div>
                    <div>
                      <span className="block text-[10px] text-white/40 uppercase tracking-wider font-semibold leading-none mb-0.5">
                        {soc.name}
                      </span>
                      <span className="text-[13px] text-white font-semibold group-hover:underline">
                        {soc.handle}
                      </span>
                    </div>
                  </div>
                  <IconExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/45" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface FinderItem {
  id: string;
  name: string;
  kind: string;
  size: string;
  tags: string[];
  dateModified: string;
  description?: string;
  projectId?: string;
  experienceId?: string;
  isFolder?: boolean;
}

export const FinderWindowContent = ({
  initialDir,
  onOpenWindow,
  selectedId,
}: {
  initialDir?: string;
  onOpenWindow?: (id: string) => void;
  selectedId?: string | null;
}) => {
  const [currentDir, setCurrentDir] = useState<string>("documents");
  const [history, setHistory] = useState<string[]>(["documents"]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [localSearch, setLocalSearch] = useState<string>("");
  const [projectFilter, setProjectFilter] = useState<string>("all");

  const { trigger } = useWebHaptics({ debug: true });
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    info: true,
    desc: true,
    tech: false,
    details: false,
    contrib: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Popover menus state
  const [showShare, setShowShare] = useState(false);
  const [showTagEdit, setShowTagEdit] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic file list state
  const [dirFiles, setDirFiles] = useState<Record<string, FinderItem[]>>({
    documents: [
      {
        id: "dir_projects",
        name: "Projects",
        kind: "Folder",
        size: "14 items",
        tags: ["Work"],
        dateModified: "May 23, 2026 at 11:15 AM",
        isFolder: true,
      },
      {
        id: "dir_experience",
        name: "Experience",
        kind: "Folder",
        size: "4 items",
        tags: ["Work"],
        dateModified: "May 23, 2026 at 6:00 PM",
        isFolder: true,
      },
    ],
    projects: allProjectsList.map((p) => ({
      id: p.id,
      name: `${p.title}.app`,
      kind:
        p.category === "ai-agents"
          ? "AI Agent"
          : p.category === "systems-languages"
            ? "Systems App"
            : "Web App",
      size: `${p.stars} stars`,
      tags: p.tags,
      dateModified: p.dateModified,
      projectId: p.id,
    })),
    experience: allExperiencesList.map((e) => ({
      id: e.id,
      name: `${e.company}.job`,
      kind: "Document",
      size: `${e.bullets.length} points`,
      tags: e.tags,
      dateModified: e.dateModified,
      experienceId: e.id,
    })),
    applications: [
      {
        id: "app_settings",
        name: "System Settings.app",
        kind: "Application",
        size: "2.4 MB",
        tags: ["Work"],
        dateModified: "May 10, 2026 at 9:02 AM",
      },
      {
        id: "app_resume",
        name: "Resume.pdf",
        kind: "Document",
        size: "65 KB",
        tags: ["Work"],
        dateModified: "May 22, 2026 at 4:32 PM",
      },
    ],
    desktop: [
      {
        id: "file_welcome",
        name: "Welcome.txt",
        kind: "Document",
        size: "420 bytes",
        tags: ["Vacation"],
        dateModified: "May 20, 2026 at 12:00 PM",
        description: "Welcome to Dheeraj's PC desktop environment!",
      },
    ],
    recents: [
      {
        id: "ted",
        name: "ted.app",
        kind: "AI Agent",
        size: "12 stars",
        tags: ["Urgent"],
        dateModified: "May 22, 2026 at 4:32 PM",
        projectId: "ted",
      },
      {
        id: "biscuit",
        name: "biscuit.app",
        kind: "Systems App",
        size: "256 stars",
        tags: ["Urgent", "Work"],
        dateModified: "May 23, 2026 at 11:15 AM",
        projectId: "biscuit",
      },
      {
        id: "exp_morvion",
        name: "Morvion.job",
        kind: "Document",
        size: "3 points",
        tags: ["Work"],
        dateModified: "March 15, 2026 at 6:00 PM",
        experienceId: "exp_morvion",
      },
    ],
    shared: [],
    downloads: [],
    "macintosh-hd": [
      {
        id: "root_apps",
        name: "Applications",
        kind: "Folder",
        size: "2 items",
        tags: [],
        dateModified: "May 10, 2026 at 9:02 AM",
        isFolder: true,
      },
      {
        id: "root_lib",
        name: "Library",
        kind: "Folder",
        size: "0 items",
        tags: [],
        dateModified: "Jan 01, 2026 at 12:00 AM",
        isFolder: true,
      },
      {
        id: "root_sys",
        name: "System",
        kind: "Folder",
        size: "0 items",
        tags: [],
        dateModified: "Jan 01, 2026 at 12:00 AM",
        isFolder: true,
      },
      {
        id: "root_users",
        name: "Users",
        kind: "Folder",
        size: "1 item",
        tags: [],
        dateModified: "May 23, 2026 at 11:15 AM",
        isFolder: true,
      },
    ],
  });

  // Track initial directory trigger
  useEffect(() => {
    if (initialDir) {
      const cleanDir = initialDir.split("?")[0];
      navigateToDir(cleanDir);
    }
  }, [initialDir]);

  // Track deep-linked item selection from Spotlight
  useEffect(() => {
    if (selectedId) {
      let foundDir: string | null = null;
      for (const [dir, files] of Object.entries(dirFiles)) {
        if (files.some((f) => f.id === selectedId)) {
          foundDir = dir;
          break;
        }
      }
      if (foundDir) {
        navigateToDir(foundDir);
        setSelectedItemId(selectedId);
      }
    }
  }, [selectedId, dirFiles]);

  // Navigate helper
  const navigateToDir = (dir: string, pushHistory = true) => {
    setCurrentDir(dir);
    setSelectedItemId(null);
    setLocalSearch("");
    if (pushHistory) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(dir);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  // Back/Forward controls
  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setCurrentDir(history[prevIndex]);
      setSelectedItemId(null);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setCurrentDir(history[nextIndex]);
      setSelectedItemId(null);
    }
  };

  // Add new file "+" button
  const handleCreateFile = () => {
    const randomSuffix = Math.floor(Math.random() * 100);
    const newId = `custom_file_${Date.now()}`;
    const newItem: FinderItem = {
      id: newId,
      name: `Untitled_${randomSuffix}.txt`,
      kind: "Document",
      size: "0 KB",
      tags: ["Vacation"],
      dateModified: "Just now",
      description: "A new text document created inside Finder.",
    };

    setDirFiles((prev) => ({
      ...prev,
      [currentDir]: [...(prev[currentDir] || []), newItem],
    }));
    setSelectedItemId(newId);
  };

  // Duplicate Selected File
  const handleDuplicate = () => {
    if (!selectedItemId) return;
    const currentList = dirFiles[currentDir] || [];
    const item = currentList.find((i) => i.id === selectedItemId);
    if (!item) return;

    const newId = `${item.id}_copy_${Date.now()}`;
    const cleanName = item.name.includes(".")
      ? item.name.replace(/(\.[^.]+)$/, " copy$1")
      : `${item.name} copy`;

    const newItem: FinderItem = {
      ...item,
      id: newId,
      name: cleanName,
      dateModified: "Just now",
    };

    setDirFiles((prev) => ({
      ...prev,
      [currentDir]: [...(prev[currentDir] || []), newItem],
    }));
    setSelectedItemId(newId);
    setShowMoreMenu(false);
  };

  // Delete Selected File / Move to Trash
  const handleMoveToTrash = () => {
    if (!selectedItemId) return;
    setDirFiles((prev) => ({
      ...prev,
      [currentDir]: (prev[currentDir] || []).filter(
        (i) => i.id !== selectedItemId,
      ),
    }));
    setSelectedItemId(null);
    setShowMoreMenu(false);
  };

  // Toggle Tags on Selected Item
  const handleToggleTag = (tag: string) => {
    if (!selectedItemId) return;
    setDirFiles((prev) => {
      const currentList = prev[currentDir] || [];
      const updatedList = currentList.map((item) => {
        if (item.id === selectedItemId) {
          const tags = item.tags.includes(tag)
            ? item.tags.filter((t) => t !== tag)
            : [...item.tags, tag];
          return { ...item, tags };
        }
        return item;
      });
      return { ...prev, [currentDir]: updatedList };
    });
  };

  // Get active items list in current view folder
  const getItemsList = (): FinderItem[] => {
    // If it's a Tag-filtered view
    if (currentDir.startsWith("tag-")) {
      const activeTag = currentDir.replace("tag-", "");
      // Gather all matching files across all directories
      const allFiles: FinderItem[] = [];
      Object.keys(dirFiles).forEach((dir) => {
        if (dir !== "recents" && dir !== "documents") {
          dirFiles[dir].forEach((file) => {
            if (
              file.tags.some((t) => t.toLowerCase() === activeTag) &&
              !allFiles.some((f) => f.id === file.id)
            ) {
              allFiles.push(file);
            }
          });
        }
      });
      return allFiles;
    }
    return dirFiles[currentDir] || [];
  };

  const activeFiles = getItemsList();

  // Search and Project category filtering
  const filteredFiles = activeFiles.filter((file) => {
    // Check search query matches
    const searchMatch =
      !localSearch ||
      file.name.toLowerCase().includes(localSearch.toLowerCase()) ||
      file.kind.toLowerCase().includes(localSearch.toLowerCase());

    // Check project category tab filter (only applies if Projects is the active folder)
    if (currentDir === "projects") {
      const project = allProjectsList.find((p) => p.id === file.id);
      if (
        project &&
        projectFilter !== "all" &&
        project.category !== projectFilter
      ) {
        return false;
      }
    }
    return searchMatch;
  });

  const selectedItem = activeFiles.find((f) => f.id === selectedItemId);

  // File double click router
  const handleFileDoubleClick = (item: FinderItem) => {
    if (item.isFolder) {
      if (item.id === "dir_projects" || item.id === "root_users") {
        navigateToDir("projects");
      } else if (item.id === "dir_experience") {
        navigateToDir("experience");
      } else if (item.id === "root_apps") {
        navigateToDir("applications");
      }
    } else {
      // It's a file
      if (item.projectId) {
        // Just show info in preview or keep selection
      } else if (item.experienceId) {
        // Show info
      } else if (item.id === "app_settings") {
        onOpenWindow?.("profile");
      } else if (item.id === "app_resume") {
        onOpenWindow?.("resume");
      }
    }
  };

  // Helper to retrieve tag dot classes
  const getTagColor = (tags: string[]) => {
    if (tags.includes("Urgent")) return "bg-[#ff3b30]";
    if (tags.includes("Work")) return "bg-[#ff9500]";
    if (tags.includes("Vacation")) return "bg-[#ffcc00]";
    return "bg-white/10";
  };

  // Helper to map project category to a premium icon representing the file
  const getFileIcon = (item: FinderItem) => {
    if (item.isFolder) {
      return (
        <IconFolderFilled className="w-10 h-10 text-blue-400 group-hover:scale-105 transition-transform" />
      );
    }
    if (item.id === "app_settings") {
      return (
        <img
          src="https://res.cloudinary.com/dwmxbkhch/image/upload/v1779538898/75ba848f-8763-489f-9cee-86e5d403b4a1_suzvfi.png"
          alt="Settings"
          className="w-10 h-10 object-contain rounded-lg group-hover:scale-105 transition-transform shadow-sm"
        />
      );
    }
    if (item.id === "app_resume") {
      return (
        <IconFileText className="w-10 h-10 text-red-500 group-hover:scale-105 transition-transform" />
      );
    }

    // Project item category checks
    const project = allProjectsList.find((p) => p.id === item.id);
    if (project) {
      if (project.category === "ai-agents") {
        return (
          <div className="w-10 h-10 rounded-xl bg-purple-600/10  flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform shadow-inner">
            <IconCpu className="w-5 h-5" />
          </div>
        );
      } else if (project.category === "systems-languages") {
        return (
          <div className="w-10 h-10 rounded-xl bg-orange-600/10  flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform shadow-inner">
            <IconTerminal className="w-5 h-5" />
          </div>
        );
      } else {
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-600/10  flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shadow-inner">
            <IconDeviceDesktop className="w-5 h-5" />
          </div>
        );
      }
    }

    // Job / internship items checks
    if (item.id === "exp_morvion") {
      return (
        <img
          src="https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304675/morvion_logo_qw4vfy.jpg"
          alt="Morvion"
          className="w-10 h-10 object-cover rounded-lg group-hover:scale-105 transition-transform shadow-sm"
        />
      );
    }
    if (item.id === "exp_hooman") {
      return (
        <img
          src="https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304319/hooman_digital_logo_qdclr3.jpg"
          alt="Hooman Digital"
          className="w-10 h-10 object-cover rounded-lg group-hover:scale-105 transition-transform shadow-sm"
        />
      );
    }
    if (item.id === "exp_nitc") {
      return (
        <img
          src="https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304559/gceknewlogos_glexcj.png"
          alt="NIT Calicut"
          className="w-10 h-10 object-cover rounded-lg group-hover:scale-105 transition-transform shadow-sm bg-transparent"
        />
      );
    }
    if (item.id === "exp_ozi") {
      return (
        <img
          src="https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304733/ozi-logo_2025-10-07-072401_gxyx_fs76wl.png"
          alt="Ozi"
          className="w-10 h-10 object-cover rounded-lg group-hover:scale-105 transition-transform shadow-sm"
        />
      );
    }
    if (item.id.startsWith("exp_")) {
      return (
        <div className="w-10 h-10 rounded-xl bg-green-600/10 flex items-center justify-center text-green-400 group-hover:scale-105 transition-transform shadow-inner">
          <IconBriefcase className="w-5 h-5" />
        </div>
      );
    }

    return (
      <IconFile className="w-10 h-10 text-white/50 group-hover:scale-105 transition-transform" />
    );
  };

  const getBreadcrumbName = (dir: string) => {
    switch (dir) {
      case "documents":
        return "Documents";
      case "projects":
        return "Projects";
      case "experience":
        return "Experience";
      case "recents":
        return "Recents";
      case "shared":
        return "Shared";
      case "applications":
        return "Applications";
      case "desktop":
        return "Desktop";
      case "downloads":
        return "Downloads";
      case "macintosh-hd":
        return "Macintosh HD";
      case "tag-urgent":
        return "Urgent";
      case "tag-work":
        return "Work";
      case "tag-vacation":
        return "Vacation";
      default:
        return dir;
    }
  };

  const handleCopyLink = () => {
    if (!selectedItem) return;
    const project = allProjectsList.find((p) => p.id === selectedItem.id);
    const link = project ? project.github : "dheerajcofficial@gmail.com";
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-[550px] bg-[#1c1c1e] text-white rounded-b-xl overflow-hidden border-t border-white/5 font-sans relative">
      {/* Finder Left Sidebar */}
      <div className="w-[160px] bg-[#2a2a2c] p-3 border-r border-[#1c1c1e] flex flex-col justify-between shrink-0 select-none">
        <div className="space-y-4 overflow-y-auto pr-0.5 custom-scrollbar">
          {/* Quick Sections */}
          <div className="space-y-0.5">
            <button
              onClick={() => navigateToDir("recents")}
              className={`w-full text-left px-2.5 py-1.5 text-[12.5px] font-semibold rounded-lg flex items-center space-x-2 transition-colors cursor-pointer ${currentDir === "recents" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}
            >
              <IconClock className="w-4 h-4 text-white/50" />
              <span>Recents</span>
            </button>
            <button
              onClick={() => navigateToDir("shared")}
              className={`w-full text-left px-2.5 py-1.5 text-[12.5px] font-semibold rounded-lg flex items-center space-x-2 transition-colors cursor-pointer ${currentDir === "shared" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}
            >
              <IconUsers className="w-4 h-4 text-white/50" />
              <span>Shared</span>
            </button>
          </div>

          {/* Favorites List */}
          <div>
            <h4 className="text-[10px] font-bold text-white/30 mb-1.5 px-2.5 uppercase tracking-widest">
              Favorites
            </h4>
            <div className="space-y-0.5">
              {[
                {
                  id: "applications",
                  label: "Applications",
                  icon: <IconAppWindow className="w-4 h-4 text-blue-400" />,
                },
                {
                  id: "desktop",
                  label: "Desktop",
                  icon: <IconDeviceDesktop className="w-4 h-4 text-teal-400" />,
                },
                {
                  id: "documents",
                  label: "Documents",
                  icon: <IconFile className="w-4 h-4 text-blue-400" />,
                },
                {
                  id: "downloads",
                  label: "Downloads",
                  icon: <IconDownload className="w-4 h-4 text-green-400" />,
                },
                {
                  id: "projects",
                  label: "Projects",
                  icon: <IconFolder className="w-4 h-4 text-yellow-500" />,
                },
                {
                  id: "experience",
                  label: "Experience",
                  icon: <IconFolder className="w-4 h-4 text-yellow-500" />,
                },
              ].map((item) => {
                const isSelected = currentDir === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateToDir(item.id)}
                    className={`w-full text-left px-2.5 py-1.5 text-[12.5px] font-semibold rounded-lg flex items-center space-x-2 transition-colors cursor-pointer ${isSelected ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-[10px] font-bold text-white/30 mb-1.5 px-2.5 uppercase tracking-widest">
              Locations
            </h4>
            <div className="space-y-0.5">
              <button
                onClick={() => navigateToDir("macintosh-hd")}
                className={`w-full text-left px-2.5 py-1.5 text-[12.5px] font-semibold rounded-lg flex items-center space-x-2 transition-colors cursor-pointer ${currentDir === "macintosh-hd" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}
              >
                <IconDatabase className="w-4 h-4 text-white/40" />
                <span>Macintosh HD</span>
              </button>
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <h4 className="text-[10px] font-bold text-white/30 mb-1.5 px-2.5 uppercase tracking-widest">
              Tags
            </h4>
            <div className="space-y-0.5">
              {[
                { id: "tag-urgent", label: "Urgent", color: "bg-[#ff3b30]" },
                { id: "tag-work", label: "Work", color: "bg-[#ff9500]" },
                {
                  id: "tag-vacation",
                  label: "Vacation",
                  color: "bg-[#ffcc00]",
                },
              ].map((tag) => {
                const isSelected = currentDir === tag.id;
                return (
                  <button
                    key={tag.id}
                    onClick={() => navigateToDir(tag.id)}
                    className={`w-full text-left px-2.5 py-1.5 text-[12.5px] font-semibold rounded-lg flex items-center space-x-2.5 transition-colors cursor-pointer ${isSelected ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${tag.color}`} />
                    <span>{tag.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Files Display & Grid Pane */}
      <div className="flex-1 bg-[#1e1e1e] flex flex-col overflow-hidden">
        {/* Top Finder Toolbar (Matching visual layout) */}
        <div className="h-11 border-b border-white/5 bg-[#2a2a2c]/30 px-4 flex items-center justify-between shrink-0 select-none z-20">
          {/* Nav arrows & Folder title */}
          <div className="flex items-center space-x-3.5">
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleBack}
                disabled={historyIndex <= 0}
                className={`p-1 rounded transition-colors cursor-pointer ${historyIndex > 0 ? "hover:bg-white/5 text-white/80" : "text-white/20 cursor-not-allowed"}`}
              >
                <IconArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleForward}
                disabled={historyIndex >= history.length - 1}
                className={`p-1 rounded transition-colors cursor-pointer ${historyIndex < history.length - 1 ? "hover:bg-white/5 text-white/80" : "text-white/20 cursor-not-allowed"}`}
              >
                <IconArrowRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[13px] font-bold text-white/90">
              {getBreadcrumbName(currentDir)}
            </span>
          </div>

          {/* View mode segmented selectors, Action Popover triggers */}
          <div className="flex items-center space-x-3">
            {/* View Mode Grid/List switcher */}
            <div className="bg-[#2a2a2c]/60 p-0.5 rounded-md flex items-center border border-white/5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 rounded cursor-pointer ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
              >
                <IconLayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded cursor-pointer ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
              >
                <IconList className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Share Popover Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowShare(!showShare);
                  setShowTagEdit(false);
                  setShowMoreMenu(false);
                }}
                className="p-1.5 rounded-md border border-white/5 bg-[#2a2a2c]/40 hover:bg-white/5 text-white/80 cursor-pointer"
              >
                <IconShare className="w-4 h-4" />
              </button>
              {showShare && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-[#2a2a2c] border border-white/10 rounded-lg p-1.5 shadow-xl text-xs z-30 space-y-0.5">
                  <button
                    onClick={handleCopyLink}
                    className="w-full text-left px-2 py-1.5 hover:bg-blue-600 rounded flex items-center justify-between"
                  >
                    <span>{copied ? "Copied Link!" : "Copy Link"}</span>
                    {copied ? (
                      <IconCheck className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <IconCopy className="w-3.5 h-3.5 opacity-50" />
                    )}
                  </button>
                  <a
                    href="mailto:dheerajcofficial@gmail.com"
                    className="w-full text-left px-2 py-1.5 hover:bg-blue-600 rounded flex items-center justify-between block"
                  >
                    <span>Email Dheeraj</span>
                    <IconMail className="w-3.5 h-3.5 opacity-50" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=Check out Dheeraj's profile: https://github.com/tomlin7`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-2 py-1.5 hover:bg-blue-600 rounded flex items-center justify-between block"
                  >
                    <span>Share on X</span>
                    <IconBrandX className="w-3.5 h-3.5 opacity-50" />
                  </a>
                </div>
              )}
            </div>

            {/* Tag Modifier Popover Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowTagEdit(!showTagEdit);
                  setShowShare(false);
                  setShowMoreMenu(false);
                }}
                className="p-1.5 rounded-md border border-white/5 bg-[#2a2a2c]/40 hover:bg-white/5 text-white/80 cursor-pointer"
              >
                <IconTag className="w-4 h-4" />
              </button>
              {showTagEdit && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-[#2a2a2c] border border-white/10 rounded-lg p-1.5 shadow-xl text-xs z-30">
                  <h5 className="px-2 py-1 text-[10px] font-bold text-white/40 uppercase tracking-wider border-b border-white/5 mb-1">
                    Toggle Tag
                  </h5>
                  {[
                    { label: "Urgent", color: "bg-[#ff3b30]" },
                    { label: "Work", color: "bg-[#ff9500]" },
                    { label: "Vacation", color: "bg-[#ffcc00]" },
                  ].map((t) => {
                    const hasTag = selectedItem?.tags.includes(t.label);
                    return (
                      <button
                        key={t.label}
                        onClick={() => {
                          handleToggleTag(t.label);
                          setShowTagEdit(false);
                        }}
                        disabled={!selectedItem}
                        className={`w-full text-left px-2 py-1.5 hover:bg-blue-600 rounded flex items-center justify-between cursor-pointer ${!selectedItem ? "opacity-30 cursor-not-allowed" : ""}`}
                      >
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${t.color}`}
                          />
                          <span>{t.label}</span>
                        </div>
                        {hasTag && (
                          <IconCheck className="w-3.5 h-3.5 text-blue-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* More Options "..." Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowMoreMenu(!showMoreMenu);
                  setShowShare(false);
                  setShowTagEdit(false);
                }}
                className="p-1.5 rounded-md border border-white/5 bg-[#2a2a2c]/40 hover:bg-white/5 text-white/80 cursor-pointer"
              >
                <IconDots className="w-4 h-4" />
              </button>
              {showMoreMenu && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-[#2a2a2c] border border-white/10 rounded-lg p-1.5 shadow-xl text-xs z-30 space-y-0.5">
                  <button
                    onClick={handleDuplicate}
                    disabled={!selectedItem}
                    className={`w-full text-left px-2 py-1.5 hover:bg-blue-600 rounded flex items-center justify-between cursor-pointer ${!selectedItem ? "opacity-30 cursor-not-allowed" : ""}`}
                  >
                    <span>Duplicate</span>
                    <IconCopy className="w-3.5 h-3.5 opacity-50" />
                  </button>
                  <button
                    onClick={handleMoveToTrash}
                    disabled={!selectedItem || selectedItem.isFolder}
                    className={`w-full text-left px-2 py-1.5 hover:bg-[#ff3b30] hover:text-white rounded flex items-center justify-between cursor-pointer ${!selectedItem || selectedItem.isFolder ? "opacity-30 cursor-not-allowed" : ""}`}
                  >
                    <span>Move to Trash</span>
                    <IconTrash className="w-3.5 h-3.5 opacity-50" />
                  </button>
                  <button
                    onClick={() => {
                      if (selectedItem) {
                        alert(
                          `File Details:\nName: ${selectedItem.name}\nKind: ${selectedItem.kind}\nSize: ${selectedItem.size}\nModified: ${selectedItem.dateModified}`,
                        );
                      }
                      setShowMoreMenu(false);
                    }}
                    disabled={!selectedItem}
                    className={`w-full text-left px-2 py-1.5 hover:bg-blue-600 rounded flex items-center justify-between cursor-pointer ${!selectedItem ? "opacity-30 cursor-not-allowed" : ""}`}
                  >
                    <span>Get Info</span>
                    <IconInfoCircle className="w-3.5 h-3.5 opacity-50" />
                  </button>
                </div>
              )}
            </div>

            {/* Search Input box */}
            <div className="relative w-36">
              <IconSearch className="absolute left-2 top-2 w-3 h-3 text-white/30" />
              <input
                type="text"
                placeholder="Search"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-[#2a2a2c]/60 border border-white/5 rounded-md py-1 pl-7 pr-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Gray capsule breadcrumbs bar */}
        <div className="h-10 border-b border-white/5 bg-[#1e1e1e] flex items-center justify-between px-4 select-none shrink-0 z-10">
          <div className="flex items-center space-x-1 bg-[#2a2a2c]/30 border border-white/5 p-0.5 rounded-lg">
            <button className="text-[11px] text-white/30 px-2 py-0.5 cursor-default font-semibold">
              Home_
            </button>
            <button className="text-[11px] text-white/30 px-2 py-0.5 cursor-default font-semibold">
              Home_
            </button>
            <button className="text-[11px] text-white/30 px-2 py-0.5 cursor-default font-semibold">
              Home
            </button>
            <button
              onClick={() => navigateToDir("documents")}
              className={`text-[11px] font-bold px-2 py-0.5 rounded-md cursor-pointer transition-colors ${currentDir === "documents" ? "bg-[#2a2a2c] text-white border border-white/10" : "text-white/60 hover:text-white"}`}
            >
              Documents
            </button>
            {currentDir !== "documents" && (
              <>
                <span className="text-white/20 text-[10px] font-bold select-none">
                  /
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-[#2a2a2c] text-white border border-white/10 rounded-md">
                  {getBreadcrumbName(currentDir)}
                </span>
              </>
            )}
          </div>

          {/* Plus Add File trigger */}
          <button
            onClick={handleCreateFile}
            className="p-1 rounded-md bg-[#2a2a2c]/50 hover:bg-[#2a2a2c] border border-white/5 text-white/80 cursor-pointer shadow-sm flex items-center justify-center"
          >
            <IconPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Project category selection tabs on top (Only visible when Projects active) */}
        {currentDir === "projects" && (
          <div className="px-4 py-2 bg-[#2a2a2c]/20 border-b border-white/5 flex items-center space-x-1.5 shrink-0 z-10">
            {[
              { id: "all", label: "All Projects" },
              { id: "ai-agents", label: "AI & Agents" },
              { id: "systems-languages", label: "Systems & Langs" },
              { id: "apps", label: "Apps & Frameworks" },
            ].map((tab) => {
              const isSelected = projectFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setProjectFilter(tab.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${isSelected ? "bg-blue-600 text-white shadow-sm" : "bg-white/[0.04] text-white/60 hover:bg-white/10 hover:text-white"}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Content Pane Grid / List renderer */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-[#1c1c1e]">
          {filteredFiles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/30 select-none">
              <IconFolder className="w-12 h-12 mb-2 opacity-35 text-white/30" />
              <p className="text-xs font-semibold">Folder is Empty</p>
              <p className="text-[10px] mt-0.5">0 items, 0 KB available</p>
            </div>
          ) : viewMode === "grid" ? (
            /* Icons Grid view */
            <div className="grid grid-cols-5 gap-y-6 gap-x-4">
              {filteredFiles.map((file) => {
                const isSelected = selectedItemId === file.id;
                return (
                  <div
                    key={file.id}
                    onClick={() => {
                      setSelectedItemId(file.id);
                      setShowShare(false);
                      setShowTagEdit(false);
                      setShowMoreMenu(false);
                    }}
                    onDoubleClick={() => handleFileDoubleClick(file)}
                    className="flex flex-col items-center justify-start group cursor-default select-none relative"
                  >
                    {/* File Icon display */}
                    <div className="relative">{getFileIcon(file)}</div>

                    {/* File Name rounded blue highlight or normal */}
                    <span
                      className={`text-[11.5px] font-semibold text-center mt-2 px-2.5 py-0.5 leading-tight tracking-tight break-all ${isSelected ? "bg-[#0a84ff] rounded-md text-white shadow-sm" : "text-white/90"}`}
                    >
                      {file.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List Table view */
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-white/30 font-semibold select-none">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Date Modified</th>
                  <th className="py-2 px-3">Kind</th>
                  <th className="py-2 px-3 text-right">Size</th>
                </tr>
              </thead>
              <tbody className="font-medium text-white/90">
                {filteredFiles.map((file) => {
                  const isSelected = selectedItemId === file.id;
                  return (
                    <tr
                      key={file.id}
                      onClick={() => setSelectedItemId(file.id)}
                      onDoubleClick={() => handleFileDoubleClick(file)}
                      className={`border-b border-white/[0.03] transition-colors cursor-default select-none ${isSelected ? "bg-[#0a84ff]/20 text-white" : "hover:bg-white/[0.02]"}`}
                    >
                      <td className="py-2 px-3 flex items-center space-x-2.5">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${getTagColor(file.tags)}`}
                        />
                        <span className="truncate font-semibold">
                          {file.name}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-white/50">
                        {file.dateModified}
                      </td>
                      <td className="py-2 px-3 text-white/50">{file.kind}</td>
                      <td className="py-2 px-3 text-right text-white/50">
                        {file.size}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Right Details/Preview Pane */}
      <div className="w-[380px] bg-[#1c1c1e] flex flex-col overflow-y-auto custom-scrollbar border-l border-[#2a2a2c] shrink-0 z-10">
        {selectedItem ? (
          <div className="p-5 flex flex-col min-h-full">
            {/* Top Large App Preview Icon & Primary Header Actions */}
            <div className="flex flex-col items-center select-none text-center">
              {getFileIcon(selectedItem)}

              <h3 className="text-[15px] font-medium text-white mt-3 leading-snug break-all px-1">
                {selectedItem.name}
              </h3>
              <p className="text-[11px] text-white/40 font-normal mt-1 truncate max-w-full italic">
                {selectedItem.kind}
              </p>

              {/* Primary Buttons moved up below title */}
              <div className="flex gap-2 mt-4 w-full px-2 justify-center">
                {selectedItem.projectId &&
                  (() => {
                    const project = allProjectsList.find(
                      (p) => p.id === selectedItem.projectId,
                    );
                    if (!project) return null;
                    return (
                      <>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 max-w-[140px] py-1.5 px-3 bg-[#0a84ff] hover:bg-[#0070e3] active:scale-95 transition-all text-white rounded-md text-xs font-medium text-center flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                        >
                          <IconBrandGithub className="w-3.5 h-3.5" />
                          <span>Repository</span>
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 max-w-[140px] py-1.5 px-3 bg-[#2b2b2e] hover:bg-[#343438] border border-white/5 active:scale-95 transition-all text-white rounded-md text-xs font-normal text-center flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                          >
                            <IconExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </>
                    );
                  })()}

                {selectedItem.experienceId &&
                  (() => {
                    let notionLink =
                      "https://tomlin7.notion.site/36c88f368552811b8cc8f8ad6e70a8e0?v=36c88f36855281d69853000ca2e6234b&pvs=74";
                    if (selectedItem.experienceId === "exp_morvion") {
                      notionLink =
                        "https://tomlin7.notion.site/Morvion-36c88f368552812c8553f551dc52b02c";
                    } else if (selectedItem.experienceId === "exp_hooman") {
                      notionLink =
                        "https://tomlin7.notion.site/Hooman-Digital-36c88f3685528137b698e0e25e09c558";
                    } else if (selectedItem.experienceId === "exp_nitc") {
                      notionLink =
                        "https://tomlin7.notion.site/NIT-Calicut-Research-Development-36c88f36855281d8ae14e6f9d61ec81f";
                    } else if (selectedItem.experienceId === "exp_ozi") {
                      notionLink =
                        "https://tomlin7.notion.site/OZi-36c88f36855281a4a5bbf4285e861068";
                    }
                    return (
                      <a
                        href={notionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full max-w-[200px] py-1.5 px-3 bg-[#0a84ff] hover:bg-[#0070e3] active:scale-95 transition-all text-white rounded-md text-xs font-medium text-center flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                      >
                        <IconExternalLink className="w-3.5 h-3.5" />
                        <span>Visit Portfolio</span>
                      </a>
                    );
                  })()}

                {selectedItem.isFolder && (
                  <button
                    onClick={() => handleFileDoubleClick(selectedItem)}
                    className="w-full max-w-[200px] py-1.5 px-3 bg-[#0a84ff] hover:bg-[#0070e3] active:scale-95 transition-all text-white rounded-md text-xs font-medium text-center flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                  >
                    <IconFolder className="w-3.5 h-3.5" />
                    <span>Open Folder</span>
                  </button>
                )}

                {!selectedItem.projectId &&
                  !selectedItem.experienceId &&
                  !selectedItem.isFolder && (
                    <button
                      onClick={() => {
                        alert(
                          `File: ${selectedItem.name}\nSize: ${selectedItem.size}\nModified: ${selectedItem.dateModified}`,
                        );
                      }}
                      className="w-full max-w-[200px] py-1.5 px-3 bg-[#2b2b2e] hover:bg-[#343438] border border-white/5 active:scale-95 transition-all text-white rounded-md text-xs font-normal text-center flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                    >
                      <IconInfoCircle className="w-3.5 h-3.5" />
                      <span>Get Info</span>
                    </button>
                  )}
              </div>
            </div>

            {/* Collapsible Section: Information (Rounded Wide Rectangle Layout) */}
            <div className="py-1">
              {expandedSections.info &&
                (() => {
                  let cell1Label = "Stars";
                  let cell1Value = "0";
                  let cell2Label = "Modified";
                  let cell2Value = "Jan 01";
                  let cell2Tooltip = "January 01, 2026 at 12:00 AM";
                  let cell3Label = "Kind";
                  let cell3Value = "Document";

                  if (selectedItem.projectId) {
                    const project = allProjectsList.find(
                      (p) => p.id === selectedItem.projectId,
                    );
                    cell1Label = "Stars";
                    cell1Value = String(project?.stars || 0);

                    cell2Label = "Modified";
                    cell2Value =
                      selectedItem.dateModified.split(",")[0] || "Jan 01";
                    cell2Tooltip = selectedItem.dateModified;

                    cell3Label = "Category";
                    cell3Value =
                      project?.category === "ai-agents"
                        ? "AI Agent"
                        : project?.category === "systems-languages"
                          ? "Systems App"
                          : "Web App";
                  } else if (selectedItem.experienceId) {
                    const exp = allExperiencesList.find(
                      (e) => e.id === selectedItem.experienceId,
                    );
                    cell1Label = "Tasks";
                    cell1Value = String(exp?.bullets.length || 0);

                    cell2Label = "Period";
                    cell2Value =
                      exp?.period.split(" – ")[0] || exp?.period || "";
                    cell2Tooltip = exp?.period || "";

                    cell3Label = "Kind";
                    cell3Value = "Experience";
                  } else {
                    cell1Label = "Size";
                    cell1Value = selectedItem.size;

                    cell2Label = "Modified";
                    cell2Value =
                      selectedItem.dateModified.split(",")[0] || "Jan 01";
                    cell2Tooltip = selectedItem.dateModified;

                    cell3Label = "Kind";
                    cell3Value = selectedItem.kind;
                  }

                  return (
                    <div className="px-1 py-1.5 select-none">
                      <div className="w-full rounded-lg bg-[#252528] border border-white/5 flex items-stretch py-2 text-center text-xs">
                        {/* Cell 1: Stars / Size */}
                        <div className="flex-1 flex flex-col justify-center py-0.5">
                          <span className="text-[8.5px] text-white/40 uppercase tracking-wider font-normal block">
                            {cell1Label}
                          </span>
                          <span className="text-[12px] text-white/95 font-normal mt-0.5 block truncate px-1">
                            {cell1Value}
                          </span>
                        </div>

                        {/* Divider 1 */}
                        <div className="w-[1px] bg-white/5 shrink-0" />

                        {/* Cell 2: Date with Tooltip */}
                        <div className="flex-1 flex flex-col justify-center py-0.5 group relative cursor-help">
                          <span className="text-[8.5px] text-white/40 uppercase tracking-wider font-normal block">
                            {cell2Label}
                          </span>
                          <span className="text-[12px] text-white/95 font-normal mt-0.5 block truncate px-1">
                            {cell2Value}
                          </span>

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black border border-white/10 text-white text-[10.5px] py-1 px-2.5 rounded shadow-lg z-40 select-none whitespace-nowrap">
                            {cell2Tooltip}
                          </div>
                        </div>

                        {/* Divider 2 */}
                        <div className="w-[1px] bg-white/5 shrink-0" />

                        {/* Cell 3: Kind / Category */}
                        <div className="flex-1 flex flex-col justify-center py-0.5">
                          <span className="text-[8.5px] text-white/40 uppercase tracking-wider font-normal block">
                            {cell3Label}
                          </span>
                          <span className="text-[11px] text-white/95 font-normal mt-0.5 block truncate px-1">
                            {cell3Value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
            </div>

            {/* Collapsible Section: Description */}
            {(selectedItem.description || selectedItem.projectId) && (
              <div className="border-b border-white/5 py-1">
                {expandedSections.desc &&
                  (() => {
                    const descText = selectedItem.projectId
                      ? allProjectsList.find(
                          (p) => p.id === selectedItem.projectId,
                        )?.description
                      : selectedItem.description;
                    return (
                      <div className="py-1 px-1.5 text-[12px] leading-relaxed text-white/85 font-normal">
                        {descText}
                      </div>
                    );
                  })()}
              </div>
            )}

            {/* Collapsible Section: Technologies (Projects only) */}
            {selectedItem.projectId && (
              <div className="border-b border-white/5 py-1">
                <button
                  onClick={() => toggleSection("tech")}
                  className="w-full flex items-center space-x-1.5 py-1.5 select-none hover:bg-white/[0.02] text-left cursor-pointer transition-colors"
                >
                  <IconChevronDown
                    className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${expandedSections.tech ? "" : "-rotate-90"}`}
                  />
                  <span className="text-[10.5px] font-medium text-white/50 uppercase tracking-wider">
                    Technologies
                  </span>
                </button>

                {expandedSections.tech &&
                  (() => {
                    const project = allProjectsList.find(
                      (p) => p.id === selectedItem.projectId,
                    );
                    if (!project) return null;
                    return (
                      <div className="flex flex-wrap gap-1.5 p-1.5">
                        {project.technologies.map((tech) => {
                          const iconConfig = TECH_ICONS[tech.toLowerCase()];
                          return (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#2d2d30] border border-white/5 rounded text-[10.5px] text-white/80 font-normal"
                            >
                              {iconConfig && (
                                <img
                                  src={iconConfig.url}
                                  alt={tech}
                                  className={`w-3 h-3 object-contain shrink-0 ${iconConfig.invert ? "invert brightness-200" : ""}`}
                                />
                              )}
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })()}
              </div>
            )}

            {/* Collapsible Section: Project Details (Projects only & Highlighted Impact) */}
            {selectedItem.projectId && (
              <div className="border-b border-white/5 py-1">
                <button
                  onClick={() => toggleSection("details")}
                  className="w-full flex items-center space-x-1.5 py-1.5 select-none hover:bg-white/[0.02] text-left cursor-pointer transition-colors"
                >
                  <IconChevronDown
                    className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${expandedSections.details ? "" : "-rotate-90"}`}
                  />
                  <span className="text-[10.5px] font-medium text-white/50 uppercase tracking-wider">
                    Problem and Impact
                  </span>
                </button>

                {expandedSections.details &&
                  (() => {
                    const project = allProjectsList.find(
                      (p) => p.id === selectedItem.projectId,
                    );
                    if (!project) return null;
                    return (
                      <div className="space-y-3 p-1.5 text-[12px] leading-relaxed text-white/80 font-normal">
                        <div>
                          <div className="text-[10.5px] text-white/45 font-normal mb-1">
                            Problem Solved
                          </div>
                          <div className="bg-[#252528] p-2.5 rounded border border-white/5 text-white/80 leading-normal">
                            {project.problemSolved}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10.5px] text-blue-400 font-medium mb-1 uppercase tracking-wider flex items-center gap-1">
                            <IconStar className="w-3.5 h-3.5 fill-current text-yellow-400" />{" "}
                            Key Impact Created
                          </div>
                          <div className="bg-[#1c2c42] p-3 rounded border border-[#0a84ff]/30 text-white/95 leading-normal shadow-sm">
                            {project.impactCreated}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
              </div>
            )}

            {/* Collapsible Section: Contributions / Achievements */}
            {(selectedItem.projectId || selectedItem.experienceId) && (
              <div className="border-b border-white/5 py-1">
                <button
                  onClick={() => toggleSection("contrib")}
                  className="w-full flex items-center space-x-1.5 py-1.5 select-none hover:bg-white/[0.02] text-left cursor-pointer transition-colors"
                >
                  <IconChevronDown
                    className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${expandedSections.contrib ? "" : "-rotate-90"}`}
                  />
                  <span className="text-[10.5px] font-medium text-white/50 uppercase tracking-wider">
                    {selectedItem.projectId
                      ? "Key Contributions"
                      : "Key Achievements"}
                  </span>
                </button>

                {expandedSections.contrib &&
                  (() => {
                    const bullets = selectedItem.projectId
                      ? allProjectsList.find(
                          (p) => p.id === selectedItem.projectId,
                        )?.recruiterPoints
                      : allExperiencesList.find(
                          (e) => e.id === selectedItem.experienceId,
                        )?.bullets;
                    if (!bullets) return null;
                    return (
                      <div className="p-1.5">
                        <ul className="list-disc list-outside pl-4 space-y-1.5 text-[11.5px] leading-relaxed text-white/75 font-normal">
                          {bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
              </div>
            )}

            {/* General Created File placeholder details */}
            {!selectedItem.projectId &&
              !selectedItem.experienceId &&
              selectedItem.description && (
                <div className="border-b border-white/5 py-1">
                  <div className="flex items-center space-x-1.5 py-1.5 select-none pl-1">
                    <span className="text-[10.5px] font-medium text-white/50 uppercase tracking-wider">
                      File Contents
                    </span>
                  </div>
                  <div className="p-1.5 text-[12px] leading-relaxed text-white/80 font-normal">
                    <p className="bg-[#252528] p-2.5 rounded border border-white/5 text-white/85 leading-normal">
                      {selectedItem.description}
                    </p>
                  </div>
                </div>
              )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/20 select-none">
            <IconFolder className="w-12 h-12 mb-2 opacity-50 text-[#0a84ff]" />
            <p className="text-xs font-normal">Select an item</p>
            <p className="text-[10px] mt-0.5">
              Click a project or folder to preview details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
