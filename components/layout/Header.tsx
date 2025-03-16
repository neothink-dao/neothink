"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Brain } from "lucide-react"
import { useSupabase } from "@/components/providers/supabase-provider"
import { useAuth } from "@/context/auth-context"

export function Header() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const { user } = useAuth()

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/auth/login")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <header className="border-b border-neothinker-200 bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="rounded-full bg-neothinker-50 p-2">
            <Brain className="h-6 w-6 text-neothinker-600" />
          </div>
          <span className="text-xl font-semibold text-neothinker-900">Neothink+</span>
        </Link>

        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-neothinker-600 hover:text-neothinker-900"
              >
                Dashboard
              </Link>
              <button
                onClick={signOut}
                className="text-sm font-medium text-neothinker-600 hover:text-neothinker-900"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-neothinker-600 hover:text-neothinker-900"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full bg-neothinker-600 px-4 py-2 text-sm font-medium text-white hover:bg-neothinker-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
