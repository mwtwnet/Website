import { NextRequest, NextResponse } from "next/server";
import { createClient } from 'redis';
import axios from 'axios';
import parseLyrics from "@/lib/lyrics/parseLyrics";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const guildId = searchParams.get('guildId');
    const lyrics = searchParams.get('lyrics');
    const async = searchParams.get('async');
    const botId = searchParams.get('botId');
    var key = `1216003625503948830:player:${guildId}`;
    if (!guildId) {
        return NextResponse.json({ error: 'Missing guildId' }, { status: 400 });
    }
    if (botId) {
        key = `${botId}:player:${guildId}`;
    }


    const client = await createClient({
        url: 'redis://192.168.28.55:6379/0'
    }).on('error', err => console.log('Redis Client Error', err)).connect();
    const value = await client.get(key);
    const d = JSON.parse(value || '{}');
    // console.log(d)
    const output = {
        data: d.queue || {},
        position: d.position || 0,
        paused: d.paused || false,
        playing: d.playing || false,
    }
    await client.disconnect();

    if (lyrics) {
        if (!output.data.current) {
            return NextResponse.json({ error: 'No song playing' });
        }

        // output.data.current.info.title = "faded";

        const d = await axios.get(`https://lrclib.net/api/search?q=${output.data.current.info.title}&artist=${output.data.current.info.author}`);
        
        if (d.data.length === 0) {
            return NextResponse.json({ error: 'No lyrics found' });
        };
        // console.log(d.data[0])
        if (!async) {
            return NextResponse.json(d.data);
        } else {
            // console.log(d.data[0])
            // console.log(output.data.current)
            // d.data.filter((item: any) => item.duration === output.data.current.info);
            if (!d.data[0].syncedLyrics) {
                return NextResponse.json({ error: 'No synced lyrics found', plainText: d.data[0].plainLyrics });
            }
            
            const synced = parseLyrics(d.data[0].syncedLyrics);
            return NextResponse.json(synced);
        }
    }
    return NextResponse.json(output);
}