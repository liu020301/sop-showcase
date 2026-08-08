import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const pagesBasePath = process.env.GITHUB_ACTIONS === "true" && repositoryName
  ? `/${repositoryName}`
  : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || pagesBasePath;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};

export default nextConfig;
