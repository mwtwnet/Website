import type { FooterCategory } from "@/components/Footer";
import { AuthorData } from "@/types";
import { BotIcon } from '@/components/animate-ui/icons/bot'
import { SparklesIcon } from '@/components/animate-ui/icons/sparkles'
import { TerminalIcon } from '@/components/animate-ui/icons/terminal'
import { UsersIcon } from '@/components/animate-ui/icons/users'
import { BrushIcon } from '@/components/animate-ui/icons/brush'
import { PlugZap } from '@/components/animate-ui/icons/plug-zap'
import { LucideIcon } from 'lucide-react'

export const domain = "https://mwtw.net";

export const urlBase = new URL(
  process.env.VERCEL_URL
    ? `${domain}`
    : "http://localhost:3001",
);

export const footer: FooterCategory[] = [
  {
    title: "連結",
    items: [
      {
        label: "日記 (部落格)",
        href: "/blog",
      },
      {
        label: "隱私權政策",
        href: "/privacy",
      },
      {
        label: "服務條款",
        href: "/tos",
      },
      {
        label: "版權政策",
        href: "/copyright"
      }
    ],
  },
  {
    title: "支持我們",
    items: [
      {
        label: "GitHub",
        href: "https://github.com/mwtwnet",
        newWindow: true,
      },
      {
        label: "Discord",
        href: "https://dc.mwtw.net/",
        newWindow: true,
      },
    ],
  },
  {
    title: "其他",
    items: [
      {
        label: "邀請青蛙音樂",
        href: "/invite/frogmusic",
      },
      {
        label: "服務狀態",
        href: "https://status.mwtw.net/",
        newWindow: true,
      },
    ],
  },
];

/**
 * a list of blog file names
 */
export const blogRecommendations = [
  "perks"
];

export const blogAuthors: Record<string, AuthorData> = {
  soldierp: {
    name: "河馬",
    title: "Founder",
    url: "https://sptw.me",
    image_url: "https://avatars.githubusercontent.com/u/74442940?v=4"
  },
  bu: {
    name: "Bu",
    title: "Co-Founder",
    url: "https://bu.mwtw.net",
    image_url: "https://avatars.githubusercontent.com/u/108647302?v=4"
  },
  blockeric: {
    name: "八瑞",
    title: "Co-Founder",
    url: "/404",
    image_url: "https://cdn.discordapp.com/avatars/678181301609562123/d4ef51c4af80355b9aad8deb695d81ab.png?size=1024"
  },
  whitedragon: {
    name: "白龍",
    title: "Developer",
    url: "/404",
    image_url: "/authors/whitedragon.png"
  },
};

/**
 * Team members for the landing page
 */
export const teamMembers = [
  {
    name: '河馬 HippoDev',
    role: '創辦人 & 開發者',
    image: 'https://avatar-cyan.vercel.app/api/pfp/561210753517092884/image',
    bio: '熱愛程式開發與創新',
    github: 'https://github.com/hippodev03',
    email: 'hippo@mwtw.net'
  },
  {
    name: 'Bu',
    role: '副創辦人 & 開發者',
    image: 'https://avatar-cyan.vercel.app/api/pfp/730325036640239626/image',
    bio: '專注於研究人工智慧與機器學習',
    github: 'https://github.com/bu1227',
    email: 'bu@mwtw.net'
  }
];

/**
 * Features for the landing page
 */
export const features = [
  {
    icon: BotIcon,
    title: 'Discord 機器人',
    description: '打造功能強大、易用的 Discord 機器人，提升您的社群體驗',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: BrushIcon,
    title: '網頁開發',
    description: '現代化、響應式的網頁應用，為您的業務提供完美的線上形象',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: TerminalIcon,
    title: '客製化軟體',
    description: '量身打造的軟體解決方案，滿足您的獨特需求',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: PlugZap,
    title: '高效能架構',
    description: '優化的系統架構，確保快速、穩定的服務體驗',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: UsersIcon,
    title: '社群建設',
    description: '協助您建立活躍的線上社群，促進成員互動',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    icon: SparklesIcon,
    title: '創新思維',
    description: '用創意和技術為您帶來獨特的數位體驗',
    gradient: 'from-yellow-500 to-orange-500'
  }
];