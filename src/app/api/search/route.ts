import { blogS, source } from '@/lib/source';
import { AdvancedIndex, createFromSource, createSearchAPI } from 'fumadocs-core/search/server';

function getPages() {
    var pages: AdvancedIndex[] = [];

    source.getPages().forEach((page) => (
        pages.push({
            title: page.data.title,
            description: page.data.description,
            url: page.url,
            id: page.url,
            structuredData: page.data.structuredData,
            tag: 'doc'
        })
    ))
    
    blogS.getPages().forEach((page) => (
        pages.push({
            title: page.data.title,
            description: page.data.description,
            url: page.url,
            id: page.url,
            structuredData: page.data.structuredData,
            tag: 'blog'
        })
    ))

    return pages;
}



export const { GET } = createSearchAPI('advanced', {
    indexes: getPages()
})
