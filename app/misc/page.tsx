import type { Metadata } from "next";
import MiscClient from "./MiscClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tomlin7.com";
const ogImage = `${baseUrl}/api/og?title=Miscellaneous&desc=${encodeURIComponent(
  "Interactive experiments, playgrounds, AI chatbot Willy, and digital guestbook by Dheeraj (@tomlin7)."
)}&badge=Experiments`;

export const metadata: Metadata = {
  title: "Miscellaneous",
  description:
    "Interactive experiments, playgrounds, AI chatbot Willy, and digital guestbook by Dheeraj (@tomlin7).",
  alternates: {
    canonical: "/misc",
  },
  openGraph: {
    title: "Miscellaneous | tomlin7",
    description:
      "Interactive experiments, playgrounds, AI chatbot Willy, and digital guestbook by Dheeraj (@tomlin7).",
    url: "/misc",
    siteName: "tomlin7",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Miscellaneous | tomlin7",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miscellaneous | tomlin7",
    description:
      "Interactive experiments, playgrounds, AI chatbot Willy, and digital guestbook by Dheeraj (@tomlin7).",
    creator: "@tomfricks",
    images: [ogImage],
  },
};

export default function MiscPage() {
  return <MiscClient />;
}
