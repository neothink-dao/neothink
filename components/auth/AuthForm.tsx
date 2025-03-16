"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PasswordInput } from "./password/PasswordInput"
import { cn } from "@/lib/utils"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>
type SignupFormData = z.infer<typeof signupSchema>

interface AuthFormProps {
  type: "login" | "signup"
  onSubmit?: (email: string, password: string) => Promise<void>
  error?: string
  disabled?: boolean
}

export function AuthForm({ type, onSubmit, error, disabled }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
  })

  const handleFormSubmit = async (data: SignupFormData) => {
    console.log("Form submitted:", data)
    try {
      setIsLoading(true)
      await onSubmit?.(data.email, data.password)
      console.log("Form submission successful")
    } catch (error: any) {
      console.error("Form submission error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
            className={cn(
              "flex h-11 w-full rounded-xl border bg-white/80 px-3 py-2 text-sm ring-offset-white backdrop-blur placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-950/80 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400",
              errors.email
                ? "border-red-300 focus:border-red-400 focus:ring-red-400 dark:border-red-800 dark:focus:border-red-700 dark:focus:ring-red-700"
                : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 dark:border-zinc-800 dark:focus:border-zinc-700 dark:focus:ring-zinc-700"
            )}
            {...register("email")}
            disabled={isLoading || disabled}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-200"
          >
            Password
          </label>
          <PasswordInput
            id="password"
            className={cn(
              "flex h-11 w-full rounded-xl border bg-white/80 px-3 py-2 text-sm ring-offset-white backdrop-blur placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-950/80 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400",
              errors.password
                ? "border-red-300 focus:border-red-400 focus:ring-red-400 dark:border-red-800 dark:focus:border-red-700 dark:focus:ring-red-700"
                : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 dark:border-zinc-800 dark:focus:border-zinc-700 dark:focus:ring-zinc-700"
            )}
            {...register("password")}
            disabled={isLoading || disabled}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 text-sm text-red-600 backdrop-blur-sm dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || disabled}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {type === "login" ? "Signing in..." : "Creating account..."}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {type === "login" ? "Sign in" : "Create account"}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          )}
        </button>
      </form>
    </div>
  )
}
