"use client";

import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        {/* <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/5 blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-destructive/10 blur-[100px]" /> */}
        
        {/* Animated Grid */}
        {/* <div 
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.1]" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-destructive) 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }} 
        /> */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 flex flex-col items-center gap-8"
      >
        {/* Animated Logo Container */}
        <div className="relative">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive text-destructive-foreground shadow-2xl shadow-destructive/20"
          >
            <Zap className="h-10 w-10 fill-current" />
          </motion.div>
          
          {/* Decorative Path Line */}
          {/* <svg
            className="absolute -right-16 -top-8 h-24 w-24 text-destructive/30"
            viewBox="0 0 100 100"
            fill="none"
          >
            <motion.path
              d="M10 90 Q 50 10, 90 40"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg> */}
        </div>

        <div className="space-y-4">
          <motion.h1 
            className="text-8xl font-black tracking-tighter sm:text-9xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <span className="bg-linear-to-b from-destructive to-destructive/50 bg-clip-text text-transparent tracking-wider">
              404
            </span>
          </motion.h1>
        </div>
      </motion.div>

      {/* Floating Elements for Premium Feel */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
         {[...Array(6)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute h-1 w-1 rounded-full bg-destructive/20"
             animate={{
               y: [0, -100],
               opacity: [0, 1, 0],
               x: [0, Math.sin(i) * 50]
             }}
             transition={{
               duration: 3 + Math.random() * 2,
               repeat: Infinity,
               delay: Math.random() * 5,
               ease: "linear"
             }}
             style={{
               left: `${15 + Math.random() * 70}%`,
               bottom: "10%"
             }}
           />
         ))}
      </div>
    </div>
  );
}
