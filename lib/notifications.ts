import { supabase } from '@/lib/supabase'
import { Notification, NotificationType } from '@/types'
import { createServerClient } from '@/lib/supabase/server'

interface SendNotificationOptions {
  userId: string
  title: string
  description?: string
  type: NotificationType
  data?: Record<string, any>
}

export async function sendNotification({
  userId,
  title,
  description,
  type,
  data = {},
}: SendNotificationOptions) {
  try {
    const supabase = await createServerClient()

    // Check notification preferences
    const { data: preferences, error: preferencesError } = await supabase
      .from('notification_preferences')
      .select('enabled, frequency, quiet_hours_start, quiet_hours_end')
      .eq('user_id', userId)
      .eq('type', type)
      .single()

    if (preferencesError) throw preferencesError

    // If notifications are disabled for this type, don't send
    if (!preferences?.enabled) {
      return { success: false, reason: 'notifications_disabled' }
    }

    // Check quiet hours
    if (preferences.quiet_hours_start && preferences.quiet_hours_end) {
      const now = new Date()
      const currentTime = now.toLocaleTimeString('en-US', { hour12: false })
      const start = preferences.quiet_hours_start
      const end = preferences.quiet_hours_end

      // If we're in quiet hours, don't send immediate notification
      if (isInQuietHours(currentTime, start, end)) {
        // TODO: Implement notification scheduling
        return { success: false, reason: 'quiet_hours' }
      }
    }

    // Check frequency
    if (preferences.frequency !== 'instant') {
      // TODO: Implement notification batching
      return { success: false, reason: 'batched' }
    }

    // Send notification
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
    console.error('Error sending notification:', error)
    return { success: false, error }
  }
}

function isInQuietHours(currentTime: string, start: string, end: string): boolean {
  // Convert all times to minutes since midnight for easier comparison
  const current = timeToMinutes(currentTime)
  const startMinutes = timeToMinutes(start)
  const endMinutes = timeToMinutes(end)

  // Handle cases where quiet hours span midnight
  if (startMinutes > endMinutes) {
    return current >= startMinutes || current <= endMinutes
  }

  return current >= startMinutes && current <= endMinutes
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export async function deleteOldNotifications(userId: string, days = 30): Promise<void> {
  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId)
      .lt('created_at', cutoffDate.toISOString())

    if (error) throw error
  } catch (error) {
    console.error('Error deleting old notifications:', error)
    throw error
  }
}

export async function getUnreadCount(userId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false)

    if (error) throw error

    return count || 0
  } catch (error) {
    console.error('Error getting unread count:', error)
    throw error
  }
} 