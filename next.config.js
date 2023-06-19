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
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;
