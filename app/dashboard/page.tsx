"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Brain, Rocket, Zap } from "lucide-react"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState<{ title: string; description: string; type?: 'success' | 'error' } | null>(null)
  const [profile, setProfile] = useState<{ name: string; bio: string | null } | null>(null)
  const router = useRouter()
  const { user, supabase } = useAuth()

  useEffect(() => {
    async function loadProfile() {
      try {
        if (!user) {
          router.push("/auth/login")
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("name, bio, onboarding_completed")
          .eq("id", user.id)
          .single()

        if (profileError) {
          throw profileError
        }

        if (!profile.onboarding_completed) {
          router.push("/welcome")
          return
        }

        setProfile(profile)
      } catch (error: any) {
        console.error("Dashboard error:", error)
        setToast({
          title: "Error",
          description: error.message || "Failed to load profile. Please try again.",
          type: "error"
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [router, supabase, user])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-center py-12">
            <svg
              className="animate-spin h-8 w-8 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
              Welcome to Your Dashboard, {profile?.name}
            </h1>
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
              Track your progress and access your tools across all Neothink+ platforms
            </p>
          </div>

          {/* Sub-brand Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Neothinker Card */}
            <div className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20">
                  <Brain className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Neothinker</h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Knowledge Synthesis</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Learning Progress</span>
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">75%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-700">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800">
                  View Notes
                </button>
                <button className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2 text-sm font-medium text-white transition hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:from-amber-400 dark:to-orange-400 dark:hover:from-amber-300 dark:hover:to-orange-300">
                  Continue
                </button>
              </div>
            </div>

            {/* Ascender Card */}
            <div className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                  <Rocket className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Ascender</h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Personal Growth</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Growth Progress</span>
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">50%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-700">
                  <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800">
                  View Goals
                </button>
                <button className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 text-sm font-medium text-white transition hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:from-orange-400 dark:to-red-400 dark:hover:from-orange-300 dark:hover:to-red-300">
                  Continue
                </button>
              </div>
            </div>

            {/* Immortal Card */}
            <div className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                  <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Immortal</h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Innovation</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Innovation Score</span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">25%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-700">
                  <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800">
                  View Ideas
                </button>
                <button className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-red-500 to-red-600 px-3 py-2 text-sm font-medium text-white transition hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:from-red-400 dark:to-red-500 dark:hover:from-red-300 dark:hover:to-red-400">
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Recent Activity</h2>
            <div className="mt-4 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-800/50">
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {[
                  {
                    title: "Completed Learning Path",
                    description: "Advanced Pattern Recognition",
                    time: "2 hours ago",
                    type: "neothinker"
                  },
                  {
                    title: "Achievement Unlocked",
                    description: "30 Day Streak",
                    time: "1 day ago",
                    type: "ascender"
                  },
                  {
                    title: "New Innovation",
                    description: "Submitted breakthrough idea",
                    time: "3 days ago",
                    type: "immortal"
                  }
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      activity.type === "neothinker" ? "bg-amber-100 dark:bg-amber-900/20" :
                      activity.type === "ascender" ? "bg-orange-100 dark:bg-orange-900/20" :
                      "bg-red-100 dark:bg-red-900/20"
                    }`}>
                      {activity.type === "neothinker" ? (
                        <Brain className={`h-4 w-4 text-amber-600 dark:text-amber-400`} />
                      ) : activity.type === "ascender" ? (
                        <Rocket className={`h-4 w-4 text-orange-600 dark:text-orange-400`} />
                      ) : (
                        <Zap className={`h-4 w-4 text-red-600 dark:text-red-400`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{activity.title}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{activity.description}</p>
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-red-900/30" />
      </div>
      {toast && (
        <div className={`mt-6 rounded-lg border p-4 ${
          toast.type === "error" 
            ? "border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            : "border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
        }`}>
          <p className="text-sm font-medium">{toast.title}</p>
          <p className="text-sm mt-1">{toast.description}</p>
        </div>
      )}
    </div>
  )
}
