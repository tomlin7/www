import data from "@/content/projects.json";
import media from "@/content/project-media.json";
import current from "@/content/current-projects.json";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  github: string | null;
  package: string | null;
  problem: string | null;
  impact: string | null;
  notes: string[];
  image: { src: string | null; alt: string; period: string | null };
};

const images: Record<string, Project["image"]> = media;
type ProjectSource = Pick<
  Project,
  "title" | "subtitle" | "technologies" | "notes"
> &
  Partial<
    Pick<Project, "description" | "github" | "package" | "problem" | "impact">
  >;
// Current entries override archive records by title, preserving existing URLs.
const updatedTitles = new Set(
  current.map((project) => project.title.toLowerCase()),
);
const source: ProjectSource[] = [
  ...current,
  ...[...data.projects, ...data.additionalProjects].filter(
    (project) => !updatedTitles.has(project.title.toLowerCase()),
  ),
];
export const projects: Project[] = source.map((project) => {
  const slug = project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return {
    slug,
    title: project.title,
    subtitle: project.subtitle,
    description: project.description ?? project.notes[0] ?? project.subtitle,
    technologies: project.technologies,
    github: project.github ?? null,
    package: project.package ?? null,
    problem: project.problem ?? null,
    impact: project.impact ?? null,
    notes: project.notes,
    image: images[slug] ?? {
      src: null,
      alt: `${project.title} project preview`,
      period: null,
    },
  };
});
