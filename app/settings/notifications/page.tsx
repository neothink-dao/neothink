'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { createBrowserClient } from '@supabase/ssr'
import { Bell, Clock, Volume2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

type NotificationPreference = {
  id: string
  type: string
  enabled: boolean
  frequency: string
  quiet_hours_start: string | null
  quiet_hours_end: string | null
}

const notificationTypes = [
  { type: 'achievement', label: 'Achievements', description: 'When you unlock new achievements' },
  { type: 'milestone', label: 'Milestones', description: 'When you reach important milestones' },
  { type: 'reminder', label: 'Reminders', description: 'Daily reminders and tasks' },
  { type: 'system', label: 'System Updates', description: 'Important system announcements' },
  { type: 'pathway', label: 'Pathway Updates', description: 'Changes to your learning pathway' },
  { type: 'streak', label: 'Learning Streaks', description: 'Updates about your learning streaks' },
  { type: 'content', label: 'New Content', description: 'When new learning content is available' },
  { type: 'profile', label: 'Profile Updates', description: 'Changes to your profile' },
  { type: 'security', label: 'Security Alerts', description: 'Important security notifications' },
  { type: 'goal', label: 'Goal Progress', description: 'Updates on your goal progress' },
  { type: 'innovation', label: 'Innovation Updates', description: 'Status of your innovation submissions' },
  { type: 'feedback', label: 'Feedback', description: 'When you receive feedback' },
  { type: 'collaboration', label: 'Collaboration', description: 'Collaboration requests and updates' },
  { type: 'mentorship', label: 'Mentorship', description: 'Mentorship session reminders' },
  { type: 'community', label: 'Community', description: 'Community highlights and mentions' }
]

export default function NotificationSettings() {
  const { user } = useAuth()
  const [preferences, setPreferences] = useState<NotificationPreference[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (!user) return
    
    const fetchPreferences = async () => {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        toast.error('Failed to load notification preferences')
        return
      }

      setPreferences(data || [])
      setLoading(false)
    }

    fetchPreferences()
  }, [user, supabase])

  const updatePreference = async (type: string, field: string, value: any) => {
    if (!user) return

    const preference = preferences.find(p => p.type === type)
    if (!preference) return

    try {
      const { error } = await supabase
        .from('notification_preferences')
        .update({ [field]: value })
        .eq('user_id', user.id)
        .eq('type', type)

      if (error) throw error

      setPreferences(preferences.map(p => 
        p.type === type ? { ...p, [field]: value } : p
      ))

      toast.success('Preferences updated')
    } catch (error) {
      toast.error('Failed to update preferences')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-800" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            General Settings
          </CardTitle>
          <CardDescription>
            Configure your general notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Email Notifications</Label>
              <p className="text-sm text-zinc-500">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={preferences.some(p => p.frequency === 'email')}
              onCheckedChange={(checked) => {
                preferences.forEach(p => {
                  updatePreference(p.type, 'frequency', checked ? 'email' : 'instant')
                })
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Quiet Hours</Label>
              <p className="text-sm text-zinc-500">
                Don't send notifications during these hours
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={preferences[0]?.quiet_hours_start || ''}
                onValueChange={(value) => {
                  preferences.forEach(p => {
                    updatePreference(p.type, 'quiet_hours_start', value)
                  })
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Start time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <SelectItem key={i} value={`${i}:00`}>
                      {`${i}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>to</span>
              <Select
                value={preferences[0]?.quiet_hours_end || ''}
                onValueChange={(value) => {
                  preferences.forEach(p => {
                    updatePreference(p.type, 'quiet_hours_end', value)
                  })
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="End time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <SelectItem key={i} value={`${i}:00`}>
                      {`${i}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Types
          </CardTitle>
          <CardDescription>
            Choose which notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {notificationTypes.map(({ type, label, description }) => {
            const preference = preferences.find(p => p.type === type)
            if (!preference) return null

            return (
              <div key={type} className="flex items-start justify-between">
                <div className="space-y-1">
                  <Label>{label}</Label>
                  <p className="text-sm text-zinc-500">
                    {description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Select
                    value={preference.frequency}
                    onValueChange={(value) => updatePreference(type, 'frequency', value)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instant</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                  <Switch
                    checked={preference.enabled}
                    onCheckedChange={(checked) => updatePreference(type, 'enabled', checked)}
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
} 