import { getSortedPostsData, getPostRaw } from "@/lib/posts";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tomlin7.com";
  const posts = getSortedPostsData();

  const postsFullText = posts
    .map((post) => {
      const raw = getPostRaw(post.slug) || post.content || post.description;
      return `---
# Article: ${post.title}
# URL: ${baseUrl}/blog/${post.slug}
# Published: ${post.date}
# Category: ${post.category}
---

${raw}
`;
    })
    .join("\n\n==================================================\n\n");

  const fullBundle = `# Complete Site & Blog Ingestion Document: tomlin7 (Dheeraj)

> Full text bundle of all published articles and engineering documentation by Dheeraj (@tomlin7).
> Website: ${baseUrl}
> GitHub: https://github.com/tomlin7

==================================================

${postsFullText}
`;

  return new Response(fullBundle, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
