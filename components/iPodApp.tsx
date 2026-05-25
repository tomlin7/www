"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
} from "@tabler/icons-react";

/* ─────────────────────────────── Data ─────────────────────────────── */

const TRACKS = [
  {
    id: 1,
    title: "One More Time",
    artist: "Daft Punk",
    album: "Discovery",
    duration: 321,
    h: 220,
    s: 80,
    ytid: "FGBhQbmPwH8",
    genre: "House",
  },
  {
    id: 2,
    title: "...Baby One More Time",
    artist: "Britney Spears",
    album: "...Baby One More Time",
    duration: 211,
    h: 320,
    s: 75,
    ytid: "C-u5WLJ9Yk4",
    genre: "Pop",
  },
  {
    id: 3,
    title: "Toxic",
    artist: "Britney Spears",
    album: "In the Zone",
    duration: 201,
    h: 180,
    s: 80,
    ytid: "LOZuxwVk7TU",
    genre: "Pop",
  },
  {
    id: 4,
    title: "I Want It That Way",
    artist: "Backstreet Boys",
    album: "Millennium",
    duration: 213,
    h: 140,
    s: 65,
    ytid: "4fndeDfaWCg",
    genre: "Pop",
  },
  {
    id: 5,
    title: "Bye Bye Bye",
    artist: "*NSYNC",
    album: "No Strings Attached",
    duration: 200,
    h: 15,
    s: 85,
    ytid: "Eo-KmOd3i7s",
    genre: "Pop",
  },
  {
    id: 6,
    title: "Say My Name",
    artist: "Destiny's Child",
    album: "The Writing's on the Wall",
    duration: 271,
    h: 340,
    s: 70,
    ytid: "sQgd6MccwZc",
    genre: "R&B / Pop",
  },
  {
    id: 7,
    title: "Whenever, Wherever",
    artist: "Shakira",
    album: "Laundry Service",
    duration: 200,
    h: 80,
    s: 75,
    ytid: "weRHyjj34ZE",
    genre: "Latin Pop",
  },
  {
    id: 8,
    title: "Can't Get You Out of My Head",
    artist: "Kylie Minogue",
    album: "Fever",
    duration: 230,
    h: 30,
    s: 90,
    ytid: "c18441Eh_WE",
    genre: "Dance Pop",
  },
  {
    id: 9,
    title: "Genie in a Bottle",
    artist: "Christina Aguilera",
    album: "Christina Aguilera",
    duration: 218,
    h: 290,
    s: 60,
    ytid: "kIDWgqDBNXA",
    genre: "Pop",
  },
  {
    id: 10,
    title: "Wannabe",
    artist: "Spice Girls",
    album: "Spice",
    duration: 173,
    h: 310,
    s: 85,
    ytid: "gJLIiF15wjQ",
    genre: "Pop",
  },
  {
    id: 11,
    title: "No Scrubs",
    artist: "TLC",
    album: "FanMail",
    duration: 214,
    h: 200,
    s: 50,
    ytid: "FrLequ6dUdM",
    genre: "R&B",
  },
  {
    id: 12,
    title: "Livin' la Vida Loca",
    artist: "Ricky Martin",
    album: "Ricky Martin",
    duration: 243,
    h: 45,
    s: 90,
    ytid: "p47fEXGabaY",
    genre: "Latin Pop",
  },
  {
    id: 13,
    title: "Crazy In Love",
    artist: "Beyoncé",
    album: "Dangerously In Love",
    duration: 236,
    h: 25,
    s: 80,
    ytid: "ViwtNLUqkMY",
    genre: "R&B / Pop",
  },
  {
    id: 14,
    title: "Hey Ya!",
    artist: "OutKast",
    album: "Speakerboxxx/The Love Below",
    duration: 235,
    h: 120,
    s: 70,
    ytid: "PWgvGjAhvIw",
    genre: "Hip Hop/Pop",
  },
  {
    id: 15,
    title: "Waiting for Tonight",
    artist: "Jennifer Lopez",
    album: "On the 6",
    duration: 246,
    h: 160,
    s: 65,
    ytid: "_66jPJVS4JE",
    genre: "Dance Pop",
  },
  {
    id: 16,
    title: "Hips Don't Lie",
    artist: "Shakira ft. Wyclef Jean",
    album: "Oral Fixation, Vol. 2",
    duration: 218,
    h: 350,
    s: 85,
    ytid: "DUT5rEU6pqM",
    genre: "Latin Pop",
  },
  {
    id: 17,
    title: "Believe",
    artist: "Cher",
    album: "Believe",
    duration: 239,
    h: 260,
    s: 75,
    ytid: "ny7Yor6A8TI",
    genre: "Dance Pop",
  },
  {
    id: 18,
    title: "Blue (Da Ba Dee)",
    artist: "Eiffel 65",
    album: "Europop",
    duration: 280,
    h: 210,
    s: 85,
    ytid: "BinWA0EenDY",
    genre: "Eurodance",
  },
  {
    id: 19,
    title: "Barbie Girl",
    artist: "Aqua",
    album: "Aquarium",
    duration: 197,
    h: 330,
    s: 90,
    ytid: "ZyhrYis509A",
    genre: "Bubblegum Pop",
  },
  {
    id: 20,
    title: "U Can't Touch This",
    artist: "MC Hammer",
    album: "Please Hammer, Don't Hurt 'Em",
    duration: 257,
    h: 55,
    s: 70,
    ytid: "q4E1jEpXsAg",
    genre: "Hip Hop / Pop",
  },
  // The Ultimate New Additions
  {
    id: 21,
    title: "Hollaback Girl",
    artist: "Gwen Stefani",
    album: "Love. Angel. Music. Baby.",
    duration: 200,
    h: 325,
    s: 85,
    ytid: "Kgjkth6BRRY",
    genre: "Pop",
  },
  {
    id: 22,
    title: "Promiscuous",
    artist: "Nelly Furtado ft. Timbaland",
    album: "Loose",
    duration: 243,
    h: 190,
    s: 75,
    ytid: "weGr6_0EaVo",
    genre: "R&B / Pop",
  },
  {
    id: 23,
    title: "Pon de Replay",
    artist: "Rihanna",
    album: "Music of the Sun",
    duration: 214,
    h: 10,
    s: 80,
    ytid: "oEauWw9ZGrA",
    genre: "Dance Pop",
  },
  {
    id: 24,
    title: "SexyBack",
    artist: "Justin Timberlake",
    album: "FutureSex/LoveSounds",
    duration: 243,
    h: 215,
    s: 60,
    ytid: "3gOHvDP_vCs",
    genre: "Dance Pop",
  },
  {
    id: 25,
    title: "Yeah!",
    artist: "Usher ft. Lil Jon, Ludacris",
    album: "Confessions",
    duration: 250,
    h: 135,
    s: 90,
    ytid: "GxBSyx85Kp8",
    genre: "R&B / Pop",
  },
  {
    id: 26,
    title: "Bad Romance",
    artist: "Lady Gaga",
    album: "The Fame Monster",
    duration: 309,
    h: 295,
    s: 95,
    ytid: "qrO4YZeyl0I",
    genre: "Dance Pop",
  },
  {
    id: 27,
    title: "Hot N Cold",
    artist: "Katy Perry",
    album: "One of the Boys",
    duration: 220,
    h: 345,
    s: 80,
    ytid: "kTHNpusq654",
    genre: "Pop",
  },
  {
    id: 28,
    title: "Since U Been Gone",
    artist: "Kelly Clarkson",
    album: "Breakaway",
    duration: 191,
    h: 170,
    s: 70,
    ytid: "R7UrFYvl5TE",
    genre: "Pop Rock",
  },
  {
    id: 29,
    title: "Complicated",
    artist: "Avril Lavigne",
    album: "Let Go",
    duration: 245,
    h: 205,
    s: 65,
    ytid: "5NPBIwQffSE",
    genre: "Pop Rock",
  },
  {
    id: 30,
    title: "Unwritten",
    artist: "Natasha Bedingfield",
    album: "Unwritten",
    duration: 259,
    h: 75,
    s: 70,
    ytid: "b7k0a5hYnSI",
    genre: "Pop",
  },
];

