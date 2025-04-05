/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    // Add other image domains as needed
  },
  // Enable experimental features if needed
  // experimental: {
  //   serverActions: true,
  // },
}

module.exports = nextConfig
