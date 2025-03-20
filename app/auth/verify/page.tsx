"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Loading } from "@/components/ui/loading"
import { ErrorAlert } from "@/components/ui/error-alert"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, ExternalLink, RefreshCw } from "lucide-react"

export default function VerifyPage() {
  const { user, error, clearError, supabase } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const cooldownIntervalRef = useRef<NodeJS.Timeout>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get("next")

  useEffect(() => {
    let mounted = true

    async function verifyEmail() {
      try {
        if (!user) {
          router.push(`/auth/sign-in${next ? `?next=${next}` : ""}`)
          return
        }

        // Check if email is already verified
        if (user.email_confirmed_at) {
          // Redirect to next page or welcome after a short delay
          setTimeout(() => {
            router.push(next || "/welcome")
          }, 1000)
          return
        }
      } catch (error) {
        // Error is handled by the auth context
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
  }, [router, user, next])

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
      return
    }

    try {
      setIsResending(true)
      clearError()

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback${next ? `?next=${next}` : ""}`
        }
      })

      if (error) throw error

      startResendCooldown()
    } catch (error) {
      // Error is handled by the auth context
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
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-lg border border-border/50 bg-card p-6 shadow-xl mx-4"
      >
        <div className="mb-8 text-center">
          <motion.div 
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
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
              <Loading size="md" />
            ) : (
              <Mail className="h-6 w-6 text-primary" />
            )}
          </motion.div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isLoading ? "Verifying..." : "Check your email"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLoading 
              ? "Please wait while we verify your email address" 
              : `We've sent a verification link to ${user?.email}`}
          </p>
        </div>

        <ErrorAlert error={error} onDismiss={clearError} />

        <div className="space-y-4">
          <Button
            onClick={openEmailClient}
            variant="outline"
            className="h-11 w-full font-medium"
            disabled={isLoading}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open email client
          </Button>

          <Button
            onClick={resendEmail}
            className="h-11 w-full font-medium"
            disabled={isLoading || isResending || resendCooldown > 0 || !user?.email}
          >
            {resendCooldown > 0 ? (
              <>
                <Loading size="sm" className="mr-2" />
                Resend in {resendCooldown}s
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Resend verification email
              </>
            )}
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Wrong email?
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="h-11 w-full font-medium"
            asChild
          >
            <Link href="/auth/sign-in">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
