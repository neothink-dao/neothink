"use client"

import { AuthProvider } from "@/context/auth-context"
import { SupabaseProvider } from "@/components/providers/supabase-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <AuthProvider>{children}</AuthProvider>
    </SupabaseProvider>
  )
} 