"use client"

import { createBrowserClient as createBrowserClientBase } from "@supabase/ssr"
import type { Database } from "@/types/supabase"

// Create a singleton instance to reduce bundle size
export function createClient() {
  const supabase = createBrowserClient()
  return supabase
}

export function createBrowserClient() {
  // During build time, use dummy values to allow static generation
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy-url-for-build.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key-for-build'

  return createBrowserClientBase<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: typeof document !== 'undefined' ? {
        get(name: string) {
          return document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1]
        },
        set(name: string, value: string, options: { path?: string; maxAge?: number }) {
          document.cookie = `${name}=${value}; path=${options.path || "/"}; max-age=${options.maxAge || 315360000}`
        },
        remove(name: string, options: { path?: string }) {
          document.cookie = `${name}=; path=${options.path || "/"}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        },
      } : {
        get: () => "",
        set: () => {},
        remove: () => {},
      },
      db: {
        schema: "public",
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: "sb-auth-token",
        flowType: "pkce",
        detectSessionInUrl: true,
      },
    }
  )
}