const MAIN_MENU = [
  "Music",
  "Videos",
  "Photos",
  "Podcasts",
  "Extras",
  "Settings",
  "Shuffle Songs",
  "Now Playing",
];
const MUSIC_MENU = ["All Songs", "Artists", "Albums", "Genres"];
const VIDEOS_MENU = ["Visualizer 3D", "Matrix Rain", "Synthwave Ride"];
const EXTRAS_MENU = ["Games", "Clock", "Stopwatch"];
const GAMES_MENU = ["Brick Breakout"];
const SETTINGS_MENU = ["Theme", "Clicker"];
const THEMES = ["Silver", "Carbon Black", "U2 Special Edition"];

const PHOTOS = [
  {
    id: 1,
    title: "Vibrant Gradient",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Cyberpunk City",
    url: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Retro Synthwave",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Aesthetic Landscape",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop&q=80",
  },
];

/* ─────────────────────────────── Themes Styling ──────────────────── */

const THEME_STYLES = {
  Silver: {
    body: "linear-gradient(160deg, #dcdcdc 0%, #c8c8c8 25%, #b8b8b8 50%, #c4c4c4 75%, #d4d4d4 100%)",
    wheel:
      "linear-gradient(145deg, #f8f8f8 0%, #e4e4e4 40%, #d8d8d8 65%, #eaeaea 100%)",
    center: "linear-gradient(145deg, #eaeaea, #c8c8c8)",
    text: "#666",
    shadow:
      "0 4px 16px rgba(0,0,0,0.25), inset 0 1.5px 3px rgba(255,255,255,0.95), inset 0 -1.5px 3px rgba(0,0,0,0.12)",
  },
  "Carbon Black": {
    body: "linear-gradient(160deg, #2c2c2c 0%, #1c1c1c 25%, #121212 50%, #1c1c1c 75%, #2c2c2c 100%)",
    wheel:
      "linear-gradient(145deg, #252525 0%, #1e1e1e 40%, #141414 65%, #202020 100%)",
    center: "linear-gradient(145deg, #333333, #1e1e1e)",
    text: "#888",
    shadow:
      "0 4px 16px rgba(0,0,0,0.45), inset 0 1.5px 3px rgba(255,255,255,0.15), inset 0 -1.5px 3px rgba(0,0,0,0.3)",
  },
  "U2 Special Edition": {
    body: "linear-gradient(160deg, #1c1c1c 0%, #0d0d0d 25%, #050505 50%, #0d0d0d 75%, #1c1c1c 100%)",
    wheel:
      "linear-gradient(145deg, #ff1e27 0%, #e00b12 40%, #b50005 65%, #e00b12 100%)",
    center: "linear-gradient(145deg, #242424, #121212)",
    text: "#fff",
    shadow:
      "0 4px 16px rgba(0,0,0,0.55), inset 0 1.5px 3px rgba(255,255,255,0.2), inset 0 -1.5px 3px rgba(0,0,0,0.4)",
  },
};

/* ─────────────────────────────── Helpers ─────────────────────────── */

