"use client"

import { motion, useReducedMotion } from "framer-motion"

type RevealProps = {
  children: React.ReactNode
  delay?: number
}

export function Reveal({ children, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
