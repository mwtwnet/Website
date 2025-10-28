import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import Image from 'next/image';

import Logo from '@public/assets/logo.png';
import TranslationLayout from './translation';
import BGOverlay from "./bg";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      links={[]}
      themeSwitch={{enabled: false}}
      nav={{
        url: "/",
        title: (
          <>
            <Image
              alt=":D"
              src={Logo}
              sizes="100px"
              className="w-10 md:w-10" />
            <span className="font-bold text-xl">星球文件</span>
          </>
        ),
      }}>
      <BGOverlay />
      <TranslationLayout>
        {children}
      </TranslationLayout>
    </DocsLayout>
  );
}
