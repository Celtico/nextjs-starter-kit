/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  images: {
    //domains:['tailwindui.com']
  },
};

module.exports = nextConfig;
