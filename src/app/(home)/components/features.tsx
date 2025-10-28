"use client"

import { motion } from 'framer-motion'
import { features } from '@/config'

export default function Features() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            我們的專業服務
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            提供全方位的數位解決方案，從概念到實現
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-75 transition-opacity duration-300 rounded-2xl blur-2xl`} />
              <div className="relative bg-black border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 h-full flex flex-col">
                <div className="relative w-fit mb-4">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} blur-xl opacity-30`} />
                  <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient}`}>
                    <feature.icon animateOnView loop loopDelay={100} className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
