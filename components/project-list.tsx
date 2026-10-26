"use client";

import { useState } from "react";
import data from "@/content/projects.json";

const groups = [
  { key: "all", label: "all" },
  { key: "systems", label: "systems & languages" },
  { key: "ai", label: "ai & agents" },
  { key: "apps", label: "apps & frameworks" },
];

export function ProjectList() {
  const [group, setGroup] = useState("all");
  const [query, setQuery] = useState("");
  const projects = data.projects.filter(
    (project) =>
      (group === "all" || project.group === group) &&
      `${project.title} ${project.description} ${project.technologies.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="project-controls" data-koi-avoid>
        <div className="project-filters" aria-label="Filter projects">
          {groups.map(({ key, label }) => (
            <button
              key={key}
              aria-pressed={group === key}
              onClick={() => setGroup(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="project-search">
          <span className="sr-only">Search projects</span>
          <span aria-hidden="true">/</span>
          <input
            type="search"
            placeholder="find something…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <p className="result-count" role="status">
        {String(projects.length).padStart(2, "0")} projects
      </p>
      <div className="project-list">
        {projects.map((project) => (
          <article
            id={project.title.toLowerCase()}
            className="project-row"
            key={project.title}
            data-koi-avoid
          >
            <span className="row-index" aria-hidden="true">
              {String(data.projects.indexOf(project) + 1).padStart(2, "0")}
            </span>
            <div className="project-body">
              <div className="row-heading">
                <h2>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}{" "}
                    <span className="external-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </h2>
                <span className="row-category">{project.category}</span>
              </div>
              <p className="row-subtitle">{project.subtitle}</p>
              <p className="row-description">{project.description}</p>
              <p className="tech-stack">{project.technologies.join(" · ")}</p>
              <details className="project-details">
                <summary>under the hood</summary>
                <div className="detail-content">
                  <h3>the problem</h3>
                  <p>{project.problem}</p>
                  <h3>what came out of it</h3>
                  <p>{project.impact}</p>
                  <ul>
                    {project.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                  {project.package && (
                    <a
                      className="text-link"
                      href={project.package}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      package ↗
                    </a>
                  )}
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>
      {projects.length === 0 && (
        <p className="empty-state">
          No projects match that. Try another language or name.
        </p>
      )}
      <section className="additional-projects" data-koi-avoid>
        <h2 className="section-label">also on the workbench</h2>
        {data.additionalProjects.map((project) => (
          <article className="compact-project" key={project.title}>
            <h3>
              {project.title}{" "}
              <span className="muted">/ {project.subtitle}</span>
            </h3>
            <p className="tech-stack">{project.technologies.join(" · ")}</p>
            <ul className="plain-list">
              {project.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
