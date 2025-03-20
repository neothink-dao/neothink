"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import {
  Bell,
  Moon,
  Sun,
  Shield,
  Eye,
  Globe,
  Palette,
  Volume2,
  BellRing,
  Mail,
  Smartphone,
  Brain,
  Rocket,
  Zap,
} from "lucide-react"
import { NotificationSettings } from "@/components/ui/notification-settings"

export default function SettingsPage() {
  const router = useRouter()
  const { user, supabase } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState({
    // Appearance
    theme: "system",
    fontSize: "normal",
    reducedMotion: false,
    highContrast: false,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    
    // Privacy
    profileVisibility: "public",
    showOnlineStatus: true,
    showProgress: true,
    
    // Pathway Preferences
    learningStyle: "visual",
    goalReminders: true,
    progressTracking: true,
    
    // Security
    twoFactorEnabled: false,
    loginAlerts: true,
    deviceHistory: true,
  })

  useEffect(() => {
    async function loadSettings() {
      try {
        if (!user?.id) {
          router.push("/auth/sign-in")
          return
        }

        const { data: userSettings, error } = await supabase
          .from("user_settings")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (error) throw error

        if (userSettings) {
          setSettings(prev => ({ ...prev, ...userSettings }))
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading settings:", error)
        toast({
          title: "Error",
          description: "Failed to load your settings. Please try again.",
          variant: "destructive",
        })
      }
    }

    loadSettings()
  }, [user, supabase, router])

  const updateSetting = async (key: string, value: any) => {
    try {
      setSettings(prev => ({ ...prev, [key]: value }))

      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: user?.id,
          [key]: value,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      toast({
        title: "Settings updated",
        description: "Your preferences have been saved.",
      })
    } catch (error) {
      console.error("Error updating setting:", error)
      toast({
        title: "Error",
        description: "Failed to update setting. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent dark:border-orange-400 mx-auto" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading your settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Settings
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Manage your preferences and customize your experience
          </p>
        </div>

        <Tabs defaultValue="appearance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="pathway">Pathway</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["light", "dark", "system"].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => updateSetting("theme", theme)}
                        className={`px-4 py-2 text-sm rounded-md capitalize transition-colors ${
                          settings.theme === theme
                            ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                            : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Reduced Motion</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Minimize animations throughout the app
                    </p>
                  </div>
                  <Switch
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) => updateSetting("reducedMotion", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>High Contrast</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch
                    checked={settings.highContrast}
                    onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <NotificationSettings />
            </div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Control who can see your profile
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSetting("profileVisibility", "public")}
                      className={settings.profileVisibility === "public" ? "bg-amber-100" : ""}
                    >
                      Public
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSetting("profileVisibility", "private")}
                      className={settings.profileVisibility === "private" ? "bg-amber-100" : ""}
                    >
                      Private
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Online Status</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Show when you're active
                    </p>
                  </div>
                  <Switch
                    checked={settings.showOnlineStatus}
                    onCheckedChange={(checked) => updateSetting("showOnlineStatus", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Progress Visibility</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Share your learning progress with others
                    </p>
                  </div>
                  <Switch
                    checked={settings.showProgress}
                    onCheckedChange={(checked) => updateSetting("showProgress", checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Pathway Settings */}
          <TabsContent value="pathway" className="space-y-6">
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-xl font-semibold mb-6">Pathway Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Learning Style</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Customize content based on your learning style
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSetting("learningStyle", "visual")}
                      className={settings.learningStyle === "visual" ? "bg-amber-100" : ""}
                    >
                      Visual
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSetting("learningStyle", "auditory")}
                      className={settings.learningStyle === "auditory" ? "bg-amber-100" : ""}
                    >
                      Auditory
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSetting("learningStyle", "kinesthetic")}
                      className={settings.learningStyle === "kinesthetic" ? "bg-amber-100" : ""}
                    >
                      Hands-on
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Goal Reminders</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Get reminders about your pathway goals
                    </p>
                  </div>
                  <Switch
                    checked={settings.goalReminders}
                    onCheckedChange={(checked) => updateSetting("goalReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Progress Tracking</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Track and analyze your learning progress
                    </p>
                  </div>
                  <Switch
                    checked={settings.progressTracking}
                    onCheckedChange={(checked) => updateSetting("progressTracking", checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorEnabled}
                    onCheckedChange={(checked) => updateSetting("twoFactorEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Login Alerts</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Get notified of new sign-ins
                    </p>
                  </div>
                  <Switch
                    checked={settings.loginAlerts}
                    onCheckedChange={(checked) => updateSetting("loginAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Device History</Label>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Track devices that access your account
                    </p>
                  </div>
                  <Switch
                    checked={settings.deviceHistory}
                    onCheckedChange={(checked) => updateSetting("deviceHistory", checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 