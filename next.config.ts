import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
