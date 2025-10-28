"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Github, Mail } from 'lucide-react'
import { teamMembers } from '@/config'

export default function Team() {
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
            團隊成員
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            熱愛技術的開發者們
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-black border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl" />
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="relative z-10 rounded-full border-4 border-gray-800 group-hover:border-gray-700 transition-colors"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-400 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="flex gap-4">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
