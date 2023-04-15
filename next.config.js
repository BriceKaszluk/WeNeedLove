module.exports = {
  reactStrictMode: true,
  watchOptions: {
    ignored: [
      '/mnt/c/DumpStack.log.tmp',
      '/mnt/c/hiberfil.sys',
      '/mnt/c/pagefile.sys',
      '/mnt/c/swapfile.sys',
    ]
  },
  images: {
    domains: ['cdn.pixabay.com'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
