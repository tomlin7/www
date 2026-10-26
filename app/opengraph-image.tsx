import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Dheeraj (tomlin7)";
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
          justifyContent: "center",
          alignItems: "center",
          background: "#050505",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Dheeraj
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#a3a3a3",
              letterSpacing: "-0.01em",
            }}
          >
            Systems &amp; Software Engineer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
