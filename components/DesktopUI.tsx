"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { DraggableWindow } from "@/components/Window";
import {
  MessagesAppContent,
  MessagesHeaderCenter,
} from "@/components/MessagesApp";
import {
  SafariAppContent,
  SafariHeaderCenter,
  type SafariTab,
} from "@/components/SafariApp";
import { IPodContent } from "@/components/iPodApp";
import { Dock, DockItem } from "@/components/Dock";
import { DesktopFolder } from "@/components/DesktopIcon";
import { DropdownMenu } from "@/components/DropdownMenu";
import { ControlPanel, ControlItem } from "@/components/ControlPanel";
import { useWebHaptics } from "web-haptics/react";

import {
  ProfileWindowContent,
  FinderWindowContent,
  finderMenuItems,
  fileMenuItems,
  editMenuItems,
  viewMenuItems,
  windowMenuItems,
  helpMenuItems,
  allProjectsList,
  allExperiencesList,
} from "./portfolio-data";

import {
  IconWifi,
  IconBattery,
  IconLoader2,
  IconBattery1Filled,
  IconBatteryEco,
  IconBattery2,
  IconBattery4Filled,
  IconBattery4,
  IconBatterySpark,
  IconBatteryCharging,
  IconSearch,
  IconTerminal,
  IconCpu,
  IconDeviceDesktop,
  IconBriefcase,
  IconFileText,
  IconFolder,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";

const WifiIcon = () => <IconWifi className="w-5 h-5 text-white" />;
const BatteryIcon = () => (
  <IconBatteryCharging className="w-5 h-5 text-white" />
);

const generateWillyResponse = (input: string): string => {
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
    return "My professional experience includes:\n• Morvion (Software Engineer Intern, Dec '25 – Mar '26): CRM & backend SaaS using Next.js/FastAPI.\n• Hooman Digital (Full-Stack Developer Intern, Jul '25 – Oct '25): Developed chartor.ai for database search loops.\n• NIT Calicut (Deep Learning Research Intern, May '25 – Jul '25): CNN-Transformer visual architectures with PyTorch.\n• Ozi (Software Engineer Intern, Nov '24 – Feb '25): Custom MVP services.";
  }
  if (
    query.includes("skills") ||
    query.includes("languages") ||
    query.includes("tech") ||
    query.includes("stack")
  ) {
    return "Here's my core technical stack:\n• Languages: Python, Go, Rust, C++, TypeScript, SQL\n• Frameworks: Node.js, FastAPI, Next.js, Django, OpenGL\n• Infrastructure: Supabase, PostgreSQL, Kubernetes, AWS\n• AI tools: PyTorch, LangChain, vector search DBs (Pinecone)";
  }
  if (
    query.includes("hello") ||
    query.includes("hi") ||
    query.includes("hey")
  ) {
    return "Hello! 👋 I'm Willy, a bot designed by Dheeraj. Feel free to ask me about my key projects, workspace setup, engineering intern experience, or core programming skills!";
  }
  if (query.includes("contact") || query.includes("email")) {
    return "You can get in touch with me directly at dheerajcofficial@gmail.com. Let's build something cool!";
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

export default function DesktopUI() {
  const { trigger } = useWebHaptics({ debug: true });

  const [clockText, setClockText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [finderPath, setFinderPath] = useState("documents");
  const [finderSelectedId, setFinderSelectedId] = useState<string | null>(null);
  const [activeWindow, setActiveWindow] = useState("profile");
  const [zIndexMap, setZIndexMap] = useState<Record<string, number>>({
    profile: 40,
    finder: 39,
    resume: 38,
    messages: 37,
    safari: 36,
    ipod: 35,
  });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({
    profile: true,
    finder: false,
    resume: false,
    messages: false,
    safari: false,
    ipod: false,
  });
  const [minimizedWindows, setMinimizedWindows] = useState<
    Record<string, boolean>
  >({
    profile: false,
    finder: false,
    resume: false,
    messages: false,
    safari: false,
    ipod: false,
  });
  const zCounter = useRef(40);

  // Safari App States
  const [safariTabs, setSafariTabs] = useState<SafariTab[]>([
    {
      id: "google",
      title: "Google",
      url: "https://www.google.com",
      history: ["https://www.google.com"],
      historyIndex: 0,
    },
  ]);
  const [safariActiveTabId, setSafariActiveTabId] = useState<string>("google");
  const [safariAddressInput, setSafariAddressInput] = useState<string>(
    "https://www.google.com",
  );
  const [safariIsSidebarOpen, setSafariIsSidebarOpen] =
    useState<boolean>(false);
  const [safariRefreshTrigger, setSafariRefreshTrigger] = useState<number>(0);

  // Messages App States
  const willyContact = {
    id: "willy",
    name: "Willy (AI)",
    memoji:
      "https://res.cloudinary.com/dwmxbkhch/image/upload/v1779538094/8588c8e8-e499-4a03-9e5e-8e1a491b9bf5.png",
    snippet: "Hey! 👋 I'm Willy, ask me anything...",
    time: "Just now",
  };

  const initialContacts = [
    willyContact,
    {
      id: "orkun",
      name: "Orkun Kucuksevim",
      memoji: "https://api.dicebear.com/7.x/adventurer/svg?seed=Orkun",
      snippet: "Thanks for the puzzles!",
      time: "Sunday",
    },
    {
      id: "trev",
      name: "Trev Smith",
      memoji: "https://api.dicebear.com/7.x/adventurer/svg?seed=Trev",
      snippet: "Gotcha covered!",
      time: "Yesterday",
    },
    {
      id: "antonio",
      name: "Antonio Manriquez",
      memoji: "https://api.dicebear.com/7.x/adventurer/svg?seed=Antonio",
      snippet: "Is your mind blown? 🤯",
      time: "Sunday",
    },
    {
      id: "hiker",
      name: "Hiker Neighbors",
      memoji: "https://api.dicebear.com/7.x/adventurer/svg?seed=Hiker",
      snippet: 'Xiaomeng reacted ❤️ to "Guess who I ran into today!"',
      time: "Sunday",
    },
    {
      id: "xiaomeng",
      name: "Xiaomeng Zhong",
      memoji: "https://api.dicebear.com/7.x/adventurer/svg?seed=Xiaomeng",
      snippet: "Now you've got me thinking about my next vacation",
      time: "Sunday",
    },
    {
      id: "aileen",
      name: "Aileen & Rich",
      memoji: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aileen",
      snippet: "Hope the little ones aren't tiring you out!",
      time: "Saturday",
    },
    {
      id: "jasmine",
      name: "Jasmine Garcia",
      memoji: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jasmine",
      snippet: "See you tomorrow!",
      time: "Saturday",
    },
    {
      id: "nisha",
      name: "Nisha Kumar",
      memoji: "https://api.dicebear.com/7.x/adventurer/svg?seed=Nisha",
      snippet:
        "Cool... I'll be by just before 7 to drop off the birthday cake 🎂",
      time: "Friday",
    },
  ];

  const [activeContact, setActiveContact] = useState(initialContacts[1]); // Default to Orkun as in screenshot
  const [messagesChatInput, setMessagesChatInput] = useState("");
  const [messagesSearchQuery, setMessagesSearchQuery] = useState("");

  const [messagesHistory, setMessagesHistory] = useState<
    Record<
      string,
      Array<{
        sender: "user" | "them";
        text: string;
        timestamp: number;
        hasImage?: boolean;
      }>
    >
  >({
    willy: [
      {
        sender: "them",
        text: "Hey! 👋 I'm Willy, a bot designed by Dheeraj. Ask me anything about his projects, background, skills, or professional experience!",
        timestamp: Date.now() - 3600000 * 2,
      },
    ],
    orkun: [
      {
        sender: "them",
        text: "For family game night Friday, could we borrow some puzzles, please?",
        timestamp: Date.now() - 3600000 * 24 * 2,
      },
      {
        sender: "user",
        text: "Like a jigsaw puzzle or the wood and metal brain teasers?",
        timestamp: Date.now() - 3600000 * 23 * 2,
      },
      {
        sender: "them",
        text: "Oh! 🧠 I forgot that you collect all kinds of puzzles",
        timestamp: Date.now() - 3600000 * 22 * 2,
      },
      {
        sender: "them",
        text: "Let's stick with the jigsaws for now",
        timestamp: Date.now() - 3600000 * 22 * 2,
      },
      {
        sender: "user",
        text: "Anytime, neighbor",
        timestamp: Date.now() - 3600000 * 21 * 2,
      },
      {
        sender: "user",
        text: "I have the perfect puzzle for you to challenge the kids",
        timestamp: Date.now() - 3600000 * 20 * 2,
      },
      {
        sender: "user",
        text: "",
        timestamp: Date.now() - 3600000 * 20 * 2,
        hasImage: true,
      }, // Image of sand dunes
      {
        sender: "user",
        text: "But only if you carefully count all 1000 pieces before returning it 😜",
        timestamp: Date.now() - 3600000 * 19 * 2,
      },
      {
        sender: "them",
        text: "Hmm. Maybe just a 500 piece one? 😂",
        timestamp: Date.now() - 3600000 * 18 * 2,
      },
      {
        sender: "them",
        text: "Or I can just put the kids on one?",
        timestamp: Date.now() - 3600000 * 18 * 2,
      },
      {
        sender: "user",
        text: "Come by if you want them",
        timestamp: Date.now() - 3600000 * 17 * 2,
      },
      {
        sender: "them",
        text: "Thanks for the puzzles!",
        timestamp: Date.now() - 3600000 * 16 * 2,
      },
    ],
    trev: [
      {
        sender: "them",
        text: "Gotcha covered!",
        timestamp: Date.now() - 3600000 * 24,
      },
    ],
    antonio: [
      {
        sender: "them",
        text: "Is your mind blown? 🤯",
        timestamp: Date.now() - 3600000 * 25,
      },
    ],
    hiker: [
      {
        sender: "them",
        text: 'Xiaomeng reacted ❤️ to "Guess who I ran into today!"',
        timestamp: Date.now() - 3600000 * 26,
      },
    ],
    xiaomeng: [
      {
        sender: "them",
        text: "Now you've got me thinking about my next vacation",
        timestamp: Date.now() - 3600000 * 27,
      },
    ],
    aileen: [
      {
        sender: "them",
        text: "Hope the little ones aren't tiring you out!",
        timestamp: Date.now() - 3600000 * 48,
      },
    ],
    jasmine: [
      {
        sender: "them",
        text: "See you tomorrow!",
        timestamp: Date.now() - 3600000 * 49,
      },
    ],
    nisha: [
      {
        sender: "them",
        text: "Cool... I'll be by just before 7 to drop off the birthday cake 🎂",
        timestamp: Date.now() - 3600000 * 72,
      },
    ],
  });

  const [messagesIsTyping, setMessagesIsTyping] = useState<
    Record<string, boolean>
  >({});

  const handleSelectContact = (c: any) => {
    setActiveContact(c);
  };

  const handleSendMessagesChat = () => {
    if (!messagesChatInput.trim()) return;

    const userText = messagesChatInput.trim();
    const activeId = activeContact.id;

    const userMsg = {
      sender: "user" as const,
      text: userText,
      timestamp: Date.now(),
    };

    setMessagesHistory((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), userMsg],
    }));

    setMessagesChatInput("");

    // Update snippet in contacts list
    activeContact.snippet = userText;
    activeContact.time = "Just now";

    // Set typing
    setMessagesIsTyping((prev) => ({ ...prev, [activeId]: true }));

    // Generate reply after short delay
    setTimeout(() => {
      let responseText = "";
      if (activeId === "willy") {
        responseText = generateWillyResponse(userText);
      } else {
        responseText = `Hey! Thanks for the message. I'm currently away from my desk, but I'll hit you up soon! 🚀`;
      }

      const replyMsg = {
        sender: "them" as const,
        text: responseText,
        timestamp: Date.now(),
      };

      setMessagesHistory((prev) => ({
        ...prev,
        [activeId]: [...(prev[activeId] || []), replyMsg],
      }));

      // Update snippet
      activeContact.snippet = responseText;
      activeContact.time = "Just now";

      setMessagesIsTyping((prev) => ({ ...prev, [activeId]: false }));
    }, 1000);
  };

  // Spotlight search states
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState("");
  const [spotlightSelectedIndex, setSpotlightSelectedIndex] = useState(0);
  const spotlightInputRef = useRef<HTMLInputElement>(null);

  // Preloading States
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [wallpaperLoaded, setWallpaperLoaded] = useState(false);
  const [bootCompleted, setBootCompleted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);

  // Clock Update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClockText(
        now.toLocaleTimeString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  // Preloading assets
  useEffect(() => {
    const imageUrls = [
      "https://upload.wikimedia.org/wikipedia/en/8/8e/AppleSiriIcon2017.png",
      "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853981255cc36b3a37af_finder.png",
      "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853943597517f128b9b4_launchpad.png",
      "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853743597518c528b9b3_contacts.png",
      "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ddd826358438eda6d_safari.png",
      "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853a55558a68e192ee08_messages.png",
      "https://findicons.com/files/icons/569/longhorn_objects/128/trash.png",
      "https://cdn-icons-png.flaticon.com/512/337/337946.png",
    ];

    let loadedCount = 0;
    const preloadImage = (url: string) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
    };
    imageUrls.forEach(preloadImage);

    // Preload Wallpaper
    const wpImg = new Image();
    wpImg.src =
      "https://res.cloudinary.com/dwmxbkhch/image/upload/v1779531121/mac-sequoia-wallpaper-1152x648_dk1qwt.jpg";
    wpImg.onload = () => {
      setWallpaperLoaded(true);
    };
    wpImg.onerror = () => {
      setWallpaperLoaded(true);
    };
  }, []);

  // Boot progress simulator
  useEffect(() => {
    if (imagesLoaded && wallpaperLoaded) {
      const interval = setInterval(() => {
        setBootProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setBootCompleted(true), 400);
            return 100;
          }
          return prev + 10;
        });
      }, 70);
      return () => clearInterval(interval);
    }
  }, [imagesLoaded, wallpaperLoaded]);

  const activateWindow = useCallback(
    (id: string) => {
      trigger("nudge");
      zCounter.current += 1;
      setZIndexMap((prev) => ({ ...prev, [id]: zCounter.current }));
      setActiveWindow(id);
      setMinimizedWindows((prev) => ({ ...prev, [id]: false }));
      setOpenWindows((prev) => ({ ...prev, [id]: true }));
    },
    [trigger],
  );

  const openFinder = useCallback(
    (dir: string, selectId?: string | null) => {
      setFinderSelectedId(selectId || null);
      setFinderPath(`${dir}?t=${Date.now()}`);
      activateWindow("finder");
    },
    [activateWindow],
  );

  const openSafari = useCallback(() => {
    activateWindow("safari");
  }, [activateWindow]);

  const openIPod = useCallback(() => {
    activateWindow("ipod");
  }, [activateWindow]);

  const handleSelectSafariTab = useCallback(
    (id: string) => {
      setSafariActiveTabId(id);
      const tab = safariTabs.find((t) => t.id === id);
      if (tab) {
        setSafariAddressInput(tab.url);
      }
    },
    [safariTabs],
  );

  const handleAddSafariTab = useCallback(() => {
    const newId = `tab-${Date.now()}`;
    const newTab: SafariTab = {
      id: newId,
      title: "New Tab",
      url: "https://www.google.com",
      history: ["https://www.google.com"],
      historyIndex: 0,
    };
    setSafariTabs((prev) => [...prev, newTab]);
    setSafariActiveTabId(newId);
    setSafariAddressInput("https://www.google.com");
  }, []);

  const handleCloseSafariTab = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (safariTabs.length <= 1) return;
      const closedIndex = safariTabs.findIndex((t) => t.id === id);
      const newTabs = safariTabs.filter((t) => t.id !== id);
      setSafariTabs(newTabs);
      if (safariActiveTabId === id) {
        const nextActiveIndex = Math.max(0, closedIndex - 1);
        const nextTab = newTabs[nextActiveIndex];
        setSafariActiveTabId(nextTab.id);
        setSafariAddressInput(nextTab.url);
      }
    },
    [safariTabs, safariActiveTabId],
  );

  const handleSafariNavigate = useCallback(
    (url: string) => {
      let targetUrl = url;
      const isDomain = url.includes(".") || url.includes("localhost") || url.startsWith("http://") || url.startsWith("https://");
      const isSearch = !isDomain || (url.includes(" ") && !url.startsWith("http"));

      if (isSearch) {
        targetUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
        if (
          url.includes("geraudlecarduner.com") ||
          url.includes("archviews.com") ||
          url.includes("kvellhome.com") ||
          url.includes("cleverdesign.co")
        ) {
          // Keep as domain
        } else if (url.includes("localhost")) {
          targetUrl = `http://${url}`;
        } else {
          targetUrl = `https://${url}`;
        }
      }

      setSafariTabs((prev) =>
        prev.map((t) => {
          if (t.id === safariActiveTabId) {
            const newHistory = t.history.slice(0, t.historyIndex + 1);
            newHistory.push(targetUrl);

            let title = "New Tab";
            if (targetUrl.includes("google.com/search")) {
              const urlParts = targetUrl.split("?");
              const searchParamsObj = new URLSearchParams(urlParts[1] || "");
              let q = searchParamsObj.get("q") || "";
              if (!q && searchParamsObj.get("url")) {
                try {
                  const innerParams = new URLSearchParams(new URL(searchParamsObj.get("url")!).search);
                  q = innerParams.get("q") || "";
                } catch(e) {}
              }
              title = q ? `${q} - Google Search` : "Google Search";
            } else if (targetUrl.includes("google.com")) {
              title = "Google";
            } else {
              try {
                const hostname = new URL(targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`).hostname;
                title = hostname.replace("www.", "");
              } catch (e) {
                title = targetUrl
                  .replace("https://", "")
                  .replace("http://", "")
                  .replace("www.", "")
                  .split("/")[0];
              }
            }

            return {
              ...t,
              title,
              url: targetUrl,
              history: newHistory,
              historyIndex: newHistory.length - 1,
            };
          }
          return t;
        }),
      );
      setSafariAddressInput(targetUrl);
    },
    [safariActiveTabId],
  );

  const handleSafariGoBack = useCallback(() => {
    setSafariTabs((prev) =>
      prev.map((t) => {
        if (t.id === safariActiveTabId && t.historyIndex > 0) {
          const newIdx = t.historyIndex - 1;
          const targetUrl = t.history[newIdx];
          setSafariAddressInput(targetUrl);
          return {
            ...t,
            url: targetUrl,
            historyIndex: newIdx,
          };
        }
        return t;
      }),
    );
  }, [safariActiveTabId]);

  const handleSafariGoForward = useCallback(() => {
    setSafariTabs((prev) =>
      prev.map((t) => {
        if (
          t.id === safariActiveTabId &&
          t.historyIndex < t.history.length - 1
        ) {
          const newIdx = t.historyIndex + 1;
          const targetUrl = t.history[newIdx];
          setSafariAddressInput(targetUrl);
          return {
            ...t,
            url: targetUrl,
            historyIndex: newIdx,
          };
        }
        return t;
      }),
    );
  }, [safariActiveTabId]);

  const handleSafariRefresh = useCallback(() => {
    setSafariRefreshTrigger((prev) => prev + 1);
  }, []);

  const closeWindow = (id: string) => {
    trigger("nudge");
    setOpenWindows((prev) => ({ ...prev, [id]: false }));
  };

  const minimizeWindow = (id: string) => {
    trigger("nudge");
    setMinimizedWindows((prev) => ({ ...prev, [id]: true }));
  };

  // Calculate Spotlight Results
  const getSpotlightResults = useCallback(() => {
    if (!spotlightQuery.trim()) return [];

    const query = spotlightQuery.toLowerCase().trim();
    const results: Array<{
      id: string;
      name: string;
      category: "Applications" | "Projects" | "Experience" | "Documents";
      kind: string;
      icon: React.ReactNode;
      onSelect: () => void;
    }> = [];

    // 1. Applications
    const apps = [
      {
        id: "app_settings",
        name: "System Settings.app",
        category: "Applications" as const,
        kind: "Application",
        icon: <IconSettings className="w-4 h-4 text-gray-400" />,
        onSelect: () => {
          activateWindow("profile");
        },
      },
      {
        id: "app_finder",
        name: "Finder.app",
        category: "Applications" as const,
        kind: "Application",
        icon: <IconFolder className="w-4 h-4 text-blue-400" />,
        onSelect: () => {
          openFinder("documents");
        },
      },
      {
        id: "app_resume",
        name: "Resume.pdf",
        category: "Applications" as const,
        kind: "Document",
        icon: <IconFileText className="w-4 h-4 text-red-500" />,
        onSelect: () => {
          activateWindow("resume");
        },
      },
      {
        id: "app_messages",
        name: "Messages.app",
        category: "Applications" as const,
        kind: "Application",
        icon: (
          <img
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853a55558a68e192ee08_messages.png"
            alt="Messages"
            className="w-4 h-4 object-contain"
          />
        ),
        onSelect: () => {
          activateWindow("messages");
        },
      },
      {
        id: "app_safari",
        name: "Safari.app",
        category: "Applications" as const,
        kind: "Application",
        icon: (
          <img
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ddd826358438eda6d_safari.png"
            alt="Safari"
            className="w-4 h-4 object-contain"
          />
        ),
        onSelect: () => {
          activateWindow("safari");
        },
      },
    ];

    apps.forEach((app) => {
      if (
        (app.name || "").toLowerCase().includes(query) ||
        (app.kind || "").toLowerCase().includes(query)
      ) {
        results.push(app);
      }
    });

    // 2. Projects
    allProjectsList.forEach((proj) => {
      const match =
        (proj.title || "").toLowerCase().includes(query) ||
        (proj.subtitle || "").toLowerCase().includes(query) ||
        (proj.description || "").toLowerCase().includes(query) ||
        (proj.technologies || []).some((t) =>
          (t || "").toLowerCase().includes(query),
        );

      if (match) {
        let iconColorClass = "text-blue-400";
        let iconElement = <IconDeviceDesktop className="w-4 h-4" />;
        if (proj.category === "ai-agents") {
          iconColorClass = "text-purple-400";
          iconElement = <IconCpu className="w-4 h-4" />;
        } else if (proj.category === "systems-languages") {
          iconColorClass = "text-orange-400";
          iconElement = <IconTerminal className="w-4 h-4" />;
        }

        results.push({
          id: proj.id,
          name: `${proj.title}.app`,
          category: "Projects" as const,
          kind:
            proj.category === "ai-agents"
              ? "AI Agent"
              : proj.category === "systems-languages"
                ? "Systems App"
                : "Web App",
          icon: (
            <div
              className={`w-4 h-4 flex items-center justify-center ${iconColorClass}`}
            >
              {iconElement}
            </div>
          ),
          onSelect: () => {
            openFinder("projects", proj.id);
          },
        });
      }
    });

    // 3. Experience
    allExperiencesList.forEach((exp) => {
      const match =
        (exp.company || "").toLowerCase().includes(query) ||
        (exp.title || "").toLowerCase().includes(query) ||
        (exp.location || "").toLowerCase().includes(query) ||
        (exp.period || "").toLowerCase().includes(query) ||
        (exp.bullets || []).some((b) =>
          (b || "").toLowerCase().includes(query),
        );

      if (match) {
        results.push({
          id: exp.id,
          name: `${exp.company}.job`,
          category: "Experience" as const,
          kind: "Document",
          icon: <IconBriefcase className="w-4 h-4 text-green-400" />,
          onSelect: () => {
            openFinder("experience", exp.id);
          },
        });
      }
    });

    // 4. Desktop Files
    const desktopFiles = [
      {
        id: "file_welcome",
        name: "Welcome.txt",
        category: "Documents" as const,
        kind: "Document",
        icon: <IconFileText className="w-4 h-4 text-gray-300" />,
        onSelect: () => {
          openFinder("desktop", "file_welcome");
        },
      },
    ];

    desktopFiles.forEach((file) => {
      if (
        (file.name || "").toLowerCase().includes(query) ||
        (file.kind || "").toLowerCase().includes(query)
      ) {
        results.push(file);
      }
    });

    return results;
  }, [spotlightQuery, activateWindow, openFinder]);

  // Spotlight keyboard toggles and list navigation keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Cmd + Space or Ctrl + Space
      const isSpace = e.key === " " || e.code === "Space";
      const isModifier = e.metaKey || e.ctrlKey;

      if (isModifier && isSpace) {
        e.preventDefault();
        setIsSpotlightOpen((prev) => {
          const next = !prev;
          if (next) {
            setSpotlightQuery("");
            setSpotlightSelectedIndex(0);
          }
          return next;
        });
        return;
      }

      if (!isSpotlightOpen) return;

      const results = getSpotlightResults();

      if (e.key === "Escape") {
        e.preventDefault();
        setIsSpotlightOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (results.length > 0) {
          setSpotlightSelectedIndex((prev) => (prev + 1) % results.length);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (results.length > 0) {
          setSpotlightSelectedIndex(
            (prev) => (prev - 1 + results.length) % results.length,
          );
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results.length > 0 && results[spotlightSelectedIndex]) {
          trigger?.("success");
          results[spotlightSelectedIndex].onSelect();
          setIsSpotlightOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpotlightOpen, spotlightSelectedIndex, getSpotlightResults, trigger]);

  // Autofocus input when Spotlight is opened
  useEffect(() => {
    if (isSpotlightOpen) {
      const timer = setTimeout(() => {
        spotlightInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isSpotlightOpen]);

  if (!bootCompleted) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center select-none z-[1000]">
        <img
          src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/apple/default.svg"
          alt="Siri"
          className="w-16 h-16 text-white mb-8 fill-current"
        />
        <div className="w-40 h-[3px] bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-75"
            style={{ width: `${bootProgress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-black select-none">
      {/* Background Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dwmxbkhch/image/upload/v1779531121/mac-sequoia-wallpaper-1152x648_dk1qwt.jpg')`,
        }}
      />

      {/* Main Desktop Container */}
      <div className="text-white h-full w-full flex flex-col relative overflow-hidden z-10">
        <div className="h-full w-full flex flex-col relative bg-transparent">
          {/* Menu Bar */}
          <nav className="glass-darker backdrop-blur-md  w-full h-7 flex items-center justify-between px-4 text-xs z-[9999] absolute top-0 left-0 text-white/95">
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-4 pr-3">
                <img
                  src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/apple/default.svg"
                  alt="Siri"
                  className="w-4 h-4 cursor-pointer"
                />
                <div className="relative">
                  <span
                    className={` cursor-pointer px-2 py-0.5 rounded ${activeMenu === "Finder" ? "bg-white/10" : "hover:bg-white/10"}`}
                    onMouseDown={() =>
                      setActiveMenu(activeMenu === "Finder" ? null : "Finder")
                    }
                  >
                    Finder
                  </span>
                  <DropdownMenu
                    isOpen={activeMenu === "Finder"}
                    items={finderMenuItems}
                    onClose={() => setActiveMenu(null)}
                  />
                </div>
              </div>
              {["File", "Edit", "View", "Window", "Help"].map((item) => (
                <div key={item} className="relative">
                  <span
                    className={`cursor-pointer px-2 py-0.5 rounded ${activeMenu === item ? "bg-white/10" : "hover:bg-white/10"}`}
                    onMouseDown={() =>
                      setActiveMenu(activeMenu === item ? null : item)
                    }
                  >
                    {item}
                  </span>
                  <DropdownMenu
                    isOpen={activeMenu === item}
                    items={
                      item === "File"
                        ? fileMenuItems
                        : item === "Edit"
                          ? editMenuItems
                          : item === "View"
                            ? viewMenuItems
                            : item === "Window"
                              ? windowMenuItems
                              : helpMenuItems
                    }
                    onClose={() => setActiveMenu(null)}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-1.5">
              {/* Wifi, Battery, Clock */}
              <div className="relative flex items-center">
                <button
                  className={`p-1 rounded-md cursor-pointer ${activeMenu === "Wifi" ? "bg-white/10" : "hover:bg-white/10"}`}
                  onMouseDown={() =>
                    setActiveMenu(activeMenu === "Wifi" ? null : "Wifi")
                  }
                >
                  <WifiIcon />
                </button>
                <ControlPanel
                  isOpen={activeMenu === "Wifi"}
                  onClose={() => setActiveMenu(null)}
                  title="Wi-Fi"
                >
                  <div className="space-y-1">
                    <ControlItem
                      icon={<WifiIcon />}
                      label="dev submarine"
                      sublabel="Saved"
                      isActive
                    />
                    <ControlItem
                      icon={<WifiIcon />}
                      label="have u tried biscuit"
                    />
                    <ControlItem
                      icon={<WifiIcon />}
                      label="Brackeys community"
                    />
                  </div>
                </ControlPanel>
              </div>
              <div className="relative flex items-center">
                <button
                  className={`p-1 rounded-md cursor-pointer ${activeMenu === "Power" ? "bg-white/10" : "hover:bg-white/10"}`}
                  onMouseDown={() =>
                    setActiveMenu(activeMenu === "Power" ? null : "Power")
                  }
                >
                  <BatteryIcon />
                </button>
                <ControlPanel
                  isOpen={activeMenu === "Power"}
                  onClose={() => setActiveMenu(null)}
                  title="Battery"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm  text-white">100% Charged</span>
                    <BatteryIcon />
                  </div>
                </ControlPanel>
              </div>
              <div className="relative">
                <span
                  className={`cursor-pointer px-2 py-1 rounded-md text-[12px] hover:bg-white/10 ${activeMenu === "Clock" ? "bg-white/10" : ""}`}
                  onMouseDown={() =>
                    setActiveMenu(activeMenu === "Clock" ? null : "Clock")
                  }
                >
                  {clockText}
                </span>
              </div>
            </div>
          </nav>

          {/* Desktop Area */}
          <main className="flex-1 relative w-full h-full pt-7 pb-20 overflow-hidden">
            <DesktopFolder
              label="projects"
              initialPos={{ top: "12%", left: "82%" }}
              onDoubleClick={() => openFinder("projects")}
            />
            <DesktopFolder
              label="about me"
              initialPos={{ top: "32%", left: "78%" }}
              onDoubleClick={() => activateWindow("profile")}
            />
            <DesktopFolder
              label="experience"
              initialPos={{ top: "12%", left: "42%" }}
              onDoubleClick={() => openFinder("experience")}
            />
            <DesktopFolder
              label="resume"
              initialPos={{ top: "52%", left: "47%" }}
              onDoubleClick={() => activateWindow("resume")}
            />

            {/* Profile Window */}
            {openWindows["profile"] && !minimizedWindows["profile"] && (
              <DraggableWindow
                id="win-profile"
                initialPos={{ x: 60, y: 80 }}
                width="w-[800px]"
                zIndex={zIndexMap["profile"]}
                isActive={activeWindow === "profile"}
                onActivate={() => activateWindow("profile")}
                onClose={() => closeWindow("profile")}
                onMinimize={() => minimizeWindow("profile")}
                title="System Settings"
                headerBg="bg-[#2a2a2c] border-b border-[#1c1c1e]"
              >
                <ProfileWindowContent />
              </DraggableWindow>
            )}

            {/* Finder Window */}
            {openWindows["finder"] && !minimizedWindows["finder"] && (
              <DraggableWindow
                id="win-finder"
                initialPos={{ x: 200, y: 100 }}
                width="w-[1200px]"
                zIndex={zIndexMap["finder"]}
                isActive={activeWindow === "finder"}
                onActivate={() => activateWindow("finder")}
                onClose={() => closeWindow("finder")}
                onMinimize={() => minimizeWindow("finder")}
                title="Finder"
                headerBg="bg-[#2a2a2c] border-b border-[#1c1c1e]"
              >
                <FinderWindowContent
                  initialDir={finderPath}
                  onOpenWindow={activateWindow}
                  selectedId={finderSelectedId}
                />
              </DraggableWindow>
            )}

            {/* Resume Window (Native PDF Viewer iframe) */}
            {openWindows["resume"] && !minimizedWindows["resume"] && (
              <DraggableWindow
                id="win-resume"
                initialPos={{ x: 120, y: 60 }}
                width="w-[850px]"
                zIndex={zIndexMap["resume"]}
                isActive={activeWindow === "resume"}
                onActivate={() => activateWindow("resume")}
                onClose={() => closeWindow("resume")}
                onMinimize={() => minimizeWindow("resume")}
                title="Resume.pdf"
                headerBg="bg-[#1c1c1e] border-b border-white/5"
              >
                <iframe
                  src="/Resume.pdf"
                  className="w-full h-[550px] border-none rounded-b-xl bg-[#1c1c1e]"
                />
              </DraggableWindow>
            )}

            {/* Messages Window */}
            {openWindows["messages"] && !minimizedWindows["messages"] && (
              <DraggableWindow
                id="win-messages"
                initialPos={{ x: 150, y: 80 }}
                width="w-[820px]"
                zIndex={zIndexMap["messages"]}
                isActive={activeWindow === "messages"}
                onActivate={() => activateWindow("messages")}
                onClose={() => closeWindow("messages")}
                onMinimize={() => minimizeWindow("messages")}
                title=""
                className="bg-[#121214]"
                headerBg="absolute top-0 left-0 w-full bg-transparent z-30 h-12 flex items-center"
                headerCenter={
                  <MessagesHeaderCenter
                    activeContact={activeContact}
                    onMenuClick={() => {}}
                    onComposeClick={() => handleSelectContact(willyContact)}
                  />
                }
                headerRight={
                  <button className="text-white/60 hover:text-white p-1.5 mr-4 cursor-pointer transition-colors hover:bg-white/5 rounded-lg">
                    <svg
                      className="w-5.5 h-5.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                }
              >
                <MessagesAppContent
                  activeContact={activeContact}
                  onSelectContact={handleSelectContact}
                  chatInput={messagesChatInput}
                  setChatInput={setMessagesChatInput}
                  chatMessages={messagesHistory[activeContact.id] || []}
                  onSendMessage={handleSendMessagesChat}
                  searchQuery={messagesSearchQuery}
                  setSearchQuery={setMessagesSearchQuery}
                  contacts={initialContacts}
                  isTyping={messagesIsTyping[activeContact.id] || false}
                />
              </DraggableWindow>
            )}

            {/* Safari Window */}
            {openWindows["safari"] && !minimizedWindows["safari"] && (
              <DraggableWindow
                id="win-safari"
                initialPos={{ x: 100, y: 70 }}
                width="w-[900px]"
                zIndex={zIndexMap["safari"]}
                isActive={activeWindow === "safari"}
                onActivate={() => activateWindow("safari")}
                onClose={() => closeWindow("safari")}
                onMinimize={() => minimizeWindow("safari")}
                title=""
                className="bg-[#e8e8e8] text-neutral-800"
                headerBg="w-full bg-[#e8e8e8] h-12 flex items-center"
                headerCenter={
                  <SafariHeaderCenter
                    tabs={safariTabs}
                    activeTabId={safariActiveTabId}
                    onSelectTab={handleSelectSafariTab}
                    onCloseTab={handleCloseSafariTab}
                    onAddTab={handleAddSafariTab}
                    addressInput={safariAddressInput}
                    setAddressInput={setSafariAddressInput}
                    onNavigate={handleSafariNavigate}
                    onGoBack={handleSafariGoBack}
                    onGoForward={handleSafariGoForward}
                    onRefresh={handleSafariRefresh}
                    isSidebarOpen={safariIsSidebarOpen}
                    setIsSidebarOpen={setSafariIsSidebarOpen}
                    refreshTrigger={safariRefreshTrigger}
                  />
                }
              >
                <SafariAppContent
                  tabs={safariTabs}
                  activeTabId={safariActiveTabId}
                  onSelectTab={handleSelectSafariTab}
                  onCloseTab={handleCloseSafariTab}
                  onAddTab={handleAddSafariTab}
                  addressInput={safariAddressInput}
                  setAddressInput={setSafariAddressInput}
                  onNavigate={handleSafariNavigate}
                  onGoBack={handleSafariGoBack}
                  onGoForward={handleSafariGoForward}
                  onRefresh={handleSafariRefresh}
                  isSidebarOpen={safariIsSidebarOpen}
                  setIsSidebarOpen={setSafariIsSidebarOpen}
                  refreshTrigger={safariRefreshTrigger}
                />
              </DraggableWindow>
            )}

            {/* iPod Classic Window */}
            {openWindows["ipod"] && !minimizedWindows["ipod"] && (
              <DraggableWindow
                id="win-ipod"
                initialPos={{ x: 880, y: 80 }}
                width="w-[280px]"
                zIndex={zIndexMap["ipod"]}
                isActive={activeWindow === "ipod"}
                onActivate={() => activateWindow("ipod")}
                onClose={() => closeWindow("ipod")}
                onMinimize={() => minimizeWindow("ipod")}
                title=""
                className="!bg-transparent !border-0 !shadow-none !rounded-[22px] overflow-hidden"
                headerBg="absolute top-0 left-0 w-full bg-gradient-to-b from-black/50 to-transparent z-30 h-10 flex items-center px-3"
              >
                <IPodContent />
              </DraggableWindow>
            )}

          </main>

          {/* Dock */}
          <Dock>
            <DockItem
              tooltip="Finder"
              dot={openWindows["finder"]}
              onClick={() => openFinder("documents")}
            >
              <img
                src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853981255cc36b3a37af_finder.png"
                alt="Finder"
                className="w-full h-full object-contain"
              />
            </DockItem>
            <DockItem
              tooltip="Spotlight Search"
              dot={isSpotlightOpen}
              onClick={() => {
                trigger("nudge");
                setIsSpotlightOpen(!isSpotlightOpen);
              }}
            >
              <div className="w-full h-full rounded-xl bg-linear-to-tr from-sky-500 via-blue-500 to-indigo-400 border-2 border-white/40 flex items-center justify-center text-white shadow-inner">
                <IconSearch className="w-6 h-6 stroke-[2.5]" />
              </div>
            </DockItem>
            <DockItem
              tooltip="System Info"
              dot={openWindows["profile"]}
              onClick={() => activateWindow("profile")}
            >
              <img
                src="https://res.cloudinary.com/dwmxbkhch/image/upload/v1779538898/75ba848f-8763-489f-9cee-86e5d403b4a1_suzvfi.png"
                alt="About Me"
                className="w-full h-full object-contain"
              />
            </DockItem>
            <DockItem
              tooltip="Resume (PDF)"
              dot={openWindows["resume"]}
              onClick={() => activateWindow("resume")}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                alt="Resume"
                className="w-full h-full object-contain"
              />
            </DockItem>
            <div className="h-10 w-[1px] bg-white/10 mx-1"></div>
            <DockItem
              tooltip="Safari"
              dot={openWindows["safari"]}
              onClick={openSafari}
            >
              <img
                src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ddd826358438eda6d_safari.png"
                alt="Safari"
                className="w-full h-full object-contain"
              />
            </DockItem>
            <DockItem
              tooltip="Messages"
              dot={openWindows["messages"]}
              onClick={() => activateWindow("messages")}
            >
              <img
                src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853a55558a68e192ee08_messages.png"
                alt="Messages"
                className="w-full h-full object-contain"
              />
            </DockItem>
            <DockItem
              tooltip="iPod"
              dot={openWindows["ipod"]}
              onClick={openIPod}
            >
              <img
                src="https://res.cloudinary.com/dwmxbkhch/image/upload/v1779574549/7249f1e1-9187-4034-8a90-01d795ee9039_x5usto.png"
                alt="iPod"
                className="w-full h-full object-contain"
              />
            </DockItem>
            <DockItem tooltip="Trash" shake={true}>
              <img
                src="https://findicons.com/files/icons/569/longhorn_objects/128/trash.png"
                alt="Trash"
                className="w-full h-full object-contain"
              />
            </DockItem>
          </Dock>
        </div>
      </div>

      {/* Spotlight Search Overlay */}
      {isSpotlightOpen && (
        <div
          className="absolute inset-0 bg-transparent z-[99999]"
          onClick={() => setIsSpotlightOpen(false)}
        >
          <div
            className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] rounded-xl backdrop-blur-md  glass-darker  shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Box */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10">
              <IconSearch className="w-5 h-5 text-white/40 shrink-0 mr-3" />
              <input
                ref={spotlightInputRef}
                type="text"
                value={spotlightQuery}
                onChange={(e) => {
                  setSpotlightQuery(e.target.value);
                  setSpotlightSelectedIndex(0);
                }}
                placeholder="Spotlight Search"
                className="w-full bg-transparent border-none text-white placeholder-white/35 focus:outline-none text-[15px] font-normal"
              />
            </div>

            {/* Search Results Display */}
            {spotlightQuery.trim() !== "" ? (
              (() => {
                const results = getSpotlightResults();
                if (results.length === 0) {
                  return (
                    <div className="py-8 text-center text-white/30 text-xs select-none">
                      No results found for "{spotlightQuery}"
                    </div>
                  );
                }

                const groups: Record<string, typeof results> = {};
                results.forEach((item) => {
                  if (!groups[item.category]) {
                    groups[item.category] = [];
                  }
                  groups[item.category].push(item);
                });

                let flatIndex = 0;

                return (
                  <div className="max-h-[350px] overflow-y-auto custom-scrollbar p-2 space-y-3">
                    {Object.entries(groups).map(([category, items]) => (
                      <div key={category} className="space-y-1">
                        <div className="px-3 py-1 text-[9.5px] font-semibold text-white/40 uppercase tracking-widest select-none">
                          {category}
                        </div>
                        <div className="space-y-0.5">
                          {items.map((item) => {
                            const currentFlatIndex = flatIndex++;
                            const isSelected =
                              spotlightSelectedIndex === currentFlatIndex;

                            return (
                              <div
                                key={item.id}
                                onMouseEnter={() =>
                                  setSpotlightSelectedIndex(currentFlatIndex)
                                }
                                onClick={() => {
                                  trigger?.("success");
                                  item.onSelect();
                                  setIsSpotlightOpen(false);
                                }}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-default select-none transition-colors ${
                                  isSelected
                                    ? "bg-[#0a84ff] text-white"
                                    : "text-white/90 hover:bg-white/[0.04]"
                                }`}
                              >
                                <div className="flex items-center space-x-3 min-w-0">
                                  <div
                                    className={`${isSelected ? "text-white" : "text-white/60"} shrink-0`}
                                  >
                                    {item.icon}
                                  </div>
                                  <div className="truncate text-xs font-normal">
                                    {item.name}
                                  </div>
                                </div>
                                <div
                                  className={`text-[10px] uppercase font-normal select-none ${
                                    isSelected
                                      ? "text-white/70"
                                      : "text-white/35"
                                  }`}
                                >
                                  {item.kind}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()
            ) : (
              <div className="py-8 text-center text-white/30 text-xs select-none">
                Type to search projects, experience, or applications
              </div>
            )}

            {/* Spotlight Footer Hint */}
            <div className="px-4 py-2 bg-black/30 border-t border-white/5 flex items-center justify-between text-[9px] text-white/30 select-none">
              <span>
                Search projects, experience, applications, and documents
              </span>
              <div className="flex space-x-3">
                <span>↑↓ to navigate</span>
                <span>↵ to open</span>
                <span>esc to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
