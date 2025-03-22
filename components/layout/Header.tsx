"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useSupabase } from "@/components/providers/supabase-provider"
import { useAuth } from "@/context/auth-context"
import { useTheme } from 'next-themes'
import { Navigation, MobileNavigation } from './Navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Bell,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  BookOpen,
  Star,
  MessageSquare,
  HelpCircle,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CommandMenu } from '@/components/command-menu'

export function Header() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const { user } = useAuth()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showCommandMenu, setShowCommandMenu] = useState(false)

  const notifications = [
    {
      id: 1,
      title: 'New course available',
      description: 'Advanced Critical Thinking is now available',
      time: '5m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Progress milestone',
      description: 'You\'ve completed 50% of your learning path',
      time: '2h ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Community highlight',
      description: 'Your post received 10 upvotes',
      time: '1d ago',
      unread: false,
    },
  ]

  // Breadcrumb generation
  const breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: '/' + segment,
    }))

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/auth/login")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg dark:bg-zinc-900/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo and Primary Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-primary">
              <span className="sr-only">NeoThink</span>
            </div>
            <span className="hidden font-semibold md:inline-block">NeoThink</span>
          </Link>
          <Navigation />
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-2">
          {/* Command Menu Trigger */}
          <Button
            variant="outline"
            className="hidden items-center gap-2 md:inline-flex"
            onClick={() => setShowCommandMenu(true)}
          >
            <Search className="h-4 w-4" />
            <span>Quick search...</span>
            <kbd className="pointer-events-none ml-2 hidden rounded border bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 sm:inline-block">
              ⌘K
            </kbd>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-4">
                <DropdownMenuLabel className="text-base">Notifications</DropdownMenuLabel>
                <Button variant="ghost" size="sm">Mark all as read</Button>
              </div>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col gap-1 p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{notification.title}</span>
                    {notification.unread && (
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {notification.description}
                  </p>
                  <span className="text-xs text-zinc-500">{notification.time}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-4 text-center">
                <Link href="/notifications" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user?.email?.[0].toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden font-medium md:inline-block">
                  {user?.user_metadata?.full_name || 'User'}
                </span>
                <ChevronDown className="h-4 w-4 text-zinc-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpen className="mr-2 h-4 w-4" />
                My Learning
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Bookmarks
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help Center
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                Feedback
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="container border-t py-2">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <span className="text-zinc-400">/</span>
                  {index === breadcrumbs.length - 1 ? (
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-50 h-[calc(100vh-4rem)] overflow-y-auto bg-white/80 backdrop-blur-lg dark:bg-zinc-900/80 md:hidden">
          <div className="container divide-y">
            <div className="py-4">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full"
              />
            </div>
            <nav className="py-4">
              <MobileNavigation />
            </nav>
          </div>
        </div>
      )}

      {/* Command Menu */}
      <CommandMenu open={showCommandMenu} onOpenChange={setShowCommandMenu} />
    </header>
  )
}
