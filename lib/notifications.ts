import { supabase } from '@/lib/supabase'
import { Notification, NotificationType } from '@/types'
import { createServerClient } from '@/lib/supabase/server'
import { logger } from '@/lib/error-handling'

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
        // Schedule notification for after quiet hours
        const scheduledTime = getEndOfQuietHours(now, end)
        await supabase.from('notification_queue').insert({
          user_id: userId,
          title,
          description,
          type,
          data,
          scheduled_for: scheduledTime.toISOString(),
        })
        return { success: true, reason: 'scheduled_after_quiet_hours', scheduledFor: scheduledTime }
      }
    }

    // Check frequency
    if (preferences.frequency !== 'instant') {
      // Handle batched notifications
      const batchFrequency = preferences.frequency || 'daily' // Default to daily if not specified
      
      await supabase.from('notification_queue').insert({
        user_id: userId,
        title,
        description,
        type,
        data,
        batch: batchFrequency,
      })
      
      return { success: true, reason: 'batched', batchFrequency }
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
    logger.error('Error sending notification:', error)
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
    logger.error('Error deleting old notifications:', error)
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
    logger.error('Error getting unread count:', error)
    throw error
  }
}

// Helper function to get the end time of quiet hours
function getEndOfQuietHours(now: Date, endTime: string): Date {
  const [hours, minutes] = endTime.split(':').map(Number)
  const endOfQuiet = new Date(now)
  endOfQuiet.setHours(hours, minutes, 0, 0)
  
  // If the end time is earlier than current time, it means quiet hours end tomorrow
  if (endOfQuiet < now) {
    endOfQuiet.setDate(endOfQuiet.getDate() + 1)
  }
  
  return endOfQuiet
}

// Processes the notification queue to send batched notifications
export async function processBatchedNotifications(): Promise<void> {
  try {
    const supabase = await createServerClient()
    
    // Get current time
    const now = new Date()
    const currentHour = now.getHours()
    
    // Process daily batches at 9 AM
    if (currentHour === 9) {
      const { data: dailyBatch, error } = await supabase
        .from('notification_queue')
        .select('*')
        .eq('batch', 'daily')
        .lt('created_at', new Date(now.setHours(0, 0, 0, 0)).toISOString())
      
      if (error) throw error
      
      // Group by user to send one summary notification per user
      const userBatches = dailyBatch?.reduce((acc, notification) => {
        const { user_id } = notification
        if (!acc[user_id]) {
          acc[user_id] = []
        }
        acc[user_id].push(notification)
        return acc
      }, {} as Record<string, any[]>) || {}
      
      // Send batch notifications and clean up queue
      const userIds = Object.keys(userBatches)
      for (const userId of userIds) {
        const batch = userBatches[userId]
        const count = batch.length
        
        // Send a summary notification
        await supabase.from('notifications').insert({
          user_id: userId,
          title: `You have ${count} new notifications`,
          description: `${count} notifications from the past day`,
          type: 'SUMMARY',
          data: { items: batch },
        })
        
        // Delete processed items from queue
        const ids = batch.map((item: any) => item.id)
        await supabase.from('notification_queue').delete().in('id', ids)
      }
    }
    
    // Process scheduled notifications that are due
    const { data: scheduledNotifications, error: scheduledError } = await supabase
      .from('notification_queue')
      .select('*')
      .is('batch', null)
      .lt('scheduled_for', now.toISOString())
    
    if (scheduledError) throw scheduledError
    
    // Send each scheduled notification
    for (const notification of scheduledNotifications || []) {
      await supabase.from('notifications').insert({
        user_id: notification.user_id,
        title: notification.title,
        description: notification.description,
        type: notification.type,
        data: notification.data,
      })
      
      // Delete from queue after processing
      await supabase.from('notification_queue').delete().eq('id', notification.id)
    }
  } catch (error) {
    logger.error('Error processing batched notifications:', error)
  }
} 