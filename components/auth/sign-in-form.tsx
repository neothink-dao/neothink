"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Loading } from "@/components/ui/loading"
import { ErrorAlert } from "@/components/ui/error-alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export function SignInForm() {
  const { signIn, loading, error, clearError } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await signIn(email, password)
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md"
    >
      <ErrorAlert error={error} onDismiss={clearError} />
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? (
          <Loading size="sm" className="mr-2" />
        ) : null}
        Sign In
      </Button>
    </motion.form>
  )
} 