"use client";
import { DocsLayout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { baseOptions } from '../layout.config';
import { DocsPage } from 'fumadocs-ui/page';
import { docSource } from '../source';

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  let path = usePathname();
  return (
    <DocsLayout 
        sidebar={{
            enabled: true,
            defaultOpenLevel: 0,
        }}
        nav={baseOptions.nav}
        tree={docSource.pageTree}
        links={baseOptions.links}
    >
        {children}
    </DocsLayout>
  );
}
