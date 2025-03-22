"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/app/context/auth-context"
import { NotificationProvider } from "@/context/notification-context"
import { SupabaseProvider } from "@/components/providers/supabase-provider"
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <AuthProvider>
        <NotificationProvider>
          <AccessibilityProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </AccessibilityProvider>
        </NotificationProvider>
      </AuthProvider>
    </SupabaseProvider>
  )
}
