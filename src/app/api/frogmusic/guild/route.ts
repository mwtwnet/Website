import { NextRequest, NextResponse } from "next/server";
import { createClient } from 'redis';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const guildId = searchParams.get('guildId');
    const botId = searchParams.get('botId');
    var key = `1216003625503948830:player:${guildId}`;
    
    if (!guildId) {
        return NextResponse.json({ error: 'Missing guildId' }, { status: 400 });
    }
    
    if (botId) {
        key = `${botId}:player:${guildId}`;
    }

    const client = await createClient({
        url: 'redis://172.16.27.114:6379/0'
    }).on('error', err => console.log('Redis Client Error', err)).connect();
    
    const value = await client.get(key);
    const d = JSON.parse(value || '{}');
    
    const output = {
        data: d.queue || {},
        position: d.position || 0,
        paused: d.paused || false,
        playing: d.playing || false,
    }
    
    await client.disconnect();
    
    return NextResponse.json(output);
}
