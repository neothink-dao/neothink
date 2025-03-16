"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Brain } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { checkAuth } from "./actions"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { loading } = useAuth()

  // Skip auth check for not-found page
  useEffect(() => {
    if (pathname === "/_not-found") return

    async function checkAuthStatus() {
      try {
        const redirectTo = await checkAuth()
        if (redirectTo) {
          router.replace(redirectTo)
        }
      } catch (error) {
        console.error("Auth layout error:", error)
      }
    }

    checkAuthStatus()
  }, [router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="relative mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mx-auto rounded-full bg-zinc-100 p-2 dark:bg-zinc-800/50">
              <Brain className="h-6 w-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse dark:from-amber-400 dark:via-orange-400 dark:to-red-400" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
              Loading...
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Setting up your session
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="relative isolate min-h-screen">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-600 to-amber-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-amber-500 to-orange-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
          </div>
        </div>

        <div className="px-6 py-10 sm:py-16 lg:py-20">
          {children}
        </div>
      </main>
    </div>
  )
}
