import { ImageResponse } from "next/og";

export function socialImage(title: string, description: string) {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px 80px",
        background: "#1a1917",
        color: "#fff7f0",
        fontFamily: "monospace",
      }}
    >
      <div style={{ display: "flex", fontSize: 18, color: "#8d8882" }}>
        tomlin7 / notes from the workbench
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 44 : 60,
            letterSpacing: "-2px",
            lineHeight: 1.25,
            maxWidth: 1030,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            lineHeight: 1.6,
            maxWidth: 900,
            color: "#aaa49d",
          }}
        >
          {description}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #3a3733",
          paddingTop: 24,
          fontSize: 16,
          color: "#8d8882",
        }}
      >
        <span>Dheeraj C.</span>
        <span>systems / devtools / curiosity</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
