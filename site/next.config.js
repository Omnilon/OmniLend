/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: false
  },
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
