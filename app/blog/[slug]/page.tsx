import React from "react";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import {
  IconArrowLeft,
  IconBook,
  IconCalendar,
  IconClock,
  IconTag,
  IconExternalLink,
} from "@tabler/icons-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import "@/app/globals.css"; // Ensure global styles are loaded

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

const customComponents = {
  // Define custom components here that can be used directly in markdown/mdx
  // Example: Card: (props) => <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl" {...props} />
};

export default async function Post({ params }: PostProps) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-20 font-sans text-white/90">
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[13px] font-semibold tracking-normal mb-8 transition-colors group cursor-pointer"
      >
        <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Blog</span>
      </Link>

      {/* Header Info */}
      <header className="space-y-4 pb-8 border-b border-white/5 mb-8">
        <div className="flex flex-wrap items-center gap-3 text-white/40 text-[11px] font-medium tracking-wide">
          <span className="flex items-center gap-1 bg-white/[0.04] border border-white/5 px-2.5 py-0.5 rounded-full text-white/60">
            <IconTag className="w-3 h-3" />
            {postData.category}
          </span>
          <span className="flex items-center gap-1">
            <IconCalendar className="w-3.5 h-3.5" />
            {postData.date}
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
        <article
          className="prose prose-invert max-w-none text-[15px] leading-relaxed text-white/80 space-y-6
            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
            prose-p:mb-4
            prose-a:text-blue-400 prose-a:underline hover:prose-a:text-blue-300
            prose-strong:text-white
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
            prose-blockquote:border-l-4 prose-blockquote:border-white/10 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white/60
            prose-code:text-[13px] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#111111] prose-pre:border prose-pre:border-white/5 prose-pre:p-4 prose-pre:rounded-xl prose-pre:font-mono prose-pre:overflow-x-auto"
        >
          <MDXRemote source={postData.content || ""} components={customComponents} />
        </article>
      </div>
    </div>
  );
}
