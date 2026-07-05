import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: "c:/Users/ASUS/Desktop/Pdfs/gold",
  },
};

export default nextConfig;
