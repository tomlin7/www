import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "tomlin7";
    const desc =
      searchParams.get("desc") ||
      "Software Engineer • Systems • Graphics • AI Agents • Full-Stack";
    const badge = searchParams.get("badge") || "Engineering";
    const meta = searchParams.get("meta") || "";

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
          {/* Subtle grid background */}
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

          {/* Header / Brand */}
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
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
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
                {badge}
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
                tomlin7.com
              </div>
            </div>
          </div>

          {/* Main Title & Description */}
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
                fontSize: title.length > 50 ? 52 : 62,
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
                fontSize: 24,
                color: "#94a3b8",
                lineHeight: 1.45,
                maxWidth: 950,
              }}
            >
              {desc}
            </div>
          </div>

          {/* Footer Metadata */}
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
              <span>Dheeraj (@tomlin7)</span>
              {meta ? (
                <>
                  <span style={{ opacity: 0.4 }}>•</span>
                  <span>{meta}</span>
                </>
              ) : null}
            </div>

            <div style={{ display: "flex", gap: 12, color: "#64748b", fontSize: 15 }}>
              <span>Systems</span>
              <span>•</span>
              <span>AI Agents</span>
              <span>•</span>
              <span>Full-Stack</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
