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

  const openFinder = useCallback((dir: string) => {
    setFinderPath(`${dir}?t=${Date.now()}`);
    activateWindow("finder");
  }, [activateWindow]);

  const closeWindow = (id: string) => {
    trigger("nudge");
    setOpenWindows((prev) => ({ ...prev, [id]: false }));
  };

  const minimizeWindow = (id: string) => {
    trigger("nudge");
    setMinimizedWindows((prev) => ({ ...prev, [id]: true }));
  };

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
          <nav className="glass w-full h-7 flex items-center justify-between px-4 text-xs z-[9999] absolute top-0 left-0 text-white/95">
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
                <FinderWindowContent initialDir={finderPath} onOpenWindow={activateWindow} />
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
              tooltip="Experience"
              dot={openWindows["finder"] && finderPath.split("?")[0] === "experience"}
              onClick={() => openFinder("experience")}
            >
              <img
                src="https://res.cloudinary.com/dwmxbkhch/image/upload/v1779539038/57d2b9d8-8847-4b3a-9812-56f1c213d284_ybzjtn.png"
                alt="Launchpad"
                className="w-full h-full object-contain"
              />
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
    </div>
  );
}
