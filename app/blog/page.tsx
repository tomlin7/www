import React from "react";
import type { Metadata } from "next";
import { getSortedPostsData } from "@/lib/posts";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical articles, system architecture deep dives, and developer reflections by Dheeraj (@tomlin7).",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "Blog | tomlin7",
    description: "Technical articles, system architecture deep dives, and developer reflections by Dheeraj (@tomlin7).",
    url: "/blog",
    siteName: "tomlin7",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | tomlin7",
    description: "Technical articles, system architecture deep dives, and developer reflections by Dheeraj (@tomlin7).",
    creator: "@tomfricks",
  },
};

export default function BlogPage() {
  const posts = getSortedPostsData();

  return <BlogListClient posts={posts} />;
}
