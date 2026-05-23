"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { DraggableWindow } from "@/components/Window";
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
  });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({
    profile: true,
    finder: false,
    resume: false,
  });
  const [minimizedWindows, setMinimizedWindows] = useState<
    Record<string, boolean>
  >({
    profile: false,
    finder: false,
    resume: false,
  });
  const zCounter = useRef(40);

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
            <DockItem tooltip="Safari">
              <img
                src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ddd826358438eda6d_safari.png"
                alt="Safari"
                className="w-full h-full object-contain"
              />
            </DockItem>
            <DockItem tooltip="Messages">
              <img
                src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853a55558a68e192ee08_messages.png"
                alt="Messages"
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
