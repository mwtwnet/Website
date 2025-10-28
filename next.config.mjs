import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX({
  // customise the config file path
  // configPath: "source.config.ts"
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/**',
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
      {
        source: "/privacy",
        destination: "/docs/policy/privacy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/docs/policy/terms",
        permanent: true,
      },
      {
        source: "/copyright",
        destination: "/docs/policy/copyright",
        permanent: true,
      }
    ];
  }
};

export default withMDX(config);
