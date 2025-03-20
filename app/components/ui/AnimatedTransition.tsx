"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedTransitionProps {
  children: ReactNode
  className?: string
}

export function AnimatedTransition({ children, className }: AnimatedTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 