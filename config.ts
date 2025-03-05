import type { FooterCategory } from "@/components/Footer";
import { AuthorData } from "@/types";

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
      {
        label: "郵件系統",
        href: "https://mail.mwtw.net/",
        newWindow: true,
      }
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