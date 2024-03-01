// @ts-check
 
module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    transpilePackages: ['@mui/x-charts']
  }
  return nextConfig
}
