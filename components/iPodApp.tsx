"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
} from "@tabler/icons-react";

/* ─────────────────────────────── Data ─────────────────────────────── */

const TRACKS = [
  { id: 1, title: "One More Time",           artist: "Daft Punk",                  album: "Discovery",              duration: 320, h: 220, s: 80 },
  { id: 2, title: "Around the World",         artist: "Daft Punk",                  album: "Homework",               duration: 429, h: 10,  s: 90 },
  { id: 3, title: "Get Lucky",               artist: "Daft Punk ft. Pharrell",      album: "Random Access Memories", duration: 368, h: 45,  s: 85 },
  { id: 4, title: "Harder Better Faster",    artist: "Daft Punk",                  album: "Discovery",              duration: 225, h: 160, s: 70 },
  { id: 5, title: "Digital Love",            artist: "Daft Punk",                  album: "Discovery",              duration: 298, h: 270, s: 75 },
  { id: 6, title: "Instant Crush",           artist: "Daft Punk ft. Julian C.",    album: "Random Access Memories", duration: 337, h: 25,  s: 80 },
  { id: 7, title: "Lose Yourself to Dance",  artist: "Daft Punk ft. Pharrell",     album: "Random Access Memories", duration: 353, h: 185, s: 70 },
  { id: 8, title: "Something About Us",      artist: "Daft Punk",                  album: "Discovery",              duration: 233, h: 310, s: 65 },
];

const MAIN_MENU  = ["Music", "Videos", "Photos", "Podcasts", "Extras", "Settings", "Shuffle Songs", "Now Playing"];
const MUSIC_MENU = ["All Songs", "Artists", "Albums", "Genres", "Composers", "Compilations"];

/* ─────────────────────────────── Helpers ─────────────────────────── */

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

/* Generative album art – concentric circle pattern */
const AlbumArt = ({ h, s, size }: { h: number; s: number; size: number }) => (
  <div style={{ width: size, height: size, flexShrink: 0, position: "relative", overflow: "hidden" }}>
    {/* Base gradient */}
    <div style={{
      position: "absolute", inset: 0,
      background: `radial-gradient(ellipse at 35% 30%, hsl(${h},${s}%,60%) 0%, hsl(${(h+30)%360},${s}%,25%) 65%, hsl(${(h+60)%360},${s-10}%,15%) 100%)`,
    }} />
    {/* Ring 1 */}
    <div style={{
      position: "absolute",
      width: size * 1.1, height: size * 1.1,
      borderRadius: "50%",
      border: `${Math.round(size * 0.09)}px solid rgba(255,255,255,0.13)`,
      top: "50%", left: "50%", transform: "translate(-50%,-50%)",
    }} />
    {/* Ring 2 */}
    <div style={{
      position: "absolute",
      width: size * 0.65, height: size * 0.65,
      borderRadius: "50%",
      border: `${Math.round(size * 0.07)}px solid rgba(255,255,255,0.2)`,
      top: "50%", left: "50%", transform: "translate(-50%,-50%)",
    }} />
    {/* Center glow */}
    <div style={{
      position: "absolute",
      width: size * 0.3, height: size * 0.3,
      borderRadius: "50%",
      background: `hsl(${(h+180)%360}, 55%, 72%)`,
      opacity: 0.35,
      top: "50%", left: "50%", transform: "translate(-50%,-50%)",
    }} />
    {/* Sheen */}
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)",
    }} />
  </div>
);

