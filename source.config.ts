import { remarkImage } from 'fumadocs-core/mdx-plugins';
import { z } from 'zod';
import { defineDocs, defineConfig, defineCollections, frontmatterSchema } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs',
});

export const blog = defineCollections({
  dir: 'content/blog',
  type: 'doc',
  schema: frontmatterSchema.extend({
    date: z.date(),
    author: z.string().optional(),
  }),
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      [remarkImage, { useImport: false }],
    ]
  },
});
