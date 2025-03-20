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
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export function SignInForm() {
  const { signIn, error, clearError } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    // Clear any existing errors when the component mounts
    clearError()
    setValidationErrors([])
    
    // Check for saved email
    const savedEmail = localStorage.getItem("rememberedEmail")
    if (savedEmail) {
      setData(prev => ({ ...prev, email: savedEmail }))
      setRememberMe(true)
    }
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
      await signIn(data.email, data.password, rememberMe)
      
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.email)
      } else {
        localStorage.removeItem("rememberedEmail")
      }
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
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to your account to continue
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
                placeholder="Enter your password"
                required
                disabled={isLoading}
                className="h-11 bg-background/50 pr-10"
                autoComplete="current-password"
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
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              disabled={isLoading}
              className="border-border/50"
            />
            <Label
              htmlFor="remember"
              className="text-sm text-muted-foreground cursor-pointer select-none"
            >
              Remember me
            </Label>
          </div>
          <Link
            href="/auth/reset-password"
            className="text-sm font-medium text-primary hover:text-primary/90 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="h-11 w-full font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loading size="sm" className="mr-2" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              New to NeoThink?
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="h-11 w-full font-medium"
          asChild
        >
          <Link href="/auth/sign-up">
            Create an account
          </Link>
        </Button>
      </form>
    </motion.div>
  )
} 