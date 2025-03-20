"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const next = searchParams.get("next")

  useEffect(() => {
    if (user?.email_confirmed_at) {
      // User is verified, redirect to next page or dashboard
      router.push(next || "/dashboard")
    } else if (user && !user.email_confirmed_at) {
      // User exists but not verified, send to verify page with next parameter
      router.push(`/auth/verify${next ? `?next=${next}` : ""}`)
    } else {
      // No user session, redirect to login with next parameter
      router.push(`/auth/login${next ? `?next=${next}` : ""}`)
    }
  }, [router, user, next])

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-800/50">
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
          <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Verifying your account...
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CallbackPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Suspense fallback={<LoadingSpinner />}>
        <CallbackContent />
      </Suspense>
    </div>
  )
}
