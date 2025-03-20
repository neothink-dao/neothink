'use client'

import { Bell, Check, Trash2 } from 'lucide-react'
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
    default:
      return '📢'
  }
}

export function NotificationBell() {
  const { notifications, setNotifications } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (!isOpen) return
    const markAllRead = async () => {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('read', false)

      if (!error) {
        setNotifications(notifications.map(n => ({ ...n, read: true })))
      }
    }
    markAllRead()
  }, [isOpen, notifications, setNotifications, supabase])

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id)

    if (!error) {
      setNotifications(notifications.filter(n => n.id !== id))
    }
  }

  const handleMarkAsRead = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)

    if (!error) {
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ))
    }
  }

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
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px] max-h-[600px] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setNotifications([])}
              className="text-xs text-zinc-500 hover:text-zinc-900"
            >
              Clear all
            </Button>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="h-8 w-8 mx-auto mb-4 text-zinc-300" />
            <p className="text-sm font-medium text-zinc-500">No notifications yet</p>
            <p className="text-xs text-zinc-400 mt-1">We'll notify you when something important happens</p>
          </div>
        ) : (
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownMenuItem
                  className={cn(
                    'flex flex-col items-start p-4 border-b last:border-0 transition-colors',
                    !notification.read && 'bg-zinc-50 dark:bg-zinc-800'
                  )}
                >
                  <div className="mb-1 flex w-full items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <span className="text-lg" role="img" aria-label={notification.type}>
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1">
                        <span className="line-clamp-2 text-sm font-medium">
                          {notification.title}
                        </span>
                        {notification.description && (
                          <p className="line-clamp-2 text-sm text-zinc-500 mt-1">
                            {notification.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDelete(notification.id)
                      }}
                      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex w-full items-center justify-between">
                    <span className="text-xs text-zinc-500">
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
                          handleMarkAsRead(notification.id)
                        }}
                        className="text-xs text-blue-500 hover:text-blue-700 p-0 h-auto font-normal"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Mark as read
                      </Button>
                    )}
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