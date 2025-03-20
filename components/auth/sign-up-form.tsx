"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Loading } from "@/components/ui/loading"
import { ErrorAlert } from "@/components/ui/error-alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export function SignUpForm() {
  const { signUp, loading, error, clearError } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      clearError()
      return
    }

    try {
      await signUp(email, password)
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading || password !== confirmPassword}
      >
        {loading ? (
          <Loading size="sm" className="mr-2" />
        ) : null}
        Sign Up
      </Button>
    </motion.form>
  )
} 