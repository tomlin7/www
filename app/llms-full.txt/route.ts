import data from "@/lib/portfolio";
import { projects as collection } from "@/lib/projects";

export function GET() {
  const projects = collection
    .map(
      (project) =>
        `## ${project.title}\n${project.subtitle}\n${"description" in project ? project.description : ""}\n${project.technologies.join(", ")}\n${project.notes.join("\n")}`,
    )
    .join("\n\n");
  const posts = data.posts
    .map((post) => `# ${post.title}\n\n${post.content}`)
    .join("\n\n---\n\n");
  const resume = data.resume
    .map((section) => `## ${section.heading}\n${section.content}`)
    .join("\n\n");
  return new Response(
    `# Dheeraj C. (@tomlin7)\n\nSystems & Software Engineer\nhello@tomlin7.com\n\n# Projects\n\n${projects}\n\n# Resume\n\n${resume}\n\n# Writing\n\n${posts}\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
