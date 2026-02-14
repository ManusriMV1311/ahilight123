import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/cyberfortress',
        destination: '/products/cyberfortress',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
