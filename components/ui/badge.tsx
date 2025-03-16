import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-zinc-800 text-zinc-50 dark:bg-zinc-700 dark:text-zinc-50",
        secondary: "border-transparent bg-zinc-700 text-zinc-50 dark:bg-zinc-600 dark:text-zinc-50",
        outline: "text-zinc-900 border-zinc-200 bg-white dark:text-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50",
        destructive: "border-transparent bg-red-500 text-white dark:bg-red-900 dark:text-red-50",

        // Brand color variants
        amber: "border-transparent bg-amber-500 text-white dark:bg-amber-400 dark:text-white",
        orange: "border-transparent bg-orange-500 text-white dark:bg-orange-400 dark:text-white",
        red: "border-transparent bg-red-500 text-white dark:bg-red-400 dark:text-white",

        // Outline brand variants
        amberOutline: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-900/50 dark:text-amber-300",
        orangeOutline: "bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-900/20 dark:border-orange-900/50 dark:text-orange-300",
        redOutline: "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-300",

        // Brand gradient variant
        brand: "border-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white dark:from-amber-400 dark:via-orange-400 dark:to-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
