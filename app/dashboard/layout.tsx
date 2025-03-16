import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/app/components/dashboard-nav"
import { DashboardTopBar } from "@/app/components/dashboard-top-bar"

export const dynamic = "force-dynamic"

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
    if (!session) redirect("/auth/login")

    // Check if profile exists and onboarding is completed
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("onboarding_completed, first_name, last_name, username, avatar_url")
      .eq("id", session.user.id)
      .single()

    if (profileError) throw profileError
    if (!profile?.onboarding_completed) redirect("/welcome")

    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
        <DashboardNav profile={profile} />
        
        {/* Main content */}
        <div className="lg:pl-64">
          <DashboardTopBar />

          {/* Page content */}
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>

        {/* Background gradient effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-red-900/30" />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Dashboard layout error:", error)
    redirect("/auth/error")
  }
}
