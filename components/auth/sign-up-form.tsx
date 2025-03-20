"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { AppError } from "@/lib/error-handling"
import { validateEmail, validatePassword, formatValidationErrors } from "@/lib/validation"
import { Loading } from "@/components/ui/loading"
import { ErrorAlert } from "@/components/ui/error-alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export function SignUpForm() {
  const { signUp, error, clearError } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    clearError()
    setValidationErrors([])
  }, [])

  const validateForm = (): boolean => {
    const errors: string[] = []
    
    const emailValidation = validateEmail(data.email)
    if (!emailValidation.isValid) {
      errors.push(...emailValidation.errors)
    }

    const passwordValidation = validatePassword(data.password)
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors)
    }

    if (data.password !== data.confirmPassword) {
      errors.push("Passwords do not match")
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setValidationErrors([])
    clearError()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await signUp(data.email, data.password)
    } catch (error) {
      // Error is already handled by the auth context
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-lg border border-border/50 bg-card p-6 shadow-xl"
    >
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Join NeoThink to start your journey
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <ErrorAlert error={error} onDismiss={clearError} />
        
        {validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-destructive/10 p-4 text-sm text-destructive"
          >
            {formatValidationErrors(validationErrors)}
          </motion.div>
        )}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="name@example.com"
              required
              disabled={isLoading}
              className="h-11 bg-background/50"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="Create a strong password"
                required
                disabled={isLoading}
                className="h-11 bg-background/50 pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={data.confirmPassword}
                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
                required
                disabled={isLoading}
                className="h-11 bg-background/50 pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="h-11 w-full font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loading size="sm" className="mr-2" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Already have an account?
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="h-11 w-full font-medium"
          asChild
        >
          <Link href="/auth/sign-in">
            Sign in to your account
          </Link>
        </Button>
      </form>
    </motion.div>
  )
} 