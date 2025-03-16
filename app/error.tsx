"use client"

import { useEffect } from "react"
import Link from "next/link"
import { XCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto rounded-full bg-zinc-100 p-2 dark:bg-zinc-800">
            <XCircle className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
            Something went wrong!
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            onClick={reset}
            className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
          >
            Try again
          </button>

          <Link 
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Return Home
          </Link>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-red-900/30" />
      </div>
    </div>
  )
}
