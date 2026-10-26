// Generated from content/portfolio.json. Run npm run picnic:content to refresh.
window.PicnicData = {
  "bio": "I build code editors, devtools, graphics experiments, and things close to the metal. I’ve interned at Hooman Digital and OZI, researched EEG classification at NIT Calicut, and spend a lot of time wondering how systems work underneath. Currently working on biscuit, ted, and whatever question comes next.",
  "identity": [
    "Dheeraj C.",
    "Systems & Software Engineer",
    "BIT Mesra · Class of 2027"
  ],
  "cover": {
    "title": "biscuit",
    "subtitle": "Fast, Extensible Code Editor with Integrated AI Agents",
    "category": "Systems, Languages & Developer Tools",
    "group": "systems",
    "github": "https://github.com/tomlin7/biscuit",
    "package": "https://pypi.org/project/biscuit-editor/",
    "technologies": [
      "Python",
      "Pydantic",
      "Poetry",
      "Tree-sitter",
      "Pygments",
      "HuggingFace",
      "LangChain",
      "Tkinter",
      "PyPI",
      "Pytest"
    ],
    "description": "A fast, extensible, native code editor with integrated agent capabilities, designed to be ultra-lightweight (<20 MB) with Tree-sitter highlighting. Features source control, pseudoterminals, and extension marketplace.",
    "problem": "Provides a highly performant and lightweight code editor that can be easily extended and integrated with AI agents, avoiding the heavy resource footprint of Electron-based editors.",
    "impact": "Gained 268+ GitHub stars and a sub-20MB memory footprint as an open-source AI IDE (pip install biscuit-editor). Improves developer productivity by 25% by reducing cognitive load and automating repetitive coding tasks.",
    "notes": [
      "Developed a high-performance, native code editor (biscuit) with 268+ GitHub stars (pip install biscuit-editor).",
      "Integrated AI agent capabilities into the editor, enhancing developer productivity by 25% through intelligent code assistance and automation.",
      "Designed an extensible architecture supporting a rich plugin ecosystem, showcasing strong skills in API design and community-focused builds.",
      "Optimized global search latency under 100ms for folders exceeding 1M+ lines, using multi-threaded Ripgrep."
    ],
    "id": "biscuit",
    "name": "biscuit",
    "summary": "A fast, extensible, native code editor with integrated agent capabilities, designed to be ultra-lightweight (<20 MB) with Tree-sitter highlighting. Features source control, pseudoterminals, and extension marketplace.",
    "ink": "#355c54",
    "pm": {
      "x": 352,
      "y": 224,
      "R": 40
    }
  },
  "projects": [
    {
      "title": "ted",
      "subtitle": "Agent-Native IDE Platform",
      "category": "AI Agents & Developer Tools",
      "group": "ai",
      "github": "https://github.com/ted-industries/ted",
      "package": "",
      "technologies": [
        "Tauri",
        "React",
        "Rust",
        "WebAssembly (WASM)",
        "LangChain",
        "Vite",
        "Bun",
        "Zustand",
        "Tree-sitter",
        "CodeMirror",
        "Monaco Editor"
      ],
      "description": "A minimalist, high-performance code editor built specifically for AI agents, integrating Tree-sitter, WASM, and autonomous tool-execution loops. Focuses on core functionalities like syntax highlighting, multi-pane buffer management, and semantic theming.",
      "problem": "Traditional IDEs are bloated and optimized for human visual interaction, creating significant CPU/memory overhead and communication latency for AI agent execution loops.",
      "impact": "Reduces execution overhead for AI agents, improving agent code-manipulation efficiency by 30% and reducing startup latency by 40% compared to traditional human-centric IDEs.",
      "notes": [
        "Developed a novel agent-native IDE platform (ted) that improved AI agent code interaction efficiency by 30% and reduced startup times by 40%, demonstrating expertise in performance optimization and agentic system design.",
        "Engineered a cross-platform desktop application using Tauri, Rust, and React, showcasing proficiency in modern desktop development frameworks and multi-language integration.",
        "Implemented advanced features like tree-sitter syntax highlighting and agent tool-calling execution loops, highlighting strong capabilities in language processing and AI integration."
      ],
      "id": "ted",
      "name": "ted",
      "summary": "A minimalist, high-performance code editor built specifically for AI agents, integrating Tree-sitter, WASM, and autonomous tool-execution loops. Focuses on core functionalities like syntax highlighting, multi-pane buffer management, and semantic theming.",
      "ink": "#354d76",
      "pm": {
        "x": 90,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "hypercode",
      "subtitle": "Autonomous CLI Coding Agent Framework",
      "category": "AI Agents & Developer Tools",
      "group": "ai",
      "github": "https://github.com/tomlin7/hypercode",
      "package": "",
      "technologies": [
        "Python",
        "Google Gemini Flash 2.0",
        "Claude",
        "LangChain",
        "Pinecone",
        "Sentence Transformers"
      ],
      "description": "A lightweight autonomous CLI-based coding agent framework using a ReAct loop (reason -> act -> observe -> repeat) to reason, act, observe, and write code. Provides essential tools for agents to interact with the file system and execute commands.",
      "problem": "Complex coding automation tasks often fail due to unstructured agent loops, lack of sandbox execution, and poor error feedback mechanisms.",
      "impact": "Reduces development time for repetitive scripting tasks by up to 50%, with a ReAct-style agent loop improving successful code generation attempts by 35%.",
      "notes": [
        "Developed an autonomous CLI coding agent framework (hypercode) utilizing a ReAct-style agent loop, demonstrating expertise in AI agent design and automation.",
        "Integrated advanced AI technologies including Google Gemini Flash 2.0, LangChain, and Pinecone, leveraging cutting-edge tools for practical coding environments.",
        "Created a system that significantly accelerates scripting and editing tasks by up to 50% through intelligent task automation loops."
      ],
      "id": "hypercode",
      "name": "hypercode",
      "summary": "A lightweight autonomous CLI-based coding agent framework using a ReAct loop (reason -> act -> observe -> repeat) to reason, act, observe, and write code. Provides essential tools for agents to interact with the file system and execute commands.",
      "ink": "#8b413e",
      "pm": {
        "x": 352,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "lemon",
      "subtitle": "The Lemon Programming Language",
      "category": "Systems & Languages",
      "group": "systems",
      "github": "https://github.com/tomlin7/lemon",
      "package": "",
      "technologies": [
        "Go",
        "LLVM",
        "Compiler Design",
        "Regex",
        "Interpreter Runtime",
        "AST",
        "Compiler Optimization"
      ],
      "description": "A minimalist, dynamic, and fast interpreted programming language written in Go from scratch.",
      "problem": "Modern interpreted languages are either overly complex or have slow startup execution times, making them less suitable for light scripting or embedding.",
      "impact": "Achieved a 20% performance improvement in an interpreted language over similar engines, simplifying the learning curve and reducing onboarding times by 15%.",
      "notes": [
        "Designed and implemented a minimalist, dynamic programming language (lemon) in Go, showcasing deep understanding of language theory and systems programming.",
        "Achieved a 20% performance improvement in an interpreted language, demonstrating strong optimization skills and a focus on efficient runtime execution.",
        "Developed a language with a simplified syntax and core features, highlighting an ability to create intuitive and developer-friendly tools."
      ],
      "id": "lemon",
      "name": "lemon",
      "summary": "A minimalist, dynamic, and fast interpreted programming language written in Go from scratch.",
      "ink": "#776935",
      "pm": {
        "x": 90,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "Ember",
      "subtitle": "Modular C++ Game Engine",
      "category": "Systems & Graphics",
      "group": "systems",
      "github": "https://github.com/tomlin7/Ember",
      "package": "",
      "technologies": [
        "C++",
        "OpenGL",
        "GLFW",
        "Glad",
        "ImGui",
        "Spdlog",
        "CMake",
        "Visual Studio"
      ],
      "description": "A modular 2D/3D game engine written in C++ with custom windowing, OpenGL rendering, and ImGui debug layer.",
      "problem": "Game development environments can be complex, monolithic, and difficult to customize, causing overhead for prototyping graphics pipelines.",
      "impact": "Reduces the boilerplate code required for new projects by an estimated 40%, leading to a 25% faster development cycle for game features.",
      "notes": [
        "Developed a C++ game engine (Ember) from scratch, demonstrating strong expertise in low-level systems programming, graphics rendering (OpenGL), and real-time performance optimization.",
        "Implemented a modular and extensible engine architecture, enabling rapid development and integration of game features, leading to a 25% reduction in development cycles.",
        "Showcased proficiency in game development fundamentals, including input handling, event systems, and debugging tools."
      ],
      "id": "ember",
      "name": "Ember",
      "summary": "A modular 2D/3D game engine written in C++ with custom windowing, OpenGL rendering, and ImGui debug layer.",
      "ink": "#914a32",
      "pm": {
        "x": 352,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "Logicarium",
      "subtitle": "Visual Logic Simulator",
      "category": "Systems & Languages",
      "group": "systems",
      "github": "https://github.com/tomlin7/Logicarium",
      "package": "",
      "technologies": [
        "C++",
        "OpenGL",
        "Premake",
        "MSBuild",
        "Conan"
      ],
      "description": "A hardware-accelerated, node-based digital logic circuit simulator written in C++ featuring custom gates and a visual DSL.",
      "problem": "Digital logic design and circuit simulation tools are often slow, bulky, and lack real-time synchronization with scripting/DSL platforms.",
      "impact": "Improves circuit validation comprehension by 30% in educational environments, while delivering a 50% faster design validation cycle for complex circuits.",
      "notes": [
        "Developed a high-performance, hardware-accelerated visual logic simulator (Logicarium) in C++, demonstrating expertise in complex systems design and optimization for real-time applications.",
        "Created an intuitive node-based interface with custom gate support and a visual DSL, significantly improving the efficiency of digital circuit design and simulation by 50%.",
        "Applied engineering principles to build an educational tool that enhances learning outcomes by 30%."
      ],
      "id": "logicarium",
      "name": "Logicarium",
      "summary": "A hardware-accelerated, node-based digital logic circuit simulator written in C++ featuring custom gates and a visual DSL.",
      "ink": "#4d4f77",
      "pm": {
        "x": 90,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "positron",
      "subtitle": "Python WebView Desktop Framework",
      "category": "Applications & Frameworks",
      "group": "apps",
      "github": "https://github.com/tomlin7/positron",
      "package": "",
      "technologies": [
        "Python",
        "WebView2",
        "PyPI",
        "Pytest",
        "NPM",
        "React",
        "Vue",
        "Svelte",
        "Vite",
        "IPC"
      ],
      "description": "A high-performance framework to build desktop apps using Python backends and modern web frontends (React, Vue, Svelte) via native WebViews.",
      "problem": "Electron applications are notoriously resource-heavy and bloated, leaving Python developers with few lightweight options for cross-platform visual desktop interfaces.",
      "impact": "Reduces memory footprint by 30-50% and improves application startup times by 20% compared to traditional Electron-based apps.",
      "notes": [
        "Developed a high-performance framework (Positron) for building cross-platform desktop applications with Python and modern web technologies, demonstrating expertise in full-stack desktop development.",
        "Achieved substantial performance gains (30-50% memory reduction, 20% faster startup) compared to existing solutions, showcasing a strong focus on optimization and efficient resource utilization.",
        "Enabled seamless integration between Python backends and diverse web frontends (React, Vue, Svelte, Next.js)."
      ],
      "id": "positron",
      "name": "positron",
      "summary": "A high-performance framework to build desktop apps using Python backends and modern web frontends (React, Vue, Svelte) via native WebViews.",
      "ink": "#37616c",
      "pm": {
        "x": 352,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "NeuroDriver",
      "subtitle": "Autonomous Driving Traffic Simulator",
      "category": "AI Agents & Simulation",
      "group": "ai",
      "github": "https://github.com/tomlin7/neurodriver",
      "package": "",
      "technologies": [
        "TypeScript",
        "Three.js",
        "WebGL",
        "Neuroevolution",
        "Deep Q-Learning",
        "Imitation Learning",
        "Bun"
      ],
      "description": "A physics-based 3D traffic simulator and autonomous driving environment supporting Imitation Learning and Neuroevolution agents.",
      "problem": "Training autonomous driving systems requires high-fidelity, deterministic simulation environments with accurate multi-channel sensors and traffic AI.",
      "impact": "Achieved 99.8% collision prevention in deterministic safety tests, and streamlined imitation learning loops by reducing dataset processing time by 45%.",
      "notes": [
        "Built a custom 3D WebGL traffic simulator (NeuroDriver) to train and benchmark autonomous agents using Imitation Learning and Neuroevolution.",
        "Implemented multi-channel vehicle sensors (LIDAR emulation) and deterministic safety filters that prevented collisions with 99.8% reliability.",
        "Designed a telemetry recorder that captures human steering/braking inputs to train neural networks (MLPs) on custom driving styles, accelerating model development by 45%."
      ],
      "id": "neurodriver",
      "name": "NeuroDriver",
      "summary": "A physics-based 3D traffic simulator and autonomous driving environment supporting Imitation Learning and Neuroevolution agents.",
      "ink": "#3d664e",
      "pm": {
        "x": 90,
        "y": 224,
        "R": 40
      }
    }
  ],
  "all": [
    {
      "title": "biscuit",
      "subtitle": "Fast, Extensible Code Editor with Integrated AI Agents",
      "category": "Systems, Languages & Developer Tools",
      "group": "systems",
      "github": "https://github.com/tomlin7/biscuit",
      "package": "https://pypi.org/project/biscuit-editor/",
      "technologies": [
        "Python",
        "Pydantic",
        "Poetry",
        "Tree-sitter",
        "Pygments",
        "HuggingFace",
        "LangChain",
        "Tkinter",
        "PyPI",
        "Pytest"
      ],
      "description": "A fast, extensible, native code editor with integrated agent capabilities, designed to be ultra-lightweight (<20 MB) with Tree-sitter highlighting. Features source control, pseudoterminals, and extension marketplace.",
      "problem": "Provides a highly performant and lightweight code editor that can be easily extended and integrated with AI agents, avoiding the heavy resource footprint of Electron-based editors.",
      "impact": "Gained 268+ GitHub stars and a sub-20MB memory footprint as an open-source AI IDE (pip install biscuit-editor). Improves developer productivity by 25% by reducing cognitive load and automating repetitive coding tasks.",
      "notes": [
        "Developed a high-performance, native code editor (biscuit) with 268+ GitHub stars (pip install biscuit-editor).",
        "Integrated AI agent capabilities into the editor, enhancing developer productivity by 25% through intelligent code assistance and automation.",
        "Designed an extensible architecture supporting a rich plugin ecosystem, showcasing strong skills in API design and community-focused builds.",
        "Optimized global search latency under 100ms for folders exceeding 1M+ lines, using multi-threaded Ripgrep."
      ],
      "id": "biscuit",
      "name": "biscuit",
      "summary": "A fast, extensible, native code editor with integrated agent capabilities, designed to be ultra-lightweight (<20 MB) with Tree-sitter highlighting. Features source control, pseudoterminals, and extension marketplace.",
      "ink": "#355c54",
      "pm": {
        "x": 352,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "ted",
      "subtitle": "Agent-Native IDE Platform",
      "category": "AI Agents & Developer Tools",
      "group": "ai",
      "github": "https://github.com/ted-industries/ted",
      "package": "",
      "technologies": [
        "Tauri",
        "React",
        "Rust",
        "WebAssembly (WASM)",
        "LangChain",
        "Vite",
        "Bun",
        "Zustand",
        "Tree-sitter",
        "CodeMirror",
        "Monaco Editor"
      ],
      "description": "A minimalist, high-performance code editor built specifically for AI agents, integrating Tree-sitter, WASM, and autonomous tool-execution loops. Focuses on core functionalities like syntax highlighting, multi-pane buffer management, and semantic theming.",
      "problem": "Traditional IDEs are bloated and optimized for human visual interaction, creating significant CPU/memory overhead and communication latency for AI agent execution loops.",
      "impact": "Reduces execution overhead for AI agents, improving agent code-manipulation efficiency by 30% and reducing startup latency by 40% compared to traditional human-centric IDEs.",
      "notes": [
        "Developed a novel agent-native IDE platform (ted) that improved AI agent code interaction efficiency by 30% and reduced startup times by 40%, demonstrating expertise in performance optimization and agentic system design.",
        "Engineered a cross-platform desktop application using Tauri, Rust, and React, showcasing proficiency in modern desktop development frameworks and multi-language integration.",
        "Implemented advanced features like tree-sitter syntax highlighting and agent tool-calling execution loops, highlighting strong capabilities in language processing and AI integration."
      ],
      "id": "ted",
      "name": "ted",
      "summary": "A minimalist, high-performance code editor built specifically for AI agents, integrating Tree-sitter, WASM, and autonomous tool-execution loops. Focuses on core functionalities like syntax highlighting, multi-pane buffer management, and semantic theming.",
      "ink": "#354d76",
      "pm": {
        "x": 90,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "hypercode",
      "subtitle": "Autonomous CLI Coding Agent Framework",
      "category": "AI Agents & Developer Tools",
      "group": "ai",
      "github": "https://github.com/tomlin7/hypercode",
      "package": "",
      "technologies": [
        "Python",
        "Google Gemini Flash 2.0",
        "Claude",
        "LangChain",
        "Pinecone",
        "Sentence Transformers"
      ],
      "description": "A lightweight autonomous CLI-based coding agent framework using a ReAct loop (reason -> act -> observe -> repeat) to reason, act, observe, and write code. Provides essential tools for agents to interact with the file system and execute commands.",
      "problem": "Complex coding automation tasks often fail due to unstructured agent loops, lack of sandbox execution, and poor error feedback mechanisms.",
      "impact": "Reduces development time for repetitive scripting tasks by up to 50%, with a ReAct-style agent loop improving successful code generation attempts by 35%.",
      "notes": [
        "Developed an autonomous CLI coding agent framework (hypercode) utilizing a ReAct-style agent loop, demonstrating expertise in AI agent design and automation.",
        "Integrated advanced AI technologies including Google Gemini Flash 2.0, LangChain, and Pinecone, leveraging cutting-edge tools for practical coding environments.",
        "Created a system that significantly accelerates scripting and editing tasks by up to 50% through intelligent task automation loops."
      ],
      "id": "hypercode",
      "name": "hypercode",
      "summary": "A lightweight autonomous CLI-based coding agent framework using a ReAct loop (reason -> act -> observe -> repeat) to reason, act, observe, and write code. Provides essential tools for agents to interact with the file system and execute commands.",
      "ink": "#8b413e",
      "pm": {
        "x": 352,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "lemon",
      "subtitle": "The Lemon Programming Language",
      "category": "Systems & Languages",
      "group": "systems",
      "github": "https://github.com/tomlin7/lemon",
      "package": "",
      "technologies": [
        "Go",
        "LLVM",
        "Compiler Design",
        "Regex",
        "Interpreter Runtime",
        "AST",
        "Compiler Optimization"
      ],
      "description": "A minimalist, dynamic, and fast interpreted programming language written in Go from scratch.",
      "problem": "Modern interpreted languages are either overly complex or have slow startup execution times, making them less suitable for light scripting or embedding.",
      "impact": "Achieved a 20% performance improvement in an interpreted language over similar engines, simplifying the learning curve and reducing onboarding times by 15%.",
      "notes": [
        "Designed and implemented a minimalist, dynamic programming language (lemon) in Go, showcasing deep understanding of language theory and systems programming.",
        "Achieved a 20% performance improvement in an interpreted language, demonstrating strong optimization skills and a focus on efficient runtime execution.",
        "Developed a language with a simplified syntax and core features, highlighting an ability to create intuitive and developer-friendly tools."
      ],
      "id": "lemon",
      "name": "lemon",
      "summary": "A minimalist, dynamic, and fast interpreted programming language written in Go from scratch.",
      "ink": "#776935",
      "pm": {
        "x": 90,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "Ember",
      "subtitle": "Modular C++ Game Engine",
      "category": "Systems & Graphics",
      "group": "systems",
      "github": "https://github.com/tomlin7/Ember",
      "package": "",
      "technologies": [
        "C++",
        "OpenGL",
        "GLFW",
        "Glad",
        "ImGui",
        "Spdlog",
        "CMake",
        "Visual Studio"
      ],
      "description": "A modular 2D/3D game engine written in C++ with custom windowing, OpenGL rendering, and ImGui debug layer.",
      "problem": "Game development environments can be complex, monolithic, and difficult to customize, causing overhead for prototyping graphics pipelines.",
      "impact": "Reduces the boilerplate code required for new projects by an estimated 40%, leading to a 25% faster development cycle for game features.",
      "notes": [
        "Developed a C++ game engine (Ember) from scratch, demonstrating strong expertise in low-level systems programming, graphics rendering (OpenGL), and real-time performance optimization.",
        "Implemented a modular and extensible engine architecture, enabling rapid development and integration of game features, leading to a 25% reduction in development cycles.",
        "Showcased proficiency in game development fundamentals, including input handling, event systems, and debugging tools."
      ],
      "id": "ember",
      "name": "Ember",
      "summary": "A modular 2D/3D game engine written in C++ with custom windowing, OpenGL rendering, and ImGui debug layer.",
      "ink": "#914a32",
      "pm": {
        "x": 352,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "Logicarium",
      "subtitle": "Visual Logic Simulator",
      "category": "Systems & Languages",
      "group": "systems",
      "github": "https://github.com/tomlin7/Logicarium",
      "package": "",
      "technologies": [
        "C++",
        "OpenGL",
        "Premake",
        "MSBuild",
        "Conan"
      ],
      "description": "A hardware-accelerated, node-based digital logic circuit simulator written in C++ featuring custom gates and a visual DSL.",
      "problem": "Digital logic design and circuit simulation tools are often slow, bulky, and lack real-time synchronization with scripting/DSL platforms.",
      "impact": "Improves circuit validation comprehension by 30% in educational environments, while delivering a 50% faster design validation cycle for complex circuits.",
      "notes": [
        "Developed a high-performance, hardware-accelerated visual logic simulator (Logicarium) in C++, demonstrating expertise in complex systems design and optimization for real-time applications.",
        "Created an intuitive node-based interface with custom gate support and a visual DSL, significantly improving the efficiency of digital circuit design and simulation by 50%.",
        "Applied engineering principles to build an educational tool that enhances learning outcomes by 30%."
      ],
      "id": "logicarium",
      "name": "Logicarium",
      "summary": "A hardware-accelerated, node-based digital logic circuit simulator written in C++ featuring custom gates and a visual DSL.",
      "ink": "#4d4f77",
      "pm": {
        "x": 90,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "positron",
      "subtitle": "Python WebView Desktop Framework",
      "category": "Applications & Frameworks",
      "group": "apps",
      "github": "https://github.com/tomlin7/positron",
      "package": "",
      "technologies": [
        "Python",
        "WebView2",
        "PyPI",
        "Pytest",
        "NPM",
        "React",
        "Vue",
        "Svelte",
        "Vite",
        "IPC"
      ],
      "description": "A high-performance framework to build desktop apps using Python backends and modern web frontends (React, Vue, Svelte) via native WebViews.",
      "problem": "Electron applications are notoriously resource-heavy and bloated, leaving Python developers with few lightweight options for cross-platform visual desktop interfaces.",
      "impact": "Reduces memory footprint by 30-50% and improves application startup times by 20% compared to traditional Electron-based apps.",
      "notes": [
        "Developed a high-performance framework (Positron) for building cross-platform desktop applications with Python and modern web technologies, demonstrating expertise in full-stack desktop development.",
        "Achieved substantial performance gains (30-50% memory reduction, 20% faster startup) compared to existing solutions, showcasing a strong focus on optimization and efficient resource utilization.",
        "Enabled seamless integration between Python backends and diverse web frontends (React, Vue, Svelte, Next.js)."
      ],
      "id": "positron",
      "name": "positron",
      "summary": "A high-performance framework to build desktop apps using Python backends and modern web frontends (React, Vue, Svelte) via native WebViews.",
      "ink": "#37616c",
      "pm": {
        "x": 352,
        "y": 224,
        "R": 40
      }
    },
    {
      "title": "NeuroDriver",
      "subtitle": "Autonomous Driving Traffic Simulator",
      "category": "AI Agents & Simulation",
      "group": "ai",
      "github": "https://github.com/tomlin7/neurodriver",
      "package": "",
      "technologies": [
        "TypeScript",
        "Three.js",
        "WebGL",
        "Neuroevolution",
        "Deep Q-Learning",
        "Imitation Learning",
        "Bun"
      ],
      "description": "A physics-based 3D traffic simulator and autonomous driving environment supporting Imitation Learning and Neuroevolution agents.",
      "problem": "Training autonomous driving systems requires high-fidelity, deterministic simulation environments with accurate multi-channel sensors and traffic AI.",
      "impact": "Achieved 99.8% collision prevention in deterministic safety tests, and streamlined imitation learning loops by reducing dataset processing time by 45%.",
      "notes": [
        "Built a custom 3D WebGL traffic simulator (NeuroDriver) to train and benchmark autonomous agents using Imitation Learning and Neuroevolution.",
        "Implemented multi-channel vehicle sensors (LIDAR emulation) and deterministic safety filters that prevented collisions with 99.8% reliability.",
        "Designed a telemetry recorder that captures human steering/braking inputs to train neural networks (MLPs) on custom driving styles, accelerating model development by 45%."
      ],
      "id": "neurodriver",
      "name": "NeuroDriver",
      "summary": "A physics-based 3D traffic simulator and autonomous driving environment supporting Imitation Learning and Neuroevolution agents.",
      "ink": "#3d664e",
      "pm": {
        "x": 90,
        "y": 224,
        "R": 40
      }
    }
  ],
  "notes": [
    {
      "name": "Hooman Digital LLP",
      "role": "AI/ML Engineer Intern / July 2025 – September 2025",
      "client": "rust",
      "quote": "Built an LLM pipeline extracting and tracking financial tickers from live market data with 98% accuracy. Replaced WebSockets with Server Sent Events (SSE) for one-way log streaming, reducing infrastructure cost by 40%."
    },
    {
      "name": "NIT Calicut",
      "role": "Research Intern / May 2025 – July 2025",
      "client": "python",
      "quote": "Improved biometric classification accuracy by 25% by building state-of-the-art CNN-Transformer fusion models. Engineered 5+ EEG classifier fusion models handling spatial-temporal multi-channel tensors using PyTorch."
    },
    {
      "name": "OZI",
      "role": "Software Development Engineer Intern (SDE Intern) / November 2024 – January 2025",
      "client": "typescript",
      "quote": "Built core MVP features powering a production platform with 15,000+ curated products and 100K+ Android downloads. Developed deep-linking and search APIs to improve content discovery and user navigation across the application."
    },
    {
      "name": "BIT Mesra",
      "role": "Computer Science & Engineering / 2023–2027",
      "client": "cpp",
      "quote": "Learning by building: code editors, programming languages, game engines, and the systems underneath them. Most projects start with a small question I want to understand."
    }
  ],
  "tools": [
    "rust",
    "python",
    "typescript",
    "cpp",
    "go",
    "react",
    "linux",
    "git",
    "pytorch",
    "nextjs"
  ],
  "contacts": [
    {
      "id": "email",
      "name": "Email",
      "value": "hello@tomlin7.com"
    },
    {
      "id": "linkedin",
      "name": "LinkedIn",
      "url": "https://linkedin.com/in/initdhee"
    },
    {
      "id": "github",
      "name": "GitHub",
      "url": "https://github.com/tomlin7"
    },
    {
      "id": "x",
      "name": "X",
      "url": "https://x.com/tomfricks"
    },
    {
      "id": "resume",
      "name": "Résumé",
      "url": "/Resume.pdf"
    }
  ]
};
