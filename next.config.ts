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
    ];
  },
};

export default nextConfig;
