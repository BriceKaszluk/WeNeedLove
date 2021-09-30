module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.pixabay.com'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
