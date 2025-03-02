"use client";
// import { cn } from "@/lib/utils";
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";
import {Callout} from "fumadocs-ui/components/callout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

async function fetchData(guildId: string) {
    const data = await (await axios.get('/api/frogmusic/guild?guildId=' + guildId)).data;
    // console.log(data);
    return data;
}

async function fetchLyrics(guildId: string) {
    const data = await (await axios.get('/api/frogmusic/guild?guildId=' + guildId + "&lyrics=true&async=true")).data;
    // console.log(data);
    return data;
}

function format(str: number) {
    // hours min sec
    if (!str) return 'NAN';
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

    const [image, setImage] = useState('/assets/150.png');
    const [title, setTitle] = useState('無');
    const [author, setAuthor] = useState('無');
    const [percentage, setPercentage] = useState(0);
    // const [paused, setPaused] = useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [length, setLength] = useState(0);
    const [current, setCurrent] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [lyrics, setLyrics] = useState<string | null>(null); // plaintext lyrics
    const [asyncLyrics, setAsyncLyrics] = useState<{content: any, timeS: number, timeE: number}[]>([]); // synced lyrics

    const view = useRef<HTMLDivElement>(null);

    var oldPosition = 0;

    const [intervalStarted, setIntervalStarted] = useState(false);

    useEffect(() => {
        if (view.current) {
            const element = view.current.getElementsByClassName("current");
            if (element) {
                if (element.length > 0) {
                    element[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
            console.log(view.current.classList)
        }

        const fetchDataAsync = async () => {
            const data = await fetchData(guildId as string);

            setImage(data.data.current.info.artworkUrl);
            setTitle(data.data.current.info.title);
            setAuthor(data.data.current.info.author);
            setPercentage((data.position/1000) / data.data.current.info.duration);
            // setPaused(data.paused);
            setLength(data.data.current.info.duration);
            if (oldPosition != data.position) {
                setCurrent(Number(data.position));
            }
            oldPosition = data.position;
        };
        const fetchLyricsAsync = async () => {
            const data = await fetchLyrics(guildId as string);
            if (data.error) {
                setError(data.error);
            } else {
                setError(null);
            }
            if (data.plainText) {
                setLyrics(data.plainText);
                setAsyncLyrics([]);
            }
            if (data.length > 0) {
                // create a new array of JSX elements
                setLyrics(null);
                setAsyncLyrics(data.map((line: any) => {
                    return {
                        content: line.content as any,
                        timeS: line.startsAt,
                        timeE: line.endsAt
                    }
                }));
            }
        }

        if (!intervalStarted) {
            setIntervalStarted(true);
            fetchDataAsync();
            fetchLyricsAsync();
            setInterval(() => {
                fetchDataAsync();
            }, 2000)
            setInterval(() => {
                fetchLyricsAsync();
            }, 2000)
            setInterval(() => {
                setCurrent(prevAddon => prevAddon + 1000);
            }, 1000)
        }
        // setCurrent(current + addon);
    }, [guildId, current, percentage, length, asyncLyrics, lyrics, error, view]);

    // const data = await (await axios.get('http://localhost:3001/api/frogmusic/guild?guildId=' + guildId)).data

    // console.log(data)

    return (
        <div className="font-['CJK']">
            <div className="fixed blur-sm -z-10 w-screen h-screen bg-cover bg-[url('/assets/banner.png')]"></div>
            <div className="h-[calc(100vh-6rem)] overflow-y-auto">
                <div className="container mt-8">
                { error == 'No lyrics found' && (
                    <div>
                        <Callout type="error">無法獲取歌詞 {"😢"}</Callout>
                    </div>
                )}
                { error == 'No synced lyrics found' && (
                    <div>
                        <Callout type="error">無法獲取同步歌詞 {"><"}</Callout>
                        {lyrics && (
                            <div className="prose mb-2">
                                {lyrics.split('\n').map((line, index) => <p key={index}>{line}</p>)}
                            </div>
                        )}
                    </div>
                )}
                </div>
                {
                    (asyncLyrics.length > 0)  && (
                        <div className="container mb-2" ref={view}>
                            <Callout type="info">已獲取同步歌詞</Callout>
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
                                            [{Number(content.content[0]?.startsAt).toFixed(2)}] {content.content[0]?.content}
                                        </motion.p>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>


            <div className="fixed bottom-0 p-4 shadow-lg border-t border-white w-full flex justify-between items-center bg-black/70 h-[6rem]">
                <div className="flex items-center">
                    <img src={image} className="w-16 h-16 rounded-sm"/>
                    <div className="flex flex-col ml-4">
                        <p className="text-white text-lg">{title}</p>
                        <p className="text-gray-400 text-sm">{author}</p>
                    </div>
                </div>
                <div>
                    <p className="text-white text-sm text-center">{format(current)} / {format(length)}</p>
                    <p>多元世界團隊 ❤️ 2025</p>
                </div>
            </div>
        </div>
    )
}