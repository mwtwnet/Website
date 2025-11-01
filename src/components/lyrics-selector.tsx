"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Music, X } from "lucide-react";

interface LyricsResult {
    id: number;
    trackName: string;
    artistName: string;
    albumName?: string;
    duration: number;
    instrumental: boolean;
    plainLyrics?: string;
    syncedLyrics?: string;
}

interface LyricsSelectorProps {
    results: LyricsResult[];
    onSelect: (id: number) => void;
    selectedId?: number;
}

export function LyricsSelector({ results, onSelect, selectedId }: LyricsSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (results.length <= 1) return null;

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSelect = (id: number) => {
        onSelect(id);
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg",
                    "bg-blue-500/30 backdrop-blur-lg text-blue-300 hover:bg-blue-500/40",
                    "border border-blue-400/30 hover:border-blue-400/50",
                    "transition-all duration-200"
                )}
            >
                <Music className="w-4 h-4" />
                <span className="text-sm font-medium">
                    找到 {results.length} 個歌詞結果 - 點擊選擇
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-101 w-full max-w-2xl max-h-[80vh] overflow-hidden px-4"
                        >
                            <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <Music className="w-6 h-6 text-blue-400" />
                                        <h2 className="text-xl font-bold text-white">
                                            選擇歌詞版本
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6 overflow-y-auto max-h-[calc(80vh-5rem)]">
                                    <p className="text-gray-400 text-sm mb-4">
                                        找到 {results.length} 個歌詞結果，請選擇最適合的版本
                                    </p>
                                    <div className="space-y-3">
                                        {results.map((result) => (
                                            <button
                                                key={result.id}
                                                onClick={() => handleSelect(result.id)}
                                                className={cn(
                                                    "w-full p-4 rounded-lg text-left transition-all duration-200",
                                                    "flex items-start gap-3",
                                                    selectedId === result.id
                                                        ? "bg-green-500/20 border-2 border-green-500/50 shadow-lg shadow-green-500/20"
                                                        : "bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-white/20"
                                                )}
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="text-white font-semibold truncate text-lg">
                                                            {result.trackName}
                                                        </p>
                                                        {selectedId === result.id && (
                                                            <div className="flex items-center gap-1 bg-green-500/30 px-2 py-1 rounded-full shrink-0">
                                                                <Check className="w-4 h-4 text-green-400 shrink-0" />
                                                                <span className="text-xs text-green-400 font-medium">已選擇</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-300 text-sm truncate mb-2">
                                                        {result.artistName}
                                                        {result.albumName && ` • ${result.albumName}`}
                                                    </p>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                                                            ⏱️ {formatDuration(result.duration)}
                                                        </span>
                                                        {result.syncedLyrics && (
                                                            <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded font-medium">
                                                                ✓ 同步歌詞
                                                            </span>
                                                        )}
                                                        {!result.syncedLyrics && result.plainLyrics && (
                                                            <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded font-medium">
                                                                📄 純文字
                                                            </span>
                                                        )}
                                                        {result.instrumental && (
                                                            <span className="text-xs text-gray-400 bg-gray-500/20 px-2 py-1 rounded">
                                                                🎵 純音樂
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
