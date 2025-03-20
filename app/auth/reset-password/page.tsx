"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { validateEmail, formatValidationErrors } from "@/lib/validation"
import { Loading } from "@/components/ui/loading"
import { ErrorAlert } from "@/components/ui/error-alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ResetPasswordPage() {
  const { resetPassword, error, clearError } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const validateForm = (): boolean => {
    const errors: string[] = []
    
    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      errors.push(...emailValidation.errors)
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
      await resetPassword(email)
      setIsSuccess(true)
      
      // Redirect to sign-in after a delay
      setTimeout(() => {
        router.push("/auth/sign-in")
      }, 3000)
    } catch (error) {
      // Error is handled by the auth context
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-lg border border-border/50 bg-card p-6 shadow-xl mx-4"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Reset password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
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

          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-md bg-green-500/10 p-4 text-sm text-green-500"
            >
              Check your email for a password reset link. Redirecting you to sign in...
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                disabled={isLoading || isSuccess}
                className="h-11 bg-background/50"
                autoComplete="email"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="h-11 w-full font-medium"
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <>
                <Loading size="sm" className="mr-2" />
                Sending reset link...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Remember your password?
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="h-11 w-full font-medium"
            asChild
          >
            <Link href="/auth/sign-in">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Link>
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
