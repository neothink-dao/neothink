import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get the current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Helper function to get the current user's profile
export async function getCurrentUserProfile() {
  const user = await getCurrentUser()
  if (!user) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('supabaseId', user.id)
    .single()

  if (error) throw error
  return profile
}

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  pathway: 'ascender' | 'neothinker' | 'immortal' | null
  current_phase: 'discovery' | 'onboarding' | 'progressing' | 'endgame' | null
  superachiever_progress: {
    ascender: number
    neothinker: number
    immortal: number
  }
  created_at: string
  updated_at: string
}

export interface ExperienceProgress {
  id: string
  user_id: string
  pathway: 'ascender' | 'neothinker' | 'immortal'
  phase: 'discovery' | 'onboarding' | 'progressing' | 'endgame'
  progress: number
  total: number
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  user_id: string
  title: string
  description: string
  type: string
  progress: number
  total: number
  completed_at: string | null
  created_at: string
  updated_at: string
}

// Helper functions for database operations
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data as UserProfile
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data as UserProfile
}

export async function getExperienceProgress(userId: string, pathway: string, phase: string) {
  const { data, error } = await supabase
    .from('experience_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('pathway', pathway)
    .eq('phase', phase)
    .single()

  if (error) throw error
  return data as ExperienceProgress
}

export async function updateExperienceProgress(
  userId: string,
  pathway: string,
  phase: string,
  progress: number,
  total: number
) {
  const { data, error } = await supabase
    .from('experience_progress')
    .upsert({
      user_id: userId,
      pathway,
      phase,
      progress,
      total,
      completed_at: progress >= total ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (error) throw error
  return data as ExperienceProgress
}

export async function getAchievements(userId: string) {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data as Achievement[]
}

export async function updateAchievement(
  userId: string,
  title: string,
  description: string,
  type: string,
  progress: number,
  total: number
) {
  const { data, error } = await supabase
    .from('achievements')
    .upsert({
      user_id: userId,
      title,
      description,
      type,
      progress,
      total,
      completed_at: progress >= total ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (error) throw error
  return data as Achievement
} 