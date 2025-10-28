"use client"
import { Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import heroImg from '@public/assets/logo.png';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="relative min-h-screen flex items-center overflow-hidden bg-black">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-16">
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                                <Sparkles className="w-4 h-4 text-blue-400" />
                                <span className="text-sm font-semibold text-blue-400">歡迎來到多元世界</span>
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                                    創意 × 技術
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    打造你的想像
                                </span>
                            </h1>
                            
                            <p className="text-xl lg:text-2xl text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                開發 Discord Bot、網頁應用，把每個點子變成現實
                            </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/discord"
                                target="_blank"
                                rel="noopener"
                                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-full text-lg shadow-lg shadow-[#5865F2]/50 hover:shadow-[#5865F2]/80 transition-all duration-300"
                            >
                                加入 Discord
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                        </div>
                        </motion.div>
                    </div>
                
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1,
                                y: [0, -20, 0],
                            }}
                            transition={{
                                opacity: { duration: 0.8 },
                                scale: { duration: 0.8 },
                                y: {
                                    duration: 3,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                }
                            }}
                            className="relative"
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
                            
                            <Image
                                src={heroImg}
                                width="350"
                                height="350"
                                className="relative z-10 w-full h-auto max-w-xs lg:max-w-sm object-contain drop-shadow-2xl"
                                alt="多元世界團隊 Logo"
                                loading="eager"
                                placeholder="blur"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}