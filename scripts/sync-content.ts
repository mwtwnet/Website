import { sync, DocumentRecord } from 'fumadocs-core/search/algolia';
import * as fs from 'node:fs';
import 'dotenv/config';
import { algoliasearch } from 'algoliasearch';


async function main() {
    console.log('Starting search sync...');

    const content = fs.readFileSync('.next/server/app/static.json.body');

    const appId = process.env.ALGOLIA_APP_ID || '';
    const appKey = process.env.ALGOLIA_ADMIN_API_KEY || '';

    const records = JSON.parse(content.toString()) as DocumentRecord[];
    const client = algoliasearch(appId, appKey);

    await sync(client, {
        indexName: 'MWTW',
        documents: records,
    });
    console.log(`Search updated: ${records.length} records`);
}

void main();