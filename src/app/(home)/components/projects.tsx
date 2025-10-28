"use client"

import { motion } from 'framer-motion'
import { ExternalLink, Music, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Projects() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            精選專案
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            我們用心打造的產品與服務
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Project 1: 青蛙音樂 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative md:col-span-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-gradient-to-br from-black to-black border border-gray-700 rounded-3xl overflow-hidden hover:border-green-500/50 transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto bg-gradient-to-br from-green-500/10 to-emerald-500/10 overflow-hidden flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-[url('/assets/logo.png')] bg-cover opacity-5" />
                  <Image
                    src="https://avatar-cyan.vercel.app/api/pfp/1216003625503948830/image"
                    alt="青蛙音樂"
                    width={250}
                    height={250}
                    className="relative z-10 drop-shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Music className="w-4 h-4" />
                    精選專案
                  </div>
                </div>
                
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-green-400 font-semibold mb-4">
                    <Music className="w-5 h-5" />
                    Discord Bot
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    青蛙音樂
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                    功能豐富的 Discord 音樂機器人，提供高品質音樂串流服務。支援多種音源、播放列表管理、音效控制等進階功能。
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Discord Bot', 'Music', 'Node.js', 'High Quality'].map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-1.5 text-sm font-semibold bg-green-500/10 text-green-400 rounded-full border border-green-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="/docs/frogmusic"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 w-fit group/btn"
                  >
                    查看詳情
                    <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 2: Coming Soon - Minimal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative md:col-span-2"
          >
            <div className="relative bg-black border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300">
              <div className="p-10 md:p-12 flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold mb-2">COMING SOON</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    更多專案開發中
                  </h3>
                  <p className="text-gray-400 max-w-xl">
                    我們正在開發更多創新的產品和服務
                  </p>
                </div>
                <ArrowRight className="w-8 h-8 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
