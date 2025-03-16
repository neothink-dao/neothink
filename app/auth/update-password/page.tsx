"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "@/context/auth-context"
import { Eye, EyeOff } from "lucide-react"
import { Suspense } from "react"

const updateSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type UpdateFormData = z.infer<typeof updateSchema>

function UpdatePasswordContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ title: string; description: string; type?: 'success' | 'error' } | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const { updatePassword } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
  })

  const password = watch("password", "")
  const passwordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  }

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length

  const onSubmit = async (data: UpdateFormData) => {
    try {
      setIsLoading(true)
      setToast(null)

      await updatePassword(data.password)

      setToast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
        type: "success"
      })

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error: any) {
      console.error("Update password error:", error)
      setToast({
        title: "Error",
        description: error.message || "Failed to update password. Please try again.",
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
                Update Password
              </h1>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Choose a strong password to secure your account
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-200">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={isLoading}
                    placeholder="Enter your new password"
                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-500"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 dark:text-red-400">{errors.password.message}</p>
                )}
                
                {/* Password strength indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">Password strength</span>
                    <span className="text-xs font-medium">
                      {strengthScore === 0 && "Very weak"}
                      {strengthScore === 1 && "Weak"}
                      {strengthScore === 2 && "Fair"}
                      {strengthScore === 3 && "Good"}
                      {strengthScore === 4 && "Strong"}
                      {strengthScore === 5 && "Very strong"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i < strengthScore
                            ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-400 dark:via-orange-400 dark:to-red-400"
                            : "bg-zinc-200 dark:bg-zinc-700"
                        }`}
                      />
                    ))}
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                    <li className={passwordStrength.length ? "text-green-600 dark:text-green-400" : ""}>
                      • At least 8 characters
                    </li>
                    <li className={passwordStrength.uppercase ? "text-green-600 dark:text-green-400" : ""}>
                      • At least one uppercase letter
                    </li>
                    <li className={passwordStrength.lowercase ? "text-green-600 dark:text-green-400" : ""}>
                      • At least one lowercase letter
                    </li>
                    <li className={passwordStrength.number ? "text-green-600 dark:text-green-400" : ""}>
                      • At least one number
                    </li>
                    <li className={passwordStrength.special ? "text-green-600 dark:text-green-400" : ""}>
                      • At least one special character
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-200">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={isLoading}
                    placeholder="Confirm your new password"
                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-500"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 dark:text-red-400">{errors.confirmPassword.message}</p>
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
                    Updating password...
                  </span>
                ) : (
                  "Update password"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Suspense>
        <UpdatePasswordContent />
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
