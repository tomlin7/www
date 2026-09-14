import sharp from "sharp";
import fs from "fs";

const svg = `
<svg width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Arrowhead markers -->
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 1 2 L 7 5 L 1 8" fill="none" stroke="#5b8def" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </marker>
    <marker id="arrow-blue-right" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 1 2 L 7 5 L 1 8" fill="none" stroke="#5b8def" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </marker>
    <filter id="card-shadow" x="-8%" y="-8%" width="116%" height="120%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.04" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="#f4f4f6" />

  <!-- Subtle grid dots -->
  <pattern id="dot-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r="1.2" fill="#e2e4e8" />
  </pattern>
  <rect width="1200" height="675" fill="url(#dot-pattern)" />

  <!-- ================= LEFT CLIENT NODES ================= -->
  <!-- Chromebook Card -->
  <g filter="url(#card-shadow)">
    <rect x="90" y="160" width="230" height="70" rx="14" fill="#dedfe3" stroke="#d0d2d8" stroke-width="1" />
    <text x="205" y="193" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#22252a">Chromebook</text>
    <text x="205" y="213" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#64748b">In Lecture • Tailscale SSH</text>
  </g>

  <!-- Phone Card -->
  <g filter="url(#card-shadow)">
    <rect x="90" y="445" width="230" height="70" rx="14" fill="#dedfe3" stroke="#d0d2d8" stroke-width="1" />
    <text x="205" y="478" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#22252a">Mobile Phone</text>
    <text x="205" y="498" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#64748b">Termius &amp; Mobile Browser</text>
  </g>

  <!-- ================= CONNECTOR LINES (LEFT TO CENTER) ================= -->
  <!-- Chromebook to center line -->
  <path d="M 320 195 H 390 Q 420 195 420 225 V 322 Q 420 337 445 337 H 465" fill="none" stroke="#5b8def" stroke-width="2.5" stroke-linecap="round" />
  <!-- Phone to center line -->
  <path d="M 320 480 H 390 Q 420 480 420 450 V 352 Q 420 337 445 337 H 465" fill="none" stroke="#5b8def" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow-blue)" />

  <!-- ================= CENTER TAILSCALE CARD ================= -->
  <g filter="url(#card-shadow)">
    <rect x="475" y="275" width="250" height="125" rx="20" fill="#212124" stroke="#2e2e33" stroke-width="1" />

    <!-- Tailscale 9-dot Logo (Exact representation) -->
    <g transform="translate(508, 305)">
      <!-- 3x3 Dots -->
      <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
      <circle cx="11" cy="0" r="3.5" fill="#ffffff" />
      <circle cx="22" cy="0" r="3.5" fill="#ffffff" />

      <circle cx="0" cy="11" r="3.5" fill="#ffffff" />
      <circle cx="11" cy="11" r="3.5" fill="#ffffff" opacity="0.3" />
      <circle cx="22" cy="11" r="3.5" fill="#ffffff" opacity="0.3" />

      <circle cx="0" cy="22" r="3.5" fill="#ffffff" opacity="0.3" />
      <circle cx="11" cy="22" r="3.5" fill="#ffffff" opacity="0.3" />
      <circle cx="22" cy="22" r="3.5" fill="#ffffff" fill-opacity="1" />
    </g>

    <!-- Tailscale Title -->
    <text x="552" y="327" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="25" font-weight="700" fill="#ffffff" letter-spacing="-0.02em">Tailscale</text>

    <!-- Subtitle with green status dot -->
    <circle cx="518" cy="365" r="4" fill="#22c55e" />
    <text x="532" y="369" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13.5" font-weight="500" fill="#d1d5db">Encrypted Mesh Network</text>
  </g>

  <!-- ================= CONNECTOR LINES (CENTER TO RIGHT) ================= -->
  <!-- Center to Dorm Laptop lines -->
  <path d="M 725 337 H 775 Q 795 337 795 310 V 165 Q 795 140 820 140 H 870" fill="none" stroke="#5b8def" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow-blue-right)" />
  <path d="M 725 337 H 775 Q 795 337 795 337 H 870" fill="none" stroke="#5b8def" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow-blue-right)" />
  <path d="M 725 337 H 775 Q 795 337 795 365 V 510 Q 795 535 820 535 H 870" fill="none" stroke="#5b8def" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow-blue-right)" />

  <!-- ================= RIGHT HOST / WORKLOAD NODES ================= -->
  <!-- Workload 1: Kotlin & Gradle -->
  <g filter="url(#card-shadow)">
    <rect x="880" y="105" width="250" height="70" rx="14" fill="#dedfe3" stroke="#d0d2d8" stroke-width="1" />
    <text x="1005" y="137" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#22252a">Kotlin &amp; Gradle Builds</text>
    <text x="1005" y="157" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#64748b">Dorm Laptop • Full CPU Power</text>
  </g>

  <!-- Workload 2: Hermes / AI Agent inside tmux -->
  <g filter="url(#card-shadow)">
    <rect x="880" y="302" width="250" height="70" rx="14" fill="#dedfe3" stroke="#d0d2d8" stroke-width="1" />
    <text x="1005" y="334" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#22252a">Hermes / AI Agent Loops</text>
    <text x="1005" y="354" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#64748b">Persistent in tmux session</text>
  </g>

  <!-- Workload 3: Local Dev Server Preview -->
  <g filter="url(#card-shadow)">
    <rect x="880" y="500" width="250" height="70" rx="14" fill="#dedfe3" stroke="#d0d2d8" stroke-width="1" />
    <text x="1005" y="532" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#22252a">Local Web Previews</text>
    <text x="1005" y="552" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#64748b">tailscale serve :3000</text>
  </g>

  <!-- Badge at bottom -->
  <rect x="490" y="605" width="220" height="32" rx="16" fill="#ffffff" stroke="#e2e4e8" stroke-width="1" />
  <text x="600" y="626" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#64748b">ZERO OPEN PORTS • WIREGUARD</text>
</svg>
`;

fs.writeFileSync("public/blog/tailscale-diagram.svg", svg);

// Render to high-res PNG for openGraph and hero image
sharp(Buffer.from(svg))
  .png({ quality: 95 })
  .toFile("public/blog/tailscale-hero.png")
  .then(() => console.log("Successfully generated diagram SVG & high-res PNG!"))
  .catch((err) => console.error("Error generating image:", err));
