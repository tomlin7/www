"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { KoiPond, type PondStats } from "@/lib/koi-pond";
import { navigation } from "@/lib/site";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/";
  const visual = pathname === "/gallery" || pathname.startsWith("/projects");
  const canvas = useRef<HTMLCanvasElement>(null);
  const pond = useRef<KoiPond | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  const [light, setLight] = useState(false);
  const themeRef = useRef(false);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const [stats, setStats] = useState<PondStats>({ koi: 0, pellets: 0 });

  useEffect(() => {
    if (!canvas.current) return;
    const controller = new KoiPond(canvas.current, themeRef.current, setStats);
    pond.current = controller;
    void document.fonts.ready.then(() => {
      if (pond.current === controller) controller.measureContent();
    });
    return () => {
      controller.destroy();
      pond.current = null;
    };
  }, [visual]);

  useEffect(() => {
    themeRef.current = light;
    pond.current?.setTheme(light);
    document.documentElement.style.setProperty(
      "--background",
      light ? "#f5f4f1" : "#1a1917",
    );
    document.documentElement.style.setProperty(
      "--foreground",
      light ? "#262523" : "#fff7f0",
    );
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", light ? "#f5f4f1" : "#1a1917");
  }, [light]);

  useEffect(() => {
    pond.current?.measureContent();
  }, [pathname]);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1023px)");
    const closeOnDesktop = () => {
      if (!mobile.matches) setMenuPath(null);
    };
    mobile.addEventListener("change", closeOnDesktop);
    return () => mobile.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuPath(null);
        menuButton.current?.focus();
      }
      if (event.key !== "Tab") return;
      const controls = [
        menuButton.current,
        ...Array.from(
          menu.current?.querySelectorAll<HTMLElement>("a, button") ?? [],
        ),
      ].filter((element): element is HTMLElement => !!element);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const active = (href: string) =>
    href === "/" ? home : pathname.startsWith(href);
  const theme = (
    <button
      className="theme-toggle"
      onClick={() => setLight((value) => !value)}
      aria-label={`Switch to ${light ? "dark" : "light"} mode`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {light ? (
          <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </>
        )}
      </svg>
    </button>
  );

  return (
    <div
      className={`site-shell${home ? " is-home" : " is-content"}${visual ? " is-visual" : ""}${light ? " light" : ""}`}
    >
      {!visual && (
        <div className="pond-backdrop" aria-hidden="true">
          <canvas ref={canvas} className="pond-canvas" />
        </div>
      )}
      <a className="skip-link" href="#main-content">
        skip to content
      </a>
      <nav className="desktop-nav" aria-label="Main" data-koi-avoid>
        {navigation.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            aria-current={active(href) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
        {theme}
      </nav>
      <div className="mobile-header" data-koi-ignore>
        <button
          ref={menuButton}
          className="menu-toggle"
          onClick={() => setMenuPath(menuOpen ? null : pathname)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          <span>
            Dheeraj
            {!home && (
              <span className="mobile-section">
                {" "}
                / {pathname.split("/")[1]}
              </span>
            )}
          </span>
          <span
            className={`menu-dots${menuOpen ? " open" : ""}`}
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>
      {menuOpen && (
        <nav
          ref={menu}
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobile navigation"
          data-koi-ignore
        >
          {navigation.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? "page" : undefined}
              onClick={() => setMenuPath(null)}
            >
              {label === "oss"
                ? "OSS"
                : label[0].toUpperCase() + label.slice(1)}
            </Link>
          ))}
          {theme}
        </nav>
      )}
      <div className="site-body" inert={menuOpen}>
        {children}
      </div>
      {home && (
        <div className="pond-stats" aria-hidden="true" data-koi-avoid>
          <span>{stats.koi || ""}</span>
          <span>{stats.koi ? stats.pellets : ""}</span>
        </div>
      )}
    </div>
  );
}
