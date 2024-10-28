import { Hero } from '@/app/components/home/Hero';
import { urlBase } from '@/config';
import { createMetadata } from '@/lib/metaData';

export default function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}

export const metadata = createMetadata({
  title: {
    template: '%s - 多元世界團隊',
    default: '多元世界團隊',
  },
  description: '我們是一個團隊，致力於打造一個多元化聊天世界，以及各種機器人、軟體、網頁開發。',
  metadataBase: urlBase,
});