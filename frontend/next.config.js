/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ["fakeimg.pl"],
  },
};

module.exports = nextConfig;
