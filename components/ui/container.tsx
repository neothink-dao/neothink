import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ContainerProps<T extends React.ElementType> {
  as?: T
  children: ReactNode
  className?: string
}

export function Container<T extends React.ElementType = "div">({
  as,
  children,
  className,
}: ContainerProps<T>) {
  const Component = as || "div"
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        // Section spacing utilities
        "py-8 sm:py-12 md:py-16 lg:py-20",
        className
      )}
    >
      {children}
    </Component>
  )
}

