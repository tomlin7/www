import type { Metadata } from "next";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://tomlin7.com"
).replace(/\/$/, "");
export const siteDescription =
  "Dheeraj's projects, open-source work, and notes on systems programming, developer tools, graphics, and AI agents.";
export const navigation = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "gallery", href: "/gallery" },
  { label: "oss", href: "/oss" },
  { label: "blog", href: "/blog" },
  { label: "misc", href: "/misc" },
  { label: "resume", href: "/resume" },
];
export const socials = [
  { label: "github", href: "https://github.com/tomlin7" },
  { label: "linkedin", href: "https://linkedin.com/in/initdhee" },
  { label: "x", href: "https://x.com/tomfricks" },
  { label: "email", href: "mailto:hello@tomlin7.com" },
];

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const image = `${siteUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": `${siteUrl}/rss.xml` },
    },
    openGraph: {
      title: `${title} | tomlin7`,
      description,
      url: `${siteUrl}${path}`,
      siteName: "tomlin7",
      locale: "en_US",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | tomlin7`,
      description,
      creator: "@tomfricks",
      images: [image],
    },
  };
}
