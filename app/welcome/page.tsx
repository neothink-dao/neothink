// Force dynamic rendering for this route
export const dynamic = "force-dynamic"

// Use edge runtime for better performance
export const runtime = "edge"

import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { WelcomeContent } from "./welcome-content"

export default async function WelcomePage() {
  const supabase = await createServerClient()
  
  // Check session server-side
  const { data: { session } } = await supabase.auth.getSession()
  
  // Redirect if not authenticated
  if (!session) {
    redirect("/auth/login")
  }

  // Check profile status
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", session.user.id)
    .single()

  // Redirect if onboarding is already completed
  if (profile?.onboarding_completed) {
    redirect("/dashboard")
  }

  return <WelcomeContent userId={session.user.id} />
}
