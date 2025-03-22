"use client"

export const dynamic = "force-dynamic"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/auth-context"
import { Suspense } from "react"

function WelcomeContent() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!user) {
      router.push("/auth/login")
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        <div className="relative h-6 w-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 animate-spin dark:from-amber-400 dark:via-orange-400 dark:to-red-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
          Welcome to Neothink+
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Thank you for joining us! Your account has been successfully created.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-8 py-2 text-sm font-medium text-white transition hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
          >
            Go to Dashboard
          </button>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Get started by exploring your personalized dashboard
          </p>
        </div>
      </div>
    </div>
  )
}

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Suspense>
        <WelcomeContent />
      </Suspense>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-red-900/30" />
      </div>
    </div>
  )
}