const fmt = (s: number) => {
  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const AlbumArt = ({ h, s, size }: { h: number; s: number; size: number }) => (
  <div
    style={{
      width: size,
      height: size,
      flexShrink: 0,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at 35% 30%, hsl(${h},${s}%,60%) 0%, hsl(${(h + 30) % 360},${s}%,25%) 65%, hsl(${(h + 60) % 360},${s - 10}%,15%) 100%)`,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: size * 1.1,
        height: size * 1.1,
        borderRadius: "50%",
        border: `${Math.round(size * 0.09)}px solid rgba(255,255,255,0.13)`,
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: size * 0.65,
        height: size * 0.65,
        borderRadius: "50%",
        border: `${Math.round(size * 0.07)}px solid rgba(255,255,255,0.2)`,
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: size * 0.3,
        height: size * 0.3,
        borderRadius: "50%",
        background: `hsl(${(h + 180) % 360}, 55%, 72%)`,
        opacity: 0.35,
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)",
      }}
    />
  </div>
);

const TitleBar = ({ label }: { label: string }) => (
  <div
    style={{
      background:
        "linear-gradient(180deg, #72b4f8 0%, #3c80d8 45%, #2968bf 100%)",
      padding: "3px 7px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexShrink: 0,
      height: 22,
    }}
  >
    <span
      style={{
        color: "#fff",
        fontSize: 11.5,
        fontWeight: 700,
        fontFamily: "-apple-system,sans-serif",
        letterSpacing: 0.2,
      }}
    >
      {label}
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <div
        style={{
          border: "1.5px solid rgba(255,255,255,0.85)",
          borderRadius: 2.5,
          width: 18,
          height: 9,
          padding: "1.5px 1.5px",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#4ade80",
            width: "82%",
            height: "100%",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -3.5,
            top: "50%",
            transform: "translateY(-50%)",
            width: 2,
            height: 5,
            background: "rgba(255,255,255,0.7)",
            borderRadius: "0 1px 1px 0",
          }}
        />
      </div>
    </div>
  </div>
);

/* ─────────────────────────────── Main Component ─────────────────── */

type Screen =
  | "main"
  | "music"
  | "songs"
  | "artists"
  | "artist-songs"
  | "albums"
  | "album-songs"
  | "genres"
  | "genre-songs"
  | "nowplaying"
  | "videos"
  | "video-player"
  | "photos"
  | "photo-detail"
  | "extras"
  | "games"
  | "game-brick"
  | "clock"
  | "stopwatch"
  | "settings"
  | "settings-theme";

export const IPodContent = () => {
  const [screen, setScreen] = useState<Screen>("main");

  // Selection Indices
  const [mainSel, setMainSel] = useState(0);
  const [musicSel, setMusicSel] = useState(0);
  const [songSel, setSongSel] = useState(0);
  const [artistSel, setArtistSel] = useState(0);
  const [artistSongSel, setArtistSongSel] = useState(0);
  const [albumSel, setAlbumSel] = useState(0);
  const [albumSongSel, setAlbumSongSel] = useState(0);
  const [genreSel, setGenreSel] = useState(0);
  const [genreSongSel, setGenreSongSel] = useState(0);
  const [videoSel, setVideoSel] = useState(0);
  const [photoSel, setPhotoSel] = useState(0);
  const [extraSel, setExtraSel] = useState(0);
  const [gameSel, setGameSel] = useState(0);
  const [settingSel, setSettingSel] = useState(0);
  const [themeSel, setThemeSel] = useState(0);

  // Dynamic values
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  // Audio playback state
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(0.5);

  // Settings
  const [theme, setTheme] = useState<
    "Silver" | "Carbon Black" | "U2 Special Edition"
  >("Silver");
  const [clicker, setClicker] = useState(true);

  // UI styling feedback
  const [btnPress, setBtnPress] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Track computed properties
  const track = TRACKS[trackIdx];
  const [duration, setDuration] = useState(track.duration);

  // Grouped lists
  const uniqueArtists = Array.from(new Set(TRACKS.map((t) => t.artist))).sort();
  const uniqueAlbums = Array.from(new Set(TRACKS.map((t) => t.album))).sort();
  const uniqueGenres = Array.from(new Set(TRACKS.map((t) => t.genre))).sort();

  const artistTracks = TRACKS.filter((t) => t.artist === selectedArtist);
  const albumTracks = TRACKS.filter((t) => t.album === selectedAlbum);
  const genreTracks = TRACKS.filter((t) => t.genre === selectedGenre);

  // Dynamic preview art
  let previewTrack = track;
  if (screen === "songs") previewTrack = TRACKS[songSel];
  else if (screen === "artist-songs" && artistTracks[artistSongSel])
    previewTrack = artistTracks[artistSongSel];
  else if (screen === "album-songs" && albumTracks[albumSongSel])
    previewTrack = albumTracks[albumSongSel];
  else if (screen === "genre-songs" && genreTracks[genreSongSel])
    previewTrack = genreTracks[genreSongSel];

  // Brick game state
  const [paddleX, setPaddleX] = useState(37.5);
  const [ball, setBall] = useState({ x: 50, y: 75, vx: 0.8, vy: -1.2 });
  const [bricks, setBricks] = useState<
    Array<{ x: number; y: number; w: number; h: number; active: boolean }>
  >([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Stopwatch state
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const stopwatchIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  // Digital Clock live updates
  const [timeStr, setTimeStr] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Brick Game Initializer
  const initBrickGame = useCallback(() => {
    const grid: typeof bricks = [];
    const cols = 5;
    const rows = 4;
    const w = 16;
    const h = 7;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        grid.push({
          x: c * 18 + 7,
          y: r * 9 + 12,
          w,
          h,
          active: true,
        });
      }
    }
    setBricks(grid);
    setBall({ x: 50, y: 75, vx: 0.9, vy: -1.3 });
    setPaddleX(37.5);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  }, [bricks]);

  // Synthesis of physical click wheel sound
  const playClickSound = useCallback(() => {
    if (!clicker || typeof window === "undefined") return;
    try {
      const ctx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.02);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch (e) {}
  }, [clicker]);

  const progress = Math.min((elapsed / duration) * 100, 100);

  // 1. Play/Pause state Sync via postMessage
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    const command = isPlaying ? "playVideo" : "pauseVideo";
    try {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: command }),
        "*",
      );
    } catch (e) {}
  }, [isPlaying]);

  // 2. Volume state Sync via postMessage
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    try {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "setVolume",
          args: [Math.round(volume * 100)],
        }),
        "*",
      );
    } catch (e) {}
  }, [volume]);

  // 3. Simulated elapsed playback timer
  useEffect(() => {
    setElapsed(0);
  }, [trackIdx]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsed((e) => {
        if (e >= duration) {
          setTrackIdx((i) => (i + 1) % TRACKS.length);
          return 0;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Brick Game Frame Loop
  useEffect(() => {
    if (screen !== "game-brick" || !gameStarted || gameOver) return;
    const interval = setInterval(() => {
      setBall((b) => {
        let { x, y, vx, vy } = b;
        x += vx;
        y += vy;

        // Wall collisions
        if (x <= 2 || x >= 98) {
          vx = -vx;
          x = x <= 2 ? 2 : 98;
          playClickSound();
        }
        if (y <= 2) {
          vy = -vy;
          y = 2;
          playClickSound();
        }

        // Paddle collision
        if (y >= 88 && y <= 91 && x >= paddleX && x <= paddleX + 25) {
          vy = -Math.abs(vy);
          const hitPos = (x - (paddleX + 12.5)) / 12.5; // -1 to 1
          vx += hitPos * 0.3;
          y = 88;
          playClickSound();
        }

        // Death / Out of bounds
        if (y >= 98) {
          setGameOver(true);
          return b;
        }

        // Brick collision
        let hit = false;
        const nextBricks = bricks.map((brk) => {
          if (!brk.active || hit) return brk;
          if (
            x >= brk.x &&
            x <= brk.x + brk.w &&
            y >= brk.y &&
            y <= brk.y + brk.h
          ) {
            hit = true;
            vy = -vy;
            setScore((s) => s + 10);
            playClickSound();
            return { ...brk, active: false };
          }
          return brk;
        });

        if (hit) {
          setBricks(nextBricks);
          if (nextBricks.every((bk) => !bk.active)) {
            // cleared all - reset with faster speed
            setTimeout(() => {
              initBrickGame();
              setBall({ x: 50, y: 75, vx: vx * 1.1, vy: -Math.abs(vy) * 1.1 });
              setGameStarted(true);
            }, 600);
          }
        }

        return { x, y, vx, vy };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [
    screen,
    gameStarted,
    gameOver,
    paddleX,
    bricks,
    initBrickGame,
    playClickSound,
  ]);

  // Stopwatch Interval
  useEffect(() => {
    if (stopwatchRunning) {
      stopwatchIntervalRef.current = setInterval(() => {
        setStopwatchTime((t) => t + 10);
      }, 10);
    } else {
      if (stopwatchIntervalRef.current)
        clearInterval(stopwatchIntervalRef.current);
    }
    return () => {
      if (stopwatchIntervalRef.current)
        clearInterval(stopwatchIntervalRef.current);
    };
  }, [stopwatchRunning]);

  // Canvas visualizer animation
  useEffect(() => {
    if (screen !== "video-player") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const barsCount = 20;
    const barWidths = canvas.width / barsCount;
    let frame = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (videoSel === 0) {
        // Visualizer 3D spectrum
        ctx.fillStyle = "#ff007f";
        for (let i = 0; i < barsCount; i++) {
          const h =
            (Math.sin(frame * 0.08 + i * 0.4) + 1) * 30 + Math.random() * 15;
          const bounceHeight = isPlaying ? h : 5;
          // Gradient fill
          const grad = ctx.createLinearGradient(
            0,
            canvas.height,
            0,
            canvas.height - bounceHeight,
          );
          grad.addColorStop(0, "#ff007f");
          grad.addColorStop(1, "#7f00ff");
          ctx.fillStyle = grad;
          ctx.fillRect(
            i * (barWidths + 1),
            canvas.height - bounceHeight,
            barWidths - 1,
            bounceHeight,
          );
        }
      } else if (videoSel === 1) {
        // Matrix digital rain
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff00";
        ctx.font = "8px monospace";
        for (let i = 0; i < canvas.width; i += 10) {
          const y =
            (Math.sin(frame * 0.02 + i) + 1) * (canvas.height / 2) +
            (frame % 30);
          ctx.fillText(
            String.fromCharCode(33 + Math.floor(Math.random() * 90)),
            i,
            y % canvas.height,
          );
        }
      } else {
        // Synthwave Ride grid
        ctx.fillStyle = "#0a001a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Sun
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 45, 25, 0, Math.PI * 2);
        const sunGrad = ctx.createLinearGradient(0, 20, 0, 70);
        sunGrad.addColorStop(0, "#ff007f");
        sunGrad.addColorStop(1, "#ffcc00");
        ctx.fillStyle = sunGrad;
        ctx.fill();

        // Horizontal scan lines on Sun
        ctx.fillStyle = "#0a001a";
        for (let y = 35; y < 70; y += 4) {
          ctx.fillRect(canvas.width / 2 - 25, y, 50, 1.5);
        }

        // Draw moving grid perspective lines
        ctx.strokeStyle = "#7f00ff";
        ctx.lineWidth = 1;
        const horizon = 60;
        const speed = (frame * 1.5) % 15;

        // Perspective vertical lines
        for (let i = -100; i <= canvas.width + 100; i += 25) {
          ctx.beginPath();
          ctx.moveTo(canvas.width / 2, horizon);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }

        // Horizontal grid lines
        for (let y = horizon; y < canvas.height; y += 8) {
          const dy = y + (speed * (y - horizon)) / (canvas.height - horizon);
          ctx.beginPath();
          ctx.moveTo(0, dy);
          ctx.lineTo(canvas.width, dy);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [screen, videoSel, isPlaying]);

  // Click wheel input handling
  const press = (zone: string, fn: () => void) => {
    setBtnPress(zone);
    playClickSound();
    fn();
    setTimeout(() => setBtnPress(null), 180);
  };

  const onMenu = () => {
    // Hierarchical back navigation
    if (screen === "nowplaying") setScreen("songs");
    else if (
      screen === "songs" ||
      screen === "artists" ||
      screen === "albums" ||
      screen === "genres"
    )
      setScreen("music");
    else if (screen === "artist-songs") setScreen("artists");
    else if (screen === "album-songs") setScreen("albums");
    else if (screen === "genre-songs") setScreen("genres");
    else if (
      screen === "music" ||
      screen === "videos" ||
      screen === "photos" ||
      screen === "extras" ||
      screen === "settings"
    )
      setScreen("main");
    else if (screen === "video-player") setScreen("videos");
    else if (screen === "photo-detail") setScreen("photos");
    else if (screen === "games") setScreen("extras");
    else if (screen === "game-brick") setScreen("games");
    else if (screen === "clock" || screen === "stopwatch") setScreen("extras");
    else if (screen === "settings-theme") setScreen("settings");
    else setScreen("main");
  };

  const onSelect = () => {
    if (screen === "main") {
      const item = MAIN_MENU[mainSel];
      if (item === "Music") setScreen("music");
      else if (item === "Videos") setScreen("videos");
      else if (item === "Photos") setScreen("photos");
      else if (item === "Extras") setScreen("extras");
      else if (item === "Settings") setScreen("settings");
      else if (item === "Now Playing") setScreen("nowplaying");
      else if (item === "Shuffle Songs") {
        setTrackIdx(Math.floor(Math.random() * TRACKS.length));
        setIsPlaying(true);
        setScreen("nowplaying");
      }
    } else if (screen === "music") {
      const item = MUSIC_MENU[musicSel];
      if (item === "All Songs") setScreen("songs");
      else if (item === "Artists") setScreen("artists");
      else if (item === "Albums") setScreen("albums");
      else if (item === "Genres") setScreen("genres");
    } else if (screen === "songs") {
      setTrackIdx(songSel);
      setIsPlaying(true);
      setScreen("nowplaying");
    } else if (screen === "artists") {
      setSelectedArtist(uniqueArtists[artistSel]);
      setScreen("artist-songs");
      setArtistSongSel(0);
    } else if (screen === "artist-songs") {
      const matching = artistTracks[artistSongSel];
      const idx = TRACKS.findIndex((t) => t.id === matching.id);
      if (idx !== -1) {
        setTrackIdx(idx);
        setIsPlaying(true);
        setScreen("nowplaying");
      }
    } else if (screen === "albums") {
      setSelectedAlbum(uniqueAlbums[albumSel]);
      setScreen("album-songs");
      setAlbumSongSel(0);
    } else if (screen === "album-songs") {
      const matching = albumTracks[albumSongSel];
      const idx = TRACKS.findIndex((t) => t.id === matching.id);
      if (idx !== -1) {
        setTrackIdx(idx);
        setIsPlaying(true);
        setScreen("nowplaying");
      }
    } else if (screen === "genres") {
      setSelectedGenre(uniqueGenres[genreSel]);
      setScreen("genre-songs");
      setGenreSongSel(0);
    } else if (screen === "genre-songs") {
      const matching = genreTracks[genreSongSel];
      const idx = TRACKS.findIndex((t) => t.id === matching.id);
      if (idx !== -1) {
        setTrackIdx(idx);
        setIsPlaying(true);
        setScreen("nowplaying");
      }
    } else if (screen === "videos") {
      setScreen("video-player");
    } else if (screen === "photos") {
      setScreen("photo-detail");
    } else if (screen === "extras") {
      const item = EXTRAS_MENU[extraSel];
      if (item === "Games") setScreen("games");
      else if (item === "Clock") setScreen("clock");
      else if (item === "Stopwatch") {
        setScreen("stopwatch");
        setStopwatchTime(0);
        setLaps([]);
        setStopwatchRunning(false);
      }
    } else if (screen === "games") {
      setScreen("game-brick");
      initBrickGame();
    } else if (screen === "game-brick") {
      if (gameOver) {
        initBrickGame();
      } else {
        setGameStarted((p) => !p);
      }
    } else if (screen === "stopwatch") {
      // Toggle stopwatch
      setStopwatchRunning((r) => !r);
    } else if (screen === "settings") {
      const item = SETTINGS_MENU[settingSel];
      if (item === "Theme") setScreen("settings-theme");
      else if (item === "Clicker") setClicker((c) => !c);
    } else if (screen === "settings-theme") {
      setTheme(THEMES[themeSel] as any);
      setScreen("settings");
    } else if (screen === "nowplaying") {
      setIsPlaying((p) => !p);
    }
  };

  const onUp = () => {
    playClickSound();
    if (screen === "main") setMainSel((i) => Math.max(0, i - 1));
    else if (screen === "music") setMusicSel((i) => Math.max(0, i - 1));
    else if (screen === "songs") setSongSel((i) => Math.max(0, i - 1));
    else if (screen === "artists") setArtistSel((i) => Math.max(0, i - 1));
    else if (screen === "artist-songs")
      setArtistSongSel((i) => Math.max(0, i - 1));
    else if (screen === "albums") setAlbumSel((i) => Math.max(0, i - 1));
    else if (screen === "album-songs")
      setAlbumSongSel((i) => Math.max(0, i - 1));
    else if (screen === "genres") setGenreSel((i) => Math.max(0, i - 1));
    else if (screen === "genre-songs")
      setGenreSongSel((i) => Math.max(0, i - 1));
    else if (screen === "videos") setVideoSel((i) => Math.max(0, i - 1));
    else if (screen === "photos") setPhotoSel((i) => Math.max(0, i - 1));
    else if (screen === "extras") setExtraSel((i) => Math.max(0, i - 1));
    else if (screen === "games") setGameSel((i) => Math.max(0, i - 1));
    else if (screen === "settings") setSettingSel((i) => Math.max(0, i - 1));
    else if (screen === "settings-theme")
      setThemeSel((i) => Math.max(0, i - 1));
    else if (screen === "nowplaying") setVolume((v) => Math.min(1, v + 0.06));
    else if (screen === "game-brick") setPaddleX((x) => Math.max(0, x - 5.5));
    else if (screen === "stopwatch") {
      // Record Lap
      if (stopwatchRunning) {
        setLaps((l) => [stopwatchTime, ...l.slice(0, 4)]);
      }
    }
  };

  const onDown = () => {
    playClickSound();
    if (screen === "main")
      setMainSel((i) => Math.min(MAIN_MENU.length - 1, i + 1));
    else if (screen === "music")
      setMusicSel((i) => Math.min(MUSIC_MENU.length - 1, i + 1));
    else if (screen === "songs")
      setSongSel((i) => Math.min(TRACKS.length - 1, i + 1));
    else if (screen === "artists")
      setArtistSel((i) => Math.min(uniqueArtists.length - 1, i + 1));
    else if (screen === "artist-songs")
      setArtistSongSel((i) => Math.min(artistTracks.length - 1, i + 1));
    else if (screen === "albums")
      setAlbumSel((i) => Math.min(uniqueAlbums.length - 1, i + 1));
    else if (screen === "album-songs")
      setAlbumSongSel((i) => Math.min(albumTracks.length - 1, i + 1));
    else if (screen === "genres")
      setGenreSel((i) => Math.min(uniqueGenres.length - 1, i + 1));
    else if (screen === "genre-songs")
      setGenreSongSel((i) => Math.min(genreTracks.length - 1, i + 1));
    else if (screen === "videos")
      setVideoSel((i) => Math.min(VIDEOS_MENU.length - 1, i + 1));
    else if (screen === "photos")
      setPhotoSel((i) => Math.min(PHOTOS.length - 1, i + 1));
    else if (screen === "extras")
      setExtraSel((i) => Math.min(EXTRAS_MENU.length - 1, i + 1));
    else if (screen === "games")
      setGameSel((i) => Math.min(GAMES_MENU.length - 1, i + 1));
    else if (screen === "settings")
      setSettingSel((i) => Math.min(SETTINGS_MENU.length - 1, i + 1));
    else if (screen === "settings-theme")
      setThemeSel((i) => Math.min(THEMES.length - 1, i + 1));
    else if (screen === "nowplaying") setVolume((v) => Math.max(0, v - 0.06));
    else if (screen === "game-brick") setPaddleX((x) => Math.min(75, x + 5.5));
    else if (screen === "stopwatch") {
      // Reset stopwatch
      setStopwatchRunning(false);
      setStopwatchTime(0);
      setLaps([]);
    }
  };

  const onBack = () => {
    const iframe = iframeRef.current;
    if (elapsed > 3) {
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: "seekTo",
              args: [0, true],
            }),
            "*",
          );
        } catch (e) {}
      }
      setElapsed(0);
    } else {
      setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
      setElapsed(0);
    }
  };

  const onForward = () => {
    setTrackIdx((i) => (i + 1) % TRACKS.length);
    setElapsed(0);
  };

  const onPlay = () => {
    setIsPlaying((p) => !p);
    if (
      screen !== "nowplaying" &&
      screen !== "video-player" &&
      screen !== "game-brick"
    ) {
      setScreen("nowplaying");
    }
  };

  // Rendering Helper: Menu lists
  const MenuList = ({
    items,
    sel,
    title,
  }: {
    items: string[];
    sel: number;
    title: string;
  }) => {
    const WINDOW = 7;
    const start = Math.max(0, Math.min(sel - 2, items.length - WINDOW));
    const visible = items.slice(start, start + WINDOW);

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <TitleBar label={title} />
        <div style={{ flex: 1, overflow: "hidden" }}>
          {visible.map((item, vi) => {
            const actual = start + vi;
            const isSel = actual === sel;
            return (
              <div
                key={item}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4.5px 8px",
                  background: isSel
                    ? "linear-gradient(90deg, #3b7ed8, #1a5ab8)"
                    : actual % 2 === 0
                      ? "#fff"
                      : "#f7f7f7",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span
                  style={{
                    fontSize: 11.5,
                    fontFamily: "-apple-system,sans-serif",
                    color: isSel ? "#fff" : "#111",
                    fontWeight: isSel ? 600 : 400,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: "90%",
                  }}
                >
                  {item}
                </span>
                <span
                  style={{
                    color: isSel ? "rgba(255,255,255,0.7)" : "#bbb",
                    fontSize: 11,
                  }}
                >
                  ›
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Style properties matching active theme state
  const curTheme = THEME_STYLES[theme];
  const op = (zone: string) => (btnPress === zone ? 0.45 : 1);

  return (
    <div
      style={{
        background: curTheme.body,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px 16px 28px",
        userSelect: "none",
        width: "100%",
        borderRadius: "inherit",
      }}
    >
      {/* bezel display boundary */}
      <div
        style={{
          width: "100%",
          background: "#1c1c1c",
          borderRadius: 10,
          padding: "5px 5px 7px",
          boxShadow:
            "inset 0 2px 8px rgba(0,0,0,0.85), 0 1px 0 rgba(255,255,255,0.25)",
        }}
      >
        {/* LCD Glass Screen */}
        <div
          style={{
            width: "100%",
            height: 182,
            borderRadius: 5,
            overflow: "hidden",
            display: "flex",
            background: "#fff",
            boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4)",
            position: "relative",
          }}
        >
          {/* 1. Main Now Playing display */}
          {screen === "nowplaying" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                background: "#000",
              }}
            >
              <TitleBar label="Now Playing" />
            </div>
          )}

          {/* 2. Visualizers viewport */}
          {screen === "video-player" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                background: "#000",
              }}
            >
              <TitleBar label={VIDEOS_MENU[videoSel]} />
              <canvas
                ref={canvasRef}
                width={238}
                height={150}
                style={{ width: "100%", height: "100%", display: "block" }}
              />
            </div>
          )}

          {/* 3. Photo viewer */}
          {screen === "photo-detail" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                background: "#000",
              }}
            >
              <TitleBar label={PHOTOS[photoSel].title} />
              <div
                style={{
                  flex: 1,
                  backgroundImage: `url(${PHOTOS[photoSel].url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          )}

          {/* 4. Brick Breakout Game */}
          {screen === "game-brick" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                background: "#c4cfa1",
                fontFamily: "monospace",
                color: "#1f2f0f",
                padding: 4,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  borderBottom: "1.5px solid #1f2f0f",
                  paddingBottom: 2,
                  marginBottom: 4,
                }}
              >
                <span>BRICK</span>
                <span>PTS: {score}</span>
              </div>
              <div
                style={{
                  flex: 1,
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid rgba(31,47,15,0.2)",
                }}
              >
                {/* Bricks rendering */}
                {bricks.map(
                  (bk, i) =>
                    bk.active && (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          left: `${bk.x}%`,
                          top: `${bk.y}%`,
                          width: `${bk.w}%`,
                          height: `${bk.h}%`,
                          background: "#1f2f0f",
                          borderRadius: 1,
                        }}
                      />
                    ),
                )}

                {/* Ball */}
                <div
                  style={{
                    position: "absolute",
                    left: `${ball.x}%`,
                    top: `${ball.y}%`,
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#1f2f0f",
                    transform: "translate(-50%, -50%)",
                  }}
                />

                {/* Paddle */}
                <div
                  style={{
                    position: "absolute",
                    left: `${paddleX}%`,
                    bottom: "8%",
                    width: "25%",
                    height: "5%",
                    background: "#1f2f0f",
                    borderRadius: 1,
                  }}
                />

                {/* Status Messages */}
                {!gameStarted && !gameOver && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(196,207,161,0.9)",
                      textAlign: "center",
                      fontSize: 10,
                    }}
                  >
                    <div>SCROLL WHEEL:</div>
                    <div style={{ fontWeight: "bold" }}>MOVE PADDLE</div>
                    <div
                      style={{
                        marginTop: 6,
                        animation: "pulse 1s infinite",
                        border: "1px solid #1f2f0f",
                        padding: "1px 4px",
                      }}
                    >
                      PRESS SELECT
                    </div>
                  </div>
                )}

                {gameOver && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(196,207,161,0.9)",
                      textAlign: "center",
                      fontSize: 11,
                      fontWeight: "bold",
                    }}
                  >
                    <div style={{ fontSize: 13 }}>GAME OVER</div>
                    <div style={{ marginTop: 4 }}>FINAL: {score}</div>
                    <div
                      style={{
                        marginTop: 8,
                        border: "1px solid #1f2f0f",
                        padding: "1px 6px",
                      }}
                    >
                      SELECT TO RESET
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. Analog / Digital Clock */}
          {screen === "clock" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                background: "#f0f0f0",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TitleBar label="Clock" />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                {/* Clock graphic */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    border: "2px solid #555",
                    position: "relative",
                    background: "#fff",
                  }}
                >
                  {/* hands */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 2,
                      height: 16,
                      background: "#111",
                      transformOrigin: "bottom center",
                      transform: `translate(-50%, -100%) rotate(${new Date().getHours() * 30}deg)`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 1.5,
                      height: 22,
                      background: "#3c80d8",
                      transformOrigin: "bottom center",
                      transform: `translate(-50%, -100%) rotate(${new Date().getMinutes() * 6}deg)`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 8,
                      height: 8,
                      background: "#555",
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "monospace",
                    color: "#222",
                  }}
                >
                  {timeStr}
                </div>
                <div style={{ fontSize: 9, color: "#888" }}>
                  {new Date().toLocaleDateString([], {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 6. Stopwatch */}
          {screen === "stopwatch" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                background: "#f0f0f0",
              }}
            >
              <TitleBar label="Stopwatch" />
              <div
                style={{
                  flex: 1,
                  padding: 8,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    textAlign: "center",
                    margin: "4px 0",
                    color: "#333",
                  }}
                >
                  {Math.floor(stopwatchTime / 60000)}:
                  {Math.floor((stopwatchTime % 60000) / 1000)
                    .toString()
                    .padStart(2, "0")}
                  .
                  <span style={{ fontSize: 14 }}>
                    {Math.floor((stopwatchTime % 1000) / 10)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 8,
                    color: "#666",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: 2,
                    marginBottom: 4,
                  }}
                >
                  <span>SCROLL UP: LAP</span>
                  <span>SCROLL DOWN: RESET</span>
                </div>
                {/* Laps list */}
                <div style={{ flex: 1, overflow: "hidden", fontSize: 10 }}>
                  {laps.map((lp, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px dashed #ddd",
                        padding: "2px 0",
                        color: "#444",
                      }}
                    >
                      <span>Lap {laps.length - idx}</span>
                      <span style={{ fontFamily: "monospace" }}>
                        {Math.floor(lp / 60000)}:
                        {Math.floor((lp % 60000) / 1000)
                          .toString()
                          .padStart(2, "0")}
                        .
                        {Math.floor((lp % 1000) / 10)
                          .toString()
                          .padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. Classic iPod split menus */}
          {screen !== "nowplaying" &&
            screen !== "video-player" &&
            screen !== "photo-detail" &&
            screen !== "game-brick" &&
            screen !== "clock" &&
            screen !== "stopwatch" && (
              <>
                <div
                  style={{
                    flex: "0 0 54%",
                    borderRight: "1px solid #ccc",
                    overflow: "hidden",
                    height: "100%",
                  }}
                >
                  {screen === "main" && (
                    <MenuList items={MAIN_MENU} sel={mainSel} title="iPod" />
                  )}
                  {screen === "music" && (
                    <MenuList items={MUSIC_MENU} sel={musicSel} title="Music" />
                  )}
                  {screen === "songs" && (
                    <MenuList
                      items={TRACKS.map((t) => t.title)}
                      sel={songSel}
                      title="Songs"
                    />
                  )}
                  {screen === "artists" && (
                    <MenuList
                      items={uniqueArtists}
                      sel={artistSel}
                      title="Artists"
                    />
                  )}
                  {screen === "artist-songs" && (
                    <MenuList
                      items={artistTracks.map((t) => t.title)}
                      sel={artistSongSel}
                      title={selectedArtist}
                    />
                  )}
                  {screen === "albums" && (
                    <MenuList
                      items={uniqueAlbums}
                      sel={albumSel}
                      title="Albums"
                    />
                  )}
                  {screen === "album-songs" && (
                    <MenuList
                      items={albumTracks.map((t) => t.title)}
                      sel={albumSongSel}
                      title={selectedAlbum}
                    />
                  )}
                  {screen === "genres" && (
                    <MenuList
                      items={uniqueGenres}
                      sel={genreSel}
                      title="Genres"
                    />
                  )}
                  {screen === "genre-songs" && (
                    <MenuList
                      items={genreTracks.map((t) => t.title)}
                      sel={genreSongSel}
                      title={selectedGenre}
                    />
                  )}
                  {screen === "videos" && (
                    <MenuList
                      items={VIDEOS_MENU}
                      sel={videoSel}
                      title="Videos"
                    />
                  )}
                  {screen === "photos" && (
                    <MenuList
                      items={PHOTOS.map((p) => p.title)}
                      sel={photoSel}
                      title="Photos"
                    />
                  )}
                  {screen === "extras" && (
                    <MenuList
                      items={EXTRAS_MENU}
                      sel={extraSel}
                      title="Extras"
                    />
                  )}
                  {screen === "games" && (
                    <MenuList items={GAMES_MENU} sel={gameSel} title="Games" />
                  )}
                  {screen === "settings" && (
                    <MenuList
                      items={SETTINGS_MENU}
                      sel={settingSel}
                      title="Settings"
                    />
                  )}
                  {screen === "settings-theme" && (
                    <MenuList items={THEMES} sel={themeSel} title="Themes" />
                  )}
                </div>

                {/* Split screen right graphic */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#e8e8e8",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {screen === "photos" ? (
                    <div
                      style={{
                        width: 96,
                        height: 96,
                        backgroundImage: `url(${PHOTOS[photoSel].url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    <AlbumArt h={previewTrack.h} s={previewTrack.s} size={96} />
                  )}
                </div>
              </>
            )}
          {/* Dynamic YouTube Player Frame */}
          <div
            style={
              screen === "nowplaying"
                ? {
                    position: "absolute",
                    top: 22,
                    left: 0,
                    width: "100%",
                    height: 180,
                    zIndex: 10,
                  }
                : {
                    position: "absolute",
                    bottom: -999,
                    left: -999,
                    width: 1,
                    height: 1,
                    opacity: 0.01,
                    pointerEvents: "none",
                  }
            }
          >
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${track.ytid}?enablejsapi=1&controls=0&rel=0&autoplay=${isPlaying ? 1 : 0}`}
              style={{ width: "100%", height: "100%", border: "none" }}
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      </div>

      {/* ── iPod Classic tactile Click Wheel ── */}
      <div
        style={{
          marginTop: 24,
          position: "relative",
          width: 200,
          height: 200,
          flexShrink: 0,
        }}
        onWheel={(e) => (e.deltaY < 0 ? onUp() : onDown())}
      >
        {/* Outer scroll ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: curTheme.wheel,
            boxShadow: curTheme.shadow,
          }}
        />

        {/* ── MENU Button (Top) ── */}
        <button
          onClick={() => press("menu", onMenu)}
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 96,
            height: 58,
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 14,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            color: curTheme.text,
            fontFamily: "-apple-system,sans-serif",
            opacity: op("menu"),
            transition: "opacity 0.1s",
          }}
        >
          MENU
        </button>

        {/* ── Skip Back (Left) ── */}
        <button
          onClick={() => press("back", onBack)}
          style={{
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%)",
            width: 58,
            height: 96,
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 12,
            opacity: op("back"),
            transition: "opacity 0.1s",
          }}
        >
          <IconPlayerSkipBack
            style={{ width: 17, height: 17, color: curTheme.text }}
          />
        </button>

        {/* ── Skip Forward (Right) ── */}
        <button
          onClick={() => press("fwd", onForward)}
          style={{
            position: "absolute",
            top: "50%",
            right: 8,
            transform: "translateY(-50%)",
            width: 58,
            height: 96,
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 12,
            opacity: op("fwd"),
            transition: "opacity 0.1s",
          }}
        >
          <IconPlayerSkipForward
            style={{ width: 17, height: 17, color: curTheme.text }}
          />
        </button>

        {/* ── Play/Pause (Bottom) ── */}
        <button
          onClick={() => press("play", onPlay)}
          style={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 96,
            height: 58,
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 14,
            opacity: op("play"),
            transition: "opacity 0.1s",
          }}
        >
          {isPlaying ? (
            <IconPlayerPause
              style={{ width: 17, height: 17, color: curTheme.text }}
            />
          ) : (
            <IconPlayerPlay
              style={{ width: 17, height: 17, color: curTheme.text }}
            />
          )}
        </button>

        {/* ── Center Select Circle ── */}
        <button
          onClick={() => press("sel", onSelect)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 78,
            height: 78,
            borderRadius: "50%",
            background: curTheme.center,
            boxShadow:
              "inset 0 1.5px 3px rgba(255,255,255,0.7), inset 0 -1px 2px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.12)",
            border: "none",
            cursor: "pointer",
            opacity: op("sel"),
            transition: "opacity 0.1s",
          }}
        />
      </div>
    </div>
  );
};
