import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: "/rss", destination: "/rss.xml", permanent: true },
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/cal", destination: "https://cal.com/dheeraj-c", permanent: true },
      { source: "/meet", destination: "https://cal.com/dheeraj-c", permanent: true },
      { source: "/book", destination: "https://cal.com/dheeraj-c", permanent: true },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/in",
        destination: "https://linkedin.com/in/initdhee",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://linkedin.com/in/initdhee",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/tomlin7",
        permanent: true,
      },
      {
        source: "/gh",
        destination: "https://github.com/tomlin7",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://x.com/tomfricks",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://x.com/tomfricks",
        permanent: true,
      },
      {
        source: "/mail",
        destination: "mailto:hello@tomlin7.com",
        permanent: true,
      },
      {
        source: "/email",
        destination: "mailto:hello@tomlin7.com",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [{source: "/blog/:slug.md", destination: "/blog/:slug/raw"}];
  },
};

export default nextConfig;
