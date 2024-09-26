import { DocsLayout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { baseOptions } from '../layout.config';
import { docSource } from '../source';

export default function RootDocsLayout({ children }: { children: ReactNode }) {
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
