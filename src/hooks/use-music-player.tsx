import { useEffect, useState, useRef } from 'react';

interface MusicData {
    data: {
        current?: {
            info: {
                title: string;
                author: string;
                artworkUrl: string;
                duration: number;
            };
        };
    };
    position: number;
    paused: boolean;
    playing: boolean;
}

export function useMusicPlayer(guildId: string | null, botId?: string) {
    const [musicData, setMusicData] = useState<MusicData | null>(null);
    const [connected, setConnected] = useState(false);
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!guildId) return;

        const url = botId 
            ? `/api/frogmusic/ws?guildId=${guildId}&botId=${botId}`
            : `/api/frogmusic/ws?guildId=${guildId}`;

        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            setConnected(true);
            console.log('SSE connection opened');
        };

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setMusicData(data);
            } catch (error) {
                console.error('Error parsing SSE data:', error);
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            setConnected(false);
            eventSource.close();
            
            // Reconnect after 5 seconds
            setTimeout(() => {
                console.log('Reconnecting...');
            }, 5000);
        };

        return () => {
            eventSource.close();
            setConnected(false);
        };
    }, [guildId, botId]);

    return { musicData, connected };
}
