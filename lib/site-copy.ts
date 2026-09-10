/** Canonical public copy for employment, highlights, and resume claims. */

export const BISCUIT_STARS = 268;
export const LEETCODE_SOLVED = 409;
export const LEETCODE_PEAK_RATING = 1893;

export const highlightsLine = `${BISCUIT_STARS}+ GitHub ★ · LeetCode — ${LEETCODE_SOLVED} solved · peak rating ${LEETCODE_PEAK_RATING}`;

export const biscuitInstallLine = `Biscuit — open-source AI IDE · ${BISCUIT_STARS}+ GitHub ★ · pip install biscuit-editor`;

export const ossContributionsLine =
  "Contributions to Zulip, prometheus-operator, and KubeVirt";

export const educationMarketing =
  "B.Tech, Computer Science Engineering (CSE) student at BIT Mesra, Ranchi (2023–2027), building AI-native systems and full-stack applications.";

export const educationResume = {
  school: "Birla Institute of Technology, Ranchi",
  degree: "Bachelor’s",
  major: "Computer Engineering",
  years: "2023 – 2027",
};

export interface EmploymentRole {
  id: string;
  company: string;
  role: string;
  period: string;
  periodShort: string;
  location: string;
  logo: string;
  link: string;
  product?: string;
  department?: string;
  project?: string;
  section: "professional" | "research";
  bullets: string[];
  dateModified: string;
}

export const employment: EmploymentRole[] = [
  {
    id: "exp_hooman",
    company: "Hooman Digital LLP",
    role: "AI/ML Engineer Intern",
    period: "July 2025 – Sept 2025",
    periodShort: "Jul '25 – Sept '25",
    location: "Kolkata, India",
    logo: "https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304319/hooman_digital_logo_qdclr3.jpg",
    link: "https://tomlin7.notion.site/Hooman-Digital-36c88f3685528137b698e0e25e09c558",
    product: "Live Product",
    section: "professional",
    bullets: [
      "Built an LLM pipeline extracting and tracking financial tickers from live market data with 98% accuracy.",
      "Replaced WebSockets with Server Sent Events (SSE) for one-way log streaming, reducing infrastructure cost by 40%.",
      "Designed an event-driven backend using AWS SQS to absorb traffic spikes while serving 400+ monthly active users.",
      "Engineered scalable backend infrastructure components, improving system throughput and reducing query latency by 15%.",
      "Collaborated with frontend and product teams to design, implement, and ship production features across multiple releases.",
    ],
    dateModified: "September 30, 2025 at 5:00 PM",
  },
  {
    id: "exp_nitc",
    company: "NIT Calicut",
    role: "Research Intern",
    period: "May 2025 – July 2025",
    periodShort: "May '25 – Jul '25",
    location: "Calicut, India",
    logo: "https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304559/gceknewlogos_glexcj.png",
    link: "https://tomlin7.notion.site/NIT-Calicut-Research-Development-36c88f36855281d8ae14e6f9d61ec81f",
    department: "Dept. of Computer Engineering",
    project: "A Transformer-Based Approach for Raw EEG Classification",
    section: "research",
    bullets: [
      "Improved biometric classification accuracy by 25% by building state-of-the-art CNN-Transformer fusion models.",
      "Engineered 5+ EEG classifier fusion models handling spatial-temporal multi-channel tensors using PyTorch.",
    ],
    dateModified: "July 20, 2025 at 4:30 PM",
  },
  {
    id: "exp_ozi",
    company: "OZI",
    role: "Software Development Engineer Intern",
    period: "Nov 2024 – Jan 2025",
    periodShort: "Nov '24 – Jan '25",
    location: "Gurgaon, India",
    logo: "https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304733/ozi-logo_2025-10-07-072401_gxyx_fs76wl.png",
    link: "https://tomlin7.notion.site/OZi-36c88f36855281a4a5bbf4285e861068",
    product: "Live Product",
    section: "professional",
    bullets: [
      "Built core MVP features powering a production platform with 15,000+ curated products and 100K+ Android downloads.",
      "Developed deep-linking and search APIs to improve content discovery and user navigation across the application.",
      "Optimized backend data access through query tuning and caching, reducing API response latency by 20%.",
      "Worked directly with the founding team to rapidly prototype, ship, and iterate on production features in a startup.",
    ],
    dateModified: "January 31, 2025 at 12:00 PM",
  },
];

