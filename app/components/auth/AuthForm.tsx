"use client"

import { useState } from "react"
import { Eye, EyeOff, Fingerprint, Mail, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"

interface AuthFormProps {
  type: "signin" | "signup"
  onSubmit: (email: string, password: string) => Promise<void>
  error?: string
  disabled?: boolean
  currentStep?: number
  totalSteps?: number
}

export function AuthForm({
  type,
  onSubmit,
  error,
  disabled,
  currentStep = 1,
  totalSteps = 1,
}: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const { supabase } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSubmit(email, password)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    
    // Calculate password strength
    let strength = 0
    if (value.length >= 8) strength++
    if (/[A-Z]/.test(value)) strength++
    if (/[a-z]/.test(value)) strength++
    if (/[0-9]/.test(value)) strength++
    if (/[^A-Za-z0-9]/.test(value)) strength++
    setPasswordStrength(strength)
  }

  const handleBiometricAuth = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) throw error
    } catch (error) {
      console.error('Biometric auth error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
              required
              disabled={disabled}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className="pl-9"
              required
              disabled={disabled}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          
          {/* Password strength indicator */}
          {type === "signup" && password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      i < passwordStrength
                        ? "bg-green-500 dark:bg-green-400"
                        : "bg-zinc-200 dark:bg-zinc-700"
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Password strength: {passwordStrength < 3 ? "Weak" : passwordStrength < 5 ? "Medium" : "Strong"}
              </p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full"
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {type === "signin" ? "Signing in..." : "Creating account..."}
            </>
          ) : (
            type === "signin" ? "Sign in" : "Create account"
          )}
        </Button>

        {/* Biometric authentication */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleBiometricAuth}
          disabled={disabled || isLoading}
        >
          <Fingerprint className="mr-2 h-4 w-4" />
          Continue with biometric
        </Button>
      </div>

      {/* Progress indicator */}
      {totalSteps > 1 && (
        <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span>Step {currentStep} of {totalSteps}</span>
          <div className="flex gap-1">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 w-1 rounded-full transition-colors",
                  i + 1 <= currentStep
                    ? "bg-orange-500 dark:bg-orange-400"
                    : "bg-zinc-200 dark:bg-zinc-700"
                )}
              />
            ))}
          </div>
        </div>
      )}
    </form>
  )
} 