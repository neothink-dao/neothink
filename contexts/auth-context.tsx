"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, UserProfile } from '@/lib/supabase'
import { AppError, errorMessages, handleError } from '@/lib/error-handling'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  error: AppError | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AppError | null>(null)

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId: string) {
    try {
      setLoading(true)
      const profile = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profile.error) throw profile.error
      setProfile(profile.data)
    } catch (error) {
      setError(handleError(error))
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      setError(handleError(error))
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function signUp(email: string, password: string) {
    try {
      setLoading(true)
      setError(null)
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
      })
      if (signUpError) throw signUpError

      if (data.user) {
        // Create a new profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              superachiever_progress: {
                ascender: 0,
                neothinker: 0,
                immortal: 0
              }
            }
          ])
        if (profileError) throw profileError
      }
    } catch (error) {
      setError(handleError(error))
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      setError(handleError(error))
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile(data: Partial<UserProfile>) {
    if (!user) throw new Error('No user logged in')

    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase
        .from('user_profiles')
        .update(data)
        .eq('id', user.id)

      if (error) throw error

      // Refresh profile data
      await fetchProfile(user.id)
    } catch (error) {
      setError(handleError(error))
      throw error
    } finally {
      setLoading(false)
    }
  }

  function clearError() {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        updateProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 