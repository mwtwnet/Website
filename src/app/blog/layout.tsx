import { Metadata } from "next";
import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';
import Footer from '@/components/Footer';
import { footer } from 'config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions} themeSwitch={{enabled: false}}>
      {children}
      <Footer categories={footer} />
    </HomeLayout>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: {
      template: "%s - 星球日記 | 多元世界團隊",
      default: "星球日記 | 多元世界團隊",
    },
    openGraph: {
      title: {
        template: "%s - 星球日記 | 多元世界團隊",
        default: "星球日記 | 多元世界團隊",
      }
    }
  }
}