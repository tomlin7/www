import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PortfolioLayout from "@/components/PortfolioLayout";
import DesktopUI from "@/components/DesktopUI";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tomlin7.com";

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Dheeraj (tomlin7) | Software Engineer",
    template: "%s | tomlin7",
  },
  description:
    "Software engineer specializing in systems programming, graphics, AI agents, and full-stack development. Interactive macOS desktop portfolio, open source contributions, and engineering writing.",
  applicationName: "tomlin7",
  authors: [{ name: "Dheeraj", url: baseUrl }],
  creator: "Dheeraj (tomlin7)",
  publisher: "Dheeraj (tomlin7)",
  keywords: [
    "Dheeraj",
    "tomlin7",
    "Software Engineer",
    "Systems Programming",
    "Graphics",
    "AI Agents",
    "Full-Stack",
    "Next.js",
    "React",
    "TypeScript",
    "Rust",
    "Portfolio",
    "Blog",
    "Engineering",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Dheeraj (tomlin7) | Software Engineer",
    description:
      "Software engineer specializing in systems, graphics, AI agents, and full-stack engineering. Portfolio and technical writing.",
    url: baseUrl,
    siteName: "tomlin7",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dheeraj (tomlin7) | Software Engineer",
    description:
      "Software engineer specializing in systems, graphics, AI agents, and full-stack engineering. Portfolio and technical writing.",
    creator: "@tomfricks",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Dheeraj",
        alternateName: "tomlin7",
        url: baseUrl,
        jobTitle: "Software Engineer",
        sameAs: [
          "https://github.com/tomlin7",
          "https://linkedin.com/in/initdhee",
          "https://x.com/tomfricks",
          "https://tomlin7.notion.site",
        ],
        knowsAbout: [
          "Software Engineering",
          "Systems Programming",
          "Graphics Programming",
          "AI Agents",
          "Full-Stack Web Development",
          "Next.js",
          "Rust",
          "TypeScript",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "tomlin7",
        description: "Portfolio and engineering writing by Dheeraj (@tomlin7)",
        publisher: {
          "@id": `${baseUrl}/#person`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable, geistMono.variable)}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Michroma&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Press+Start+2P&family=Single+Day&display=swap"
          rel="stylesheet"
        />
        {/* Link to LLM / AI agent site directory */}
        <link rel="describedby" href="/llms.txt" />
        {/* Schema.org Knowledge Graph structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={cn("min-h-full w-full flex flex-col overflow-x-hidden m-0 p-0", inter.className)}>
        <PortfolioLayout desktopContent={<DesktopUI />}>
          {children}
        </PortfolioLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
