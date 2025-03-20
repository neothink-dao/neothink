'use client'

import { Bell, Check, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNotifications } from '@/context/notification-context'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'achievement':
      return '🏆'
    case 'milestone':
      return '🎯'
    case 'reminder':
      return '⏰'
    case 'system':
      return '🔧'
    case 'pathway':
      return '🛣️'
    case 'streak':
      return '🔥'
    case 'content':
      return '📚'
    case 'profile':
      return '👤'
    case 'security':
      return '🔒'
    case 'goal':
      return '🎯'
    case 'innovation':
      return '💡'
    case 'feedback':
      return '📝'
    case 'collaboration':
      return '🤝'
    case 'mentorship':
      return '👨‍🏫'
    case 'community':
      return '👥'
    case 'update':
      return '📢'
    default:
      return '📢'
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'achievement':
    case 'milestone':
    case 'innovation':
    case 'streak':
      return 'text-amber-500 dark:text-amber-400'
    case 'system':
    case 'security':
    case 'update':
      return 'text-orange-500 dark:text-orange-400'
    case 'pathway':
    case 'content':
    case 'feedback':
      return 'text-blue-500 dark:text-blue-400'
    case 'reminder':
    case 'goal':
    case 'mentorship':
      return 'text-green-500 dark:text-green-400'
    case 'profile':
    case 'community':
    case 'collaboration':
      return 'text-purple-500 dark:text-purple-400'
    default:
      return 'text-zinc-500 dark:text-zinc-400'
  }
}

export function NotificationBell() {
  const { notifications, markAsRead, deleteNotification, markAllAsRead } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    if (!isOpen) return
    
    // Small delay so user can see which ones are unread before marking them as read
    const timer = setTimeout(() => {
      markAllAsRead()
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [isOpen, markAllAsRead])

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`${unreadCount} unread notifications`}
        >
          <Bell className="h-5 w-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { type: 'spring', stiffness: 500, damping: 25 } }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary text-[10px] font-medium text-white shadow-sm"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px] max-h-[600px] overflow-y-auto subtle-scroll">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              onClick={() => {
                notifications.forEach(n => deleteNotification(n.id))
              }}
            >
              Clear all
            </Button>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
              <Bell className="h-6 w-6" />
            </div>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">No notifications yet</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">We'll notify you when something important happens</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownMenuItem
                  className={cn(
                    'flex flex-col items-start p-0 focus:bg-transparent',
                  )}
                >
                  <div className={cn(
                    'flex w-full flex-col border-b p-4 transition-colors last:border-0',
                    !notification.read && 'bg-zinc-50 dark:bg-zinc-800/50'
                  )}>
                    <div className="mb-1 flex w-full items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <span 
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-base",
                            getTypeColor(notification.type)
                          )} 
                          role="img" 
                          aria-label={notification.type}
                        >
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="flex-1">
                          <span className="line-clamp-2 font-medium text-zinc-900 dark:text-zinc-100">
                            {notification.title}
                          </span>
                          {notification.description && (
                            <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                              {notification.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                        aria-label="Delete notification"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex w-full items-center justify-between text-xs">
                      <span className="text-zinc-500">
                        {formatDistanceToNow(new Date(notification.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            markAsRead(notification.id)
                          }}
                          className="h-auto p-0 text-xs font-normal text-blue-500 hover:bg-transparent hover:text-blue-700"
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 