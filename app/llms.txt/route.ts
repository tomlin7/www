import data from "@/content/portfolio.json";
import { navigation, siteUrl } from "@/lib/site";

export function GET() {
  return new Response(
    `# Dheeraj C. (@tomlin7)\n\nSystems & Software Engineer. Projects, open source, and engineering notes.\n\n## Pages\n${navigation.map(({ label, href }) => `- [${label}](${siteUrl}${href})`).join("\n")}\n\n## Articles (Markdown)\n${data.posts.map((post) => `- [${post.title}](${siteUrl}/blog/${post.slug}.md): ${post.description}`).join("\n")}\n\n## Full content\n- [Full text](${siteUrl}/llms-full.txt)\n- [Resume](${siteUrl}/resume.txt)\n\nContact: hello@tomlin7.com\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
