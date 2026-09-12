/** @type {import('next').NextConfig} */
module.exports = {
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/media/optimized/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/resources',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/password',
        destination: '/',
        permanent: true
      }
    ];
  }
};
