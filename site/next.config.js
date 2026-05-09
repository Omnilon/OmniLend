/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/ink", destination: "/", permanent: false },
      { source: "/ink/:path*", destination: "/", permanent: false },
      { source: "/tattoo", destination: "/", permanent: false },
      { source: "/tattoo/:path*", destination: "/", permanent: false },
      { source: "/tattoos", destination: "/", permanent: false },
      { source: "/tattoos/:path*", destination: "/", permanent: false },
      { source: "/financing", destination: "/finance", permanent: true },
      { source: "/services", destination: "/", permanent: false },
      { source: "/services/:path*", destination: "/", permanent: false },
      { source: "/brand", destination: "/", permanent: false },
      { source: "/about", destination: "/", permanent: false },
      { source: "/contact", destination: "/", permanent: false },
      { source: "/pricing", destination: "/", permanent: false },
      { source: "/process", destination: "/", permanent: false },
      { source: "/work", destination: "/", permanent: false }
    ];
  }
};
module.exports = nextConfig;
