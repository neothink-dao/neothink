"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/auth-context"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyPage() {
  const { user, error } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [verificationError, setVerificationError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (user?.email_confirmed_at) {
      router.push("/dashboard")
    } else {
      setIsLoading(false)
    }
  }, [user, router])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleResendVerification = async () => {
    try {
      setIsResending(true)
      setVerificationError(null)
      
      // Add resend verification logic here
      // For example:
      // await supabase.auth.resend({
      //   type: 'signup',
      //   email: user?.email
      // })
      
      setResendCooldown(60) // Set cooldown to 60 seconds
    } catch (err: any) {
      setVerificationError(err.message)
    } finally {
      setIsResending(false)
    }
  }

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </Container>
    )
  }

  return (
    <Container className="flex items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            We've sent you an email with a verification link. Please check your inbox and click the link to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(error || verificationError) && (
            <Alert variant="error" className="mb-4">
              <AlertDescription>
                {error?.message || verificationError}
              </AlertDescription>
            </Alert>
          )}
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            <p>Didn't receive the email? Check your spam folder or click below to resend.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleResendVerification}
            disabled={isResending || resendCooldown > 0}
            className="w-full"
          >
            {isResending ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Resending...
              </span>
            ) : resendCooldown > 0 ? (
              `Resend in ${resendCooldown}s`
            ) : (
              "Resend verification email"
            )}
          </Button>
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
