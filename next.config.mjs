import { createMDX } from 'fumadocs-mdx/next';
import webpack from 'webpack';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
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
  },
  webpack: (config, options) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );
    return config;
  },
};

export default withMDX(config);
