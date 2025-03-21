'use client'

import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Export context
export {
  useSidebar,
  SidebarProvider,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT
} from "./context"

// Export type from context
export type { SidebarContext } from "./context"

// Export components
export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarSection,
  SidebarItemSkeleton
} from "./components"

// Export types 
export type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarTriggerProps,
  SidebarSectionProps
} from "./components"

// Main wrapper component with tooltip provider
export function SidebarWrapper({ 
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TooltipProvider>
  )
} 