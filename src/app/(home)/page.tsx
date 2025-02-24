import { Metadata } from 'next';
import Hero from './components/hero';

export default function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}

export const metadata: Metadata = ({
  title: {
    template: '%s - 多元世界團隊',
    default: '多元世界團隊',
  },
  description: '我們是一個團隊，致力於打造一個多元化聊天世界，以及各種機器人、軟體、網頁開發。',
});