'use client'

import { Suspense } from "react"
import { AlertCircle, HomeIcon, Menu, Search, Sparkles, UserCircle, X } from "lucide-react"
import { NotificationBell } from '@/app/components/notification-bell'
import { UserNav } from '@/app/components/user-nav'
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export const dynamic = "force-dynamic"

function LoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="mt-4 h-4 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
      </div>
    </div>
  )
}

function ErrorState({ error }: { error: Error }) {
  return (
    <Alert variant="error">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  )
}

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Ascender",
    href: "/pathways/ascender",
    icon: Sparkles,
    color: "text-orange-600 bg-orange-100 dark:bg-orange-950/40 dark:text-orange-400",
  },
  {
    title: "Neothinker",
    href: "/pathways/neothinker",
    icon: Sparkles,
    color: "text-amber-600 bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400",
  },
  {
    title: "Immortal",
    href: "/pathways/immortal",
    icon: Sparkles,
    color: "text-red-600 bg-red-100 dark:bg-red-950/40 dark:text-red-400",
  },
  {
    title: "Settings",
    href: "/settings/profile",
    icon: UserCircle,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pathname = usePathname()
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-primary">
                <span className="sr-only">Brand logo</span>
              </div>
              <span className="hidden font-semibold md:inline-block">NeoThink</span>
            </Link>
            <nav className="hidden md:flex md:gap-6 lg:gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80",
                      isActive ? "text-foreground" : "text-foreground/60"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isActive && item.color)} />
                    <span>{item.title}</span>
                    {item.title !== "Dashboard" && item.title !== "Settings" && (
                      <Badge
                        variant="secondary"
                        className="ml-1 px-1.5 text-[10px]"
                      >
                        PATH
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="h-9 w-[200px] rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 lg:w-[280px]"
                />
              </div>
            </form>
            <NotificationBell />
            <UserNav />
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          mobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileNavOpen(false)}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs transform bg-background p-6 shadow-xl transition duration-300 ease-in-out md:hidden",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-primary">
              <span className="sr-only">Brand logo</span>
            </div>
            <span className="font-semibold">NeoThink</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileNavOpen(false)}
            className="h-8 w-8"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-8 flex flex-col gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  "flex items-center gap-3 text-sm font-medium transition-colors hover:text-foreground/80",
                  isActive ? "text-foreground" : "text-foreground/60"
                )}
              >
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", item.color || "bg-zinc-100 dark:bg-zinc-800")}>
                  <item.icon className="h-4 w-4" />
                </div>
                <span>{item.title}</span>
                {item.title !== "Dashboard" && item.title !== "Settings" && (
                  <Badge
                    variant="secondary"
                    className="ml-1 px-1.5 text-[10px]"
                  >
                    PATH
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
      
      <main className="flex-1">
        <div className="container py-6 px-4 md:px-6">
          <Suspense fallback={<LoadingState />}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  )
}
