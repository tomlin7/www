import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
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
};

export default nextConfig;
