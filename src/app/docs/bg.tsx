"use client"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    opacity: number;
    twinkleDuration: number;
    parallaxSpeed: number;
}

export default function BG() {
    const [randomStars, setRandomStars] = useState<Star[]>([]);
    
    // Generate random stars only on client side to prevent hydration mismatch
    useEffect(() => {
        const stars: Star[] = [];
        const starCount = 50;
        const colors = [
            'rgba(255, 255, 255, 0.9)',  // White
            'rgba(135, 206, 235, 0.8)',  // Light blue
            'rgba(255, 215, 0, 0.7)',    // Gold
            'rgba(255, 105, 180, 0.6)',  // Pink
            'rgba(173, 216, 230, 0.7)',  // Light blue
            'rgba(255, 228, 181, 0.8)',  // Moccasin
        ];
        
        for (let i = 0; i < starCount; i++) {
            stars.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.8 + 0.2,
                twinkleDuration: Math.random() * 4 + 2,
                parallaxSpeed: Math.random() * 0.5 + 0.1,
            });
        }
        setRandomStars(stars);
    }, []);
    
    return (
        <motion.div 
            id="universe-bg"
            className="fixed w-full h-full -z-10 top-0 left-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        >            
            {/* Random stars with individual animations */}
            {randomStars.map((star) => (
                <motion.div
                    key={`star-${star.id}`}
                    className="absolute rounded-full"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        backgroundColor: star.color,
                        boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
                    }}
                    animate={{
                        opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                        // scale: [1, 1.2, 1],
                    }}
                    transition={{
                        opacity: { 
                            duration: star.twinkleDuration, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            times: [0, 0.5, 1]
                        },
                        // scale: { 
                        //     duration: star.twinkleDuration, 
                        //     repeat: Infinity, 
                        //     ease: "easeInOut" 
                        // }
                    }}
                />
            ))}
        </motion.div>
    )
}