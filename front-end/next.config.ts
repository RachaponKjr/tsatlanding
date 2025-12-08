import { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "150.95.26.51",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
  basePath: "/landing",
  trailingSlash: true,
};

export default nextConfig;
