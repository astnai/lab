import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
      },
    ],
  }
};

export default nextConfig;
