import { docs, blog } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createElement } from 'react';
// Lucide
import { icons as lucideIcons } from 'lucide-react';
// MDI
import * as mdiIcons from '@mdi/js';
import IconElement from '@mdi/react';
import { createMDXSource } from 'fumadocs-mdx/runtime/next';

const classIcon = ""

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) {
      // You may set a default icon
      return;
    }
    if (icon.startsWith("mdi-")) {
      const name = icon.slice(4);
      if (name in mdiIcons) return createElement(IconElement, { path: mdiIcons[name as keyof typeof mdiIcons], className: classIcon });
    } else {
      if (icon in lucideIcons) return createElement(lucideIcons[icon as keyof typeof lucideIcons], { className: classIcon });
    }
    
  },  
});

export const blogS = loader({
  baseUrl: '/blog',
  source: createMDXSource(blog),
})