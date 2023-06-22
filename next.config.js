/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['openweathermap.org'],
  },
  env: {
    API_KEY: process.env.APIKEY,
  },
};

module.exports = nextConfig;
