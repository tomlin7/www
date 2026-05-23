"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconBook, IconExternalLink } from "@tabler/icons-react";

export default function BlogPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-20 space-y-8 font-sans">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1 mb-2">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-7 h-7 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
              <IconBook className="w-4 h-4 text-white/90" />
            </div>
            <span className="text-white text-sm uppercase tracking-widest font-semibold">
              BLOG
            </span>
          </div>
          <p className="text-white/70 text-[13px] leading-snug tracking-normal max-w-xl">
            Writing about things I build, learn, and find worth sharing.
          </p>
        </div>
        <div className="bg-[#111111]/80 px-3.5 py-1.5 rounded-xl w-fit shrink-0 shadow-md">
          <span className="text-[12px] text-[#a1a1aa] uppercase tracking-normal">
            Articles:{" "}
          </span>
          <span className="text-[13px] text-white font-bold font-mono">1</span>
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="space-y-4 px-1 pt-2">
        <a
          href="https://medium.com/@tomfricks/atom-39dacfa50cc2"
          target="_blank"
          rel="noopener noreferrer"
          data-haptic="success"
          className="block relative group w-full focus:outline-none z-10 hover:z-20"
        >
          {/* Main Card Container */}
          <div className="bg-[#111111] rounded-[24px] p-5 flex flex-col md:flex-row gap-6 cursor-pointer transition-all duration-300 relative z-10 group-hover:bg-[#151515] group-hover:shadow-[0_4px_20px_rgb(0,0,0,0.1)]">
            {/* Thumbnail Image Box */}
            <div className="w-full md:w-52 h-32 rounded-xl overflow-hidden relative bg-[#181818] flex-shrink-0 flex items-center justify-center p-4">
              <img
                src="https://raw.githubusercontent.com/atom/atom/master/resources/atom.png"
                alt="Atom Logo"
                className="w-14 h-14 object-contain group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-95"
              />
              {/* Subtle overlay grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:10px_10px]" />
            </div>

            {/* Text Details */}
            <div className="flex-1 w-full min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <div className="flex items-center gap-2 mb-2 text-white/40 text-[11px] font-medium tracking-wide">
                  <span>December 16, 2025</span>
                  <span>•</span>
                  <span>Reflection</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>

                <h3 className="text-[18px] font-bold text-white tracking-tight leading-tight mb-2 group-hover:text-white transition-colors">
                  Atom
                </h3>

                <p className="text-white/60 text-[13px] leading-relaxed mb-4 max-w-3xl">
                  Three years ago today, Atom was archived. Yet its ideas still define how we write code. A deep dive into the legacy of the editor that brought web technologies (Electron), hackable packages, and modern customizability to developer tools.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-white/35 text-[11px] font-semibold tracking-wider uppercase group-hover:text-white/60 transition-colors mt-auto">
                <span>Read on Medium</span>
                <IconExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Sliding Tab for Hover State */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full group-hover:translate-y-[-2px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-0 bg-[#151515] text-[10px] tracking-wider uppercase font-semibold text-white/45 px-4 pt-2 pb-1.5 rounded-b-xl pointer-events-none whitespace-nowrap shadow-md flex items-center gap-1"
          >
            <span>Read Article</span>
            <IconExternalLink className="w-3 h-3 text-white/40" />
          </div>
        </a>
      </div>
    </div>
  );
}
