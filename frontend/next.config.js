/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'uploadthing.com',
                pathname: '/f/**',
            },
            {
                protocol: 'https',
                hostname: 'uploadthing-prod.s3.us-west-2.amazonaws.com',
            },
        ],
    },
};

module.exports = nextConfig;
