/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'img.ridicdn.net' }],
  },
  poweredByHeader: false,
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.ridibooks.com/:path*',
      },
    ]
  },
}

export default nextConfig
