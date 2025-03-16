"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { cn } from "@/lib/utils"
import {
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  ChevronDown,
  X,
} from "lucide-react"
import Link from "next/link"

export function DashboardTopBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Achievement Unlocked",
      description: "You've completed your first learning path!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Weekly Progress Report",
      description: "Your learning streak is at 7 days!",
      time: "1 day ago",
      read: false,
    },
  ])
  const router = useRouter()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/auth/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-800/80 sm:px-6 lg:px-8">
      {/* Search */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-zinc-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500 sm:text-sm sm:leading-6"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            className="relative rounded-full p-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            onClick={() => setIsUserMenuOpen(false)}
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            {notifications.some(n => !n.read) && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>

          {/* Notifications dropdown */}
          <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Notifications</h3>
                <button
                  type="button"
                  className="text-sm text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
                  onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                >
                  Mark all as read
                </button>
              </div>
              <div className="mt-4 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "rounded-lg p-3",
                      notification.read
                        ? "bg-zinc-50 dark:bg-zinc-800/50"
                        : "bg-amber-50 dark:bg-amber-900/20"
                    )}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {notification.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="ml-4 flex-shrink-0"
                        onClick={() => {
                          setNotifications(notifications.map(n =>
                            n.id === notification.id ? { ...n, read: true } : n
                          ))
                        }}
                      >
                        <X className="h-4 w-4 text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400" />
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full p-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* User menu dropdown */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800">
              <div className="py-1">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <User className="mr-3 h-5 w-5 text-zinc-400" aria-hidden="true" />
                  Your Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Settings className="mr-3 h-5 w-5 text-zinc-400" aria-hidden="true" />
                  Settings
                </Link>
                <button
                  type="button"
                  className="flex w-full items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  onClick={() => {
                    setIsUserMenuOpen(false)
                    handleSignOut()
                  }}
                >
                  <LogOut className="mr-3 h-5 w-5 text-zinc-400" aria-hidden="true" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 