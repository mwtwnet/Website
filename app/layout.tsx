import 'katex/dist/katex.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import './global.css';

import type { ReactNode } from 'react';
import Script from 'next/script';
import { Viewport } from 'next';
import { Provider } from './provider';
import { I18nProvider } from 'fumadocs-ui/i18n';

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
        <I18nProvider 
          locale='zh-TW'
          translations={
            {
              search: '搜索',
              searchNoResult: '沒有結果',
              toc: '目錄',
              tocNoHeadings: '沒有標題',
              lastUpdate: '最後更新',
              chooseLanguage: '選擇語言',
              nextPage: '下一頁',
              previousPage: '上一頁',
              chooseTheme: '選擇主題',
              editOnGithub: '在 Github 上編輯',
            }
          }
        >
          <Script src="https://cdn.jsdelivr.net/npm/scrolls.js@1.0.18/scrolls.min.js"></Script>
          <Provider>{children}</Provider>
        </I18nProvider>
      </body>
    </html>
  );
}