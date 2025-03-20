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
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (email: string, password: string) => {
    if (!selectedPathway) {
      setError("Please select a pathway before continuing")
      return
    }

    try {
      setIsSubmitting(true)
      setError(undefined)
      
      await signUp(email, password, { pathway: selectedPathway })
      
      // The signUp function will handle the redirect to verification
      console.log("Signup successful, redirecting to verification page...")
    } catch (error: any) {
      console.error("Signup error:", error)
      setError(error.message || "Failed to sign up. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePathwaySelect = (pathway: "ascender" | "neothinker" | "immortal") => {
    console.log("Pathway selected:", pathway)
    setSelectedPathway(pathway)
    setError(undefined)
    setCurrentStep(2)
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Join the Community
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              Choose your path and start your journey today
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {/* Pathway Selection */}
            <div className="relative">
              <PathwaySelection
                onSelect={handlePathwaySelect}
                selectedPathway={selectedPathway}
                error={error}
              />
            </div>

            {/* Auth Form */}
            <div className="mx-auto max-w-md">
              <div className="relative">
                {/* Card glow */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 opacity-75 blur-lg transition duration-1000 group-hover:opacity-100 dark:from-amber-400/10 dark:via-orange-400/10 dark:to-red-400/10" />
                
                {/* Card */}
                <div className="relative overflow-hidden rounded-xl border border-zinc-200/50 bg-white/90 shadow-xl shadow-black/5 backdrop-blur-lg transition duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/90 dark:shadow-zinc-900/30">
                  <div className="px-8 pt-8">
                    <div className="mx-auto max-w-sm text-center">
                      <h2 className="text-center text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
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
                      disabled={!selectedPathway || isSubmitting}
                      currentStep={currentStep}
                      totalSteps={2}
                    />

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="bg-white/90 px-2 text-zinc-500 backdrop-blur dark:bg-zinc-900/90 dark:text-zinc-400">
                            By continuing, you agree to our{" "}
                            <a href="/terms" className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
                              Terms
                            </a>
                            {" "}and{" "}
                            <a href="/privacy" className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
                              Privacy Policy
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-red-900/30" />
      </div>
    </div>
  )
}
