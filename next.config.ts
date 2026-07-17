import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Workspace root — a stray parent lockfile was making Turbopack
    // infer the wrong project root.
    root: __dirname,
  },
};

export default nextConfig;
