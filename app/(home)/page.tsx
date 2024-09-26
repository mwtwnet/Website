import { Metadata } from 'next';
import { Container } from '@/app/components/home/Container';
import { Hero } from '@/app/components/home/Hero';
import { SectionTitle } from '@/app/components/home/SectionTitle';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <SectionTitle
        preTitle="Nextly Benefits"
        title=" Why should you use this landing page"
      >
        Nextly is a free landing page & marketing website template for startups
        and indie projects. Its built with Next.js & TailwindCSS. And its
        completely open-source.
      </SectionTitle> */}
    </>
  );
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  return {
    title: "多元世界團隊",
    description: "多元世界團隊",
    openGraph: {
      title: "多元世界團隊",
      description: "我們是一個團隊，致力於打造一個多元化聊天世界，並且讓每個人都能找到自己的位置。我們也帶給各位不同的想法和觀點，希望能夠幫助大家更好地了解這個虛擬世界。",
      images: "/og.png",
    }
  };
}