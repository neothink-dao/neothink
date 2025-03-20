import { SignInForm } from "@/components/auth/sign-in-form"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to continue your journey
          </p>
        </div>

        <SignInForm />

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Don't have an account?{" "}
          </span>
          <Link
            href="/auth/sign-up"
            className="text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
} 