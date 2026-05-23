import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio @tomlin7",
  description: "software engineer > systems • graphics • full-stack",
};

import { Analytics } from "@vercel/analytics/react";
import PortfolioLayout from "@/components/PortfolioLayout";
import DesktopUI from "@/components/DesktopUI";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable, geistMono.variable)}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Michroma&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Press+Start+2P&family=Single+Day&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-full w-full flex flex-col overflow-x-hidden m-0 p-0", inter.className)}>
        <PortfolioLayout desktopContent={<DesktopUI />}>
          {children}
        </PortfolioLayout>
        <Analytics />
      </body>
    </html>
  );
}
