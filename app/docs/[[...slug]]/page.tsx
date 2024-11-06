import type { Metadata } from 'next';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { docSource } from '@/app/source';
import { useMDXComponents } from '@/mdx-components';

interface Param {
  slug: string[];
}

export default function Page({
  params,
}: {
  params: Param;
}): React.ReactElement {
  const page = docSource.getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: 'clerk',
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={
          useMDXComponents()
        }/>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return docSource.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = docSource.getPage(params.slug);

  if (page == null) notFound();

  return {
    title: page.data.title + " - 多元世界の星球文件",
    description: page.data.description,
  } satisfies Metadata;
}

export const runtime = 'edge';