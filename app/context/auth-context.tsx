"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  signUp: (email: string, password: string, options?: { pathway?: string }) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  supabase: ReturnType<typeof createClientComponentClient>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.id)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  const signUp = async (email: string, password: string, options?: { pathway?: string }) => {
    try {
      console.log("Starting signup process...", { email, options })
      
      // Validate password strength
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }
      if (!/[A-Z]/.test(password)) {
        throw new Error("Password must contain at least one uppercase letter")
      }
      if (!/[a-z]/.test(password)) {
        throw new Error("Password must contain at least one lowercase letter")
      }
      if (!/[0-9]/.test(password)) {
        throw new Error("Password must contain at least one number")
      }
      if (!/[^A-Za-z0-9]/.test(password)) {
        throw new Error("Password must contain at least one special character")
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: options,
        },
      })

      if (error) {
        console.error("Signup error:", error)
        throw error
      }

      console.log("Signup successful, redirecting to verification page...")
      router.push("/auth/verify")
    } catch (error: any) {
      console.error("Signup error:", error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Signin error:", error)
        throw error
      }

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Signin error:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push("/auth/login")
    } catch (error: any) {
      console.error("Signout error:", error)
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent dark:border-orange-400" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, supabase }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 