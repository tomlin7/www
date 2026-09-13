import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | tomlin7",
    description:
      "Featured engineering projects, AI agents, systems languages, and applications built by Dheeraj (@tomlin7).",
    creator: "@tomfricks",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
