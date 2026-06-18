import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/.npm-cache/**", "**/node_modules/**", "**/.next/**"],
    };
    return config;
  },
};

export default nextConfig;
