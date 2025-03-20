"use client"

import Link from "next/link"
import { Mail, XCircle, CheckCircle, ArrowLeft, RefreshCw, Clock, ExternalLink } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { AnimatedTransition } from "@/components/ui/AnimatedTransition"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isResending, setIsResending] = useState(false)
  const [toast, setToast] = useState<{ title: string; description: string; type?: 'success' | 'error' } | null>(null)
  const [resendCooldown, setResendCooldown] = useState(0)
  const cooldownIntervalRef = useRef<NodeJS.Timeout>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, supabase } = useAuth()
  const next = searchParams.get("next")

  useEffect(() => {
    let mounted = true

    async function verifyEmail() {
      try {
        if (!user) {
          router.push(`/auth/login${next ? `?next=${next}` : ""}`)
          return
        }

        // Check if email is already verified
        if (user.email_confirmed_at) {
          if (mounted) {
            setToast({
              title: "Email verified",
              description: "Your email has been verified successfully.",
              type: "success"
            })
          }

          // Redirect to next page or welcome after a short delay
          setTimeout(() => {
            router.push(next || "/welcome")
          }, 1000)
          return
        }

        // Check if verification email was sent
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        
        if (mounted) {
          if (!currentUser?.email_confirmed_at) {
            setToast({
              title: "Verification pending",
              description: "Please check your email to verify your account.",
              type: "error"
            })
          }
        }
      } catch (error: any) {
        console.error("Verification error:", error)
        if (mounted) {
          setToast({
            title: "Error",
            description: error.message || "Verification failed. Please try again.",
            type: "error"
          })
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    verifyEmail()

    return () => {
      mounted = false
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current)
      }
    }
  }, [router, user, next, supabase.auth])

  const startResendCooldown = () => {
    setResendCooldown(60)
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    cooldownIntervalRef.current = interval
  }

  const resendEmail = async () => {
    if (!user?.email) {
      setToast({
        title: "Error",
        description: "No email address found. Please try signing up again.",
        type: "error"
      })
      return
    }

    try {
      setIsResending(true)
      setToast(null)

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
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
      startResendCooldown()
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

  const openEmailClient = () => {
    const email = user?.email
    if (!email) return

    const providers = {
      'gmail.com': 'https://mail.google.com',
      'outlook.com': 'https://outlook.live.com',
      'yahoo.com': 'https://mail.yahoo.com',
      'icloud.com': 'https://www.icloud.com/mail'
    }

    const domain = email.split('@')[1]
    const provider = providers[domain as keyof typeof providers]

    if (provider) {
      window.open(provider, '_blank')
    } else {
      setToast({
        title: "Email client not found",
        description: "Please check your email manually.",
        type: "error"
      })
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedTransition>
          <div className="mx-auto max-w-md">
            <div className="rounded-lg border border-zinc-200 bg-white/90 shadow-xl backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/90">
              <div className="p-6">
                <div className="flex flex-col space-y-2 text-center">
                  <motion.div 
                    className="mx-auto rounded-full bg-zinc-100 p-2 dark:bg-zinc-800"
                    animate={isLoading ? { rotate: 360 } : { scale: [1, 1.1, 1] }}
                    transition={isLoading ? { 
                      duration: 1, 
                      repeat: Infinity,
                      ease: "linear" 
                    } : {
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {isLoading ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent dark:border-orange-400" />
                    ) : (
                      <Mail className={`h-6 w-6 ${
                        toast?.type === 'success' 
                          ? 'text-green-500 dark:text-green-400' 
                          : 'text-orange-500 dark:text-orange-400'
                      }`} />
                    )}
                  </motion.div>
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
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 rounded-lg p-4 text-sm ${
                      toast.type === 'success'
                        ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {toast.type === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <div>
                        <p className="font-medium">{toast.title}</p>
                        <p>{toast.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="mt-6 space-y-4">
                  <Button
                    onClick={openEmailClient}
                    variant="outline"
                    className="w-full"
                    disabled={isLoading}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Email Client
                  </Button>

                  <Button
                    onClick={resendEmail}
                    disabled={isResending || resendCooldown > 0 || !user?.email}
                    className="w-full"
                  >
                    {resendCooldown > 0 ? (
                      <>
                        <Clock className="mr-2 h-4 w-4" />
                        Resend in {resendCooldown}s
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Resend Verification Email
                      </>
                    )}
                  </Button>

                  <Link href="/auth/sign-in" className="block">
                    <Button
                      variant="ghost"
                      className="w-full"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedTransition>
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
