import { useNotifications } from '@/context/notification-context'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { NotificationChannel, NotificationFrequency } from '@/types'
import { useState } from 'react'

const FREQUENCY_OPTIONS: { value: NotificationFrequency; label: string }[] = [
  { value: 'instant', label: 'Instant' },
  { value: 'daily', label: 'Daily Digest' },
  { value: 'weekly', label: 'Weekly Digest' },
  { value: 'never', label: 'Never' },
]

const CHANNEL_LABELS: Record<NotificationChannel, string> = {
  email: 'Email Notifications',
  push: 'Push Notifications',
  in_app: 'In-App Notifications',
}

export function NotificationSettings() {
  const { preferences, updatePreferences, loading } = useNotifications()
  const [activeTab, setActiveTab] = useState<NotificationChannel>('email')

  const currentPreference = preferences.find((p) => p.channel === activeTab)

  const handleFrequencyChange = (frequency: NotificationFrequency) => {
    if (currentPreference) {
      updatePreferences({ ...currentPreference, frequency })
    }
  }

  const handleEnabledChange = (enabled: boolean) => {
    if (currentPreference) {
      updatePreferences({ ...currentPreference, enabled })
    }
  }

  const handleQuietHoursChange = (start: string | undefined, end: string | undefined) => {
    if (currentPreference) {
      updatePreferences({
        ...currentPreference,
        quietHoursStart: start,
        quietHoursEnd: end,
      })
    }
  }

  if (loading) {
    return <div className="p-4">Loading notification preferences...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Notification Settings
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage how and when you receive notifications.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as NotificationChannel)}>
        <TabsList>
          {Object.entries(CHANNEL_LABELS).map(([channel, label]) => (
            <TabsTrigger key={channel} value={channel}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(CHANNEL_LABELS).map((channel) => (
          <TabsContent key={channel} value={channel}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Enable {CHANNEL_LABELS[channel as NotificationChannel]}
                  </h4>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Receive notifications through this channel.
                  </p>
                </div>
                <Switch
                  checked={currentPreference?.enabled ?? false}
                  onCheckedChange={handleEnabledChange}
                />
              </div>

              {currentPreference?.enabled && (
                <>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Notification Frequency
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {FREQUENCY_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleFrequencyChange(option.value)}
                          className={`px-4 py-2 text-sm rounded-md transition-colors ${
                            currentPreference?.frequency === option.value
                              ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                              : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Quiet Hours
                    </h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Set a time range when you don't want to receive notifications.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="quietHoursStart"
                          className="block text-sm text-zinc-500 dark:text-zinc-400"
                        >
                          Start Time
                        </label>
                        <input
                          type="time"
                          id="quietHoursStart"
                          value={currentPreference?.quietHoursStart ?? ''}
                          onChange={(e) =>
                            handleQuietHoursChange(
                              e.target.value || undefined,
                              currentPreference?.quietHoursEnd
                            )
                          }
                          className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="quietHoursEnd"
                          className="block text-sm text-zinc-500 dark:text-zinc-400"
                        >
                          End Time
                        </label>
                        <input
                          type="time"
                          id="quietHoursEnd"
                          value={currentPreference?.quietHoursEnd ?? ''}
                          onChange={(e) =>
                            handleQuietHoursChange(
                              currentPreference?.quietHoursStart,
                              e.target.value || undefined
                            )
                          }
                          className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
} 