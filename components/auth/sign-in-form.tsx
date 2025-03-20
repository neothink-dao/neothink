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
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={onSubmit}
      className="space-y-6 w-full max-w-md"
    >
      <ErrorAlert error={error} onDismiss={clearError} />
      
      {validationErrors.length > 0 && (
        <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md">
          {formatValidationErrors(validationErrors)}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Enter your email"
          required
          disabled={isLoading}
          className="bg-white/5 border-white/10"
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Enter your password"
            required
            disabled={isLoading}
            className="bg-white/5 border-white/10 pr-10"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            disabled={isLoading}
          />
          <Label
            htmlFor="remember"
            className="text-sm text-gray-400 cursor-pointer select-none"
          >
            Remember me
          </Label>
        </div>
        <Link
          href="/auth/reset-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loading size="sm" className="mr-2" />
        ) : null}
        Sign In
      </Button>

      <p className="text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </motion.form>
  )
} 