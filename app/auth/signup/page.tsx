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
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-100 dark:from-black dark:via-zinc-900 dark:to-black" />
      
      {/* Ambient glow */}
      <div className="fixed left-1/2 top-0 ml-[-20rem] h-[40rem] w-[40rem] rounded-full bg-orange-500/20 blur-3xl dark:bg-orange-400/10" />
      <div className="fixed right-1/2 top-0 mr-[-20rem] h-[40rem] w-[40rem] rounded-full bg-amber-500/20 blur-3xl dark:bg-amber-400/10" />
      
      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

      <div className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
            Accelerate Your Journey
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            You're already on the path to greatness. Choose how you want to amplify your journey and unlock your full potential.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-16 space-y-20">
          {/* Pathway Selection */}
          <div className="relative">
            <PathwaySelection
              onSelect={setSelectedPathway}
              selectedPathway={selectedPathway}
              error={error}
            />
          </div>

          {/* Auth Form */}
          <div className="mx-auto max-w-md">
            <div className="relative">
              {/* Card glow */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-yellow-500/30 opacity-75 blur-lg transition duration-1000 group-hover:opacity-100 dark:from-orange-400/20 dark:via-amber-400/20 dark:to-yellow-400/20" />
              
              {/* Card */}
              <div className="relative overflow-hidden rounded-xl bg-white/80 shadow-xl shadow-black/5 backdrop-blur-lg transition duration-200 dark:bg-zinc-900/80 dark:shadow-zinc-900/30">
                <div className="px-8 pt-8">
                  <div className="mx-auto max-w-md">
                    <h2 className="text-center text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                      Welcome to the Community
                    </h2>
                    <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
                      Create your account to connect with fellow seekers and access powerful resources
                    </p>
                  </div>
                </div>

                <div className="p-8">
                  <AuthForm
                    type="signup"
                    onSubmit={handleSubmit}
                    error={error}
                    disabled={!selectedPathway}
                  />

                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white/80 px-2 text-zinc-500 backdrop-blur dark:bg-zinc-900/80 dark:text-zinc-400">
                          By continuing
                        </span>
                      </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
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
