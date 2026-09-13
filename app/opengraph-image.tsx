import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Dheeraj (tomlin7) | Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #0a0a0c 0%, #111116 50%, #181824 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid accent overlay */}
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
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
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
              tomlin7
            </div>
          </div>

          <div
            style={{
              padding: "8px 16px",
              borderRadius: 9999,
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              fontSize: 16,
              color: "#a1a1aa",
            }}
          >
            tomlin7.com
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, zIndex: 10 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              background: "linear-gradient(180deg, #ffffff 0%, #d4d4d8 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Dheeraj (tomlin7)
          </div>

          <div
            style={{
              fontSize: 26,
              color: "#94a3b8",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            Software Engineer &bull; Systems &bull; Graphics &bull; AI Agents &bull; Full-Stack
          </div>
        </div>

        {/* Footer Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 10 }}>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(59, 130, 246, 0.15)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              color: "#60a5fa",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Engineering Blog
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(139, 92, 246, 0.15)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#a78bfa",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Interactive OS Portfolio
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#cbd5e1",
              fontSize: 16,
            }}
          >
            Open Source
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
