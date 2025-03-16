"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Suspense } from "react"

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type ResetFormData = z.infer<typeof resetSchema>

function ResetPasswordContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ title: string; description: string; type?: 'success' | 'error' } | null>(null)
  const router = useRouter()
  const { resetPassword } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  })

  const onSubmit = async (data: ResetFormData) => {
    try {
      setIsLoading(true)
      setToast(null)

      await resetPassword(data.email)

      setToast({
        title: "Reset link sent",
        description: "Check your email for the password reset link.",
        type: "success"
      })

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (error: any) {
      console.error("Reset password error:", error)
      setToast({
        title: "Error",
        description: error.message || "Failed to send reset link. Please try again.",
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50">
          <div className="p-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                Reset Password
              </h1>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Enter your email and we'll send you a link to reset your password
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-200">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-500"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="relative h-4 w-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white via-white to-white/80 animate-spin dark:from-zinc-200 dark:via-zinc-200 dark:to-zinc-200/80" />
                    </div>
                    Sending reset link...
                  </span>
                ) : (
                  "Send reset link"
                )}
              </button>

              {toast && (
                <div className={`rounded-lg border p-4 ${
                  toast.type === "error" 
                    ? "border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300"
                    : "border-green-200 bg-green-50 text-green-900 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-300"
                }`}>
                  <p className="text-sm font-medium">{toast.title}</p>
                  <p className="text-sm mt-1">{toast.description}</p>
                </div>
              )}

              <div className="mt-6 text-center text-sm">
                <Link 
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to login</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Suspense>
        <ResetPasswordContent />
      </Suspense>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-red-900/30" />
      </div>
    </div>
  )
}
