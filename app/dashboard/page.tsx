"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/auth-context"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@supabase/ssr"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<{ name: string; bio: string | null } | null>(null)
  const router = useRouter()
  const { user } = useAuth()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in")
      return
    }

    async function loadProfile() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("name, bio")
          .eq("id", user?.id)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [user, router])

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
              Please sign in to access your dashboard.
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
          <CardTitle>Welcome, {profile?.name || user.email}</CardTitle>
          <CardDescription>
            This is your personal dashboard where you can manage your account and access your learning resources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profile?.bio && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {profile.bio}
            </p>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}
