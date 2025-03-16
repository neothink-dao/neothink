"use server"

import { createServerClient as createServerClientBase, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies"

type CookieConfig = {
  secure: boolean
  sameSite: "lax" | "strict" | "none"
  path: string
  httpOnly: boolean
}

const cookieConfig: CookieConfig = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  httpOnly: true,
}

export async function createServerClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing required Supabase environment variables")
  }

  let cookieStore: RequestCookies | undefined

  try {
    cookieStore = cookies() as unknown as RequestCookies
  } catch (error) {
    // Handle static generation gracefully
    if ((error as Error)?.message?.includes("Dynamic server usage")) {
      console.warn("Cookie store unavailable during static generation")
      return createServerClientBase<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            get: () => undefined,
            set: () => {},
            remove: () => {},
          },
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            flowType: "pkce",
            detectSessionInUrl: true,
          },
        }
      )
    }
    throw error
  }

  return createServerClientBase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          try {
            return cookieStore?.get(name)?.value
          } catch {
            return undefined
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore?.set({
              name,
              value,
              ...cookieConfig,
              ...options,
            })
          } catch (error) {
            // Handle cookie errors silently in static generation
            if (!(error as Error)?.message?.includes("Dynamic server usage")) {
              throw error
            }
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore?.set({
              name,
              value: "",
              ...cookieConfig,
              ...options,
              maxAge: 0,
            })
          } catch (error) {
            // Handle cookie errors silently in static generation
            if (!(error as Error)?.message?.includes("Dynamic server usage")) {
              throw error
            }
          }
        },
      },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        flowType: "pkce",
        detectSessionInUrl: true,
      },
    }
  )
}

export async function createServerActionClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing required Supabase environment variables")
  }

  let cookieStore: RequestCookies | undefined

  try {
    cookieStore = cookies() as unknown as RequestCookies
  } catch (error) {
    // Handle static generation gracefully
    if ((error as Error)?.message?.includes("Dynamic server usage")) {
      console.warn("Cookie store unavailable during static generation")
      return createServerClientBase<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            get: () => undefined,
            set: () => {},
            remove: () => {},
          },
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            flowType: "pkce",
            detectSessionInUrl: true,
          },
        }
      )
    }
    throw error
  }

  return createServerClientBase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          try {
            return cookieStore?.get(name)?.value
          } catch {
            return undefined
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore?.set({
              name,
              value,
              ...cookieConfig,
              ...options,
            })
          } catch (error) {
            // Handle cookie errors silently in static generation
            if (!(error as Error)?.message?.includes("Dynamic server usage")) {
              throw error
            }
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore?.set({
              name,
              value: "",
              ...cookieConfig,
              ...options,
              maxAge: 0,
            })
          } catch (error) {
            // Handle cookie errors silently in static generation
            if (!(error as Error)?.message?.includes("Dynamic server usage")) {
              throw error
            }
          }
        },
      },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        flowType: "pkce",
        detectSessionInUrl: true,
      },
    }
  )
}
