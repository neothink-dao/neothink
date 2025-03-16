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
import { cn } from "@/lib/utils"

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type ResetFormData = z.infer<typeof resetSchema>

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      {/* Simple gradient background */}
      <div className="fixed inset-0 bg-zinc-50 dark:bg-zinc-950" />

      <div className="relative w-full max-w-md px-4 sm:px-6 lg:px-8">
        <Suspense>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  )
}

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
    <div className="relative">
      {/* Card glow */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 opacity-75 blur-lg transition duration-1000 group-hover:opacity-100 dark:from-amber-400/10 dark:via-orange-400/10 dark:to-red-400/10" />
      
      {/* Card content */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-200/50 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-lg transition duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:shadow-zinc-900/30">
        <div className="px-8 pt-8">
          <div className="mx-auto max-w-md text-center">
            <h1 className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-200"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                disabled={isLoading}
                placeholder="Enter your email"
                className={cn(
                  "flex h-11 w-full rounded-xl border bg-white/80 px-3 py-2 text-sm ring-offset-white backdrop-blur placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-950/80 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400",
                  errors.email
                    ? "border-red-300 focus:border-red-400 focus:ring-red-400 dark:border-red-800 dark:focus:border-red-700 dark:focus:ring-red-700"
                    : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 dark:border-zinc-800 dark:focus:border-zinc-700 dark:focus:ring-zinc-700"
                )}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending reset link...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Send reset link
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              )}
            </button>

            {toast && (
              <div className={cn(
                "rounded-xl border p-4 text-sm",
                toast.type === "error"
                  ? "border-red-200 bg-red-50/50 text-red-600 backdrop-blur-sm dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400"
                  : "border-green-200 bg-green-50/50 text-green-600 backdrop-blur-sm dark:border-green-900/50 dark:bg-green-900/10 dark:text-green-400"
              )}>
                <p className="font-medium">{toast.title}</p>
                <p className="mt-1">{toast.description}</p>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <Link 
                  href="/auth/login"
                  className="inline-flex items-center gap-2 bg-white/80 px-3 py-1 text-zinc-600 transition-colors hover:text-zinc-900 backdrop-blur dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
