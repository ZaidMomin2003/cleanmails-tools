/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/tools',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    // Block indexing on the .vercel.app domain — only cleanmails.online should be indexed
    const isVercelPreview = process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_URL?.includes('.vercel.app')
    if (isVercelPreview) {
      return [
        {
          source: '/:path*',
          headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
        },
      ]
    }
    return []
  },
}
module.exports = nextConfig
