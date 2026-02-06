import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "sonner", "@clerk/nextjs"],
  },
};

export default nextConfig;
