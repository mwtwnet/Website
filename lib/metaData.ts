import { Metadata } from "next";

export function createMetadata(override: Metadata): Metadata {
    return {
        ...override,
        openGraph: {
            title: override.title ?? undefined,
            description: override.description ?? undefined,
            url: 'https://mwtw.net',
            images: '/og.png',
            siteName: '多元世界團隊',
            ...override.openGraph,
        },
        twitter: {
            card: 'summary_large_image',
            creator: '@soldierp',
            title: override.title ?? undefined,
            description: override.description ?? undefined,
            images: '/og.png',
            ...override.twitter,
        },
    };
}