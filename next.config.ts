import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "my-blog";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : "",
};

export default nextConfig;
