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
    headers: async () => [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ],
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
