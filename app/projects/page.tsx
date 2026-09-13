import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tomlin7.com";
const ogImage = `${baseUrl}/api/og?title=Projects&desc=${encodeURIComponent(
  "Featured engineering projects, AI agents, systems languages, and applications built by Dheeraj (@tomlin7)."
)}&badge=Projects`;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured engineering projects, AI agents, systems languages, and applications built by Dheeraj (@tomlin7).",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | tomlin7",
    description:
      "Featured engineering projects, AI agents, systems languages, and applications built by Dheeraj (@tomlin7).",
    url: "/projects",
    siteName: "tomlin7",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Projects | tomlin7",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | tomlin7",
    description:
      "Featured engineering projects, AI agents, systems languages, and applications built by Dheeraj (@tomlin7).",
    creator: "@tomfricks",
    images: [ogImage],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
