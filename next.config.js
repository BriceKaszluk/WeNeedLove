module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // ignore specific files or directories
      config.watchOptions = {
        ignored: [
          '/mnt/c/DumpStack.log.tmp',
          '/mnt/c/hiberfil.sys',
          '/mnt/c/pagefile.sys',
          '/mnt/c/swapfile.sys',
        ]
      }
    }
    return config
  },
  images: {
    domains: ['cdn.pixabay.com'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    analyticsId: 'G-WMRZ98WS3M',
  },
}
