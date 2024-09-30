import 'katex/dist/katex.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import './global.css';

import type { ReactNode } from 'react';
import { urlBase } from '@/config';
import Script from 'next/script';
import { Viewport } from 'next';
import { I18nProvider } from 'fumadocs-ui/i18n';
import { createMetadata } from '@/lib/metaData';
import { Provider } from './provider';

export const metadata = createMetadata({
  title: {
    template: '%s | 多元世界團隊',
    default: '多元世界團隊',
  },
  description: '我們是一個團隊，致力於打造一個多元化聊天世界，以及各種機器人、軟體、網頁開發。',
  metadataBase: urlBase,
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <Script src="https://cdn.jsdelivr.net/npm/scrolls.js@1.0.18/scrolls.min.js"></Script>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}