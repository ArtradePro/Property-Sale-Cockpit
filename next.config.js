// @type {import('next').NextConfig}
const nextConfig = {
  output: 'export', // Enable static export for simple hosting
  images: {
    unoptimized: true // Required for static export
  }
};

module.exports = nextConfig;
