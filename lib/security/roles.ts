import { createServerClient } from '@/lib/supabase/server'

export type UserRole = 'user' | 'admin' | 'system'

export async function getUserRole(userId: string): Promise<UserRole> {
  const supabase = await createServerClient()
  const { data: { user }, error } = await supabase.auth.admin.getUserById(userId)
  
  if (error || !user) {
    throw new Error('Failed to get user role')
  }

  return (user.user_metadata?.role as UserRole) || 'user'
}

export async function setUserRole(userId: string, role: UserRole): Promise<void> {
  const supabase = await createServerClient()
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { role }
  })

  if (error) {
    throw new Error('Failed to update user role')
  }
}

export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const role = await getUserRole(userId)
    return role === 'admin'
  } catch {
    return false
  }
}

export async function isSystem(userId: string): Promise<boolean> {
  try {
    const role = await getUserRole(userId)
    return role === 'system'
  } catch {
    return false
  }
}

// Middleware helper to check if user has required role
export async function requireRole(userId: string, requiredRole: UserRole): Promise<boolean> {
  try {
    const userRole = await getUserRole(userId)
    
    switch (requiredRole) {
      case 'user':
        return true // All authenticated users have at least 'user' role
      case 'admin':
        return userRole === 'admin' || userRole === 'system'
      case 'system':
        return userRole === 'system'
      default:
        return false
    }
  } catch {
    return false
  }
} 