"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900">
          <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-800/50">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-zinc-100 p-2 dark:bg-zinc-800">
                <AlertCircle className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h2 className="text-lg font-semibold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                Oops! Something went wrong
              </h2>
            </div>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              We&apos;re sorry for the inconvenience. Our team has been notified.
            </p>
            <div className="mt-6 flex flex-col space-y-2">
              <button
                onClick={reset}
                className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
              >
                Try again
              </button>
            </div>
          </div>

          {/* Background gradient effects */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30" />
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30" />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-red-900/30" />
          </div>
        </div>
      </body>
    </html>
  )
}
