import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  distDir: process.env.NODE_ENV === 'production' ? 'out/public_html' : 'out_dev',
};

export default nextConfig;
