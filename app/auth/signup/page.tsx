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
    <div className="mx-auto max-w-7xl">
      <div className="relative">
        <div className="grid gap-16 lg:grid-cols-[2fr,1fr] lg:gap-24">
          {/* Left column - Pathway Selection */}
          <div className="space-y-12">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                Accelerate Your Journey
              </h1>
              <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
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
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl bg-white/80 shadow-2xl shadow-zinc-900/10 backdrop-blur-xl transition-all dark:bg-zinc-900/80 dark:shadow-zinc-900/20">
                <div className="relative p-8 sm:p-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-amber-500/5 to-transparent dark:from-orange-400/5 dark:via-amber-400/5" />
                  
                  <div className="relative space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Welcome to the Community
                      </h2>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Create your account to connect with fellow seekers and access powerful resources
                      </p>
                    </div>

                    <AuthForm
                      type="signup"
                      onSubmit={handleSubmit}
                      error={error}
                      disabled={!selectedPathway}
                    />

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                          By continuing
                        </span>
                      </div>
                    </div>

                    <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                      You agree to our{" "}
                      <a href="/terms" className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
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
    </div>
  )
}
