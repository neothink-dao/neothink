"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { createClient } from "../../lib/supabase/client"

export function WelcomeContent({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ title: string; description: string; type?: 'success' | 'error' } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function completeOnboarding() {
    setIsLoading(true)
    setToast(null)

    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("id", userId)

      if (updateError) {
        throw updateError
      }

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Welcome form error:", error)
      setToast({
        title: "Error",
        description: error.message || "Failed to complete onboarding. Please try again.",
        type: "error"
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-800/50">
            <div className="border-b border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-xl font-semibold text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                Welcome to Neothink+
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Your gateway to a suite of powerful tools for personal growth and innovation
              </p>
            </div>
            
            <div className="space-y-6 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-900/20">
                  <svg className="h-5 w-5 text-amber-600 dark:text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-6.45 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2Z" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-6.45 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2Z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-amber-900 dark:text-amber-300">Neothinker</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400">Advanced learning and knowledge synthesis</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-md border border-orange-200 bg-orange-50 p-3 dark:border-orange-900/50 dark:bg-orange-900/20">
                  <svg className="h-5 w-5 text-orange-600 dark:text-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-orange-900 dark:text-orange-300">Ascender</h3>
                    <p className="text-sm text-orange-700 dark:text-orange-400">Personal growth and achievement tracking</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-900/20">
                  <svg className="h-5 w-5 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-900 dark:text-red-300">Immortal</h3>
                    <p className="text-sm text-red-700 dark:text-red-400">Innovation and breakthrough insights</p>
                  </div>
                </div>
              </div>

              <button
                onClick={completeOnboarding}
                disabled={isLoading}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
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
                    Getting Started...
                  </span>
                ) : (
                  "Get Started"
                )}
              </button>

              {toast && (
                <div className={`rounded-lg border p-4 ${
                  toast.type === "error" 
                    ? "border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300"
                    : "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300"
                }`}>
                  <div className="flex items-start gap-3">
                    {toast.type === "error" ? (
                      <svg className="h-5 w-5 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    )}
                    <div>
                      <p className={`text-sm font-medium ${
                        toast.type === "error"
                          ? "text-red-900 dark:text-red-300"
                          : "text-emerald-900 dark:text-emerald-300"
                      }`}>{toast.title}</p>
                      <p className={`text-sm mt-1 ${
                        toast.type === "error"
                          ? "text-red-700 dark:text-red-400"
                          : "text-emerald-700 dark:text-emerald-400"
                      }`}>{toast.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
