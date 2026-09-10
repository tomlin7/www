"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  IconGitPullRequest,
  IconGitBranch,
  IconExternalLink,
  IconBrandGithub,
} from "@tabler/icons-react";
import { ossLinks } from "@/lib/site-copy";

interface PRItem {
  html_url: string;
  title: string;
  repository_url: string;
  state: "open" | "closed";
  pull_request?: {
    merged_at?: string;
  };
}

export default function OssPage() {
  const [prs, setPrs] = useState<PRItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    fetch(
      "https://api.github.com/search/issues?q=author:tomlin7+type:pr+is:public&sort=created&order=desc&per_page=10",
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setPrs(data.items);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        clearTimeout(timer);
        setLoading(false);
      });

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-20 space-y-8 font-sans">
      <div className="flex flex-col gap-2 px-1 mb-2">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-7 h-7 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
            <IconGitPullRequest className="w-4 h-4 text-white/90" />
          </div>
          <span className="text-white text-sm uppercase tracking-widest font-semibold">
            OPEN SOURCE
          </span>
        </div>
        <p className="text-white/70 text-[13px] leading-snug tracking-normal max-w-xl">
          Dheeraj — Biscuit maintainer · hello@tomlin7.com. Featured projects
          and GitHub searches for authored pull requests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-1">
        {ossLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            data-haptic="success"
            className="bg-[#111111] rounded-[20px] p-4 flex items-start justify-between gap-3 hover:bg-[#151515] transition-colors group"
          >
            <div>
              <h3 className="text-[14px] font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-white/50 text-[12px] leading-snug">
                {item.subtitle}
              </p>
            </div>
            <IconExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/70 shrink-0 mt-0.5" />
          </a>
        ))}
      </div>

      <div className="px-1 pt-4">
        <p className="text-white/40 text-[11px] uppercase tracking-wider font-semibold mb-3">
          Recent public pull requests
        </p>
        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col gap-3.5">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className="bg-[#111111] animate-pulse rounded-[20px] h-[72px] w-full"
                />
              ))}
            </div>
          ) : prs.length === 0 ? (
            <p className="text-white/40 text-sm">
              Live PR feed is unavailable right now. Use the search links above.
            </p>
          ) : (
            prs.map((item, i) => {
              const repo = item.repository_url.split("/").slice(-2).join("/");
              const status =
                item.state === "open"
                  ? "Open"
                  : item.pull_request?.merged_at
                    ? "Merged"
                    : "Closed";

              const badgeClass =
                status === "Open"
                  ? "text-[#10b981] bg-[#162a1f]"
                  : status === "Merged"
                    ? "text-[#a855f7] bg-[#25183a]"
                    : "text-[#8e8e93] bg-[#222225]";

              const iconClass = badgeClass;

              return (
                <a
                  key={i}
                  href={item.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-haptic="success"
                  className="block relative group w-full focus:outline-none z-10 hover:z-20"
                >
                  <div className="bg-[#111111] rounded-[20px] p-3 md:py-2.5 md:px-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer transition-all duration-300 relative z-10 group-hover:bg-[#151515] group-hover:shadow-[0_4px_20px_rgb(0,0,0,0.1)]">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg flex items-center justify-center ${iconClass} flex-shrink-0`}
                      >
                        <IconGitBranch className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-[13.5px] font-semibold text-white tracking-tight leading-snug mb-0.5 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-white/40 text-[11px] font-medium tracking-wide">
                          {repo}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${badgeClass} self-start md:self-auto`}
                    >
                      <span className="capitalize">{status}</span>
                    </div>
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>

      <div className="pt-8 flex justify-center">
        <motion.a
          href="https://github.com/tomlin7"
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
          data-haptic="success"
          className="focus:outline-none focus-visible:outline-none relative overflow-hidden px-6 py-3 rounded-full text-[13px] font-semibold text-white/90 bg-[#222222] border border-white/[0.08] hover:border-white transition-colors duration-300 shadow-md group flex items-center gap-2 cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ y: "100%" }}
            variants={{
              hover: { y: 0 },
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          />
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
            GitHub profile
            <IconBrandGithub className="w-4 h-4" />
          </span>
        </motion.a>
      </div>
    </div>
  );
}
