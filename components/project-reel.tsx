"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { VisualMedia } from "@/components/visual-media";
import type { Project } from "@/lib/projects";

export function ProjectReel({ projects }: { projects: Project[] }) {
  const viewport = useRef<HTMLElement>(null);
  const reel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const wheel = (event: WheelEvent) => {
      const track = reel.current;
      if (
        !track ||
        event.ctrlKey ||
        !window.matchMedia("(min-width: 768px)").matches
      )
        return;
      const raw =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      const distance =
        raw *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? window.innerWidth
            : 1);
      if (!distance) return;
      event.preventDefault();
      track.scrollLeft += distance;
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, []);

  return (
    <main
      ref={viewport}
      id="main-content"
      className="projects-view"
      aria-label="Projects"
    >
      <h1 className="sr-only">Projects</h1>
      <div
        ref={reel}
        className="project-reel"
        aria-label="Project collection"
        onKeyDown={(event) => {
          if (
            !reel.current ||
            !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) ||
            !window.matchMedia("(min-width: 768px)").matches
          )
            return;
          event.preventDefault();
          const links = Array.from(
            reel.current.querySelectorAll<HTMLAnchorElement>(".project-tile"),
          );
          const current = links.indexOf(
            document.activeElement as HTMLAnchorElement,
          );
          const target =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? links.length - 1
                : Math.min(
                    links.length - 1,
                    Math.max(
                      0,
                      current + (event.key === "ArrowRight" ? 1 : -1),
                    ),
                  );
          links[target]?.focus({ preventScroll: true });
          links[target]?.scrollIntoView({
            block: "nearest",
            inline: "center",
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          });
        }}
      >
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            id={project.slug}
            className="project-tile"
            href={`/projects/${project.slug}`}
            aria-label={`View ${project.title}`}
          >
            <div className="project-tile-image">
              <VisualMedia
                src={project.image.src}
                alt={project.image.alt}
                label="project image to come"
                sizes="(max-width: 767px) 92vw, 75vw"
              />
              <span className="project-image-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="project-view-label" aria-hidden="true">
                view project ↗
              </span>
            </div>
            <div className="project-tile-caption">
              <h2>{project.title}</h2>
              <span>
                {project.image.period ??
                  project.technologies.slice(0, 2).join(" / ")}
              </span>
            </div>
            <p className="project-tile-description">{project.subtitle}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
