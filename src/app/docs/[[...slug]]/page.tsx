import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import Footer from '@/components/Footer';
import { footer } from 'config';
import { Metadata } from 'next';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} footer={{
      component: (
        <p className="mt-2 text-xs text-muted-foreground text-center mb-4">
          Copyright © 2022 ~ {new Date(Date.now()).getFullYear()} 多元世界團隊. All Rights Reserved
        </p>
      )
    }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ 
          ...defaultMdxComponents,
          Steps,
          Step,
        }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title + " - 星球文件 | 多元世界團隊",
    description: page.data.description,
    openGraph: {
      title: page.data.title + " - 星球文件 | 多元世界團隊",
      description: page.data.description,
    }
  };
}
