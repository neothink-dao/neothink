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
    <div className="w-full">
      <div className="grid gap-16 lg:grid-cols-[1.5fr,1fr] lg:gap-24">
        {/* Left column - Pathway Selection */}
        <div className="space-y-12">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
              Accelerate Your Journey
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              You're already on the path to greatness. Choose how you want to amplify your journey and unlock your full potential.
            </p>
          </div>

          <PathwaySelection
            onSelect={setSelectedPathway}
            selectedPathway={selectedPathway}
            error={error}
          />
        </div>

        {/* Right column - Auth Form */}
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-xl p-8 dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-50/50 to-white/50 dark:from-zinc-900/50 dark:to-zinc-800/50" />
            <div className="relative">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Welcome to the Community
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Create your account to connect with fellow seekers and access powerful resources
                </p>
              </div>

              <AuthForm
                type="signup"
                onSubmit={handleSubmit}
                error={error}
                disabled={!selectedPathway}
              />

              <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
                By continuing, you agree to our{" "}
                <a href="/terms" className="underline hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
