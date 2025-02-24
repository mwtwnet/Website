import { docs, blog } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

export const blogS = loader({
  baseUrl: '/blog',
  source: createMDXSource(blog),
})