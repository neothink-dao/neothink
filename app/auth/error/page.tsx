"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-800/50">
          <div className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              
              <h2 className="mt-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-xl font-semibold text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                Authentication Error
              </h2>
              
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                We encountered an issue while processing your request. This could be due to an expired link or invalid credentials.
              </p>

              <div className="mt-6 w-full space-y-4">
                <Link
                  href="/auth/login"
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
                >
                  Return to Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="inline-flex h-10 w-full items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Create Account
                </Link>
              </div>

              <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
                Need help? Contact{" "}
                <a href="mailto:support@neothink.com" className="text-zinc-900 hover:text-zinc-700 dark:text-zinc-200 dark:hover:text-zinc-300">
                  support@neothink.com
                </a>
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Error: {error || "An unexpected authentication error occurred"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Suspense>
        <ErrorContent />
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
