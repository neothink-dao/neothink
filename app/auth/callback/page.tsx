"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Suspense } from "react"

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
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 animate-spin dark:from-amber-400 dark:via-orange-400 dark:to-red-400" />
              <div className="absolute inset-0.5 rounded-full bg-white dark:bg-zinc-900" />
              <svg
                className="relative h-8 w-8 text-zinc-600 dark:text-zinc-400"
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
      <Suspense>
        <CallbackContent />
      </Suspense>
    </div>
  )
}