/* Blue gradient title bar — exactly like real iPod Classic */
const TitleBar = ({ label }: { label: string }) => (
  <div style={{
    background: "linear-gradient(180deg, #72b4f8 0%, #3c80d8 45%, #2968bf 100%)",
    padding: "3px 7px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
    height: 22,
  }}>
    <span style={{ color: "#fff", fontSize: 11.5, fontWeight: 700, fontFamily: "-apple-system,sans-serif", letterSpacing: 0.2 }}>
      {label}
    </span>
    {/* Battery indicator */}
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {/* Battery shell */}
      <div style={{
        border: "1.5px solid rgba(255,255,255,0.85)",
        borderRadius: 2.5,
        width: 18, height: 9,
        padding: "1.5px 1.5px",
        position: "relative",
        display: "flex", alignItems: "center",
      }}>
        <div style={{ background: "#4ade80", width: "82%", height: "100%", borderRadius: 1 }} />
        {/* Nub */}
        <div style={{ position: "absolute", right: -3.5, top: "50%", transform: "translateY(-50%)", width: 2, height: 5, background: "rgba(255,255,255,0.7)", borderRadius: "0 1px 1px 0" }} />
      </div>
    </div>
  </div>
);

/* ─────────────────────────────── Main Component ─────────────────── */

type Screen = "main" | "music" | "songs" | "nowplaying";

