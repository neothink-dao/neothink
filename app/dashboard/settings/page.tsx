"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/auth-context"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@supabase/ssr"

interface Settings {
  theme: "light" | "dark" | "system"
  notifications: {
    email: boolean
    push: boolean
  }
  profile: {
    name: string
    bio: string
  }
}

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<Settings>({
    theme: "system",
    notifications: {
      email: true,
      push: true,
    },
    profile: {
      name: "",
      bio: "",
    },
  })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in")
      return
    }

    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from("user_settings")
          .select("*")
          .eq("user_id", user?.id)
          .single()

        if (error) throw error

        if (data) {
          setSettings({
            ...settings,
            ...data,
          })
        }
      } catch (error) {
        console.error("Error loading settings:", error)
        setError("Failed to load settings")
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [user, router])

  const handleSave = async () => {
    if (!user) {
      setError("You must be signed in to save settings")
      return
    }

    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: user.id,
          ...settings,
        })

      if (error) throw error

      setSuccessMessage("Settings saved successfully")
    } catch (error) {
      console.error("Error saving settings:", error)
      setError("Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </Container>
    )
  }

  if (!user) {
    return (
      <Container className="flex items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              Please sign in to access your settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/auth/sign-in")}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </Container>
    )
  }

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert variant="success">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Profile</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={settings.profile.name}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      profile: { ...settings.profile, name: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={settings.profile.bio}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      profile: { ...settings.profile, bio: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notifications</h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, email: checked },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push notifications</Label>
                <Switch
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, push: checked },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              "Save changes"
            )}
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
} 