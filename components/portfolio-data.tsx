import React, { useState } from "react";
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

interface Project {
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
}

const allProjectsList: Project[] = [
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
      "Crafted a premium MacOS-style active sessions inspector, enabling users to view and revoke authentication tokens dynamically.",
    ],
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
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3a1c1c] via-[#4d2a1c] to-[#1c3a4d] border border-white/10 flex items-center justify-center  text-sm text-orange-200 shrink-0 relative">
            <img
              src="https://res.cloudinary.com/dwmxbkhch/image/upload/v1779538094/8588c8e8-e499-4a03-9e5e-8e1a491b9bf5.png"
              alt="Profile Picture"
              className="w-9 h-9 rounded-full select-none"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-[#2a2a2c] rounded-full" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px]  truncate leading-snug">Dheeraj C.</div>
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
            // Already handled above for headers but keeping it clean
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
              {/*<div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#3a1c1c] via-[#4d2a1c] to-[#1c3a4d] border-2 border-white/10 flex items-center justify-center  text-3xl text-orange-200 shadow-xl mb-3 relative">
                DC
              </div>*/}
              <img
                src="https://res.cloudinary.com/dwmxbkhch/image/upload/v1779538094/8588c8e8-e499-4a03-9e5e-8e1a491b9bf5.png"
                alt="Profile Picture"
                className="w-20 h-20 rounded-full drop-shadow-sm select-none"
              />
              <h2 className="text-xl  text-white">Dheeraj C.</h2>
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
                <h3 className="text-xs  text-white/40 mb-2 uppercase tracking-wide">
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
              <h2 className="text-lg  text-white">General Specifications</h2>
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
              <h2 className="text-lg  text-white">Education & Metrics</h2>
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
                  <h3 className="text-[13.5px]  text-white leading-none mb-1">
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
                  <h3 className="text-[13.5px]  text-white leading-none mb-1">
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
                <h3 className="text-xs  text-white/40 mb-2 uppercase tracking-wide">
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
                      className="px-2.5 py-1 bg-white/[0.04]  rounded-full text-xs text-white/80 font-medium"
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
              <h2 className="text-lg  text-white">Contact & Communication</h2>
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
                  <div className="w-8 h-8 rounded-lg  flex items-center justify-center ">
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
                  <div className="w-8 h-8 rounded-lg  flex items-center justify-center ">
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
              <h2 className="text-lg  text-white">Internet Profiles</h2>
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

export const ProjectsWindowContent = ({
  searchQuery: propSearchQuery,
}: {
  searchQuery: string;
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("ted");
  const [localSearch, setLocalSearch] = useState<string>("");

  // Combined search filtering
  const query = localSearch || propSearchQuery;
  const filteredProjects = allProjectsList.filter((p) => {
    const catMatch = activeCategory === "all" || p.category === activeCategory;
    const searchMatch =
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return catMatch && searchMatch;
  });

  const selectedProject =
    allProjectsList.find((p) => p.id === selectedProjectId) ||
    allProjectsList[0];

  // Helper to retrieve category human readable label
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "ai-agents":
        return "AI & Agents";
      case "systems-languages":
        return "Systems & Languages";
      case "apps":
        return "Apps & Frameworks";
      default:
        return "Project";
    }
  };

  // Helper to map project category to a premium icon representing the file
  const getProjectIcon = (category: string, id: string) => {
    if (category === "ai-agents") {
      return (
        <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform shadow-inner">
          <IconCpu className="w-6 h-6" />
        </div>
      );
    } else if (category === "systems-languages") {
      return (
        <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform shadow-inner">
          <IconTerminal className="w-6 h-6" />
        </div>
      );
    } else {
      return (
        <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shadow-inner">
          <IconDeviceDesktop className="w-6 h-6" />
        </div>
      );
    }
  };

  return (
    <div className="flex h-[550px] bg-[#1c1c1e] text-white rounded-b-xl overflow-hidden border-t border-white/5 font-sans">
      {/* Finder Sidebar */}
      <div className="w-[180px] bg-[#2a2a2c] p-3 border-r border-[#1c1c1e] flex flex-col justify-between shrink-0 select-none">
        <div className="space-y-6">
          {/* Favorites List */}
          <div>
            <h4 className="text-[10px]  text-white/30 mb-2 px-2 uppercase tracking-widest">
              Favorites
            </h4>
            <div className="space-y-0.5">
              {[
                { id: "all", label: "🏠 All Projects" },
                { id: "ai-agents", label: "🤖 AI & Agents" },
                { id: "systems-languages", label: "⚙️ Systems & Langs" },
                { id: "apps", label: "💻 Apps & Frameworks" },
              ].map((item) => {
                const isSelected = activeCategory === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveCategory(item.id);
                      // Clear search when switching tabs to avoid empty items surprise
                      setLocalSearch("");
                    }}
                    className={`w-full text-left px-2.5 py-1.5 text-[12.5px] font-semibold rounded-lg flex items-center justify-between transition-colors cursor-pointer ${isSelected ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Total stats */}
        <div className="px-2 py-1 text-[10px] text-white/30 border-t border-white/5 pt-3">
          {allProjectsList.length} total items
        </div>
      </div>

      {/* Middle Explorer Pane */}
      <div className="flex-1 bg-[#1c1c1e] flex flex-col overflow-hidden">
        {/* Finder Window Top Toolbar */}
        <div className="h-11 border-b border-white/5 bg-[#2a2a2c]/20 px-4 flex items-center justify-between shrink-0 select-none">
          {/* Navigation Arrows */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <button
                disabled
                className="p-1 rounded hover:bg-white/5 text-white/20 cursor-not-allowed"
              >
                <IconArrowLeft className="w-4 h-4" />
              </button>
              <button
                disabled
                className="p-1 rounded hover:bg-white/5 text-white/20 cursor-not-allowed"
              >
                <IconArrowRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[13px]  text-white/80">
              {getCategoryLabel(activeCategory)}
            </span>
          </div>

          {/* Search bar inside Finder Toolbar */}
          <div className="relative w-40">
            <IconSearch className="absolute left-2.5 top-1.5 w-3.5 h-3.5 text-white/30" />
            <input
              type="text"
              placeholder="Search"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#2a2a2c] border border-white/5 rounded-md py-1 pl-8 pr-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Files Grid Pane */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {filteredProjects.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/30 select-none">
              <IconFile className="w-10 h-10 mb-2 opacity-50" />
              <p className="text-xs font-semibold">No Projects Found</p>
              <p className="text-[11px] mt-0.5">
                Try searching with other terms
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {filteredProjects.map((project) => {
                const isSelected = selectedProjectId === project.id;
                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`group flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-default select-none ${isSelected ? "bg-blue-600/90 text-white border-blue-500 shadow-md" : "bg-[#2a2a2c]/30 hover:bg-[#2a2a2c]/50 text-white/95 border-white/5"}`}
                  >
                    {getProjectIcon(project.category, project.id)}
                    <span className="text-[12px] font-semibold truncate max-w-full text-center mt-2.5 tracking-tight px-1">
                      {project.title}.app
                    </span>
                    <span
                      className={`text-[10px] truncate max-w-full mt-0.5 leading-none ${isSelected ? "text-white/70" : "text-white/40"}`}
                    >
                      ★ {project.stars}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Details/Preview Pane */}
      <div className="w-[280px] bg-[#1c1c1e] flex flex-col overflow-y-auto custom-scrollbar border-l border-[#2a2a2c] shrink-0">
        {selectedProject ? (
          <div className="p-5 flex flex-col min-h-full">
            {/* Top Large App Preview Icon */}
            <div className="flex flex-col items-center py-4 border-b border-white/5 select-none text-center">
              {selectedProject.category === "ai-agents" && (
                <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-lg">
                  <IconCpu className="w-8 h-8" />
                </div>
              )}
              {selectedProject.category === "systems-languages" && (
                <div className="w-16 h-16 rounded-2xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shadow-lg">
                  <IconTerminal className="w-8 h-8" />
                </div>
              )}
              {selectedProject.category === "apps" && (
                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-lg">
                  <IconDeviceDesktop className="w-8 h-8" />
                </div>
              )}

              <h3 className="text-[16px]  text-white mt-3 leading-none truncate max-w-full">
                {selectedProject.title}
              </h3>
              <p className="text-[11px] text-white/40 font-medium mt-1 truncate max-w-full italic">
                {selectedProject.subtitle}
              </p>
            </div>

            {/* General Specs / Stats Table */}
            <div className="py-4 border-b border-white/5 space-y-2 text-[12px] select-none">
              <div className="flex justify-between">
                <span className="text-white/40 font-semibold">Kind</span>
                <span className="text-white font-medium capitalize">
                  {getCategoryLabel(selectedProject.category)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40 font-semibold">Stars</span>
                <span className="text-white font-medium">
                  {selectedProject.stars}
                </span>
              </div>
              {selectedProject.forks !== undefined && (
                <div className="flex justify-between">
                  <span className="text-white/40 font-semibold">Forks</span>
                  <span className="text-white font-medium">
                    {selectedProject.forks}
                  </span>
                </div>
              )}
            </div>

            {/* Description / Problem / Impact Details */}
            <div className="py-4 space-y-4 flex-grow">
              <div>
                <h4 className="text-[10px]  text-white/30 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <IconFileText className="w-3.5 h-3.5" /> Description
                </h4>
                <p className="text-[12.5px] leading-relaxed text-white/80 font-medium">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies Badges */}
              <div>
                <h4 className="text-[10px]  text-white/30 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <IconCode className="w-3.5 h-3.5" /> Technologies
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedProject.technologies.map((tech) => {
                    const iconConfig = TECH_ICONS[tech.toLowerCase()];
                    return (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#2a2a2c]/60 border border-white/5 rounded-full text-[10.5px] text-white/80 font-semibold"
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
              </div>

              <div>
                <h4 className="text-[10px]  text-white/30 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <IconActivity className="w-3.5 h-3.5" /> Problem Solved
                </h4>
                <p className="text-[12px] leading-relaxed text-white/70 font-medium bg-[#2a2a2c]/20 p-2.5 rounded-lg border border-white/5">
                  {selectedProject.problemSolved}
                </p>
              </div>

              <div>
                <h4 className="text-[10px]  text-white/30 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <IconStar className="w-3.5 h-3.5" /> Impact Created
                </h4>
                <p className="text-[12px] leading-relaxed text-white/70 font-medium bg-blue-600/5 p-2.5 rounded-lg border border-blue-500/10">
                  {selectedProject.impactCreated}
                </p>
              </div>

              {/* Recruiter Notes bullets */}
              <div>
                <h4 className="text-[10px]  text-white/30 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <IconNotes className="w-3.5 h-3.5" /> Key Contributions
                </h4>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-[11.5px] leading-normal text-white/75 font-medium">
                  {selectedProject.recruiterPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom GitHub View Button */}
            <div className="pt-4 border-t border-white/5 mt-auto">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white rounded-lg  text-[12.5px] text-center flex items-center justify-center space-x-2.5 shadow-md cursor-pointer"
              >
                <IconBrandGithub className="w-4 h-4" />
                <span>View Repository</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/20 select-none">
            <IconFolder className="w-12 h-12 mb-2 opacity-50 text-blue-500" />
            <p className="text-xs font-semibold">Select an item</p>
            <p className="text-[10px] mt-0.5">
              Click a project to preview details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const ExperienceWindowContent = () => {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Morvion",
      location: "ZH, Switzerland (Remote)",
      period: "Dec 2025 – Mar 2026",
      bullets: [
        "Architected and deployed a full-scale CRM from scratch using Next.js, FastAPI, and PostgreSQL.",
        "Engineered production-ready SaaS features, improving client onboarding speeds by 35%.",
        "Optimized database queries and API endpoints, reducing page response latency by 20%.",
      ],
    },
    {
      title: "Full-Stack Developer Intern",
      company: "Hooman Digital",
      location: "India (Remote)",
      period: "Jul 2025 – Oct 2025",
      bullets: [
        "Architected chartor.ai, an AI-powered conversational search client for relational databases.",
        "Standardized internal company infrastructure with automated Docker deployment pipelines.",
        "Created custom dashboard widgets utilizing React and dynamic charting engines.",
      ],
    },
    {
      title: "Deep Learning Research Intern",
      company: "NIT Calicut",
      location: "Calicut, India",
      period: "May 2025 – Jul 2025",
      bullets: [
        "Developed CNN-Transformer fusion models for advanced computer vision and time-series analysis.",
        "Collaborated on neural research, accelerating model training steps by 30% via PyTorch optimizations.",
        "Preprocessed and cleaned large datasets of traffic and telemetry information.",
      ],
    },
    {
      title: "Software Engineer Intern",
      company: "Ozi",
      location: "Gurugram, India (Remote)",
      period: "Nov 2024 – Feb 2025",
      bullets: [
        "Architected the zero-to-one MVP for a social utility application.",
        "Engineered foundational full-stack infrastructure, handling secure user authentication and profiles.",
        "Designed real-time messaging services with persistent storage.",
      ],
    },
  ];

  return (
    <div className="flex h-[550px] bg-[#1c1c1e] text-white rounded-b-xl overflow-hidden border-t border-white/5 font-sans">
      {/* Left Sidebar */}
      <div className="w-[180px] bg-[#2a2a2c] p-4 flex flex-col border-r border-[#1c1c1e] shrink-0 select-none">
        <div className="space-y-6">
          <div>
            <h4 className="text-[11px]  text-white/40 mb-2 px-2 uppercase tracking-tight">
              Timeline
            </h4>
            <div className="space-y-1">
              <button className="w-full text-left px-2.5 py-1.5 text-[12.5px] font-semibold bg-white/10 text-white rounded-lg flex items-center">
                💼 Internships
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Experience Panel */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#1c1c1e] custom-scrollbar">
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="bg-[#2a2a2c]/30 rounded-xl border border-white/5 p-4 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[14.5px]  text-white leading-none">
                    {exp.title}
                  </h3>
                  <p className="text-[12.5px] text-blue-400 font-semibold mt-1">
                    {exp.company}{" "}
                    <span className="text-white/30 font-medium">
                      | {exp.location}
                    </span>
                  </p>
                </div>
                <span className="text-[11px] text-white/40 font-semibold">
                  {exp.period}
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-white/70 font-medium leading-relaxed">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
