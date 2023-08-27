module.exports = {
  reactStrictMode: true,
  profiler: true,
  env: {
    API_URL: process.env.API_URL
  },
  experimental: {
    concurrentFeatures: true
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
}
