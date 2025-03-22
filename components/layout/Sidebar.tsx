import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Compass,
  Users,
  BarChart,
  Calendar,
  BookMarked,
  Clock,
  Star,
  MessageSquare,
  Settings,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  color?: string
  progress?: number
}

const primaryNavItems: NavItem[] = [
  {
    title: 'My Journey',
    href: '/dashboard',
    icon: Compass,
    progress: 65,
  },
  {
    title: 'Learning Path',
    href: '/dashboard/learning',
    icon: BookOpen,
    progress: 42,
  },
  {
    title: 'Community',
    href: '/dashboard/community',
    icon: Users,
  },
  {
    title: 'Progress',
    href: '/dashboard/progress',
    icon: BarChart,
  },
]

const secondaryNavItems: NavItem[] = [
  {
    title: 'Events',
    href: '/dashboard/events',
    icon: Calendar,
  },
  {
    title: 'Bookmarks',
    href: '/dashboard/bookmarks',
    icon: BookMarked,
  },
  {
    title: 'Recent Activity',
    href: '/dashboard/activity',
    icon: Clock,
  },
]

const quickAccessItems = [
  {
    title: 'Critical Thinking Guide',
    href: '/resources/critical-thinking',
    progress: 75,
  },
  {
    title: 'Business Innovation',
    href: '/resources/business-innovation',
    progress: 30,
  },
  {
    title: 'Personal Development',
    href: '/resources/personal-development',
    progress: 90,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-zinc-50/50 dark:bg-zinc-900/50">
      <ScrollArea className="flex-1 px-4 py-6">
        {/* Primary Navigation */}
        <nav className="space-y-2">
          {primaryNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'relative w-full justify-start gap-3',
                  pathname === item.href && 'bg-zinc-100 dark:bg-zinc-800'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
                {item.progress && (
                  <div className="absolute bottom-2 left-9 right-4">
                    <Progress value={item.progress} className="h-1" />
                  </div>
                )}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Quick Access */}
        <div className="mt-8">
          <h3 className="px-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Quick Access
          </h3>
          <div className="mt-2 space-y-1">
            {quickAccessItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-3 text-sm"
                >
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="truncate">{item.title}</span>
                      <span className="ml-2 text-xs text-zinc-500">
                        {item.progress}%
                      </span>
                    </div>
                    <Progress value={item.progress} className="mt-1 h-1" />
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Secondary Navigation */}
        <nav className="mt-8 space-y-1">
          {secondaryNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'w-full justify-start gap-3',
                  pathname === item.href && 'bg-zinc-100 dark:bg-zinc-800'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Button>
            </Link>
          ))}
        </nav>

        {/* Recent Activity Feed */}
        <div className="mt-8">
          <h3 className="px-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Recent Activity
          </h3>
          <div className="mt-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border bg-white/50 p-3 dark:bg-zinc-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-primary" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">John completed Chapter 3</p>
                    <p className="text-xs text-zinc-500">2 hours ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="border-t bg-white/50 p-4 dark:bg-zinc-900/50">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            Help
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
} 