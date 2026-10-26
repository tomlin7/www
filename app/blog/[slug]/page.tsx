import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import data from "@/content/portfolio.json";
import { PageFooter } from "@/components/page-footer";
import { pageMetadata, siteUrl } from "@/lib/site";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return data.posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = data.posts.find((entry) => entry.slug === slug);
  if (!post) notFound();
  const metadata = pageMetadata(post.title, post.description, `/blog/${slug}`);
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: {
        "text/markdown": `${siteUrl}/blog/${slug}.md`,
        "application/rss+xml": `${siteUrl}/rss.xml`,
      },
    },
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: `${post.date}T00:00:00Z`,
      authors: ["Dheeraj C."],
      tags: [post.category],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = data.posts.find((entry) => entry.slug === slug);
  if (!post) notFound();
  // Only tracked, locally imported Markdown reaches this renderer.
  const html = marked.parse(post.content, { async: false });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: `${post.date}T00:00:00Z`,
    dateModified: `${post.date}T00:00:00Z`,
    author: { "@type": "Person", name: "Dheeraj C.", url: siteUrl },
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
    image: `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}`,
  };
  return (
    <main id="main-content" className="reading-page article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="article-heading" data-koi-avoid>
        <Link href="/blog" className="small-link">
          ← all notes
        </Link>
        <p className="eyebrow">
          <time dateTime={post.date}>{post.date}</time> / {post.readTime}
        </p>
        <h1>{post.title}</h1>
        <div className="article-tools">
          <span>{post.category.toLowerCase()}</span>
          <a href={`/blog/${slug}.md`}>read as markdown ↗</a>
          {post.medium && (
            <a href={post.medium} target="_blank" rel="noopener noreferrer">
              also on medium ↗
            </a>
          )}
        </div>
      </header>
      <article
        className="article-prose"
        data-koi-avoid
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <PageFooter />
    </main>
  );
}
