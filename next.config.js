// @ts-check

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    transpilePackages: ['@mui/x-charts'],
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      unoptimized: true,
      domains: [],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*',
          port: '',
        },
      ],
    },
  }
  return nextConfig
}
