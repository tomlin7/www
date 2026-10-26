import { ImageResponse } from "next/og";
import { getPostData, getSortedPostsData } from "@/lib/posts";


export const alt = "Engineering Blog | tomlin7";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);

  const title = post.title || slug;
  const description = post.description || "Technical writing and engineering deep dive.";
  const category = post.category || "Engineering";
  const readTime = post.readTime || "5 min read";
  const date = post.date || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #09090b 0%, #111116 50%, #181824 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.12,
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #ffffff 2%, transparent 0%)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              T
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>
              tomlin7
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                padding: "6px 14px",
                borderRadius: 9999,
                background: "rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                color: "#60a5fa",
                fontSize: 15,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {category}
            </div>
            <div
              style={{
                padding: "6px 14px",
                borderRadius: 9999,
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: 15,
                color: "#a1a1aa",
              }}
            >
              tomlin7.com/blog
            </div>
          </div>
        </div>

        {/* Post Title & Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 1040,
          }}
        >
          <div
            style={{
              fontSize: title.length > 55 ? 48 : 58,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 22,
              color: "#94a3b8",
              lineHeight: 1.45,
              maxWidth: 950,
            }}
          >
            {description}
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#94a3b8", fontSize: 16 }}>
            <span>By Dheeraj (@tomlin7)</span>
            {date ? (
              <>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>{date}</span>
              </>
            ) : null}
            <span style={{ opacity: 0.4 }}>•</span>
            <span>{readTime}</span>
          </div>

          <div style={{ display: "flex", gap: 8, color: "#64748b", fontSize: 15 }}>
            <span>Read Article →</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
