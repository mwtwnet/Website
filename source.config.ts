import { transformerRemoveNotationEscape } from '@shikijs/transformers';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import { Source } from 'fumadocs-core/source';
import { fileGenerator, remarkDocGen, remarkInstall, typescriptGenerator } from 'fumadocs-docgen';
import { defineCollections, defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import { transformerTwoslash } from 'fumadocs-twoslash';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { z } from 'zod';
 
export const { docs, meta } = defineDocs();

export const blog = defineCollections({
    dir: 'content/blog',
    schema: frontmatterSchema.extend({
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        authors: z.array(z.string()).default([]),
        date: z.date().default(new Date),
    }),
    type: 'doc',
})

export default defineConfig({
    generateManifest: true,
    lastModifiedTime: 'git',
    mdxOptions: {
        rehypeCodeOptions: {
            inline: 'tailing-curly-colon',
            themes: {
                light: 'catppuccin-latte',
                dark: 'catppuccin-mocha',
            },
        },
        remarkPlugins: [
            remarkMath,
            [remarkInstall, { persist: { id: 'package-manager' } }],
            [remarkDocGen, { generators: [typescriptGenerator(), fileGenerator()] }],
        ],
        rehypePlugins: (v) => [rehypeKatex, ...v],
    },
})