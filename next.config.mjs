import { createMDX } from 'fumadocs-mdx/next';
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/zh-TW',
        destination: '/',
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/fe7fq34rkc',
        permanent: true,
      },
      {
        source: '/invite/frogmusic',
        destination: 'https://discord.com/oauth2/authorize?client_id=1216003625503948830',
        permanent: false
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "i.imgur.com",
        port: '',
        pathname: "/**"
      }, 
      {
        protocol: 'https',
        hostname: "wallpapercave.com",
        port: '',
        pathname: "/**"
      }, 
      {
        protocol: 'https',
        hostname: "cdn.discordapp.com",
        port: '',
        pathname: "/**"
      },
      {
        protocol: 'https',
        hostname: 'media.tenor.com',
        port: '',
        pathname: "/**"
      },
      {
        protocol: 'https',
        hostname: 'cdn.mwtw.net',
        port: '',
        pathname: "/**"
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: "/**"
      }
    ]
  }
};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export const runtime = "edge";

export default withMDX(config);
