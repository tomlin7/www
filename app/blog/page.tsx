import React from "react";
import { getSortedPostsData } from "@/lib/posts";
import BlogListClient from "./BlogListClient";

// Force dynamic or let Next.js handle statically (it reads local markdown files at build time)
export const dynamic = "force-static";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return <BlogListClient posts={posts} />;
}
