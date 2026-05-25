"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";
import {
  IconX,
  IconMail,
  IconCopy,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandDiscord,
  IconBrandProducthunt,
} from "@tabler/icons-react";

// RevealScreen component from page.tsx
const RevealScreen = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={false}
      animate={{
        clipPath: isOpen ? "circle(150% at 100% 0%)" : "circle(0% at 100% 0%)",
      }}
      transition={{
        duration: 1.2,
        ease: [0.77, 0, 0.175, 1],
      }}
      className="fixed inset-0 z-[200] bg-[#050505] overflow-hidden select-none"
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      <div className="w-full h-full bg-black">{isOpen && children}</div>
    </motion.div>
  );
};

export default function PortfolioLayout({
  children,
  desktopContent,
}: {
  children: React.ReactNode;
  desktopContent: React.ReactNode;
}) {
  const pathname = usePathname();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenReveal = () => setShowReveal(true);
    window.addEventListener("open-desktop-reveal", handleOpenReveal);
    return () =>
      window.removeEventListener("open-desktop-reveal", handleOpenReveal);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const pageBg = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ["#000000", "#050505", "#050505", "#000000"],
  );

  const activeSection = pathname === "/" ? "about" : pathname.slice(1);

  const { trigger } = useWebHaptics({ debug: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;
      const interactiveEl = target.closest(
        "button, a, [role='button'], .cursor-pointer, [data-haptic]",
      );

      if (interactiveEl) {
        const pattern = interactiveEl.getAttribute("data-haptic");
        if (pattern === "none") return;

        if (pattern === "success") {
          trigger("success");
        } else if (pattern === "error") {
          trigger("error");
        } else if (pattern === "buzz") {
          trigger("buzz");
        } else {
          trigger("nudge");
        }
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [trigger]);

  return (
    <div className="relative font-sans selection:bg-blue-500/30">
      {/* Global Navigation Bar */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-fit pointer-events-auto max-w-[95vw]">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between w-[620px] max-w-full bg-[#0a0a0a]/80 backdrop-blur-xl rounded-full px-6 py-2.5 shadow-2xl"
        >
          <div className="flex items-center space-x-4 shrink-0 min-w-[180px]">
            <Link
              href="/"
              className="text-white/90 hover:text-white font-medium text-sm tracking-tight cursor-pointer flex items-center space-x-1.5 transition-colors"
            >
              <span className="font-bold">~tomlin7</span>
              <AnimatePresence mode="wait">
                {activeSection && activeSection !== "about" && (
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-1.5"
                  >
                    <span className="text-white/20">/</span>
                    <span className="text-white/80 font-medium capitalize">
                      {activeSection === "oss"
                        ? "OSS"
                        : activeSection === "misc"
                          ? "Misc"
                          : activeSection}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </div>

          <div className="h-4 w-[1px] bg-white/10 shrink-0" />

          <div
            className="flex items-center space-x-1"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {[
              { name: "About", href: "/" },
              { name: "Projects", href: "/projects" },
              { name: "Oss", href: "/oss" },
              { name: "Blog", href: "/blog" },
              { name: "Misc", href: "/misc" },
            ].map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-3.5 py-1.5 rounded-full cursor-pointer transition-colors z-10"
                  onMouseEnter={() => setHoveredNav(item.name)}
                >
                  <span
                    className={`relative z-20 text-[13px] font-medium transition-colors duration-300 ${isActive ? "text-black" : hoveredNav === item.name ? "text-white" : "text-white/50"}`}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill-active"
                      className="absolute inset-0 bg-white rounded-full z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  {hoveredNav === item.name && !isActive && (
                    <motion.div
                      layoutId="nav-pill-hover"
                      className="absolute inset-0 bg-white/10 rounded-full z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </motion.nav>
      </div>

      <motion.div
        ref={containerRef}
        style={{ backgroundColor: pageBg }}
        className="relative min-h-screen overflow-x-hidden flex flex-col"
      >
        <div className="flex-grow">{children}</div>

        {/* Global Footer info */}
        <div className="max-w-[1000px] mx-auto w-full px-6 pt-20 pb-12 flex flex-col gap-8">
          {/* Top Banner (Cream Card) */}
          <div className="bg-[#FAF6EE] rounded-full px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm border border-black/5">
            <span className="text-black font-semibold text-[15px] text-center md:text-left tracking-tight">
              Open to Product Engineer and Design Engineer roles
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText("dheerajcofficial@gmail.com");
              }}
              data-haptic="success"
              className="bg-black hover:bg-[#151515] text-white font-bold text-[13px] px-5 py-2.5 rounded-full transition-all active:scale-95 flex items-center gap-1.5 shadow-sm my-0.5 cursor-pointer"
            >
              <IconCopy className="w-4 h-4" />
              <span>Copy Email</span>
            </button>
          </div>

          {/* Subtle line divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full my-4" />

          {/* Columns section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-4">
            {/* Connect Section */}
            <div className="flex flex-col gap-3">
              <span className="text-xs  text-white/80 uppercase tracking-normal">
                Connect
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/Tomlin7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80 transition-opacity"
                >
                  <IconBrandGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/initdhee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80 transition-opacity"
                >
                  <IconBrandLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/tomfricks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80 transition-opacity"
                >
                  <IconBrandX className="w-5 h-5" />
                </a>
                <a
                  href="https://dev.to/tomlin7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80 transition-opacity flex items-center justify-center"
                >
                  <div className="w-5 h-5 bg-white text-black font-extrabold text-[9px] rounded flex items-center justify-center tracking-tighter select-none">
                    DEV
                  </div>
                </a>
                <a
                  href="https://www.producthunt.com/@tomlin7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80 transition-opacity flex items-center justify-center"
                >
                  <IconBrandProducthunt className="w-5 h-5" />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80 transition-opacity"
                >
                  <IconBrandDiscord className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Built With Section */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <span className="text-xs  text-white/80 uppercase tracking-normal">
                Built With
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-black border border-white/[0.08] rounded-full text-[11px] text-white/80 font-medium select-none">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
                    alt="Next.js"
                    className="w-3.5 h-3.5 object-contain invert brightness-200"
                  />
                  <span>Next.js</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-black border border-white/[0.08] rounded-full text-[11px] text-white/80 font-medium select-none">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
                    alt="Tailwind CSS"
                    className="w-3.5 h-3.5 object-contain"
                  />
                  <span>Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-black border border-white/[0.08] rounded-full text-[11px] text-white/80 font-medium select-none">
                  <span className="text-[10px] leading-none">▲</span>
                  <span>Vercel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between text-[11px] text-white/40 border-t border-white/[0.04] pt-6 gap-4">
            <span>© 2026 Dheeraj C.</span>
            <a
              href="https://tomlin7.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-0.5"
            >
              <span>tomlin7.com</span>
              <span className="text-[9px]">↗</span>
            </a>
          </div>
        </div>

        {/* The Reveal Component (Hidden/Preserved) */}
        <RevealScreen isOpen={showReveal} onClose={() => setShowReveal(false)}>
          {desktopContent}
        </RevealScreen>

        {/* Preserved Peeling Corner */}
        <motion.div
          onClick={() => {
            if (!showReveal) setShowReveal(true);
          }}
          className={`${
            showReveal ? "fixed z-[250]" : "absolute z-[200]"
          } top-0 right-0 w-24 h-24 pointer-events-auto group cursor-pointer overflow-visible`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover="hover"
        >
          {/* Peeling Corner Corner Dog-Ear */}
          <motion.div
            className={`absolute top-0 right-0 w-full h-full shadow-inner origin-bottom-left blur transition-colors duration-300 ${
              showReveal ? "bg-black" : "bg-white"
            }`}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
            variants={{
              hover: { width: "140%", height: "140%" },
            }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />

          {/* The 'peeled up' triangle pointing towards the center */}
          <motion.div
            className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent backdrop-blur-xl shadow-[-15px_15px_40px_rgba(0,0,0,0.6)] origin-top-right"
            style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
            variants={{
              hover: { width: "140%", height: "140%", rotate: 0 },
            }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />

          {/* Moved Close Button inside the Peel */}
          <AnimatePresence>
            {showReveal && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReveal(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-11 left-11 z-[250] w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl hover:bg-white/20 transition-all cursor-pointer"
              >
                <IconX className="w-5 h-5" stroke={2.5} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
