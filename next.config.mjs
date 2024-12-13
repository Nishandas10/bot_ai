/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ucarecdn.com',
            },
            {
                protocol: 'http',
                hostname: 'saasblog.local'
            }
        ]
    },
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client', 'prisma']
    }
};

export default nextConfig;
