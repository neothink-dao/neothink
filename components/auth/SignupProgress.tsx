"use client"

import { cn } from "@/lib/utils"

interface SignupProgressProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function SignupProgress({ currentStep, totalSteps, className }: SignupProgressProps) {
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-500 dark:text-zinc-400">Step {currentStep} of {totalSteps}</span>
        <span className="text-zinc-500 dark:text-zinc-400">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
} 