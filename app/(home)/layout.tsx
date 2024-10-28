import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { baseOptions } from '../layout.config';
import Footer from '../components/Footer';
import { footer } from '@/config';

export default function HomeLay({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return(
    <HomeLayout nav={baseOptions.nav} links={baseOptions.links}>
      {children}
      <Footer categories={footer}/>
    </HomeLayout>
  );
}