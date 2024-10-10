import 'katex/dist/katex.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import './global.css';

import type { ReactNode } from 'react';
import Script from 'next/script';
import { Viewport } from 'next';
import { Provider } from './provider';
import { I18nProvider } from 'fumadocs-ui/i18n';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYuxhwASGQBmcFYKj2lubHFZk5SqpBmXI",
  authDomain: "mwtw-net.firebaseapp.com",
  projectId: "mwtw-net",
  storageBucket: "mwtw-net.appspot.com",
  messagingSenderId: "424692273765",
  appId: "1:424692273765:web:b4d07dd797832a2dc06c8c",
  measurementId: "G-LSTF7BD9JP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
          locale='cn'
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