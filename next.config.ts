import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/dwmxbkhch/image/upload/**"),
    ],
  },
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/Resume.pdf",
        permanent: true,
      },
      {
        source: "/work",
        destination: "https://tomlin7.notion.site/36c88f368552811b8cc8f8ad6e70a8e0?v=36c88f36855281d69853000ca2e6234b&pvs=74",
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
        source: "/cal",
        destination: "https://cal.com/dheeraj-c",
        permanent: true,
      },
      {
        source: "/meet",
        destination: "https://cal.com/dheeraj-c",
        permanent: true,
      },
      {
        source: "/book",
        destination: "https://cal.com/dheeraj-c",
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
};

export default nextConfig;
