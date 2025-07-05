/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
  devIndicators: false,
  allowedDevOrigins: [
    "*.macaly.dev",
    "*.macaly.app",
    "*.macaly-app.com",
    "*.macaly-user-data.dev",
  ],
  // Fix Server Actions header mismatch in development
  experimental: {
    serverActions: {
      allowedOrigins: [
        "*.macaly.dev",
        "*.macaly.app", 
        "*.macaly-app.com",
        "*.macaly-user-data.dev",
        "*.e2b.dev",
        "localhost:3000",
      ],
    },
  },
};

module.exports = nextConfig;
