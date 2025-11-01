import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['scripts/sync-content.ts'],
  format: ['esm'],
  outDir: 'dist-scripts',
  clean: true,
  external: ['fumadocs-core', 'algoliasearch'],
  noExternal: [],
  bundle: true,
  dts: false,
});
