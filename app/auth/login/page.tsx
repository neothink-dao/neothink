"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { Eye, EyeOff, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const dynamic = 'force-dynamic'

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState<{ title: string; description: string; type?: 'success' | 'error' } | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, user } = useAuth()
  const next = searchParams.get("next")

  useEffect(() => {
    // If user is already logged in and verified
    if (user?.email_confirmed_at) {
      router.push(next || "/dashboard")
    }
    // If user exists but not verified
    else if (user && !user.email_confirmed_at) {
      router.push("/auth/verify")
    }
  }, [user, router, next])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: true,
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      setToast(null)

      await signIn(data.email, data.password)
      
      // Let the useEffect handle redirects after successful login
      router.refresh()
    } catch (error: any) {
      console.error("Login error:", error)
      setToast({
        title: "Error",
        description: error.message || "Failed to sign in. Please try again.",
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      {/* Simple gradient background */}
      <div className="fixed inset-0 bg-zinc-50 dark:bg-zinc-950" />

      <div className="relative w-full max-w-md px-4 sm:px-6 lg:px-8">
        {/* Card */}
        <div className="relative">
          {/* Card glow */}
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 opacity-75 blur-lg transition duration-1000 group-hover:opacity-100 dark:from-amber-400/10 dark:via-orange-400/10 dark:to-red-400/10" />
          
          {/* Card content */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-200/50 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-lg transition duration-200 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:shadow-zinc-900/30">
            <div className="px-8 pt-8">
              <div className="mx-auto max-w-md text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10">
                  <Sparkles className="h-8 w-8 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent" />
                </div>
                <h1 className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                  Welcome Back
                </h1>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Sign in to continue your journey with Neothink+
                </p>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      disabled={isLoading}
                      placeholder="Enter your password"
                      className={cn(
                        "flex h-11 w-full rounded-xl border bg-white/80 px-3 py-2 text-sm ring-offset-white backdrop-blur placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-950/80 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400",
                        errors.password
                          ? "border-red-300 focus:border-red-400 focus:ring-red-400 dark:border-red-800 dark:focus:border-red-700 dark:focus:ring-red-700"
                          : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 dark:border-zinc-800 dark:focus:border-zinc-700 dark:focus:ring-zinc-700"
                      )}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm font-medium text-red-500 dark:text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded-md border-zinc-300 text-orange-500 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:ring-offset-zinc-900"
                      {...register("remember")}
                    />
                    <label htmlFor="remember" className="text-sm text-zinc-600 dark:text-zinc-400">
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/auth/reset-password"
                    className="text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign in
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
                    <span className="bg-white/80 px-2 text-zinc-500 backdrop-blur dark:bg-zinc-900/80 dark:text-zinc-400">
                      Don't have an account?
                    </span>
                  </div>
                </div>

                <Link
                  href="/auth/signup"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-zinc-200 bg-white/50 px-4 py-2 text-sm font-medium text-zinc-900 backdrop-blur-sm transition-all hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100 dark:hover:bg-zinc-900/50 dark:focus:ring-zinc-800"
                >
                  Create an account
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Suspense>
        <LoginContent />
      </Suspense>
    </div>
  )
}

