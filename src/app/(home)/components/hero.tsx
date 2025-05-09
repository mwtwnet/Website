"use client"
import { Check } from "lucide-react";
import Image from "next/image";
import heroImg from '@public/assets/logo.png';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="container flex flex-wrap h-[68vh]">
            <div className="flex items-center w-full lg:w-1/2">
                <div className="max-w-2xl mb-8">
                    <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                        歡迎來到多元世界！
                    </h1>
                    <div className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                        <div className="flex justify-center items-center" style={{paddingBottom: "10px"}}><Check width={"5em"} style={{color: "green"}}/>我們是一個團隊，致力於打造一個多元化聊天世界，以及各種機器人、軟體、網頁開發。</div>
                        <div className="flex justify-center items-center"><Check width={"5em"} style={{marginLeft: "-10", marginRight: "-10", color: "green"}}/>我們也歡迎不同的想法以及立場，並讓它們在這裡，擦出不一樣的火花</div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            href="/discord"
                            target="_blank"
                            rel="noopener"
                            className="px-7 py-4 text-lg font-semibold text-center text-white bg-indigo-600 rounded-lg">
                            加入我們的 Discord 吧！
                        </motion.a>
                    </motion.div>
                    <div className="h-3"></div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            href="https://dcs.tw"
                            target="_blank"
                            rel="noopener"
                            className="px-5 py-3 text-lg font-semibold text-center text-white bg-gray-600 rounded-lg">
                            來看看我們開發的 Discord 探索平台
                        </motion.a>
                    </motion.div>
                </div>
            </div>
            <div className="flex items-center justify-center w-full lg:w-1/2">
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                >
                    <Image
                        src={heroImg}
                        width="418"
                        height="418"
                        className={"object-cover"}
                        alt="Hero Illustration"
                        loading="eager"
                        placeholder="blur"
                    />
                </motion.div>
            </div>
        </div>
    )
}