import React from "react";
import type { Metadata } from "next";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendar,
  IconClock,
  IconTag,
  IconMarkdown,
} from "@tabler/icons-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import "@/app/globals.css";
import { CopyButton } from "@/components/CopyButton";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PostProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tomlin7.com";
  const canonicalUrl = `${baseUrl}/blog/${slug}`;
  const ogImage = postData.image || `${baseUrl}/blog/${slug}/opengraph-image`;
  const publishedTime = postData.date ? new Date(postData.date).toISOString() : undefined;

  return {
    title: postData.title,
    description: postData.description,
    authors: [{ name: "Dheeraj (tomlin7)", url: baseUrl }],
    alternates: {
      canonical: canonicalUrl,
      types: {
        "text/markdown": `${baseUrl}/blog/${slug}.md`,
      },
    },
    openGraph: {
      title: postData.title,
      description: postData.description,
      url: canonicalUrl,
      siteName: "tomlin7",
      type: "article",
      publishedTime,
      authors: ["Dheeraj (tomlin7)"],
      tags: postData.category ? [postData.category] : undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: postData.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.description,
      creator: "@tomfricks",
      images: [ogImage],
    },
  };
}

const rehypePrettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
};

const customComponents = {
  // Wrap <pre> to show a language badge and copy button
  pre: (props: React.HTMLAttributes<HTMLPreElement> & { "data-language"?: string }) => {
    const lang = props["data-language"] ?? "";
    // Extract raw text from children for the copy button
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(extractText).join("");
      if (React.isValidElement(node) && node.props) {
        return extractText((node.props as { children?: React.ReactNode }).children);
      }
      return "";
    };
    const codeText = extractText(props.children);

    return (
      <div className="blog-code-block">
        <div className="blog-code-header">
          <span className="blog-code-lang">{lang || "code"}</span>
          <CopyButton text={codeText} />
        </div>
        <pre {...props} />
      </div>
    );
  },
};

export default async function Post({ params }: PostProps) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tomlin7.com";
  const postUrl = `${baseUrl}/blog/${slug}`;
  const publishedIso = postData.date ? new Date(postData.date).toISOString() : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postData.title,
    description: postData.description,
    datePublished: publishedIso,
    dateModified: publishedIso,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Person",
      name: "Dheeraj",
      url: baseUrl,
      sameAs: [
        "https://github.com/tomlin7",
        "https://linkedin.com/in/initdhee",
        "https://x.com/tomfricks",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Dheeraj",
      url: baseUrl,
    },
    image: postData.image || `${baseUrl}/opengraph-image`,
    articleSection: postData.category,
    keywords: [postData.category, "Software Engineering", "Tech", "Programming"].filter(Boolean),
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-20 font-sans text-white/90">
      {/* Structured Data for Search Engines and AI Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Navigation & Utilities */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[13px] font-semibold tracking-normal transition-colors group cursor-pointer"
        >
          <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Blog</span>
        </Link>

        {/* AI & Developer Markdown link */}
        <a
          href={`/blog/${slug}.md`}
          target="_blank"
          rel="alternate"
          type="text/markdown"
          className="inline-flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white/80 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 px-2.5 py-1 rounded-md transition-all cursor-pointer font-mono"
          title="Read clean markdown (LLM & AI friendly)"
        >
          <IconMarkdown className="w-3.5 h-3.5" />
          <span>Raw .md</span>
        </a>
      </div>

      {/* Header Info */}
      <header className="space-y-4 pb-8 border-b border-white/5 mb-8">
        <div className="flex flex-wrap items-center gap-3 text-white/40 text-[11px] font-medium tracking-wide">
          <span className="flex items-center gap-1 bg-white/[0.04] border border-white/5 px-2.5 py-0.5 rounded-full text-white/60">
            <IconTag className="w-3 h-3" />
            {postData.category}
          </span>
          <span className="flex items-center gap-1">
            <IconCalendar className="w-3.5 h-3.5" />
            <time dateTime={postData.date}>{postData.date}</time>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <IconClock className="w-3.5 h-3.5" />
            {postData.readTime}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {postData.title}
        </h1>

        <p className="text-white/60 text-[15px] leading-relaxed italic border-l-2 border-white/10 pl-4 py-0.5">
          {postData.description}
        </p>

        {postData.image && (
          <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-[#111111] border border-white/5 flex items-center justify-center relative mt-6">
            <img
              src={postData.image}
              alt={postData.title}
              className="object-contain w-full h-full opacity-80"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:10px_10px]" />
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="mb-8">
        <article className="blog-article">
          <MDXRemote
            source={postData.content || ""}
            components={customComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode as never, rehypePrettyCodeOptions]],
              },
            }}
          />
        </article>
      </div>
    </div>
  );
}
