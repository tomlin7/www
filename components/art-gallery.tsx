"use client";

import { useEffect, useRef, useState } from "react";
import { VisualMedia } from "@/components/visual-media";

export type Artwork = {
  id: string;
  title: string;
  src: string | null;
  alt: string;
  width: number;
  height: number;
  dimensions: string | null;
  year: string | null;
  notes: string[];
};

export function ArtGallery({ works }: { works: Artwork[] }) {
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const selected = works[active];

  useEffect(() => {
    if (!opened) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [opened]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const keydown = (event: KeyboardEvent) => {
      if (!element.open || !["ArrowLeft", "ArrowRight"].includes(event.key))
        return;
      event.preventDefault();
      setActive(
        (index) =>
          (index + (event.key === "ArrowRight" ? 1 : -1) + works.length) %
          works.length,
      );
    };
    element.addEventListener("keydown", keydown);
    return () => element.removeEventListener("keydown", keydown);
  }, [works.length]);

  function close() {
    dialog.current?.close();
  }

  return (
    <>
      <section className="art-grid" aria-label="Works">
        {works.map((work, index) => (
          <figure
            className={`artwork artwork-position-${(index % 7) + 1}`}
            key={work.id}
          >
            <button
              className="artwork-open"
              style={{ aspectRatio: `${work.width} / ${work.height}` }}
              aria-label={
                work.src
                  ? `View ${work.title} larger`
                  : `Preview ${work.title} placeholder`
              }
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setActive(index);
                setOpened(true);
                dialog.current?.showModal();
              }}
            >
              <VisualMedia
                src={work.src}
                alt={work.src ? work.alt : `${work.title} — artwork to come`}
                label="artwork to come"
                sizes="(max-width: 640px) 90vw, (max-width: 1023px) 50vw, 60vw"
              />
            </button>
            <figcaption>
              <span>{work.title}</span>
              <span>
                {[work.dimensions, work.year].filter(Boolean).join(" · ") ||
                  "coming soon"}
              </span>
            </figcaption>
          </figure>
        ))}
      </section>
      {selected && (
        <dialog
          ref={dialog}
          className="art-lightbox"
          aria-label={selected.title}
          onClose={() => {
            setOpened(false);
            trigger.current?.focus({ preventScroll: true });
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button
            className="lightbox-close"
            aria-label="Close artwork"
            onClick={close}
          >
            ×
          </button>
          <div className="lightbox-content">
            <div
              className="lightbox-image"
              style={{
                aspectRatio: `${selected.width} / ${selected.height}`,
                width: `min(88vw, ${(68 * selected.width) / selected.height}svh)`,
              }}
            >
              <VisualMedia
                src={selected.src}
                alt={
                  selected.src
                    ? selected.alt
                    : `${selected.title} — artwork to come`
                }
                label="artwork to come"
                sizes="90vw"
              />
            </div>
            <div className="lightbox-caption">
              <div>
                <h2>{selected.title}</h2>
                <p>
                  {[selected.dimensions, selected.year]
                    .filter(Boolean)
                    .join(" · ") || "coming soon"}
                </p>
                {selected.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>
            <div className="lightbox-controls">
              <button
                aria-label="Previous work"
                onClick={() =>
                  setActive(
                    (index) => (index - 1 + works.length) % works.length,
                  )
                }
              >
                ←
              </button>
              <span aria-live="polite">
                {active + 1} / {works.length}
              </span>
              <button
                aria-label="Next work"
                onClick={() => setActive((index) => (index + 1) % works.length)}
              >
                →
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
