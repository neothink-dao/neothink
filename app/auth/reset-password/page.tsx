"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/auth-context"
import { validateEmail } from "@/lib/validation"
import { Loading } from "@/components/ui/loading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function ResetPasswordPage() {
  const { resetPassword, error } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setValidationErrors([])
    setIsSuccess(false)

    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      setValidationErrors(emailValidation.errors)
      return
    }

    try {
      setIsLoading(true)
      await resetPassword(email)
      setIsSuccess(true)
    } catch (err) {
      // Error is handled by the auth context
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="flex items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="error">
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            {validationErrors.length > 0 && (
              <Alert variant="error">
                <AlertDescription>
                  {validationErrors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert variant="success">
                <AlertDescription>
                  Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
                </AlertDescription>
              </Alert>
            )}
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loading /> : "Send reset link"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/auth/sign-in"
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </Container>
  )
}
