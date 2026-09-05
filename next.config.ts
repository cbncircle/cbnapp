import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // এই লাইনটি TypeScript এরর হলেও বিল্ড আটকাতে দেবে না
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
