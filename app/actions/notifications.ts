'use server'

import { createServerClient } from '@/lib/supabase/server'
import { NotificationType } from '@/types'

export async function markNotificationAsRead(notificationId: string) {
  try {
    const supabase = await createServerClient()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) throw sessionError
    if (!session) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .eq('user_id', session.user.id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error marking notification as read:', error)
    return { success: false, error }
  }
}

export async function markAllNotificationsAsRead() {
  try {
    const supabase = await createServerClient()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) throw sessionError
    if (!session) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', session.user.id)
      .eq('read', false)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    return { success: false, error }
  }
}

export async function updateNotificationPreferences(preferences: {
  id: string
  enabled?: boolean
  frequency?: string
  quietHoursStart?: string
  quietHoursEnd?: string
}) {
  try {
    const supabase = await createServerClient()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) throw sessionError
    if (!session) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('notification_preferences')
      .update(preferences)
      .eq('id', preferences.id)
      .eq('user_id', session.user.id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error updating notification preferences:', error)
    return { success: false, error }
  }
}

export async function getNotifications() {
  try {
    const supabase = await createServerClient()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) throw sessionError
    if (!session) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error getting notifications:', error)
    return { success: false, error }
  }
}

export async function getNotificationPreferences() {
  try {
    const supabase = await createServerClient()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) throw sessionError
    if (!session) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', session.user.id)

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error getting notification preferences:', error)
    return { success: false, error }
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    const supabase = await createServerClient()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) throw sessionError
    if (!session) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', session.user.id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error deleting notification:', error)
    return { success: false, error }
  }
}

export async function createNotification({
  userId,
  title,
  description,
  type,
  data = {},
}: {
  userId: string
  title: string
  description?: string
  type: NotificationType
  data?: Record<string, any>
}) {
  try {
    const supabase = await createServerClient()

    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        description,
        type,
        data,
      })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error creating notification:', error)
    return { success: false, error }
  }
} 