import data from "@/content/portfolio.json";
import { socialImage } from "@/lib/social-image";

export const runtime = "edge";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = data.posts.find((entry) => entry.slug === slug);
  if (!post) return new Response("Post not found", { status: 404 });
  return socialImage(post.title, post.description);
}
