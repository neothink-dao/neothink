"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Brain } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { checkAuth } from "./actions"
import { Providers } from "@/app/providers"

function AuthLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="relative isolate min-h-screen">
        {/* Background effects */}
        <div className="fixed inset-0 -z-10">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-zinc-50/50 dark:from-black dark:to-zinc-950/50" />
          
          {/* Ambient light effects */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-600 to-amber-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-amber-500 to-orange-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

          {/* Radial gradient for depth */}
          <div className="absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-yellow-500/5 blur-2xl dark:from-orange-400/10 dark:via-amber-400/10 dark:to-yellow-400/10" />
        </div>

        {/* Content */}
        <div className="relative px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
          {children}
        </div>

        {/* Bottom gradient fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-black" />
      </main>
    </div>
  )
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <AuthLayoutContent>
        {children}
      </AuthLayoutContent>
    </Providers>
  )
}
