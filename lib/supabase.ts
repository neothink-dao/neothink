import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export type UserProfile = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
  pathway: 'ascender' | 'neothinker' | 'immortal' | null
  current_phase: string | null
  superachiever_progress: {
    ascender: number
    neothinker: number
    immortal: number
  }
}

export type ExperienceProgress = {
  id: string
  user_id: string
  pathway: 'ascender' | 'neothinker' | 'immortal' | 'platform'
  phase: string
  progress: number
  total: number
  completed_at: string | null
  created_at: string
  updated_at: string
}

export type Achievement = {
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

// Helper functions for common database operations
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data as UserProfile
}

export async function updateUserProgress(
  userId: string,
  pathway: ExperienceProgress['pathway'],
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
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data as ExperienceProgress
}

export async function getUserAchievements(userId: string) {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

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
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data as Achievement
} 