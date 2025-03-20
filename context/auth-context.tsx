"use client"

import { createContext, useContext, useEffect, useState, Suspense } from "react"
import { useSupabase } from "@/components/providers/supabase-provider"
import type { User } from "@supabase/supabase-js"
import { useToast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { AppError } from "@/lib/error-handling"
import { rateLimiter } from "@/lib/rate-limiter"

interface SignUpOptions {
  pathway: "ascender" | "neothinker" | "immortal"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: AppError | null
  supabase: ReturnType<typeof useSupabase>["supabase"]
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signUp: (email: string, password: string, options?: SignUpOptions) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthContent({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AppError | null>(null)
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        setUser(session?.user ?? null)
      } catch (error: any) {
        console.error("Error getting session:", error.message)
        toast({
          title: "Error",
          description: "Failed to get user session",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const previousUser = user
      const currentUser = session?.user ?? null
      setUser(currentUser)
      setLoading(false)

      // Handle auth state changes
      if (event === "SIGNED_IN") {
        // User just signed in, check verification
        if (currentUser?.email_confirmed_at) {
          const next = searchParams.get("next")
          router.push(next || "/dashboard")
        } else {
          router.push("/auth/verify")
        }
      } else if (event === "SIGNED_OUT") {
        router.push("/auth/sign-in")
      } else if (event === "USER_UPDATED") {
        // Handle email verification
        if (!previousUser?.email_confirmed_at && currentUser?.email_confirmed_at) {
          toast({
            title: "Email verified",
            description: "Your email has been successfully verified.",
          })
          router.push("/welcome")
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const clearError = () => {
    setError(null)
  }

  const signIn = async (email: string, password: string, rememberMe = false) => {
    try {
      setError(null)

      // Check rate limit
      const rateLimit = rateLimiter.checkRateLimit(email.toLowerCase())
      if (!rateLimit.allowed) {
        const minutes = Math.ceil(rateLimit.waitTime! / (60 * 1000))
        throw new AppError(
          `Too many sign-in attempts. Please try again in ${minutes} minutes.`,
          "RATE_LIMIT_EXCEEDED",
          429
        )
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        throw new AppError(
          authError.message,
          authError.name,
          401
        )
      }

      // Set session persistence after successful sign in
      await supabase.auth.setSession({
        access_token: (await supabase.auth.getSession()).data.session?.access_token || '',
        refresh_token: (await supabase.auth.getSession()).data.session?.refresh_token || '',
      })

      // Update session configuration
      const { error: updateError } = await supabase.auth.updateUser({
        data: { persistent: rememberMe }
      })

      if (updateError) {
        console.error("Error updating session persistence:", updateError)
      }

      // Reset rate limit on successful sign in
      rateLimiter.reset(email.toLowerCase())

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      })
    } catch (error: any) {
      console.error("Error signing in:", error.message)
      const appError = error instanceof AppError
        ? error
        : new AppError(
            error.message || "Failed to sign in. Please check your credentials and try again.",
            error.code || "AUTH_ERROR",
            401
          )
      setError(appError)
      toast({
        title: "Error",
        description: appError.message,
        variant: "destructive",
      })
      throw appError
    }
  }

  const signUp = async (email: string, password: string, options?: SignUpOptions) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            pathway: options?.pathway,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/welcome`
        }
      })

      if (error) {
        throw error
      }

      // Show success toast
      toast({
        title: "Check your email",
        description: "We've sent you a verification link. Click the link to verify your account.",
      })

      // Redirect to verify page with next parameter
      router.push("/auth/verify?next=/welcome")
    } catch (error: any) {
      console.error("Sign up error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to sign up. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })

      router.push("/auth/sign-in")
    } catch (error: any) {
      console.error("Error signing out:", error.message)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
      })

      if (error) throw error

      toast({
        title: "Reset link sent",
        description: "Check your email for the password reset link.",
      })
    } catch (error: any) {
      console.error("Error resetting password:", error.message)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
    } catch (error: any) {
      console.error("Error updating password:", error.message)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const value = {
    user,
    loading,
    error,
    supabase,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Suspense>
      <AuthContent>{children}</AuthContent>
    </Suspense>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
