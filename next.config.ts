import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // A stray lockfile in the parent directory makes Next infer the wrong workspace root.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
