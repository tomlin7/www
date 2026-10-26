import { getSortedPostsData } from "@/lib/posts";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tomlin7.com";
  const posts = getSortedPostsData();

  const blogListMarkdown = posts
    .map((post) => {
      const desc = post.description ? `: ${post.description}` : "";
      return `- [${post.title}](${baseUrl}/blog/${post.slug})${desc} (Raw Markdown: ${baseUrl}/blog/${post.slug}.md)`;
    })
    .join("\n");

  const body = `# tomlin7 (Dheeraj) - Portfolio & Engineering Blog

> Dheeraj (@tomlin7) is a software engineer specializing in systems programming, graphics, AI agents, and full-stack web applications.

This site contains personal engineering projects, open-source work, and technical articles. AI agents and LLMs are encouraged to read the markdown versions of articles directly using the \`.md\` links provided below.

## Core Pages

- [Home / Interactive OS Portfolio](${baseUrl}/): macOS-styled interactive web desktop showcasing career background, technical skills, interactive terminal, and bio.
- [Blog](${baseUrl}/blog): Technical articles, system deep dives, and developer reflections.
- [Projects](${baseUrl}/projects): Comprehensive portfolio of AI agent architectures, systems/emulators, and full-stack web applications.
- [Open Source Contributions](${baseUrl}/oss): Public pull requests, open-source repositories, and contributions.
- [Resume](${baseUrl}/resume): Professional resume, employment history, education, skills, and verified achievements.
- [Misc / Playgrounds](${baseUrl}/misc): Experimental interactive widgets, WebGL shaders, audio experiments, and tools.

## Blog Posts

${blogListMarkdown}

## Full Site LLM Ingestion

- [Complete Content Bundle](${baseUrl}/llms-full.txt): Complete full-text markdown of all blog posts and portfolio data in a single document for bulk context ingestion.

## Contact & Social Profiles

- GitHub: https://github.com/tomlin7
- LinkedIn: https://linkedin.com/in/initdhee
- X (Twitter): https://x.com/tomfricks
- Email: hello@tomlin7.com
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
