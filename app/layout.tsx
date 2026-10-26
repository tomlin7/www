import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteShell } from "@/components/site-shell";
import { pageMetadata, siteDescription, siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tomlin7.com";

export const viewport: Viewport = {
  themeColor: "#1a1917",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  ...pageMetadata("Dheeraj (tomlin7)", siteDescription, "/"),
  metadataBase: new URL(baseUrl),
  title: {
    default: "Dheeraj (tomlin7) | Systems & Software Engineer",
    template: "%s | tomlin7",
  },
  description: siteDescription,
  authors: [{ name: "Dheeraj", url: baseUrl }],
  creator: "Dheeraj (tomlin7)",
  publisher: "Dheeraj (tomlin7)",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased font-sans dark",
        inter.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-full w-full antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  name: "Dheeraj C.",
                  alternateName: "tomlin7",
                  url: siteUrl,
                  jobTitle: "Systems & Software Engineer",
                  sameAs: [
                    "https://github.com/tomlin7",
                    "https://linkedin.com/in/initdhee",
                    "https://x.com/tomfricks",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "tomlin7",
                  description: siteDescription,
                  publisher: { "@id": `${siteUrl}/#person` },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <SiteShell>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
