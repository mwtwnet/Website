import type { MDXComponents } from 'mdx/types';
import defaultComponents from 'fumadocs-ui/mdx';
import { Info, Warning, Error, Tip } from './app/components/mdx/Admonition';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { Accordions, Accordion } from 'fumadocs-ui/components/accordion';
import { File, Folder, Files } from 'fumadocs-ui/components/files';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

export function useMDXComponents(): MDXComponents {
  return {
    ...defaultComponents,
    Tip,
    Info,
    Warning,
    Error,
    Step,
    Steps,
    Accordions,
    Accordion,
    File,
    Folder,
    Files,
    Tab,
    Tabs
  };
}
