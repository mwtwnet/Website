import { blogS, source } from '@/lib/source';
import type { DocumentRecord } from 'fumadocs-core/search/algolia';

export async function exportSearchIndexes() {
    const results: DocumentRecord[] = [];

    for (const page of source.getPages()) {
        results.push({
            _id: page.url,
            structured: page.data.structuredData,
            url: page.url,
            title: page.data.title,
            description: page.data.description,
            tag: "docs"
        });
    }

    for (const post of blogS.getPages()) {
        results.push({
            _id: post.url,
            structured: post.data.structuredData,
            url: post.url,
            title: post.data.title,
            description: post.data.description,
            tag: "blog"
        });
    }
    return results;
}