"use client"

import Link from "next/link"
import { Mail, XCircle, CheckCircle, ArrowLeft, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export const dynamic = "force-dynamic"

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isResending, setIsResending] = useState(false)
  const [toast, setToast] = useState<{ title: string; description: string; type?: 'success' | 'error' } | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, supabase } = useAuth()
  const next = searchParams.get("next")

  useEffect(() => {
    async function verifyEmail() {
      try {
        if (!user) {
          router.push(`/auth/login${next ? `?next=${next}` : ""}`)
          return
        }

        if (!user.email_confirmed_at) {
          setToast({
            title: "Verification pending",
            description: "Please check your email to verify your account.",
            type: "error"
          })
          return
        }

        setToast({
          title: "Email verified",
          description: "Your email has been verified successfully.",
          type: "success"
        })

        // Redirect to next page or welcome after a short delay
        setTimeout(() => {
          router.push(next || "/welcome")
        }, 1000)
      } catch (error: any) {
        console.error("Verification error:", error)
        setToast({
          title: "Error",
          description: error.message || "Verification failed. Please try again.",
          type: "error"
        })
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [router, user, next])

  const resendEmail = async () => {
    try {
      setIsResending(true)
      setToast(null)

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user?.email || '',
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback${next ? `?next=${next}` : ""}`
        }
      })

      if (error) throw error

      setToast({
        title: "Email sent",
        description: "A new verification link has been sent to your email.",
        type: "success"
      })
    } catch (error: any) {
      console.error("Resend error:", error)
      setToast({
        title: "Error",
        description: error.message || "Failed to resend email. Please try again.",
        type: "error"
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-800/50">
            <div className="p-6">
              <div className="flex flex-col space-y-2 text-center">
                <div className="mx-auto rounded-full bg-zinc-100 p-2 dark:bg-zinc-800">
                  {isLoading ? (
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent dark:border-orange-400" />
                  ) : (
                    <Mail className={`h-6 w-6 ${
                      toast?.type === 'success' 
                        ? 'text-green-500 dark:text-green-400' 
                        : 'text-orange-500 dark:text-orange-400'
                    }`} />
                  )}
                </div>
                <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                  {isLoading ? "Verifying..." : "Verify Your Email"}
                </h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {isLoading 
                    ? "Please wait while we verify your email address" 
                    : "Check your email for a verification link"}
                </p>
              </div>

              {toast && (
                <div className={`mt-6 rounded-lg border p-4 ${
                  toast.type === "error" 
                    ? "border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300"
                    : "border-green-200 bg-green-50 text-green-900 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-300"
                }`}>
                  <div className="flex items-center gap-2">
                    {toast.type === "error" ? (
                      <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                    )}
                    <p className="text-sm font-medium">{toast.title}</p>
                  </div>
                  <p className="mt-1 text-sm">{toast.description}</p>
                </div>
              )}

              <div className="mt-6 w-full space-y-4">
                <Link
                  href={`/auth/login${next ? `?next=${next}` : ""}`}
                  className="inline-flex h-10 w-full items-center justify-center rounded-md border border-zinc-200 bg-white/80 backdrop-blur px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Login
                </Link>

                <button
                  onClick={resendEmail}
                  disabled={isResending}
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
                  aria-live="polite"
                >
                  {isResending ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend Email
                    </>
                  )}
                </button>
              </div>

              <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
                Having trouble? Contact{" "}
                <a 
                  href="mailto:support@neothink.com" 
                  className="text-zinc-900 hover:text-zinc-700 dark:text-zinc-200 dark:hover:text-zinc-300"
                >
                  support@neothink.com
                </a>
              </p>
            </div>
          </div>
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
