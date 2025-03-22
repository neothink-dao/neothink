import * as React from "react"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "Community",
    href: "/community",
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex">
      <ul className="flex items-center gap-6">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Mobile Navigation
export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "block w-full rounded-md p-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            pathname === item.href
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href ?? '#'}
          className={cn(
            "block select-none space-y-1 rounded-md p-3",
            "focus:bg-zinc-100 dark:focus:bg-zinc-800",
            "outline-none focus:outline-none",
            "transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}) 