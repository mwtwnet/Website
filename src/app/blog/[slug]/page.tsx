import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blogS } from '@/lib/source';
import { buttonVariants } from '@/components/ui/button';
import { Control } from './page.client';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blogS.getPage([params.slug]);

  if (!page) notFound();
  const { body: Mdx, toc } = page.data;

  return (
    <>
      <div
        className="container rounded-xl border py-12 md:px-8 mt-4"
        style={{
          backgroundColor: 'black',
          backgroundImage: [
            'linear-gradient(140deg, hsla(274,94%,54%,0.3), transparent 50%)',
            'linear-gradient(to left top, hsla(260,90%,50%,0.8), transparent 50%)',
            'radial-gradient(circle at 100% 100%, hsla(240,100%,82%,1), hsla(240,40%,40%,1) 17%, hsla(240,40%,40%,0.5) 20%, transparent)',
          ].join(', '),
          backgroundBlendMode: 'difference, difference, normal',
        }}
      >
        <h1 className="mb-2 text-3xl font-bold text-white">
          {page.data.title}
        </h1>
        <p className="mb-4 text-white/80">{page.data.description}</p>
        <Link
          href="/blog"
          className={buttonVariants({ size: 'sm', variant: 'secondary' })}
        >
          返回列表
        </Link>
      </div>
      <article className="container flex flex-col px-0 py-8 lg:flex-row lg:px-4">
        <div className="prose min-w-0 flex-1 p-4">
          <InlineTOC items={toc} />
          <Mdx
            components={{
              ...defaultMdxComponents,
            }}
          />
        </div>
        <div className="flex flex-col gap-4 border-l p-4 text-sm lg:w-[250px]">
          <div>
            <p className="mb-1 text-fd-muted-foreground">作者</p>
            <p className="font-medium">{page.data.author}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-fd-muted-foreground">發佈時間</p>
            <p className="font-medium">
              {new Date(page.data.date ?? page.file.name).toLocaleDateString("zh-tw", {
                dateStyle: "full"
              })}
            </p>
          </div>
          <Control url={page.url} />
        </div>
      </article>
    </>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = blogS.getPage([params.slug]);

  if (!page) notFound();

  return ({
    title: page.data.title,
    description: page.data.description,
  });
}

export function generateStaticParams(): { slug: string }[] {
  return blogS.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}