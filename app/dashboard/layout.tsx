import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/app/components/dashboard-nav"
import { DashboardTopBar } from "@/app/components/dashboard-top-bar"
import { Suspense } from "react"
import { AlertCircle, Loader2 } from "lucide-react"

export const dynamic = "force-dynamic"

function LoadingState() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto" />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading your dashboard...</p>
      </div>
    </div>
  )
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md mx-auto px-4">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Something went wrong</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

type Pathway = "ascender" | "neothinker" | "immortal"

const pathwayColors = {
  ascender: "orange",
  neothinker: "amber",
  immortal: "red"
} as const

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    // Check auth
    const supabase = await createServerClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) throw error
    if (!session) redirect("/auth/sign-in")

    // Check if profile exists and onboarding is completed
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("onboarding_completed, first_name, last_name, username, avatar_url, pathway")
      .eq("id", session.user.id)
      .single()

    if (profileError) throw profileError
    if (!profile?.onboarding_completed) redirect("/welcome")

    const pathwayColor = profile.pathway && (profile.pathway as Pathway) in pathwayColors
      ? pathwayColors[profile.pathway as Pathway]
      : "orange"

    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
        <DashboardNav profile={profile} />
        
        {/* Main content */}
        <div className="lg:pl-64">
          <DashboardTopBar />

          {/* Page content */}
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Suspense fallback={<LoadingState />}>
                {children}
              </Suspense>
            </div>
          </main>
        </div>

        {/* Background gradient effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className={`absolute -top-1/2 -right-1/4 w-96 h-96 bg-${pathwayColor}-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-${pathwayColor}-900/30`} />
          <div className={`absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-${pathwayColor}-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-${pathwayColor}-900/30`} />
          <div className={`absolute top-1/2 left-1/2 w-96 h-96 bg-${pathwayColor}-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-${pathwayColor}-900/30`} />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Dashboard layout error:", error)
    return <ErrorState error="Failed to load your dashboard. Please try again." />
  }
}
