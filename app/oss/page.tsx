'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconGitPullRequest, IconGitBranch, IconExternalLink, IconBrandGithub } from '@tabler/icons-react';

interface PRItem {
  html_url: string;
  title: string;
  repository_url: string;
  state: 'open' | 'closed';
  pull_request?: {
    merged_at?: string;
  };
}

export default function OssPage() {
  const [prs, setPrs] = useState<PRItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/search/issues?q=author:tomlin7+is:public&sort=created&order=desc&per_page=20')
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setPrs(data.items);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-20 space-y-8 font-sans">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1 mb-2">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-7 h-7 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
              <IconGitPullRequest className="w-4 h-4 text-white/90" />
            </div>
            <span className="text-white text-sm uppercase tracking-widest font-semibold">
              OPEN SOURCE
            </span>
          </div>
          <p className="text-white/70 text-[13px] leading-snug tracking-normal max-w-xl">
            Recent contributions and pull requests across public open-source projects.
          </p>
        </div>
        {!loading && (
          <div className="bg-[#111111]/80 px-3.5 py-1.5 rounded-xl w-fit shrink-0 shadow-md">
            <span className="text-[12px] text-[#a1a1aa] uppercase tracking-normal">
              PRs:{" "}
            </span>
            <span className="text-[13px] text-white font-bold font-mono">{prs.length}</span>
          </div>
        )}
      </div>

      {/* Pull Requests List */}
      <div className="space-y-4 px-1 pt-2">
        {loading ? (
          <div className="flex flex-col gap-3.5">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="bg-[#111111] animate-pulse rounded-[20px] h-[72px] w-full" />
            ))}
          </div>
        ) : (
          prs.map((item, i) => {
            const repo = item.repository_url.split('/').slice(-2).join('/');
            const status = item.state === 'open' ? 'Open' : (item.pull_request?.merged_at ? 'Merged' : 'Closed');
            
            // Solid, opaque background and text colors
            const badgeClass = status === 'Open'
              ? 'text-[#10b981] bg-[#162a1f]'
              : (status === 'Merged'
                ? 'text-[#a855f7] bg-[#25183a]'
                : 'text-[#8e8e93] bg-[#222225]');
                
            const iconClass = status === 'Open'
              ? 'text-[#10b981] bg-[#162a1f]'
              : (status === 'Merged'
                ? 'text-[#a855f7] bg-[#25183a]'
                : 'text-[#8e8e93] bg-[#222225]');

            return (
              <a 
                key={i} 
                href={item.html_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                data-haptic="success"
                className="block relative group w-full focus:outline-none z-10 hover:z-20"
              >
                {/* Main Card Container */}
                <div className="bg-[#111111] rounded-[20px] p-3 md:py-2.5 md:px-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer transition-all duration-300 relative z-10 group-hover:bg-[#151515] group-hover:shadow-[0_4px_20px_rgb(0,0,0,0.1)]">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg flex items-center justify-center ${iconClass} flex-shrink-0`}>
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

                  <div className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${badgeClass} self-start md:self-auto`}>
                    <span className="capitalize">{status}</span>
                  </div>
                </div>

                {/* Sliding Tab for Hover State */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full group-hover:translate-y-[-2px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-0 bg-[#151515] text-[10px] tracking-wider uppercase font-semibold text-white/45 px-4 pt-2 pb-1.5 rounded-b-xl pointer-events-none whitespace-nowrap shadow-md flex items-center gap-1">
                  <span>View Pull Request</span>
                  <IconExternalLink className="w-3 h-3 text-white/40" />
                </div>
              </a>
            );
          })
        )}
      </div>

      {/* GitHub CTA Button */}
      <div className="pt-8 flex justify-center">
        <motion.a
          href="https://github.com/pulls?q=is%3Apr+author%3Atomlin7"
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
            View all on GitHub
            <IconBrandGithub className="w-4 h-4" />
          </span>
        </motion.a>
      </div>
    </div>
  );
}
