import { PageHeading } from "@/components/page-heading";
import { PageFooter } from "@/components/page-footer";
import { ProjectList } from "@/components/project-list";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Projects",
  "Code editors, programming languages, graphics experiments, AI agents, and a few things built out of curiosity.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <main id="main-content" className="reading-page wide-page">
      <PageHeading
        index="01"
        title="Projects"
        description="Things I've built to understand how they work. Some became tools I keep coming back to."
      />
      <ProjectList />
      <PageFooter />
    </main>
  );
}
