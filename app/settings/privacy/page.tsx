'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/auth-context'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createServerClient } from '@/lib/supabase/server'

interface PrivacySettings {
  public_profile: boolean
  show_pathway: boolean
  show_achievements: boolean
  show_activity: boolean
  allow_mentions: boolean
  allow_messages: boolean
}

export default function PrivacySettings() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [settings, setSettings] = useState<PrivacySettings>({
    public_profile: true,
    show_pathway: true,
    show_achievements: true,
    show_activity: true,
    allow_mentions: true,
    allow_messages: true,
  })

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return

      try {
        const supabase = await createServerClient()
        const { data, error } = await supabase
          .from('privacy_settings')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error) throw error

        if (data) {
          setSettings(data)
        }
      } catch (err) {
        console.error('Error fetching privacy settings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [user])

  const updateSetting = async (key: keyof PrivacySettings, value: boolean) => {
    if (!user) return

    setSettings((prev) => ({ ...prev, [key]: value }))

    try {
      const supabase = await createServerClient()
      const { error } = await supabase
        .from('privacy_settings')
        .upsert({
          user_id: user.id,
          [key]: value,
        })

      if (error) throw error

      setSuccess('Settings updated successfully')
    } catch (err) {
      setError('Failed to update settings')
      setSettings((prev) => ({ ...prev, [key]: !value })) // Revert on error
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Privacy</h3>
        <p className="text-sm text-muted-foreground">
          Manage your privacy settings and control what others can see.
        </p>
      </div>

      {error && (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="success">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="public-profile">Public Profile</Label>
            <p className="text-sm text-muted-foreground">
              Allow others to view your profile
            </p>
          </div>
          <Switch
            id="public-profile"
            checked={settings.public_profile}
            onCheckedChange={(checked) => updateSetting('public_profile', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="show-pathway">Show Pathway</Label>
            <p className="text-sm text-muted-foreground">
              Display your current pathway on your profile
            </p>
          </div>
          <Switch
            id="show-pathway"
            checked={settings.show_pathway}
            onCheckedChange={(checked) => updateSetting('show_pathway', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="show-achievements">Show Achievements</Label>
            <p className="text-sm text-muted-foreground">
              Display your achievements on your profile
            </p>
          </div>
          <Switch
            id="show-achievements"
            checked={settings.show_achievements}
            onCheckedChange={(checked) => updateSetting('show_achievements', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="show-activity">Show Activity</Label>
            <p className="text-sm text-muted-foreground">
              Display your recent activity in the community
            </p>
          </div>
          <Switch
            id="show-activity"
            checked={settings.show_activity}
            onCheckedChange={(checked) => updateSetting('show_activity', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="allow-mentions">Allow Mentions</Label>
            <p className="text-sm text-muted-foreground">
              Allow others to mention you in comments and posts
            </p>
          </div>
          <Switch
            id="allow-mentions"
            checked={settings.allow_mentions}
            onCheckedChange={(checked) => updateSetting('allow_mentions', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="allow-messages">Allow Messages</Label>
            <p className="text-sm text-muted-foreground">
              Allow others to send you direct messages
            </p>
          </div>
          <Switch
            id="allow-messages"
            checked={settings.allow_messages}
            onCheckedChange={(checked) => updateSetting('allow_messages', checked)}
          />
        </div>
      </div>
    </div>
  )
} 