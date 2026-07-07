import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      {
        source: '/masterclass/spitz-alemao-b',
        destination: '/masterclass/spitz-alemao',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'www.bubbles.com.br' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 480, 560],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75],
  },
}

export default nextConfig
