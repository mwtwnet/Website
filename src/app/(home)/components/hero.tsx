"use client"
import { Check } from "lucide-react";
import Image from "next/image";
import heroImg from '@public/assets/logo.png';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="container mx-auto px-4 py-8 lg:py-16">
            <div className="flex flex-col-reverse lg:flex-row items-center min-h-[60vh] lg:min-h-[68vh]">
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-gray-800 dark:text-white mb-6">
                            歡迎來到多元世界！
                        </h1>
                        <div className="space-y-4 text-center lg:text-left text-lg sm:text-xl lg:text-xl xl:text-2xl leading-relaxed text-gray-500 dark:text-gray-300 mb-8">
                            <div className="flex items-start gap-3">
                                <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0 mt-1" />
                                <span>我們是一個團隊，致力於打造一個多元化聊天世界，以及各種機器人、軟體、網頁開發。</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0 mt-1" />
                                <span>我們也歡迎不同的想法以及立場，並讓它們在這裡，擦出不一樣的火花</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/discord"
                                    target="_blank"
                                    rel="noopener"
                                    className="inline-block w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-4 text-base sm:text-lg font-semibold text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                                    加入我們的 Discord 吧！
                                </motion.a>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://dcs.tw"
                                    target="_blank"
                                    rel="noopener"
                                    className="inline-block w-full sm:w-auto px-5 py-3 text-base sm:text-lg font-semibold text-center text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
                                    來看看我們開發的 Discord 探索平台
                                </motion.a>
                            </motion.div>
                        </div>
                    </div>
                </div>
                
                <div className="w-[180px] lg:w-1/2 flex justify-center mb-8">
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                        className="w-full max-w-sm lg:max-w-md"
                    >
                        <Image
                            src={heroImg}
                            width="418"
                            height="418"
                            className="w-full h-auto object-cover"
                            alt="Hero Illustration"
                            loading="eager"
                            placeholder="blur"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}