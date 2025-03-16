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
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Enter your email below to create your account
        </p>
      </div>

      <PathwaySelection
        onSelect={setSelectedPathway}
        selectedPathway={selectedPathway}
        error={error}
      />

      <AuthForm
        type="signup"
        onSubmit={handleSubmit}
        error={error}
        disabled={!selectedPathway}
      />

      <p className="px-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
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
  )
}