export const homepageSkills: {
  label: string;
  skills: { name: string; icon: string; invert?: boolean }[];
}[] = [
  {
    label: "Languages",
    skills: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      },
      {
        name: "Rust",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
        invert: true,
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      },
      {
        name: "C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
      },
      {
        name: "Go",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
      },
    ],
  },
  {
    label: "Product & backends",
    skills: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      },
      {
        name: "Django",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
      },
      {
        name: "FastAPI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
      },
    ],
  },
  {
    label: "Infra & research",
    skills: [
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      },
      {
        name: "AWS SQS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      },
      {
        name: "PyTorch",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
      },
    ],
  },
];

export const resumeAchievements = [
  biscuitInstallLine + ".",
  `LeetCode — ${LEETCODE_SOLVED} solved · peak rating ${LEETCODE_PEAK_RATING}.`,
  ossContributionsLine + ".",
  "Hackathon Wins: Monad Blitz Bangalore V4.",
  "Professional Certifications: Meta Backend Developer, IBM Full Stack, Google Cloud AI Professional.",
];

export const resumeProjects = [
  {
    name: "Biscuit – IDE",
    stack: "Python, LangChain, RAG, MCP, React, Pydantic",
    live: true,
    bullets: [
      "Built a modular IDE using microkernel architecture, featuring source control, pseudoterminals, and extension marketplace.",
      `Introduced semantic code intelligence for 20+ languages using Tree-sitter and LSP (${BISCUIT_STARS}+ GitHub ★; pip install biscuit-editor).`,
      "Optimized global search latency under 100ms for folders exceeding 1M+ lines, using multi-threaded Ripgrep.",
    ],
  },
  {
    name: "Hiroshi OS – AI Gateway",
    stack: "Rust, Tokio, Tailscale, MCP, WebSockets, Docker",
    live: true,
    bullets: [
      "Engineered a pluggable AI gateway with sandboxing, cron scheduling, and secure HTTP RPC services with authentication.",
      "Reduced token usage by 70% by implementing an incremental diff pipeline and vector retrieval, eliminating full-file rewrites.",
    ],
  },
  {
    name: "Elo – Real-Time Competition Platform",
    stack: "TypeScript, Bun, React Native, Expo, Protobuf, Docker",
    live: true,
    bullets: [
      "Engineered a math competition app using React Native, Proto, Bun delivering round-trip latency under 40ms.",
      "Implemented an anti-cheat engine tracking rapid inputs (less than 120ms) into honeypot sandbox to issue hardware bans.",
    ],
  },
  {
    name: "BILL OS – x86_64 Operating System",
    stack: "Rust, Assembly, Limine, QEMU, GDB, Cargo",
    live: true,
    bullets: [
      "Built a 64-bit operating system, with bootstrapping, interrupt handling, and a modular kernel spanning 10+ subsystems.",
      "Engineered a kernel with device drivers, shell, ELF executable loading, validated through 1000+ QEMU boot cycles using GDB.",
    ],
  },
];

export const resumeSkills = {
  languages: "Python, Go, Rust, TypeScript, C++, SQL, Bash",
  libraries:
    "Django, FastAPI, Tauri, Electron, React, React Native, gRPC, Protobuf, LangChain, Tokio",
  tools:
    "AWS (SQS, EC2, S3, DynamoDB), Docker, Kafka, Tailscale, WSL, Git, Jujutsu",
  databases: "PostgreSQL, CockroachDB, Redis, pgvector, Pinecone",
};

export const ossLinks = [
  {
    title: "Biscuit",
    subtitle: biscuitInstallLine,
    href: "https://github.com/tomlin7/biscuit",
  },
  {
    title: "PyPI — biscuit-editor",
    subtitle: "pip install biscuit-editor",
    href: "https://pypi.org/project/biscuit-editor/",
  },
  {
    title: "GitHub @tomlin7",
    subtitle: "Dheeraj — Biscuit maintainer · hello@tomlin7.com",
    href: "https://github.com/tomlin7",
  },
  {
    title: "Zulip",
    subtitle: "Authored pull requests (org search)",
    href: "https://github.com/search?q=author%3Atomlin7+org%3Azulip+type%3Apr&type=pullrequests",
  },
  {
    title: "prometheus-operator",
    subtitle: "Authored pull requests (repo search)",
    href: "https://github.com/search?q=author%3Atomlin7+repo%3Aprometheus-operator%2Fprometheus-operator+type%3Apr&type=pullrequests",
  },
  {
    title: "KubeVirt",
    subtitle: "Authored pull requests (org search)",
    href: "https://github.com/search?q=author%3Atomlin7+org%3Akubevirt+type%3Apr&type=pullrequests",
  },
];
