'use client'

import { Suspense } from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import { NotificationBell } from '@/app/components/notification-bell'
import { UserNav } from '@/app/components/user-nav'
import { Alert, AlertDescription } from "@/components/ui/alert"

export const dynamic = "force-dynamic"

function LoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
    </div>
  )
}

function ErrorState({ error }: { error: Error }) {
  return (
    <Alert variant="error">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <NotificationBell />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <Suspense fallback={<LoadingState />}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  )
}
