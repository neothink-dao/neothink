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
    <div className="min-h-screen w-full">
      <div className="relative isolate">
        {/* Background effects */}
        <div className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-amber-500 to-orange-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-20">
          {/* Left column - Pathway Selection */}
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-6xl font-bold tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
              Accelerate Your Journey
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              You're already on the path to greatness. Choose how you want to amplify your journey and unlock your full potential.
            </p>

            <div className="mt-16">
              <PathwaySelection
                onSelect={setSelectedPathway}
                selectedPathway={selectedPathway}
                error={error}
              />
            </div>
          </div>

          {/* Right column - Auth Form */}
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-xl lg:max-w-lg">
              <div className="relative">
                <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 via-amber-500/10 to-transparent dark:from-orange-400/10 dark:via-amber-400/5" />
                  <div className="absolute inset-0 bg-grid-white/10 dark:bg-grid-black/10" style={{ maskImage: 'radial-gradient(farthest-side at 50% 0%, white, transparent)' }} />
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-zinc-200/10 bg-white/80 shadow-2xl shadow-zinc-900/10 backdrop-blur-xl transition-all dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:shadow-zinc-900/20">
                  <div className="p-8 sm:p-10">
                    <div className="space-y-6">
                      <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                        Welcome to the Community
                      </h2>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Create your account to connect with fellow seekers and access powerful resources
                      </p>

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

        {/* Background effects */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-600 to-amber-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </div>
    </div>
  )
}
