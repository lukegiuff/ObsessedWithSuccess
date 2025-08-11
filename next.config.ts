import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/config.yml',
        destination: '/api/config',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/config',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/yaml',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
