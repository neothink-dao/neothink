"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)
  const [label, setLabel] = useState("")

  useEffect(() => {
    if (!password) {
      setStrength(0)
      setLabel("")
      return
    }

    let score = 0
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    }

    // Calculate strength score
    Object.values(checks).forEach(check => {
      if (check) score++
    })

    // Set strength and label
    setStrength(score)
    setLabel(
      score === 0 ? "" :
      score === 1 ? "Very Weak" :
      score === 2 ? "Weak" :
      score === 3 ? "Medium" :
      score === 4 ? "Strong" :
      "Very Strong"
    )
  }, [password])

  if (!password) return null

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-500 dark:text-zinc-400">Password Strength</span>
        <span className={cn(
          "font-medium",
          strength === 0 && "text-zinc-400 dark:text-zinc-500",
          strength === 1 && "text-red-500 dark:text-red-400",
          strength === 2 && "text-orange-500 dark:text-orange-400",
          strength === 3 && "text-amber-500 dark:text-amber-400",
          strength === 4 && "text-green-500 dark:text-green-400",
          strength === 5 && "text-emerald-500 dark:text-emerald-400"
        )}>
          {label}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className={cn(
            "h-full transition-all duration-300",
            strength === 0 && "w-0 bg-zinc-200 dark:bg-zinc-700",
            strength === 1 && "w-1/5 bg-red-500 dark:bg-red-400",
            strength === 2 && "w-2/5 bg-orange-500 dark:bg-orange-400",
            strength === 3 && "w-3/5 bg-amber-500 dark:bg-amber-400",
            strength === 4 && "w-4/5 bg-green-500 dark:bg-green-400",
            strength === 5 && "w-full bg-emerald-500 dark:bg-emerald-400"
          )}
        />
      </div>
    </div>
  )
} 