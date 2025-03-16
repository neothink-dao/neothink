"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { PathwaySelection } from "@/app/components/pathway-selection"
import { AuthForm } from "@/components/auth/AuthForm"

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [selectedPathway, setSelectedPathway] = useState<"ascender" | "neothinker" | "immortal">()
  const [error, setError] = useState<string>()

  const handleSubmit = async (email: string, password: string) => {
    try {
      await signUp(email, password)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="relative isolate mx-auto max-w-[1600px] px-6 lg:px-8">
      {/* Ambient light effect */}
      <div className="absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-yellow-500/30 blur-3xl dark:from-orange-400/20 dark:via-amber-400/20 dark:to-yellow-400/20" />

      {/* Main grid layout */}
      <div className="grid min-h-[calc(100vh-8rem)] items-center gap-16 py-8 lg:grid-cols-[1.25fr,1fr] lg:gap-24 xl:gap-32">
        {/* Left column - Pathway Selection */}
        <div className="relative space-y-16">
          {/* Hero section */}
          <div className="relative max-w-3xl">
            <div className="absolute -left-8 -top-8 -right-8 -bottom-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 blur-2xl dark:from-orange-400/20 dark:via-amber-400/20 dark:to-yellow-400/20" />
            <div className="relative space-y-8">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                  Accelerate Your Journey
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
                You're already on the path to greatness. Choose how you want to amplify your journey and unlock your full potential.
              </p>
            </div>
          </div>

          {/* Pathway selection */}
          <div className="relative">
            <PathwaySelection
              onSelect={setSelectedPathway}
              selectedPathway={selectedPathway}
              error={error}
            />
          </div>
        </div>

        {/* Right column - Auth Form */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          <div className="relative">
            {/* Card glow effect */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-yellow-500/30 blur-xl dark:from-orange-400/40 dark:via-amber-400/40 dark:to-yellow-400/40" />
            
            {/* Card content */}
            <div className="relative overflow-hidden rounded-2xl bg-white/90 shadow-2xl shadow-zinc-900/10 backdrop-blur-xl transition-all dark:bg-zinc-900/90 dark:shadow-zinc-900/30">
              <div className="relative p-8 sm:p-10">
                {/* Card background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.07] via-amber-500/[0.07] to-transparent dark:from-orange-400/[0.1] dark:via-amber-400/[0.1]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
                
                {/* Content */}
                <div className="relative space-y-8">
                  {/* Header */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                      Welcome to the Community
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Create your account to connect with fellow seekers and access powerful resources
                    </p>
                  </div>

                  {/* Form */}
                  <AuthForm
                    type="signup"
                    onSubmit={handleSubmit}
                    error={error}
                    disabled={!selectedPathway}
                  />

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white/90 px-2 text-zinc-500 backdrop-blur-xl dark:bg-zinc-900/90 dark:text-zinc-400">
                        By continuing
                      </span>
                    </div>
                  </div>

                  {/* Terms */}
                  <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                    You agree to our{" "}
                    <a href="/terms" className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 transition-colors">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 transition-colors">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
