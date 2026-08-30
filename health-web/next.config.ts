import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/quantallabs-health-web",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
