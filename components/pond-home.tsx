"use client";

import { useEffect, useRef, useState } from "react";
import { KoiPond, type PondStats } from "@/lib/koi-pond";

const links = [
  { label: "github", href: "https://github.com/tomlin7" },
  { label: "linkedin", href: "https://linkedin.com/in/initdhee" },
  { label: "x", href: "https://x.com/tomfricks" },
  { label: "email", href: "mailto:hello@tomlin7.com" },
];

export function PondHome() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pond = useRef<KoiPond | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState<PondStats>({ koi: 0, pellets: 0 });

  useEffect(() => {
    if (!canvas.current) return;
    const controller = new KoiPond(canvas.current, false, setStats);
    pond.current = controller;
    void document.fonts.ready.then(() => {
      if (pond.current === controller) controller.measureContent();
    });
    return () => {
      controller.destroy();
      pond.current = null;
    };
  }, []);

  useEffect(() => {
    pond.current?.setTheme(light);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", light ? "#f5f4f1" : "#1a1917");
  }, [light]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const controls = [
          menuButton.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLElement>("a, button") ?? [],
          ),
        ].filter((element): element is HTMLElement => element !== null);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  const toggleTheme = () => setLight((current) => !current);

  return (
    <div className={`pond-page${light ? " light" : ""}`}>
      <canvas ref={canvas} className="pond-canvas" aria-hidden="true" />
      <a className="skip-link" href="#introduction">
        skip to introduction
      </a>
      <nav className="desktop-nav" aria-label="Main" data-koi-avoid>
        <a href="/" aria-current="page">
          home
        </a>
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("https") ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {label}
          </a>
        ))}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${light ? "dark" : "light"} mode`}
        >
          <ThemeIcon light={light} />
        </button>
      </nav>
      <div className="mobile-header" data-koi-ignore>
        <button
          ref={menuButton}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          <span>Dheeraj</span>
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
          <a href="#introduction" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              target={href.startsWith("https") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {label === "x"
                ? "X"
                : label === "github"
                  ? "GitHub"
                  : label === "linkedin"
                    ? "LinkedIn"
                    : "Email"}
            </a>
          ))}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${light ? "dark" : "light"} mode`}
          >
            <ThemeIcon light={light} />
          </button>
        </nav>
      )}
      <main className="home-content" id="introduction" inert={menuOpen}>
        <div className="pond-stats" aria-hidden="true" data-koi-avoid>
          <span>{stats.koi || ""}</span>
          <span key={stats.pellets}>{stats.koi ? stats.pellets : ""}</span>
        </div>
        <blockquote className="pond-quote" data-koi-avoid>
          in an ocean of gluttony,
          <br />
          cast a fine net
        </blockquote>
        <div className="introduction" data-koi-avoid>
          <h1>Hey, I&apos;m Dheeraj.</h1>
          <p>Systems &amp; Software Engineer, curious about how things work.</p>
          <p>I learn by building, breaking things, and figuring them out.</p>
          <p>Currently, writing code and following my curiosity.</p>
          <div className="social-links" aria-label="Find me online">
            {links.map(({ label, href }, index) => (
              <span key={label}>
                {index > 0 && (
                  <span className="link-divider" aria-hidden="true">
                    {" "}
                    /{" "}
                  </span>
                )}
                <a
                  href={href}
                  target={href.startsWith("https") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function ThemeIcon({ light }: { light: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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
  );
}
