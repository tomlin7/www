"use client";

import React from "react";
import { motion } from "framer-motion";
import { BlurImage } from "@/components/BlurImage";
import {
  IconUser,
  IconBolt,
  IconComponents,
  IconExternalLink,
  IconBriefcase,
  IconCode,
  IconBrowser,
  IconGlobe,
  IconWorld,
  IconBrandVscode,
  IconCompass,
  IconCompassFilled,
} from "@tabler/icons-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-6 py-32 space-y-4 font-sans">
      {/* Main Profile Card (Top) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111111] rounded-[32px] p-6 flex flex-col justify-between relative overflow-hidden h-[350px]"
      >
        <div className="absolute -inset-1 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-[#111111]/90 via-[#111111]/50 to-transparent z-10"></div>
          <BlurImage
            src="https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/IMG_8380min_po20c6"
            alt="Profile Background"
            className="w-full h-full object-cover object-[30%_35%] opacity-100"
          />
        </div>

        <div className="z-10 max-w-lg h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-white/90 text-sm  tracking-widest mb-4">
              <IconWorld className="w-5 h-5" />
              <span>ABOUT ME</span>
            </div>
            <h1 className="text-2xl md:text-4xl text-white mb-4 tracking-tight leading-none flex items-center gap-2">
              Hey, I'm Dheeraj{" "}
              <motion.span
                animate={{
                  rotate: [0, 14, -8, 14, -4, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                style={{ display: "inline-block", transformOrigin: "70% 70%" }}
              >
                👋
              </motion.span>
            </h1>
            <p className="text-white/90 text-[18px] leading-[1.6] max-w-[800px]">
              Computer Science student at BIT Mesra building AI-native systems
              and full-stack applications.
            </p>
          </div>

          <div className="bg-white/[0.07] backdrop-blur-xl rounded-2xl p-4 flex flex-col w-fit mt-auto shadow-2xl">
            <div className="flex items-center space-x-2 mb-3">
              <IconBolt className="w-5 h-5 text-white/90" />
              <span className="text-white/90 text-sm uppercase tracking-normal">
                HIGHLIGHTS
              </span>
            </div>
            <p className="text-white text-[16px] font-medium tracking-normal">
              250+ GitHub ★ · LeetCode Knight (Top 6%) · BIT Mesra CS '27
            </p>
          </div>
        </div>
      </motion.div>

      {/* Second Row: Design & Featured Project */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
        {/* Card wrapper: p-[2px] border ring, overflow-hidden clips snake */}
        <motion.div className="relative p-[2px] rounded-[32px] h-[340px] overflow-hidden group">
          {/* Layer 1: Crisp snake border — thin, sharp */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[180%] h-[180%] origin-center bg-[conic-gradient(from_0deg,#4285f4,#9b72cb,#d96570,#f4b400,transparent_28%,transparent)] blur-[2px]"
              animate={{ rotate: [0, 360], opacity: [0, 0, 1, 1, 0, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            />
          </div>

          {/* Inner Card: dark bg, but holds the snake bloom inside */}
          <div className="w-full h-full bg-[#111111] rounded-[30px] relative z-10 overflow-hidden">
            {/* Layer 2: Snake bloom — same rotation in sync, very heavy blur, bleeds through corners */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <motion.div
                className="w-[160%] h-[160%] origin-center bg-[conic-gradient(from_0deg,#4285f4,#9b72cb,#d96570,#f4b400,transparent_28%,transparent)] blur-[50px] opacity-60"
                animate={{ rotate: [0, 360], opacity: [0, 0, 0.5, 0.5, 0, 0] }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>

            {/* Card content sits above bloom */}
            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-7 h-7 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconCompass className="w-4 h-4 text-white/90" />
                  </div>
                  <h3 className="text-white/80 text-sm uppercase tracking-normal">
                    SYSTEMS × PRODUCT × ENGINEERING
                  </h3>
                </div>
                <p className="text-white text-lg leading-relaxed mb-4">
                  Focused on AI-native architectures, scalable backends, and
                  full-stack development.
                </p>
                <p className="text-[#a1a1aa] text-lg leading-relaxed">
                  Open to Software Engineer and Full-Stack / Backend Developer
                  roles at product-driven companies.
                </p>
              </div>
              <motion.a
                href="/Resume.pdf"
                download
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                data-haptic="success"
                className="relative overflow-hidden w-fit px-6 py-2.5 rounded-full text-[13px] font-semibold text-white/90 bg-[#222222] border border-white/[0.08] hover:border-white transition-colors duration-300 shadow-md group flex items-center gap-1.5 cursor-pointer"
              >
                {/* Smooth white slide-up background fill */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ y: "100%" }}
                  variants={{
                    hover: { y: 0 },
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />

                <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 group-hover:text-orange-600">
                  Download Resume
                  <motion.span
                    className="inline-block"
                    variants={{
                      hover: { y: 2 },
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    ↓
                  </motion.span>
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.a
          href="https://github.com/tomlin7/biscuit"
          target="_blank"
          rel="noopener noreferrer"
          data-haptic="success"
          className="bg-[#111111] rounded-[32px] relative overflow-hidden h-[340px] group flex flex-col justify-end cursor-pointer block border-none focus:outline-none z-10 hover:z-20"
        >
          <div className="absolute -inset-1 bg-[#0a0a0a] group-hover:scale-102 transition-transform duration-700">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-20"></div>
            <div className="absolute -inset-1 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-t from-[#111111] via-[#111111]/85 to-transparent z-10"></div>
          <div className="relative z-20 p-8 pt-0">
            <h2 className="text-xl uppercase text-white mb-1 group-hover:text-white transition-colors">
              Biscuit
            </h2>
            <p className="text-[#a1a1aa] text-[14px] mb-5">
              AI-Native Systems Architecture
            </p>
            <div className="inline-flex items-center space-x-1.5 bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-colors px-4 py-2 rounded-full text-[12px] text-white/70 group-hover:text-white">
              <span>github.com/tomlin7/biscuit</span>
              <IconExternalLink className="w-4 h-4" />
            </div>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full group-hover:translate-y-[-2px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-0 bg-[#151515] text-[10px] tracking-wider uppercase font-semibold text-white/45 px-4 pt-2 pb-1.5 rounded-b-xl pointer-events-none whitespace-nowrap shadow-md flex items-center gap-1">
            <span>View Repository</span>
            <IconExternalLink className="w-3 h-3 text-white/40" />
          </div>
        </motion.a>
      </div>

      {/* Third Row: Large Project Showcase */}
      <motion.div className="bg-[#111111] rounded-[32px] overflow-hidden relative flex flex-col">
        <div className="pt-10 pb-6 flex flex-col items-center justify-center text-center px-6">
          <div className="bg-transparent px-3 py-0.5 rounded-full text-[11px] text-white/60 mb-4 font-medium">
            NeuroDriver
          </div>
          <h2 className="text-[28px] text-white font-bold tracking-tight">
            Resilient Autonomous Simulation & Neural Research.
          </h2>
        </div>
        <div className="flex flex-col md:flex-row p-8 pt-4 gap-8">
          <div className="md:w-1/3 flex flex-col justify-center">
            <div className="flex items-baseline space-x-2 mb-3">
              <h3 className="text-[22px] font-bold text-white">NeuroDriver</h3>
              <span className="text-white/40 text-[11px] font-medium">
                5/10
              </span>
            </div>
            <p className="text-[#a1a1aa] text-[14px] leading-relaxed mb-6">
              A high-fidelity 3D simulation engine emphasizing systematic
              resilience with custom neural engines.
            </p>
            <motion.a
              href="/projects"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
              data-haptic="success"
              className="focus:outline-none focus-visible:outline-none relative overflow-hidden px-5 py-2.5 rounded-full text-[12px] font-semibold text-white/90 bg-white/[0.05] border border-white/[0.05] hover:border-white/10 transition-colors duration-300 shadow-md group flex items-center gap-1.5 cursor-pointer w-fit mb-6"
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
              <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 group-hover:text-black">
                View Project
                <span className="relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </span>
            </motion.a>
          </div>
          <div className="md:w-2/3 bg-white rounded-xl overflow-hidden shadow-2xl">
            <BlurImage
              src="https://raw.githubusercontent.com/emilkowalski/vaul/main/public/og.png"
              alt="Svelte Drawer"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Experience & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Work Experience Card */}
        <motion.div className="bg-[#111111] rounded-[32px] p-7 flex flex-col gap-5">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
                <IconBriefcase className="w-4 h-4 text-white/90" />
              </div>
              <span className="text-white text-sm uppercase tracking-wide">
                WORK EXPERIENCE
              </span>
            </div>
            <p className="text-white/80 text-sm leading-snug tracking-normal">
              Where I've worked, contributed, and created an impact.
            </p>
          </div>

          {/* Employment section */}
          <div>
            <p className="text-xs  text-white/40 uppercase tracking-tight mb-3">
              Employment
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  company: "Morvion",
                  role: "Software Engineer Intern",
                  date: "Dec '25 – Mar '26",
                  logo: "https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304675/morvion_logo_qw4vfy.jpg",
                },
                {
                  company: "Hooman Digital",
                  role: "Full-Stack Developer Intern",
                  date: "Jul '25 – Oct '25",
                  logo: "https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304319/hooman_digital_logo_qdclr3.jpg",
                },
                {
                  company: "NIT Calicut",
                  role: "Deep Learning Research Intern",
                  date: "May '25 – Jul '25",
                  logo: "https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304559/gceknewlogos_glexcj.png",
                },
                {
                  company: "Ozi",
                  role: "Software Engineer Intern",
                  date: "Nov '24 – Feb '25",
                  logo: "https://res.cloudinary.com/dwmxbkhch/image/upload/f_auto,q_auto/v1779304733/ozi-logo_2025-10-07-072401_gxyx_fs76wl.png",
                },
              ].map((exp, i, arr) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#1a1a1a] shrink-0 border-5 border-white/6">
                        <Image
                          width={10}
                          height={10}
                          src={exp.logo}
                          alt={exp.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-white leading-none mb-0.5">
                          {exp.company}
                        </p>
                        <p className="text-[12px] text-white/90 ">{exp.role}</p>
                      </div>
                    </div>
                    <span className="text-[12px] text-white/80 whitespace-nowrap shrink-0">
                      {exp.date}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="h-px w-full bg-white/5" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Card */}
        <motion.div className="bg-[#111111] rounded-[32px] p-7 flex flex-col gap-5">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 bg-white/[0.08] rounded-lg flex items-center justify-center flex-shrink-0">
                <IconCode className="w-4 h-4 text-white/90" />
              </div>
              <span className="text-white text-sm uppercase tracking-widest">
                SKILLS
              </span>
            </div>
            <p className="text-white/80 text-sm leading-snug">
              Tools and technologies I work with, and I'm good at.
            </p>
          </div>

          {/* Skill categories */}
          <div className="flex flex-col gap-3.5">
            {[
              {
                label: "Backend",
                skills: [
                  {
                    name: "Node.js",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
                  },
                  {
                    name: "Django",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
                  },
                  {
                    name: "FastAPI",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
                  },
                  {
                    name: "Express.js",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
                    invert: true,
                  },
                  {
                    name: "PostgreSQL",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
                  },
                  {
                    name: "Supabase",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
                  },
                  {
                    name: "Redis",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
                  },
                ],
              },
              {
                label: "DevOps",
                skills: [
                  {
                    name: "Kubernetes",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
                  },
                  {
                    name: "Terraform",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
                  },
                  {
                    name: "AWS",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
                  },
                  {
                    name: "GCP",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
                  },
                  {
                    name: "Prometheus",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg",
                  },
                  {
                    name: "Kafka",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
                    invert: true,
                  },
                ],
              },
              {
                label: "Languages",
                skills: [
                  {
                    name: "Python",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
                  },
                  {
                    name: "JavaScript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
                  },
                  {
                    name: "TypeScript",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
                  },
                  {
                    name: "Golang",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
                  },
                  {
                    name: "C++",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
                  },
                  {
                    name: "Rust",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
                    invert: true,
                  },
                  {
                    name: "SQL",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
                  },
                ],
              },
              {
                label: "Core CS",
                skills: [
                  {
                    name: "Compiler Design",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/gcc/default.svg",
                  },
                  {
                    name: "Data Structures & Algorithms",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/leetcode/default.svg",
                  },
                  {
                    name: "Operating Systems",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/linux/default.svg",
                  },
                  {
                    name: "DBMS",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/azure-sql-database/default.svg",
                  },
                ],
              },
              {
                label: "Machine Learning",
                skills: [
                  {
                    name: "Pytorch",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
                  },
                  {
                    name: "scikit-learn",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
                  },
                  {
                    name: "BigQuery",
                    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
                  },
                ],
              },
              {
                label: "AI Tools",
                skills: [
                  {
                    name: "Cursor",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/cursor/default.svg",
                  },
                  {
                    name: "Claude",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/anthropic/default.svg",
                  },
                  {
                    name: "Antigravity",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-antigravity/default.svg",
                  },
                  {
                    name: "Gemini",
                    icon: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/gemini/default.svg",
                  },
                ],
              },
            ].map(({ label, skills }) => (
              <div key={label}>
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1.5">
                  {label}
                </p>
                <div className="flex flex-wrap gap-1">
                  {skills.map((s) => (
                    <span
                      key={s.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/[0.03] rounded-full text-[11.5px] text-white/80 transition-colors duration-200 hover:bg-white/[0.06] hover:border-white/[0.08]"
                    >
                      {s.icon.startsWith("http") ? (
                        <img
                          src={s.icon}
                          alt={s.name}
                          className={`w-3.5 h-3.5 object-contain flex-shrink-0 ${(s as any).invert ? "invert brightness-200" : ""}`}
                        />
                      ) : (
                        <span className="text-[12.5px] leading-none shrink-0">
                          {s.icon}
                        </span>
                      )}
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
