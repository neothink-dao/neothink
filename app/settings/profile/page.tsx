'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createServerClient } from '@/lib/supabase/server'

interface ProfileFormData {
  full_name: string
  username: string
  bio: string
  avatar_url: string
}

export default function ProfileSettings() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    username: '',
    bio: '',
    avatar_url: '',
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      const supabase = await createServerClient()
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, username, bio, avatar_url')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }

      if (data) {
        setFormData(data)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    const supabase = await createServerClient()
    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', user.id)

    if (error) {
      console.error('Error updating profile:', error)
      return
    }

    setLoading(false)
    router.refresh()
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="avatar_url">Avatar URL</Label>
          <Input
            id="avatar_url"
            value={formData.avatar_url}
            onChange={(e) =>
              setFormData({ ...formData, avatar_url: e.target.value })
            }
          />
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
} 