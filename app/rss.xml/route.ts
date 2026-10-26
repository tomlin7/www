import data from "@/content/portfolio.json";
import { siteUrl } from "@/lib/site";

const xml = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
export function GET() {
  const items = data.posts
    .map(
      (post) =>
        `<item><title>${xml(post.title)}</title><link>${siteUrl}/blog/${post.slug}</link><guid>${siteUrl}/blog/${post.slug}</guid><description>${xml(post.description)}</description><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate></item>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Dheeraj / notes</title><link>${siteUrl}</link><description>Things I build, break, and learn along the way.</description><language>en</language>${items}</channel></rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
