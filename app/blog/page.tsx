import Link from "next/link";
import data from "@/content/portfolio.json";
import { PageHeading } from "@/components/page-heading";
import { PageFooter } from "@/components/page-footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Blog",
  "Notes on things I build, things I break, and what I learn along the way.",
  "/blog",
);

export default function BlogPage() {
  return (
    <main id="main-content" className="reading-page">
      <PageHeading
        index="03"
        title="Notes, mostly."
        description="Things I build, things I break, and what I learn along the way."
      >
        <a href="/rss.xml" className="small-link">
          subscribe via rss ↗
        </a>
      </PageHeading>
      <div className="writing-list">
        {data.posts.map((post) => (
          <article className="writing-row" key={post.slug} data-koi-avoid>
            <time dateTime={post.date}>
              {new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
            <div>
              <Link className="writing-title" href={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
                <span aria-hidden="true">↗</span>
              </Link>
              <p className="row-description">{post.description}</p>
              <p className="tech-stack">
                {post.category.toLowerCase()} <span aria-hidden="true">/</span>{" "}
                {post.readTime}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="margin-note" data-koi-avoid>
        Writing helps me find out what I actually understand.
      </p>
      <PageFooter />
    </main>
  );
}
