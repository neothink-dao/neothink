import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface LoadingProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Loading({ size = "md", className }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4"
  }

  return (
    <motion.div
      className={cn(
        "rounded-full border-t-transparent",
        "border-primary/80 dark:border-primary/40",
        sizeClasses[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        ease: "linear",
        repeat: Infinity
      }}
    />
  )
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loading size="lg" />
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Loading size="lg" />
    </div>
  )
} 