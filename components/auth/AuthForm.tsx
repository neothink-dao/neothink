"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PasswordInput } from "./password/PasswordInput"
import { PasswordStrength } from "./password/PasswordStrength"
import { SignupProgress } from "./SignupProgress"
import { cn } from "@/lib/utils"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
})

type LoginFormData = z.infer<typeof loginSchema>
type SignupFormData = z.infer<typeof signupSchema>

interface AuthFormProps {
  type: "login" | "signup"
  onSubmit?: (email: string, password: string) => Promise<void>
  error?: string
  disabled?: boolean
  currentStep?: number
  totalSteps?: number
}

export function AuthForm({ type, onSubmit, error, disabled, currentStep, totalSteps }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
  })

  const password = watch("password")

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
      {type === "signup" && currentStep && totalSteps && (
        <SignupProgress currentStep={currentStep} totalSteps={totalSteps} />
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            disabled={isLoading || disabled}
            className={cn(
              "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
              errors.email && "border-red-500 focus-visible:ring-red-500 dark:border-red-400 dark:focus-visible:ring-red-400"
            )}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Password
          </label>
          <PasswordInput
            id="password"
            disabled={isLoading || disabled}
            error={!!errors.password}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
          {type === "signup" && password && (
            <PasswordStrength password={password} />
          )}
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || disabled}
          className={cn(
            "inline-flex h-10 w-full items-center justify-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300 dark:focus-visible:ring-zinc-300",
            isLoading && "cursor-wait"
          )}
        >
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {type === "login" ? "Signing in..." : "Creating account..."}
            </>
          ) : (
            type === "login" ? "Sign in" : "Create account"
          )}
        </button>
      </form>
    </div>
  )
}
