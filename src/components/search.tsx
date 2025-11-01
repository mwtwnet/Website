'use client';
import {
    SearchDialog,
    SearchDialogClose,
    SearchDialogContent,
    SearchDialogFooter,
    SearchDialogHeader,
    SearchDialogIcon,
    SearchDialogInput,
    SearchDialogList,
    SearchDialogOverlay,
    TagsList,
    TagsListItem,
    type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useState } from 'react';
import { liteClient } from 'algoliasearch/lite';

const appId = 'FZX47YIHED';
const apiKey = 'd67f7a30f583a6aa294878857d44a694';
const client = liteClient(appId, apiKey);

export default function CustomSearchDialog(props: SharedProps) {
    const { locale } = useI18n(); // (optional) for i18n
    const [tag, setTag] = useState<string | undefined>('docs');
    const { search, setSearch, query } = useDocsSearch({
        type: 'algolia',
        client,
        indexName: 'MWTW',
        locale,
        tag
    });

    return (
        <SearchDialog
            search={search}
            onSearchChange={setSearch}
            isLoading={query.isLoading}
            {...props}
        >
            <SearchDialogOverlay />
            <SearchDialogContent>
                <SearchDialogHeader>
                    <SearchDialogIcon />
                    <SearchDialogInput />
                    <SearchDialogClose />
                </SearchDialogHeader>
                <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
                <SearchDialogFooter className='flex flex-row justify-between'>
                    <TagsList tag={tag} onTagChange={setTag}>
                        <TagsListItem value="docs">文檔</TagsListItem>
                        <TagsListItem value="blog">部落格</TagsListItem>
                    </TagsList>
                    <a
                        href="https://algolia.com"
                        rel="noreferrer noopener"
                        className="ms-auto text-xs text-fd-muted-foreground"
                        target="_blank"
                    >
                        搜索由 Algolia 提供支持
                    </a>
                </SearchDialogFooter>
            </SearchDialogContent>
        </SearchDialog>
    );
}