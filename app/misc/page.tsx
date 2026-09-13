import type { Metadata } from "next";
import MiscClient from "./MiscClient";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Miscellaneous | tomlin7",
    description:
      "Interactive experiments, playgrounds, AI chatbot Willy, and digital guestbook by Dheeraj (@tomlin7).",
    creator: "@tomfricks",
  },
};

export default function MiscPage() {
  return <MiscClient />;
}
