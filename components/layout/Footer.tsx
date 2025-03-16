"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/auth")
  const isDashboard = pathname.startsWith("/dashboard")

  // Don't show footer on auth or dashboard pages
  if (isAuthPage || isDashboard) return null

  return (
    <footer className="mt-auto w-full border-t border-zinc-800 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo className="h-8 w-auto opacity-75 hover:opacity-100 transition-opacity" />
          <div className="flex gap-8">
            <Link 
              href="/privacy" 
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Terms
            </Link>
          </div>
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Neothink+. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
