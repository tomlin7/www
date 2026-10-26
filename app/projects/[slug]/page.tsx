import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";
import { VisualMedia } from "@/components/visual-media";
import { PageFooter } from "@/components/page-footer";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return pageMetadata(project.title, project.description, `/projects/${slug}`);
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return (
    <main id="main-content" className="reading-page project-study">
      <header className="project-study-heading">
        <Link href={`/projects#${slug}`} className="small-link">
          ← all projects
        </Link>
        <h1>{project.title}</h1>
        <p>{project.subtitle}</p>
        <div className="heading-links">
          {project.github && (
            <a
              className="text-link"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              source code ↗
            </a>
          )}
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
      </header>
      <div className="project-study-image">
        <VisualMedia
          src={project.image.src}
          alt={project.image.alt}
          label="project image to come"
          sizes="(max-width: 767px) 92vw, 85vw"
        />
      </div>
      <div className="project-study-prose">
        <p className="project-study-intro">{project.description}</p>
        <p className="tech-stack">{project.technologies.join(" · ")}</p>
        {project.problem && (
          <section>
            <h2>the problem</h2>
            <p>{project.problem}</p>
          </section>
        )}
        {project.impact && (
          <section>
            <h2>what came out of it</h2>
            <p>{project.impact}</p>
          </section>
        )}
        <section>
          <h2>notes from the build</h2>
          <ul>
            {project.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
        <PageFooter />
      </div>
    </main>
  );
}
