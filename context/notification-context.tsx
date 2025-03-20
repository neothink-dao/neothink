'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useAuth } from '@/hooks/auth'
import { toast } from 'sonner'

export type Notification = {
  id: string
  user_id: string
  title: string
  description?: string
  type: string
  read: boolean
  data?: Record<string, any>
  created_at: string
  updated_at: string
}

type NotificationContextType = {
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
  markAllAsRead: () => Promise<void>
  markAsRead: (id: string) => Promise<void>
  deleteNotification: (id: string) => Promise<void>
  addNotification: (notification: Omit<Notification, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { user } = useAuth()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (!user) return

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        toast.error('Failed to load notifications')
        return
      }

      setNotifications(data || [])
    }

    fetchNotifications()

    // Subscribe to new notifications
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setNotifications((prev) => [payload.new as Notification, ...prev])
            toast.info(payload.new.title)
          } else if (payload.eventType === 'DELETE') {
            setNotifications((prev) => prev.filter((n) => n.id !== payload.old.id))
          } else if (payload.eventType === 'UPDATE') {
            setNotifications((prev) =>
              prev.map((n) => (n.id === payload.new.id ? payload.new as Notification : n))
            )
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [user, supabase])

  const markAllAsRead = async () => {
    if (!user) return

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user.id)
      .eq('read', false)

    if (error) {
      toast.error('Failed to mark notifications as read')
      return
    }

    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const markAsRead = async (id: string) => {
    if (!user) return

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)

    if (error) {
      toast.error('Failed to mark notification as read')
      return
    }

    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const deleteNotification = async (id: string) => {
    if (!user) return

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete notification')
      return
    }

    setNotifications(notifications.filter(n => n.id !== id))
  }

  const addNotification = async (notification: Omit<Notification, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) return

    const { error } = await supabase
      .from('notifications')
      .insert([
        {
          ...notification,
          user_id: user.id,
        },
      ])

    if (error) {
      toast.error('Failed to create notification')
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        markAllAsRead,
        markAsRead,
        deleteNotification,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
} 