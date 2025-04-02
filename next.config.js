/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'lh3.googleusercontent.com', 'res.cloudinary.com', 'upload.wikimedia.org'],
    unoptimized: true,
  },
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/PSP-Social' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/PSP-Social/' : '',
  trailingSlash: true,
}

module.exports = nextConfig
