import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        ascender: 
          "bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500",
        "ascender-outline": 
          "border border-orange-600 text-orange-600 bg-transparent hover:bg-orange-50 dark:text-orange-500 dark:border-orange-500 dark:hover:bg-orange-950/30",
        neothinker: 
          "bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500",
        "neothinker-outline": 
          "border border-amber-500 text-amber-600 bg-transparent hover:bg-amber-50 dark:text-amber-500 dark:border-amber-500 dark:hover:bg-amber-950/30",
        immortal: 
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500",
        "immortal-outline": 
          "border border-red-600 text-red-600 bg-transparent hover:bg-red-50 dark:text-red-500 dark:border-red-500 dark:hover:bg-red-950/30",
        gradient: 
          "bg-gradient-primary text-white hover:opacity-90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
      loading: {
        true: "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {children}
        {loading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="h-5 w-5 animate-spin text-current opacity-80" />
          </div>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

