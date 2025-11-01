"use client";
// import { cn } from "@/lib/utils";
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";
import {Callout} from "fumadocs-ui/components/callout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Scroll, ScrollText, Wifi, WifiOff, Loader2 } from "lucide-react";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { LyricsSelector } from "@/components/lyrics-selector";

async function fetchMusicData(guildId: string, botId?: string) {
    const params = new URLSearchParams({ guildId });
    if (botId) params.append('botId', botId);
    
    const data = await (await fetch(`/api/frogmusic/guild?${params.toString()}`)).json();
    return data;
}

async function fetchLyricsFromAPI(title: string, artist: string, lyricsId?: number) {
    try {
        // If lyricsId is provided, fetch specific lyrics
        if (lyricsId) {
            const response = await fetch(`https://lrclib.net/api/get/${lyricsId}`);
            if (!response.ok) throw new Error('Failed to fetch lyrics');
            return await response.json();
        }
        
        // Search for lyrics by title and artist
        const searchUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(title)}&artist_name=${encodeURIComponent(artist)}`;
        const response = await fetch(searchUrl);
        if (!response.ok) throw new Error('Failed to search lyrics');
        
        const results = await response.json();
        return results;
    } catch (error) {
        console.error('Error fetching lyrics from API:', error);
        throw error;
    }
}

function format(str: number) {
    // hours min sec
    if (!str) return 'NAN';
    if (str == 0) return 'NAN';
    str = Math.floor(str / 1000);
    const hours = Math.floor(str / 3600);
    const minutes = Math.floor((str % 3600) / 60);
    const seconds = str % 60;
    if (hours) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function parseToSec(str: number) {
    str = Math.round(str / 1000);
    // str = str / 60;
    return str;
}

function parseShow(timeS: number, timeE: number, current: number) {
    // timeS Start, timeE End, current Current
    if (timeS < parseToSec(current) && timeE > parseToSec(current)) {
        return true;
    }
    return false;
}

export default function Page() {
    const params = useSearchParams();

    var guildId = params.get('guildId');
    const discordGuildId = params.get('guild_id');
    if (discordGuildId) {
        guildId = discordGuildId;
    }
    var botId = params.get('botId') || undefined;

    // Use WebSocket hook for real-time updates
    const { musicData, connected } = useMusicPlayer(guildId, botId);

    const [image, setImage] = useState('/assets/150.png');
    const [title, setTitle] = useState('沒有正在播放的歌曲');
    const [author, setAuthor] = useState('N/A');
    const [percentage, setPercentage] = useState(0);
    const [paused, setPaused] = useState(false);
    const [length, setLength] = useState(0);
    const [current, setCurrent] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [lyrics, setLyrics] = useState<string | null>(null); // plaintext lyrics
    const [asyncLyrics, setAsyncLyrics] = useState<{content: any, timeS: number, timeE: number}[]>([]); // synced lyrics
    const [autoScroll, setAutoScroll] = useState(true); // synced lyrics auto scroll
    const [lyricsResults, setLyricsResults] = useState<any[]>([]);
    const [selectedLyricsId, setSelectedLyricsId] = useState<number | undefined>();

    const view = useRef<HTMLDivElement>(null);
    const lastSongRef = useRef<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const lastServerUpdateRef = useRef<number>(Date.now());
    const serverPositionRef = useRef<number>(0);
    const [lyricsLoaded, setLyricsLoaded] = useState(false);

    const animations = {
        show: { width: 'auto', opacity: 1 },
        hide: { width: '0px', opacity: 0 }
    }

    const fetchLyricsAsync = async (lyricsId?: number) => {
        // For initial search, validate we have proper song data
        if (!lyricsId && (!title || !author || title === '沒有正在播放的歌曲' || author === 'N/A')) {
            console.log('Skipping lyrics fetch - no valid song data yet');
            return;
        }
        
        try {
            const data = await fetchLyricsFromAPI(title, author, lyricsId);
            
            setLyricsLoaded(true);
            
            // If fetching specific lyrics by ID
            if (lyricsId && !Array.isArray(data)) {
                if (data.syncedLyrics) {
                    // Parse synced lyrics client-side
                    const lines = data.syncedLyrics.split('\n');
                    const parsed = lines.map((line: string) => {
                        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
                        if (match) {
                            const minutes = parseInt(match[1]);
                            const seconds = parseFloat(match[2]);
                            const timeInSeconds = Math.round((minutes * 60 + seconds) * 1000); // Convert to milliseconds and round
                            return {
                                content: [{ content: match[3].trim(), startsAt: timeInSeconds / 1000 }],
                                timeS: timeInSeconds / 1000,
                                timeE: timeInSeconds / 1000 + 8 // Extended display window (8 seconds)
                            };
                        }
                        return null;
                    }).filter(Boolean);
                    
                    setAsyncLyrics(parsed as any);
                    setLyrics(null);
                    setError(null);
                } else if (data.plainLyrics) {
                    setLyrics(data.plainLyrics);
                    setAsyncLyrics([]);
                    setError('No synced lyrics found');
                } else {
                    setError('No lyrics found');
                    setLyrics(null);
                    setAsyncLyrics([]);
                }
                return;
            }
            
            // Handle search results
            if (Array.isArray(data)) {
                setLyricsResults(data);
                
                if (data.length === 0) {
                    setError('No lyrics found');
                    setLyrics(null);
                    setAsyncLyrics([]);
                    return;
                }
                
                if (!selectedLyricsId && data[0]) {
                    setSelectedLyricsId(data[0].id);
                }
                
                // Use first result
                const firstResult = data[0];
                if (firstResult.syncedLyrics) {
                    // Parse synced lyrics client-side
                    const lines = firstResult.syncedLyrics.split('\n');
                    const parsed = lines.map((line: string) => {
                        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
                        if (match) {
                            const minutes = parseInt(match[1]);
                            const seconds = parseFloat(match[2]);
                            const timeInSeconds = Math.round((minutes * 60 + seconds) * 1000); // Convert to milliseconds and round
                            return {
                                content: [{ content: match[3].trim(), startsAt: timeInSeconds / 1000 }],
                                timeS: timeInSeconds / 1000,
                                timeE: timeInSeconds / 1000 + 8 // Extended display window (8 seconds)
                            };
                        }
                        return null;
                    }).filter(Boolean);
                    
                    setAsyncLyrics(parsed as any);
                    setLyrics(null);
                    setError(null);
                } else if (firstResult.plainLyrics) {
                    setLyrics(firstResult.plainLyrics);
                    setAsyncLyrics([]);
                    setError('No synced lyrics found');
                } else {
                    setError('No synced lyrics found');
                    setLyrics(null);
                    setAsyncLyrics([]);
                }
            }
        } catch (err) {
            console.error('Error fetching lyrics:', err);
            setError('Failed to fetch lyrics');
            setLyricsLoaded(true);
        }
    };

    const handleLyricsSelect = async (id: number) => {
        setSelectedLyricsId(id);
        setLyricsLoaded(false);
        setAsyncLyrics([]);
        setLyrics(null);
        setError(null);
        await fetchLyricsAsync(id);
    };

    // Update state when musicData changes from WebSocket
    useEffect(() => {
        if (!musicData) return;

        // Mark as initialized once we receive first data
        if (isInitializing) {
            setIsInitializing(false);
        }

        if (musicData.data.current) {
            const currentSong = musicData.data.current.info.title;
            
            setImage(musicData.data.current.info.artworkUrl);
            setTitle(musicData.data.current.info.title);
            setAuthor(musicData.data.current.info.author);
            setPercentage((musicData.position / 1000) / musicData.data.current.info.duration);
            setPaused(musicData.paused);
            setLength(musicData.data.current.info.duration);
            
            // Update server position and timestamp
            const serverPosition = Number(musicData.position);
            serverPositionRef.current = serverPosition;
            lastServerUpdateRef.current = Date.now();
            
            // Only sync if server is ahead or difference is more than 2 seconds
            // This prevents backward jumps when local timer is slightly faster
            if (serverPosition > current || Math.abs(current - serverPosition) > 2000) {
                setCurrent(serverPosition);
            }
            
            // Only clear error if it's "No song playing"
            if (error === 'No song playing') {
                setError(null);
            }
            
            // Fetch lyrics when song changes
            if (lastSongRef.current !== currentSong) {
                lastSongRef.current = currentSong;
                setLyricsLoaded(false);
                setError(null);
                setLyrics(null);
                setAsyncLyrics([]);
                setLyricsResults([]);
                setSelectedLyricsId(undefined);
                fetchLyricsAsync();
            }
        } else if (!musicData.playing) {
            setError('No song playing');
            setImage('/assets/150.png');
            setTitle('沒有正在播放的歌曲');
            setAuthor('N/A');
            setPercentage(0);
            setLength(0);
            setCurrent(0);
            setPaused(true);
            lastSongRef.current = null;
            serverPositionRef.current = 0;
        }
    }, [musicData]);

    // Fetch lyrics when title and author are updated
    useEffect(() => {
        // Skip if no valid data or if it's the initial state
        if (!title || !author || title === '沒有正在播放的歌曲' || author === 'N/A') {
            return;
        }
        
        // Only fetch if we don't already have lyrics for this song
        if (!lyricsLoaded && asyncLyrics.length === 0 && !lyrics) {
            fetchLyricsAsync();
        }
    }, [title, author]);

    // Client-side position counter when not paused
    useEffect(() => {
        if (paused || !musicData?.playing) return;
        
        const interval = setInterval(() => {
            // Calculate position based on server time + elapsed time
            const elapsedSinceUpdate = Date.now() - lastServerUpdateRef.current;
            const estimatedPosition = serverPositionRef.current + elapsedSinceUpdate;
            setCurrent(estimatedPosition);
        }, 100); // Update more frequently for smoother display

        return () => clearInterval(interval);
    }, [paused, musicData?.playing]);

    // Auto scroll lyrics
    useEffect(() => {
        if (view.current && autoScroll) {
            const element = view.current.getElementsByClassName("current");
            if (element && element.length > 0) {
                element[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [current, autoScroll]);

    // Sync HTML title with current song
    useEffect(() => {
        if (title && title !== '沒有正在播放的歌曲') {
            document.title = `${title} - 青蛙音樂歌詞系統`;
        } else {
            document.title = '青蛙音樂歌詞系統';
        }
    }, [title]);

    // Show error if no guildId provided
    if (!guildId) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <Callout type="error" className="prose">
                        請提供 guildId 參數<br />
                        例如: /music?guildId=YOUR_GUILD_ID
                    </Callout>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="fixed blur-sm -z-10 w-screen h-screen bg-cover bg-[url('/assets/banner.png')]"></div>

            {/* Floating Lyrics Selector */}
            {lyricsResults.length > 1 && (
                <div className="fixed top-4 left-0 right-0 flex justify-center z-40 px-4">
                    <LyricsSelector 
                        results={lyricsResults} 
                        onSelect={handleLyricsSelect}
                        selectedId={selectedLyricsId}
                    />
                </div>
            )}

            <div className="h-[calc(100vh-6rem)] overflow-y-auto">
                <div className="container mt-8">
                    { error == 'No song playing' && (
                        <Callout type="error" className="prose">沒有正在播放的歌曲 {"😢"}</Callout>
                    )}
                    { error == 'No lyrics found' && (
                        <Callout type="error" className="prose">無法獲取歌詞 {"😢"}</Callout>
                    )}
                    { error == 'No synced lyrics found' && (
                        <>
                            <Callout type="warn" className="prose">無法獲取同步歌詞 {"😎"}</Callout>
                            {!lyrics && (
                                <Callout type="info" className="prose">如果歌詞有誤，歡迎投稿至 <a href="#">這裡</a> (尚未開放投稿)</Callout>
                            )}
                            {lyrics && (
                                <>
                                    <Callout type="info" className="prose">已獲取純文字歌詞</Callout>
                                    <div className="prose mb-2 whitespace-pre-line bg-white/5 p-4 rounded-lg">
                                        {lyrics.split('\n').map((line, index) => <p key={index} className="my-2">{line || '\u00A0'}</p>)}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    
                    {error == null && asyncLyrics.length > 0 && (
                        <div className="mb-2" ref={view}>
                            <Callout type="info" className="prose">已獲取同步歌詞，因資料庫音樂同步歌詞有限，不少歌詞會有誤</Callout>
                            <Callout type="warn" className="prose">如果同步歌詞有誤，歡迎投稿至 <a href="#">這裡</a> (尚未開放投稿)</Callout>
                            {
                                asyncLyrics.map((content, index) => {
                                    const show = parseShow(content.timeS, content.timeE, current); 
                                    return (
                                        <motion.p key={index} 
                                            className={cn(
                                                "p-4 text-lg",
                                                "vi-"+index,
                                                show ? "current": "none"
                                            )}
                                            initial={{ opacity: 0.7 }}
                                            animate={{ opacity: show ? 1 : 0.5, y: show ? 0 : 10 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {/* <h2>{Number(content.content[0]?.startsAt).toFixed(2)} 👍 {content.content[0]?.content}</h2> */}
                                            { isNaN(Number(content.content[0]?.startsAt)) ? null : <>[{Number(content.content[0]?.startsAt).toFixed(2)}]</> } {content.content[0]?.content}
                                        </motion.p>
                                    )
                                })
                            }
                        </div>
                    )}

                    {error == null && asyncLyrics.length === 0 && musicData?.playing && !lyricsLoaded && (
                        <Callout type="info" className="prose">載入歌詞中...</Callout>
                    )}
                    
                    {lyricsLoaded && error == null && asyncLyrics.length === 0 && !lyrics && (
                        <Callout type="warn" className="prose">此歌曲沒有可用的歌詞</Callout>
                    )}
                </div>
            </div>


            <div className="fixed bottom-0 p-4 shadow-lg border-t border-white w-full flex justify-between items-center bg-black/70 h-24">
                <div className="flex items-center gap-4">
                    <img src={image} className="w-16 h-16 rounded-sm"/>
                    <div className="flex flex-col">
                        <p className="text-white text-lg">{title}</p>
                        <p className="text-gray-400 text-sm">{author}</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    {/* Connection status indicator */}
                    <div className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg",
                        connected ? "bg-green-500/20 text-green-400" : 
                        isInitializing ? "bg-yellow-500/20 text-yellow-400" : 
                        "bg-red-500/20 text-red-400"
                    )}>
                        {connected ? (
                            <Wifi className="w-4 h-4" />
                        ) : isInitializing ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <WifiOff className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                            WS {connected ? "已連接" : isInitializing ? "連接中..." : "未連接"}
                        </span>
                    </div>
                    <div>
                        <p className="text-white text-sm text-center">{format(paused ? 0 : current)} / {format(length)}</p>
                        <p>多元世界團隊 ❤️ 2025</p>
                    </div>
                </div>
            </div>

            <motion.button
                className={cn(
                    buttonVariants({
                        color: 'outline',
                        // size: 'sm',
                        }),
                    "justify-start fixed bottom-20 -left-4 p-2 m-8 z-100 rounded-xl bg-secondary/50 text-fd-secondary-foreground/80 shadow-lg backdrop-blur-lg text-nowrap font-semibold"
                )}
                onClick={(e) => {
                    e.preventDefault();
                    setAutoScroll(!autoScroll);
                }}
                initial="hide"
                whileHover="show"
                transition={{ duration: 0.5 }}
            >
                <ScrollText /><motion.span variants={animations}>&nbsp;{autoScroll ? " 關閉自動跟隨" : " 開啟自動跟隨"}</motion.span>
            </motion.button>
        </div>
    )
}