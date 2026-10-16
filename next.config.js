/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
  },
  // Pages removed in the pilot-stage redesign; old links land somewhere useful.
  async redirects() {
    return [
      { source: '/signup', destination: '/pilot', permanent: false },
      { source: '/features', destination: '/how-it-works', permanent: true },
      { source: '/product', destination: '/how-it-works', permanent: true },
      { source: '/product/:path*', destination: '/how-it-works', permanent: true },
      { source: '/solutions/teachers', destination: '/solutions/schools', permanent: true },
      { source: '/solutions/api', destination: '/contact', permanent: true },
      { source: '/gdpr', destination: '/data-protection', permanent: true },
      { source: '/case-studies', destination: '/about', permanent: true },
      { source: '/:page(blog|careers|partners|status|docs|help|support)', destination: '/contact', permanent: true },
    ]
  },
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
}

module.exports = nextConfig

