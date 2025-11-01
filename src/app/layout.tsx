import { TooltipProvider } from '@/components/ui/tooltip';
import './global.css';

import ProgressProvider from '@/components/progress';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { defineI18n } from 'fumadocs-core/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import SearchDialog from '@/components/search';

export const i18n = defineI18n({
  defaultLanguage: 'zh',
  languages: ['zh'],
});

const { provider } = defineI18nUI(i18n, {
  translations: {
    zh: {
      displayName: '繁體中文',
      search: '搜索網站',
      searchNoResult: '沒有找到資料',
      toc: '目錄',
      tocNoHeadings: '沒有找到目錄',
      chooseTheme: '選擇主題',
      lastUpdate: '最後更新',
      chooseLanguage: '選擇語言',
      nextPage: '下一頁',
      previousPage: '上一頁',
      editOnGithub: '在 Github 上編輯',
    },
  },
});

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-tw" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider
          theme={{
            enableColorScheme: true,
            enabled: true,
            defaultTheme: 'dark'
          }}
          i18n={provider('zh')}
          search={{
            SearchDialog
          }}
        >
          <ProgressProvider >
              <TooltipProvider>
                {children}
              </TooltipProvider>
          </ProgressProvider>
        </RootProvider>
      </body>
    </html>
  );
}
