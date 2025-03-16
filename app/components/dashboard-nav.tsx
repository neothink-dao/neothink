"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Brain,
  Rocket,
  Zap,
  Home,
  BookOpen,
  Target,
  Lightbulb,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface Profile {
  first_name: string
  last_name: string
  username: string
  avatar_url: string | null
}

interface DashboardNavProps {
  profile: Profile
}

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Neothinker",
    href: "/dashboard/neothinker",
    icon: Brain,
    subItems: [
      { name: "Learning Path", href: "/dashboard/neothinker/learning" },
      { name: "Knowledge Base", href: "/dashboard/neothinker/knowledge" },
      { name: "Notes", href: "/dashboard/neothinker/notes" },
    ],
  },
  {
    name: "Ascender",
    href: "/dashboard/ascender",
    icon: Rocket,
    subItems: [
      { name: "Goals", href: "/dashboard/ascender/goals" },
      { name: "Progress", href: "/dashboard/ascender/progress" },
      { name: "Achievements", href: "/dashboard/ascender/achievements" },
    ],
  },
  {
    name: "Immortal",
    href: "/dashboard/immortal",
    icon: Zap,
    subItems: [
      { name: "Ideas", href: "/dashboard/immortal/ideas" },
      { name: "Innovations", href: "/dashboard/immortal/innovations" },
      { name: "Projects", href: "/dashboard/immortal/projects" },
    ],
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav({ profile }: DashboardNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleItem = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    )
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 right-4 z-50 inline-flex items-center justify-center rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="sr-only">Open main menu</span>
        {isMobileMenuOpen ? (
          <X className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="block h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-white/80 backdrop-blur shadow-lg transition-transform duration-200 ease-in-out dark:bg-zinc-800/80",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-zinc-200 dark:border-zinc-800">
            <Link href="/" className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-xl font-bold text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                Neothink+
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleItem(item.name)}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname.startsWith(item.href)
                          ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 dark:from-amber-400/10 dark:to-orange-400/10 dark:text-amber-400"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={cn(
                            "mr-3 h-5 w-5 flex-shrink-0",
                            pathname.startsWith(item.href)
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-zinc-400 group-hover:text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                      {expandedItems.includes(item.name) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedItems.includes(item.name) && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                              pathname === subItem.href
                                ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 dark:from-amber-400/10 dark:to-orange-400/10 dark:text-amber-400"
                                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 dark:from-amber-400/10 dark:to-orange-400/10 dark:text-amber-400"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        pathname === item.href
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-zinc-400 group-hover:text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-zinc-800" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 truncate dark:text-zinc-100">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-xs text-zinc-500 truncate dark:text-zinc-400">
                  @{profile?.username}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Learning Streak</span>
                <span className="font-medium text-amber-600 dark:text-amber-400">7 days</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">XP Points</span>
                <span className="font-medium text-amber-600 dark:text-amber-400">2,450</span>
              </div>
              <div className="h-1 w-full rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div className="h-1 w-3/4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-zinc-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
} 