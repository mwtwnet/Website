// source.config.ts
import { fileGenerator, remarkDocGen, remarkInstall, typescriptGenerator } from "fumadocs-docgen";
import { defineCollections, defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { z } from "zod";
var { docs, meta } = defineDocs();
var blog = defineCollections({
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    authors: z.array(z.string()).default([]),
    date: z.date().default(/* @__PURE__ */ new Date())
  }),
  type: "doc"
});
var source_config_default = defineConfig({
  generateManifest: true,
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions: {
      inline: "tailing-curly-colon",
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha"
      }
    },
    remarkPlugins: [
      remarkMath,
      [remarkInstall, { persist: { id: "package-manager" } }],
      [remarkDocGen, { generators: [typescriptGenerator(), fileGenerator()] }]
    ],
    rehypePlugins: (v) => [rehypeKatex, ...v]
  }
});
export {
  blog,
  source_config_default as default,
  docs,
  meta
};
