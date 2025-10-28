import { Metadata } from 'next';
import Hero from './components/hero';
import Features from './components/features';
import Projects from './components/projects';
import Team from './components/team';
import CTA from './components/cta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Projects />
      <Team />
      <CTA />
    </>
  );
}

export const metadata: Metadata = ({
  title: {
    template: '%s - 多元世界團隊',
    default: '多元世界團隊',
  },
  description: '我們是一個充滿創意的小團隊，專注於打造獨特的網頁應用和聊天機器人，為您的數位世界注入新活力。',
});