import React from "react";
import type { Metadata } from "next";
import { getSortedPostsData } from "@/lib/posts";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tomlin7.com";
const ogImage = `${baseUrl}/api/og?title=Engineering%20Blog&desc=${encodeURIComponent(
  "Technical articles, system architecture deep dives, and developer reflections by Dheeraj (@tomlin7)."
)}&badge=Blog`;

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
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Blog | tomlin7",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | tomlin7",
    description: "Technical articles, system architecture deep dives, and developer reflections by Dheeraj (@tomlin7).",
    creator: "@tomfricks",
    images: [ogImage],
  },
};

export default function BlogPage() {
  const posts = getSortedPostsData();

  return <BlogListClient posts={posts} />;
}
