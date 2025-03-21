import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { 
  useSidebar, 
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE,
  SIDEBAR_WIDTH_ICON
} from "./context"

// Sidebar Component - The main sidebar container 
export interface SidebarProps extends React.ComponentProps<"div"> {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            side={side}
            className="w-[--sidebar-width-mobile] p-0"
            style={{
              "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties}
          >
            {children}
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        data-sidebar="sidebar"
        data-state={state}
        data-variant={variant}
        data-side={side}
        data-collapsible={collapsible}
        className={cn(
          "relative z-30 flex h-full flex-col border-r",
          variant === "floating" &&
            "border-r-0 border-t data-[side=left]:mr-4 data-[side=right]:ml-4",
          variant === "inset" &&
            "w-[--sidebar-width] border-none bg-sidebar data-[side=left]:data-[state=expanded]:shadow-md",
          collapsible === "icon" &&
            "data-[state=collapsed]:w-[--sidebar-width-icon] data-[state=expanded]:w-[--sidebar-width]",
          collapsible === "offcanvas" &&
            "left-0 top-0 h-full data-[state=collapsed]:-ml-[--sidebar-width] data-[state=expanded]:ml-0",
          side === "right" && "left-auto right-0",
          "data-[state]:transition-[margin,width] data-[state]:duration-300 data-[state]:ease-in-out",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

// SidebarHeader Component
export interface SidebarHeaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  description?: string
  icon?: React.ReactNode
  menuIcon?: React.ReactNode
  asChild?: boolean
}

export const SidebarHeader = React.forwardRef<
  HTMLButtonElement,
  SidebarHeaderProps
>(
  (
    {
      className,
      title,
      description,
      icon,
      menuIcon = <PanelLeft className="h-4 w-4 transition-all" />,
      asChild = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const { isMobile, toggleSidebar } = useSidebar()
    const Comp = asChild ? Slot : "button"

    const handleToggleSidebar = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onClick?.(event)
      toggleSidebar()
    }

    if (isMobile) {
      return null
    }

    return (
      <div className="flex items-center px-4 py-2">
        <Comp
          type="button"
          onClick={handleToggleSidebar}
          className={cn(
            "flex w-full items-center gap-2 rounded-md p-2 text-left outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "data-[state=expanded]:bg-background/50 data-[state=expanded]:hover:bg-accent data-[state=expanded]:hover:text-accent-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {icon}
          <div className="flex-1 text-sm font-semibold">{title}</div>
          {menuIcon}
        </Comp>
      </div>
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

// SidebarContent Component
export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-1 flex-col overflow-hidden data-[state=expanded]:p-2",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

// SidebarFooter Component
export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

// SidebarTrigger Component
export interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  asChild?: boolean
}

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(
  (
    {
      className,
      icon = <PanelLeft className="h-4 w-4" />,
      asChild = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, toggleSidebar } = useSidebar()
    const Comp = asChild ? Slot : Button

    const handleToggleSidebar = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onClick?.(event)
      toggleSidebar()
    }

    if (isMobile) {
      return (
        <Comp
          variant="ghost"
          size="icon"
          onClick={handleToggleSidebar}
          className={cn("h-8 w-8", className)}
          ref={ref}
          {...props}
        >
          {icon}
          <span className="sr-only">Toggle Menu</span>
        </Comp>
      )
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              variant="ghost"
              size="icon"
              onClick={handleToggleSidebar}
              className={cn("h-8 w-8", className)}
              ref={ref}
              {...props}
            >
              {icon}
              <span className="sr-only">Toggle Menu</span>
            </Comp>
          </TooltipTrigger>
          <TooltipContent side="right">
            {state === "expanded" ? "Hide Sidebar" : "Show Sidebar"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)
SidebarTrigger.displayName = "SidebarTrigger"

// SidebarSection Component
export interface SidebarSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  headerClassName?: string
  collapsed?: boolean
}

export function SidebarSection({
  children,
  title,
  description,
  headerClassName,
  className,
  collapsed,
  ...props
}: SidebarSectionProps) {
  const { isMobile, state } = useSidebar()
  const isCollapsed = collapsed ?? state === "collapsed"

  return (
    <div className={cn("py-2", className)} {...props}>
      {title && !isCollapsed && (
        <div
          className={cn(
            "mb-2 flex flex-col gap-1 px-2 text-xs text-muted-foreground",
            headerClassName
          )}
        >
          <div className="font-semibold">{title}</div>
          {description && <div>{description}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

// SidebarItem Component
const sidebarItemVariants = cva(
  "group flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
      },
      collapsed: {
        true: "justify-center px-1",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
      },
    },
  }
)

// SkeletonItem Component
export function SidebarItemSkeleton({
  className,
  parentClassName,
  ...props
}: React.ComponentProps<typeof Skeleton> & {
  parentClassName?: string
}) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <div
      className={cn(
        "group flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-muted-foreground",
        isCollapsed && "justify-center px-1",
        parentClassName
      )}
    >
      <Skeleton className="h-4 w-4 shrink-0" />
      {!isCollapsed && <Skeleton className={cn("h-4 flex-1", className)} />}
    </div>
  )
} 