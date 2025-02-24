import { TooltipProvider } from '@/components/ui/tooltip';
import './global.css';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { I18nProvider } from 'fumadocs-ui/i18n';
config.autoAddCss = false

import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

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
          search={{
            options: {
              tags: [
                { 
                  name: "星球文件",
                  value: 'doc'
                },
                {
                  name: "星球日記",
                  value: 'blog'
                }
              ],
              defaultTag: 'doc'
            }
          }}
        >
          <I18nProvider
            locale='zh-TW'
            translations={{
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
            }} 
          >
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </I18nProvider>
        </RootProvider>
      </body>
    </html>
  );
}
