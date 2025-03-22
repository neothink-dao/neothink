'use client'

import { useState } from 'react'
import { useAuth } from '@/app/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createServerClient } from '@/lib/supabase/server'

export default function AccountSettings() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = await createServerClient()
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      setSuccess('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const formData = new FormData(e.target as HTMLFormElement)
    const newEmail = formData.get('email') as string

    if (!newEmail) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = await createServerClient()
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      })

      if (error) throw error

      setSuccess('Verification email sent to ' + newEmail)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>

      {error && (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="success">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleEmailChange} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Email'}
        </Button>
      </form>

      <div className="space-y-2">
        <h4 className="font-medium">Change Password</h4>
        <p className="text-sm text-muted-foreground">
          Update your password to keep your account secure.
        </p>
      </div>

      <form onSubmit={handlePasswordChange} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>

      <div className="space-y-2">
        <h4 className="font-medium">Delete Account</h4>
        <p className="text-sm text-muted-foreground">
          Permanently delete your account and all of your content.
        </p>
        <Button
          variant="destructive"
          onClick={async () => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
              setLoading(true)
              setError(null)
              try {
                const supabase = await createServerClient()
                const { error } = await supabase.auth.admin.deleteUser(user!.id)
                if (error) throw error
                window.location.href = '/auth/sign-in?message=account_deleted'
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete account')
                setLoading(false)
              }
            }
          }}
        >
          Delete Account
        </Button>
      </div>
    </div>
  )
} 