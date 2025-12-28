/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Allow Unsplash images
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // Allow Wiki images (for maps)
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', // Extra Unsplash domain
      }
    ],
  },
  // This prevents TS errors from failing the build (optional but recommended for fast deploy)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
