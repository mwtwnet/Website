"use client";
import Link from "fumadocs-core/link";
import * as lucid from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
  function convertMsToTime(milliseconds: string | 0) {
    let seconds = Math.floor(Number(milliseconds) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;
    
    if (hours === 0) 
        return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    else 
        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }

export default function Card() {
  const params = useSearchParams();
  const title = params.get("title") || "Unknown";
  const artist = params.get("artist") || "Unknown";
  const image = params.get("image") || "https://via.placeholder.com/300";
  const link = params.get("link") || "#";
  const time = params.get("time") || 0;
  const source = params.get("source") || "Unknown";
//   console.log(convertMsToTime(time));
  return (
    <Suspense>
        <div className="h-screen w-screen flex justify-center items-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://cdn.discordapp.com/banners/1216003625503948830/d84b63eba6a325a057e403d3425dd368.png?size=2048')"}} >
        <div className="mt-6 sm:mt-10 relative z-10 rounded-xl shadow-xl w-[80vw]">
            <div className="bg-white border-slate-100 transition-all duration-500 dark:bg-slate-800 transition-all duration-500 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
            <div className="flex items-center space-x-4">
                <img
                src={image}
                loading="lazy"
                decoding="async"
                alt=""
                className="flex-none rounded-lg bg-slate-100"
                width="88"
                height="88"
                />
                <div className="min-w-0 flex-auto space-y-1 font-semibold">
                <h2 className="text-slate-500 transition-all duration-500 dark:text-slate-400 text-sm leading-6 truncate">
                    {artist}
                </h2>
                <p className="text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg">
                    {title}
                </p>
                <p className="text-slate-900 translation-all duration-500 dark:text-slate-500 text-xs">
                    來源：{source}
                </p>
                </div>
            </div>
            <div className="space-y-2">
                <div className="relative">
                <div className="bg-slate-100 transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                    className="bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 w-1 h-2"
                    role="progressbar"
                    ></div>
                </div>
                <div className="ring-cyan-500 transition-all duration-500 dark:ring-cyan-400 ring-2 absolute left top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
                    <div className="w-1.5 h-1.5 bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
                </div>
                </div>
                <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
                <div className="text-cyan-500 transition-all duration-500 dark:text-slate-100">
                    00:00
                </div>
                <div className="text-slate-500 transition-all duration-500 dark:text-slate-400">
                    {convertMsToTime(time)}
                </div>
                </div>
            </div>
            </div>
            <div className="bg-slate-50 text-slate-500 transition-all duration-500 dark:bg-slate-600 transition-all duration-500 dark:text-slate-200 rounded-b-xl flex items-center">
            {/* <div className="flex-auto flex items-center justify-evenly">
                <button type="button" aria-label="Add to favorites">
                <svg width="24" height="24">
                    <path
                    d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                </svg>
                </button>
                <button
                type="button"
                className="hidden sm:block lg:hidden xl:block"
                aria-label="Previous"
                >
                <svg width="24" height="24" fill="none">
                    <path
                    d="m10 12 8-6v12l-8-6Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                    <path
                    d="M6 6v12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                </svg>
                </button>
                <button type="button" aria-label="Rewind 10 seconds">
                <svg width="24" height="24" fill="none">
                    <path
                    d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                    <path
                    d="M5 5v3.111c0 .491.398.889.889.889H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                </svg>
                </button>
            </div> */}
            <button
                type="button"
                className="bg-white text-slate-900 transition-all duration-500 dark:bg-slate-100 transition-all duration-500 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                aria-label="Link"
            >
                <Link href={link}>
                    <lucid.Link />
                </Link>
            </button>
            {/* <div className="flex-auto flex items-center justify-evenly">
                <button type="button" aria-label="Skip 10 seconds" className="">
                <svg width="24" height="24" fill="none">
                    <path
                    d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                    <path
                    d="M19 5v3.111c0 .491-.398.889-.889.889H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                </svg>
                </button>
                <button
                type="button"
                className="hidden sm:block lg:hidden xl:block"
                aria-label="Next"
                >
                <svg width="24" height="24" fill="none">
                    <path
                    d="M14 12 6 6v12l8-6Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                    <path
                    d="M18 6v12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                </svg>
                </button>
                <button type="button">
                <Link href={link}>
                    <lucid.Link />
                </Link>
                </button>
            </div> */}
            </div>
        </div>
        </div>
    </Suspense>
  );
}
