import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';
import Footer from '@/components/Footer';
import { footer } from 'config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions} themeSwitch={{enabled: false}}>
      <div className="bg-black min-h-screen">
        {children}
      </div>
      <Footer categories={footer}/>
    </HomeLayout>
  );
}
