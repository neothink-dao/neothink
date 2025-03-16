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
    <div className="container mx-auto">
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr] lg:gap-12">
        {/* Left column - Pathway Selection */}
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Join Neothink+
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Choose your pathway and start your journey to greatness. Each pathway offers unique benefits and opportunities for growth.
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
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Enter your details below to get started
              </p>
            </div>

            <AuthForm
              type="signup"
              onSubmit={handleSubmit}
              error={error}
              disabled={!selectedPathway}
            />

            <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
              By clicking continue, you agree to our{" "}
              <a href="/terms" className="underline hover:text-zinc-900">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-zinc-900">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
