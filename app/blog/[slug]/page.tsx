import { blogs } from "@/app/source";
import { blogAuthors, domain } from "@/config";
import { DocsBody } from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export default function BlogPage({ params }: { params: { slug: string } }) {
  const page = blogs.getPage([params.slug]);

  if (!page) notFound();
  const MDX = page.data.body;

  return (
    <DocsBody>
      <MDX />
    </DocsBody>
  );
}

export function generateStaticParams() {
  return blogs.getPages().map((blog) => ({
    slug: blog.slugs[0],
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = blogs.getPage([params.slug]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: `${domain}/blog/${params.slug}`,
    },
    openGraph: {
      type: "article",
      tags: page.data.tags,
      authors: page.data.authors.map((author) => blogAuthors[author].name),
      title: page.data.title,
      description: page.data.description,
      images: page.data.image ?? "/og.png",
    },
  };
}