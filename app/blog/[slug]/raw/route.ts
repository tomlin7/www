import data from "@/content/portfolio.json";

export function generateStaticParams() {
  return data.posts.map(({ slug }) => ({ slug }));
}
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = data.posts.find((entry) => entry.slug === slug);
  if (!post) return new Response("Post not found", { status: 404 });
  return new Response(`# ${post.title}\n\n${post.content}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