export const IPodContent = () => {
  const [screen,   setScreen]   = useState<Screen>("main");
  const [mainSel,  setMainSel]  = useState(0);
  const [musicSel, setMusicSel] = useState(0);
  const [songSel,  setSongSel]  = useState(0);
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed,   setElapsed]   = useState(0);
  const [btnPress,  setBtnPress]  = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const track   = TRACKS[trackIdx];
  const progress = Math.min((elapsed / track.duration) * 100, 100);
  // Which track art to preview in right panel
  const previewTrack = screen === "songs" ? TRACKS[songSel] : track;

  /* Playback -------------------------------------------------------- */
  useEffect(() => {
    if (isPlaying) {
      timer.current = setInterval(() => {
        setElapsed(e => {
          if (e >= track.duration) {
            setTrackIdx(i => (i + 1) % TRACKS.length);
            return 0;
          }
          return e + 1;
        });
      }, 1000);
    } else {
      if (timer.current) clearInterval(timer.current);
    }
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [isPlaying, track.duration]);

  useEffect(() => { setElapsed(0); }, [trackIdx]);

  /* Click wheel actions -------------------------------------------- */
  const press = (zone: string, fn: () => void) => {
    setBtnPress(zone);
    fn();
    setTimeout(() => setBtnPress(null), 180);
  };

  const onMenu = () => {
    if (screen === "nowplaying") setScreen("songs");
    else if (screen === "songs")  setScreen("music");
    else if (screen === "music")  setScreen("main");
    else setScreen("main");
  };

  const onSelect = () => {
    if (screen === "main") {
      const item = MAIN_MENU[mainSel];
      if (item === "Music")         setScreen("music");
      else if (item === "Now Playing") setScreen("nowplaying");
      else if (item === "Shuffle Songs") {
        setTrackIdx(Math.floor(Math.random() * TRACKS.length));
        setIsPlaying(true);
        setScreen("nowplaying");
      }
    } else if (screen === "music") {
      if (musicSel === 0) setScreen("songs");
    } else if (screen === "songs") {
      setTrackIdx(songSel);
      setIsPlaying(true);
      setScreen("nowplaying");
    } else if (screen === "nowplaying") {
      setIsPlaying(p => !p);
    }
  };

  const onUp = () => {
    if (screen === "main")  setMainSel(i  => Math.max(0, i - 1));
    if (screen === "music") setMusicSel(i => Math.max(0, i - 1));
    if (screen === "songs") setSongSel(i  => Math.max(0, i - 1));
  };

  const onDown = () => {
    if (screen === "main")  setMainSel(i  => Math.min(MAIN_MENU.length  - 1, i + 1));
    if (screen === "music") setMusicSel(i => Math.min(MUSIC_MENU.length - 1, i + 1));
    if (screen === "songs") setSongSel(i  => Math.min(TRACKS.length     - 1, i + 1));
  };

  const onBack    = () => { setTrackIdx(i => (i - 1 + TRACKS.length) % TRACKS.length); setElapsed(0); };
  const onForward = () => { setTrackIdx(i => (i + 1) % TRACKS.length);                 setElapsed(0); };
  const onPlay    = () => { setIsPlaying(p => !p); if (screen !== "nowplaying") setScreen("nowplaying"); };

  /* Menu list renderer --------------------------------------------- */
  const MenuList = ({ items, sel, title }: { items: string[]; sel: number; title: string }) => {
    // Show a sliding window of ~6 items centred around selection
    const WINDOW = 7;
    const start  = Math.max(0, Math.min(sel - 2, items.length - WINDOW));
    const visible = items.slice(start, start + WINDOW);

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <TitleBar label={title} />
        <div style={{ flex: 1, overflow: "hidden" }}>
          {visible.map((item, vi) => {
            const actual = start + vi;
            const isSel  = actual === sel;
            return (
              <div key={item} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px 8px",
                background: isSel
                  ? "linear-gradient(90deg, #3b7ed8, #1a5ab8)"
                  : actual % 2 === 0 ? "#fff" : "#f7f7f7",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}>
                <span style={{
                  fontSize: 11.5,
                  fontFamily: "-apple-system,sans-serif",
                  color: isSel ? "#fff" : "#111",
                  fontWeight: isSel ? 600 : 400,
                }}>
                  {item}
                </span>
                <span style={{ color: isSel ? "rgba(255,255,255,0.7)" : "#bbb", fontSize: 11 }}>›</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* Wheel button opacity helper ------------------------------------ */
  const op = (zone: string) => btnPress === zone ? 0.45 : 1;

  /* ─── Render ─── */
  return (
    <div
      style={{
        /* iPod Classic silver body */
        background: "linear-gradient(160deg, #dcdcdc 0%, #c8c8c8 25%, #b8b8b8 50%, #c4c4c4 75%, #d4d4d4 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px 16px 28px",
        userSelect: "none",
        width: "100%",
      }}
    >
      {/* ── Screen bezel ── */}
      <div style={{
        width: "100%",
        background: "#1c1c1c",
        borderRadius: 10,
        padding: "5px 5px 7px",
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.85), 0 1px 0 rgba(255,255,255,0.25)",
      }}>
        {/* Screen glass */}
        <div style={{
          width: "100%",
          height: 172,
          borderRadius: 5,
          overflow: "hidden",
          display: "flex",
          background: "#fff",
          boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4)",
        }}>

          {/* ── Now Playing full view ── */}
          {screen === "nowplaying" && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f4f4f4" }}>
              <TitleBar label="Now Playing" />
              <div style={{ display: "flex", gap: 8, padding: "8px 8px 4px", flex: 1, minHeight: 0 }}>
                <AlbumArt h={track.h} s={track.s} size={82} />
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{
                    fontSize: 11.5, fontWeight: 700, color: "#111",
                    fontFamily: "-apple-system,sans-serif",
                    lineHeight: 1.35,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>
                    {track.title}
                  </div>
                  <div style={{ fontSize: 10, color: "#555", fontFamily: "-apple-system,sans-serif" }}>{track.artist}</div>
                  <div style={{ fontSize: 9.5, color: "#999", fontFamily: "-apple-system,sans-serif" }}>{track.album}</div>
                  <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 9, color: "#888" }}>{isPlaying ? "▶" : "⏸"}</span>
                    <span style={{ fontSize: 9, color: "#888" }}>{fmt(elapsed)}</span>
                  </div>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ padding: "0 8px 8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#aaa", marginBottom: 3, fontFamily: "monospace" }}>
                  <span>{fmt(elapsed)}</span>
                  <span>-{fmt(track.duration - elapsed)}</span>
                </div>
                <div style={{ background: "#ddd", borderRadius: 3, height: 4 }}>
                  <div style={{
                    height: "100%", borderRadius: 3,
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, hsl(${track.h},70%,40%), hsl(${track.h},85%,58%))`,
                    transition: "width 0.9s linear",
                  }} />
                </div>
              </div>
            </div>
          )}

          {/* ── Split view: menu left + album art right ── */}
          {screen !== "nowplaying" && (
            <>
              {/* Left panel — menu */}
              <div style={{ flex: "0 0 54%", borderRight: "1px solid #ccc", overflow: "hidden", height: "100%" }}>
                {screen === "main"  && <MenuList items={MAIN_MENU}                   sel={mainSel}  title="iPod" />}
                {screen === "music" && <MenuList items={MUSIC_MENU}                  sel={musicSel} title="Music" />}
                {screen === "songs" && <MenuList items={TRACKS.map(t => t.title)}   sel={songSel}  title="Songs" />}
              </div>
              {/* Right panel — album art */}
              <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#e8e8e8",
                overflow: "hidden",
              }}>
                <AlbumArt h={previewTrack.h} s={previewTrack.s} size={96} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Click Wheel ── */}
      <div
        style={{ marginTop: 24, position: "relative", width: 200, height: 200, flexShrink: 0 }}
        onWheel={e => e.deltaY < 0 ? onUp() : onDown()}
      >
        {/* Outer wheel ring — white with subtle silver shading */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "linear-gradient(145deg, #f8f8f8 0%, #e4e4e4 40%, #d8d8d8 65%, #eaeaea 100%)",
          boxShadow: [
            "0 4px 16px rgba(0,0,0,0.28)",
            "0 1px 4px rgba(0,0,0,0.18)",
            "inset 0 1.5px 3px rgba(255,255,255,0.95)",
            "inset 0 -1.5px 3px rgba(0,0,0,0.12)",
          ].join(", "),
        }} />

        {/* ── MENU (top) ── */}
        <button onClick={() => press("menu", onMenu)} style={{
          position: "absolute",
          top: 8, left: "50%", transform: "translateX(-50%)",
          width: 96, height: 58,
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          paddingTop: 14,
          fontSize: 10, fontWeight: 700, letterSpacing: 2,
          color: "#666", fontFamily: "-apple-system,sans-serif",
          opacity: op("menu"),
          transition: "opacity 0.1s",
        }}>
          MENU
        </button>

        {/* ── Skip Back (left) ── */}
        <button onClick={() => press("back", onBack)} style={{
          position: "absolute",
          top: "50%", left: 8, transform: "translateY(-50%)",
          width: 58, height: 96,
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "flex-start",
          paddingLeft: 12,
          opacity: op("back"), transition: "opacity 0.1s",
        }}>
          <IconPlayerSkipBack style={{ width: 17, height: 17, color: "#666" }} />
        </button>

        {/* ── Skip Forward (right) ── */}
        <button onClick={() => press("fwd", onForward)} style={{
          position: "absolute",
          top: "50%", right: 8, transform: "translateY(-50%)",
          width: 58, height: 96,
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          paddingRight: 12,
          opacity: op("fwd"), transition: "opacity 0.1s",
        }}>
          <IconPlayerSkipForward style={{ width: 17, height: 17, color: "#666" }} />
        </button>

        {/* ── Play/Pause (bottom) ── */}
        <button onClick={() => press("play", onPlay)} style={{
          position: "absolute",
          bottom: 8, left: "50%", transform: "translateX(-50%)",
          width: 96, height: 58,
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          paddingBottom: 14,
          opacity: op("play"), transition: "opacity 0.1s",
        }}>
          {isPlaying
            ? <IconPlayerPause style={{ width: 17, height: 17, color: "#666" }} />
            : <IconPlayerPlay  style={{ width: 17, height: 17, color: "#666" }} />}
        </button>

        {/* ── Center Select button ── */}
        <button onClick={() => press("sel", onSelect)} style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 78, height: 78,
          borderRadius: "50%",
          background: "linear-gradient(145deg, #eaeaea, #c8c8c8)",
          boxShadow: [
            "inset 0 1.5px 3px rgba(255,255,255,0.9)",
            "inset 0 -1px 2px rgba(0,0,0,0.18)",
            "0 1px 4px rgba(0,0,0,0.12)",
          ].join(", "),
          border: "none",
          cursor: "pointer",
          opacity: op("sel"), transition: "opacity 0.1s",
        }} />
      </div>
    </div>
  );
};
