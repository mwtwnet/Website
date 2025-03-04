import { urlBase } from "../../config";
import type { MetadataRoute } from "next";
import { blogS, source } from "@/lib/source";

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const url = (path: string): string => new URL(path, urlBase).toString();
    return [
        {
            url: url('/'),
            changeFrequency: 'monthly',
            priority: 1,
          },
        {
            url: url('/tos'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: url('/privacy'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: url('/tos'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...source.getPages().map((page) => {
            const lastModified = page.data.lastModified;
            return {
              url: url(page.url),
              lastModified: lastModified ? new Date(lastModified) : undefined,
              changeFrequency: 'daily',
              priority: 0.5,
            } as MetadataRoute.Sitemap[number];
        }),
        ...blogS.getPages().map((page) => {
            const lastModified = page.data.date;
            return {
              url: url(page.url),
              lastModified: lastModified ? new Date(lastModified) : undefined,
              changeFrequency: 'daily',
              priority: 0.5,
            } as MetadataRoute.Sitemap[number];
        }),
    ]
}