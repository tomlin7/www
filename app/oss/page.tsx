import type { Metadata } from "next";
import OssClient from "./OssClient";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source | tomlin7",
    description:
      "Open source contributions, pull requests, and repositories authored by Dheeraj (@tomlin7).",
    creator: "@tomfricks",
  },
};

export default function OssPage() {
  return <OssClient />;
}
