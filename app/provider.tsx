'use client';

import { RootProvider } from 'fumadocs-ui/provider';
import { I18NProvider } from 'next/dist/server/future/helpers/i18n-provider';
import type { ReactNode } from 'react';

export function Provider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <RootProvider>  
      {children}
    </RootProvider>
  );
}