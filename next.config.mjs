import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '**',
      },
    ]
  },
  redirects: () => {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/fe7fq34rkc',
        permanent: true,
      },
    ];
  }
};

export default withMDX(config);
