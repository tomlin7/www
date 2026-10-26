import { ProjectReel } from "@/components/project-reel";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Projects",
  "Code editors, programming languages, graphics experiments, AI agents, and a few things built out of curiosity.",
  "/projects",
);

export default function ProjectsPage() {
  return <ProjectReel projects={projects} />;
}
