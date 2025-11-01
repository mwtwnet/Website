import { NextRequest } from "next/server";
import { createClient } from 'redis';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const guildId = searchParams.get('guildId');
    const botId = searchParams.get('botId');

    if (!guildId) {
        return new Response('Missing guildId', { status: 400 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            let redisClient: any = null;
            let interval: NodeJS.Timeout | null = null;
            let isConnected = false;

            try {
                // Connect to Redis
                redisClient = await createClient({
                    url: 'redis://172.16.27.114:6379/0'
                }).on('error', err => console.log('Redis Client Error', err)).connect();

                isConnected = true;
                const key = botId ? `${botId}:player:${guildId}` : `1216003625503948830:player:${guildId}`;

                // Send initial data
                const initialValue = await redisClient.get(key);
                const initialData = JSON.parse(initialValue || '{}');
                const output = {
                    data: initialData.queue || {},
                    position: initialData.position || 0,
                    paused: initialData.paused || false,
                    playing: initialData.playing || false,
                };

                controller.enqueue(encoder.encode(`data: ${JSON.stringify(output)}\n\n`));

                // Poll Redis for updates every 2 seconds
                interval = setInterval(async () => {
                    try {
                        if (!isConnected || !redisClient) return;
                        
                        const value = await redisClient.get(key);
                        const data = JSON.parse(value || '{}');
                        const output = {
                            data: data.queue || {},
                            position: data.position || 0,
                            paused: data.paused || false,
                            playing: data.playing || false,
                        };

                        controller.enqueue(encoder.encode(`data: ${JSON.stringify(output)}\n\n`));
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }, 2000);

                // Cleanup on close
                req.signal.addEventListener('abort', async () => {
                    if (interval) {
                        clearInterval(interval);
                        interval = null;
                    }
                    
                    if (redisClient && isConnected) {
                        try {
                            isConnected = false;
                            await redisClient.disconnect();
                        } catch (err) {
                            // console.error('Error disconnecting Redis client:', err);
                        }
                    }
                    
                    try {
                        controller.close();
                    } catch (err) {
                        // Controller might already be closed
                    }
                });
            } catch (error) {
                console.error('Redis connection error:', error);
                
                // Clean up on error
                if (interval) {
                    clearInterval(interval);
                }
                
                if (redisClient && isConnected) {
                    try {
                        isConnected = false;
                        await redisClient.disconnect();
                    } catch (err) {
                        console.error('Error disconnecting Redis client on error:', err);
                    }
                }
                
                controller.error(error);
            }
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}
