import { getSortedPostsData } from "@/lib/posts";

export async function GET(request: Request) {
  const posts = getSortedPostsData();
  const { origin } = new URL(request.url);

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Portfolio @tomlin7 Blog</title>
  <link>${origin}/blog</link>
  <description>Writing about things I build, learn, and find worth sharing.</description>
  <language>en-us</language>
  <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml" />
  ${posts
    .map((post) => {
      const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
      return `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${origin}/blog/${post.slug}</link>
    <guid>${origin}/blog/${post.slug}</guid>
    <pubDate>${pubDate}</pubDate>
    <description><![CDATA[${post.description}]]></description>
  </item>`;
    })
    .join("")}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
