"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from "@supabase/ssr"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Suspense } from 'react'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      
      // Check if we have a code (OAuth) or access_token (magic link)
      const code = searchParams.get('code')
      const accessToken = searchParams.get('access_token')
      
      if (code || accessToken) {
        await supabase.auth.exchangeCodeForSession(code || accessToken || '')
      }
      
      // Get the session
      const { data: { session } } = await supabase.auth.getSession()
      
      // Get the redirect path from localStorage if it exists
      const redirectPath = localStorage.getItem('redirectAfterAuth')
      
      if (session?.user?.email_confirmed_at) {
        // User is confirmed, redirect to dashboard or saved path
        if (redirectPath) {
          localStorage.removeItem('redirectAfterAuth')
          router.push(redirectPath)
        } else {
          router.push('/dashboard')
        }
      } else if (session?.user) {
        // User is signed in but not confirmed
        router.push('/auth/verify')
      } else {
        // No session, redirect to sign-in
        router.push('/auth/sign-in')
      }
    }
    
    handleCallback()
  }, [router, searchParams])
  
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-800/50">
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
            <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
              Verifying your account...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackContent />
    </Suspense>
  )
}
