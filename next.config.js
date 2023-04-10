/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
  },
  // basePath: '/forum',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/forum',
        permanent: true,
      },
      {
        source: '/settings',
        destination: '/settings/profile',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
