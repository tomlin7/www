import type { Metadata } from "next";
import {
  educationResume,
  employment,
  resumeAchievements,
  resumeProjects,
  resumeSkills,
} from "@/lib/site-copy";

export const metadata: Metadata = {
  title: "Resume — Dheeraj C.",
  description:
    "B.Tech Computer Engineering, BIT Mesra / Ranchi. AI/ML Engineer Intern, Research Intern, SDE Intern. Maintainer of Biscuit.",
};

export default function ResumePage() {
  const professional = employment.filter((e) => e.section === "professional");
  const research = employment.filter((e) => e.section === "research");

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-32 font-sans">
      <div className="bg-[#FAF6EE] text-[#111111] rounded-[32px] p-6 md:p-12 shadow-sm border border-black/5">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-black/10 pb-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Dheeraj C.
            </h1>
            <p className="text-sm text-black/60 mt-2">
              hello@tomlin7.com · Bangalore, India · tomlin7.com
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[13px]">
            <a
              href="https://github.com/tomlin7"
              className="underline underline-offset-2 hover:text-orange-700"
            >
              GitHub
            </a>
            <span className="text-black/30">·</span>
            <a
              href="https://linkedin.com/in/initdhee"
              className="underline underline-offset-2 hover:text-orange-700"
            >
              LinkedIn
            </a>
            <span className="text-black/30">·</span>
            <a
              href="/Resume.pdf"
              className="underline underline-offset-2 hover:text-orange-700"
            >
              PDF
            </a>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-black/50 mb-3">
            Education
          </h2>
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
            <p className="font-medium">
              {educationResume.school}
              <span className="text-black/60 font-normal">
                {" "}
                · {educationResume.degree}, {educationResume.major}
              </span>
            </p>
            <p className="text-sm text-black/55 shrink-0">
              {educationResume.years}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-black/50 mb-3">
            Achievements / Certifications
          </h2>
          <ul className="space-y-1.5 text-[15px] leading-relaxed">
            {resumeAchievements.map((item) => (
              <li key={item} className="pl-4 relative">
                <span className="absolute left-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-black/50 mb-4">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {professional.map((job) => (
              <article key={job.id}>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
                  <h3 className="font-semibold">
                    {job.role}
                    <span className="font-normal text-black/70">
                      {" "}
                      · {job.company}
                      {job.product ? ` | ${job.product}` : ""}
                    </span>
                  </h3>
                  <p className="text-sm text-black/55 shrink-0">{job.period}</p>
                </div>
                <p className="text-sm text-black/50 mb-2">{job.location}</p>
                <ul className="space-y-1.5 text-[15px] leading-relaxed">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="pl-4 relative">
                      <span className="absolute left-0">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-black/50 mb-4">
            Research Experience
          </h2>
          <div className="space-y-6">
            {research.map((job) => (
              <article key={job.id}>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
                  <h3 className="font-semibold">
                    {job.project ?? job.role}
                  </h3>
                  <p className="text-sm text-black/55 shrink-0">{job.period}</p>
                </div>
                <p className="text-sm text-black/60 mb-2">
                  {job.role}
                  {job.department ? ` at ${job.department}, ` : " at "}
                  {job.company} · {job.location}
                </p>
                <ul className="space-y-1.5 text-[15px] leading-relaxed">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="pl-4 relative">
                      <span className="absolute left-0">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-black/50 mb-4">
            Projects / Open Source
          </h2>
          <div className="space-y-6">
            {resumeProjects.map((project) => (
              <article key={project.name}>
                <h3 className="font-semibold">
                  {project.name}
                  <span className="font-normal text-black/60">
                    {" "}
                    | {project.stack}
                  </span>
                  {project.live && (
                    <span className="font-normal text-black/45">
                      {" "}
                      · Live Project
                    </span>
                  )}
                </h3>
                <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="pl-4 relative">
                      <span className="absolute left-0">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-black/50 mb-3">
            Technical Skills
          </h2>
          <dl className="space-y-2 text-[15px] leading-relaxed">
            <div>
              <dt className="inline font-semibold">Programming Languages: </dt>
              <dd className="inline">{resumeSkills.languages}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Libraries / Frameworks: </dt>
              <dd className="inline">{resumeSkills.libraries}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Tools / Platform: </dt>
              <dd className="inline">{resumeSkills.tools}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Databases: </dt>
              <dd className="inline">{resumeSkills.databases}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
