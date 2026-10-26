import type { Metadata } from "next";
import OssClient from "./OssClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tomlin7.com";
const ogImage = `${baseUrl}/api/og?title=Open%20Source&desc=${encodeURIComponent(
  "Open source contributions, pull requests, and repositories authored by Dheeraj (@tomlin7)."
)}&badge=OSS`;

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Open source contributions, pull requests, and repositories authored by Dheeraj (@tomlin7).",
  alternates: {
    canonical: "/oss",
  },
  openGraph: {
    title: "Open Source | tomlin7",
    description:
      "Open source contributions, pull requests, and repositories authored by Dheeraj (@tomlin7).",
    url: "/oss",
    siteName: "tomlin7",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Open Source | tomlin7",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source | tomlin7",
    description:
      "Open source contributions, pull requests, and repositories authored by Dheeraj (@tomlin7).",
    creator: "@tomfricks",
    images: [ogImage],
  },
};

export default function OssPage() {
  return <OssClient />;
}
