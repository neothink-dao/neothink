"use client"

import { useState } from "react"
import { useAuth } from "@/app/context/auth-context"
import { validateEmail, validatePassword } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface AuthFormProps {
  type: "signin" | "signup"
  onSubmit: (email: string, password: string) => Promise<void>
  error?: string
  disabled?: boolean
}

export function AuthForm({ type, onSubmit, error, disabled }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationErrors([])

    // Validate email
    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      setValidationErrors(emailValidation.errors)
      return
    }

    // Validate password
    if (type === "signup") {
      const passwordValidation = validatePassword(password)
      if (!passwordValidation.isValid) {
        setValidationErrors(passwordValidation.errors)
        return
      }
    }

    try {
      setIsLoading(true)
      await onSubmit(email, password)
    } catch (err) {
      // Error is handled by the parent component
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)

    // Calculate password strength
    let strength = 0
    if (newPassword.length >= 8) strength++
    if (/[A-Z]/.test(newPassword)) strength++
    if (/[a-z]/.test(newPassword)) strength++
    if (/[0-9]/.test(newPassword)) strength++
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++
    setPasswordStrength(strength)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(error || validationErrors.length > 0) && (
        <Alert variant="error">
          <AlertDescription>
            {error || validationErrors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || disabled}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            disabled={isLoading || disabled}
            required
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

        {type === "signup" && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500 dark:text-zinc-400">Password strength</span>
              <span className="font-medium">
                {passwordStrength === 0 && "Very weak"}
                {passwordStrength === 1 && "Weak"}
                {passwordStrength === 2 && "Fair"}
                {passwordStrength === 3 && "Good"}
                {passwordStrength === 4 && "Strong"}
                {passwordStrength === 5 && "Very strong"}
              </span>
            </div>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i < passwordStrength
                      ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
                      : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || disabled}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {type === "signin" ? "Signing in..." : "Creating account..."}
          </span>
        ) : (
          type === "signin" ? "Sign in" : "Create account"
        )}
      </Button>

      {type === "signin" && (
        <div className="text-sm text-center">
          <Link
            href="/auth/reset-password"
            className="font-medium text-primary hover:text-primary/80"
          >
            Forgot password?
          </Link>
        </div>
      )}
    </form>
  )
} 