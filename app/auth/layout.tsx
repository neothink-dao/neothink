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
    <div className="relative min-h-screen flex flex-col bg-zinc-50 dark:bg-black">
      {/* Logo */}
      <div className="fixed top-8 left-8 z-50">
        <a href="/" className="flex items-center space-x-2 opacity-75 transition-opacity hover:opacity-100">
          <div className="rounded-full bg-zinc-100 p-2 dark:bg-zinc-800/50">
            <Brain className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
          </div>
          <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Neothink+
          </span>
        </a>
      </div>

      {/* Main content */}
      <main className="relative flex-1 flex items-start justify-center px-4 pt-32 pb-16">
        <div className="w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-amber-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30 dark:mix-blend-normal" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-orange-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30 dark:mix-blend-normal" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-red-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-red-900/30 dark:mix-blend-normal" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-50/80 dark:to-black/80" />
      </div>
    </div>
  )
}
