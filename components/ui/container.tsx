import type { ElementType } from "react"
import { cn } from "@/lib/utils"

interface ContainerProps<T extends ElementType = "div"> {
  children: React.ReactNode
  as?: T
  className?: string
  [key: string]: any
}

export function Container<T extends ElementType = "div">({
  children,
  as: Component = "div" as T,
  className,
  ...props
}: ContainerProps<T>) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        // Section spacing utilities
        "py-4 sm:py-6 lg:py-8",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

