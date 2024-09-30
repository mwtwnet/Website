import 'katex/dist/katex.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import './global.css';

import type { ReactNode } from 'react';
import Script from 'next/script';
import { Viewport } from 'next';
import { Provider } from './provider';

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