import type { User } from "@supabase/supabase-js"

// Extend the existing types file with more precise definitions

// User-related types
export interface BasicUserInfo {
  id: string
  email: string | null
  created_at?: string
  user_metadata?: Record<string, any>
}

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  website: string | null
  location: string | null
  created_at: string
  updated_at: string | null
  email_confirmed_at: string | null
  onboarding_completed: boolean
}

export interface UserAccountData {
  id: string
  account_status: string
  login_notifications_enabled: boolean
  last_password_check: string | null
  advanced_protection_enabled: boolean
  last_data_export: string | null
}

export interface SecurityNotification {
  id: string
  user_id: string
  notification_type: string
  metadata: Record<string, any>
  created_at: string
}

// Form data types
export interface OnboardingFormData {
  fullName: string
  bio: string
  location: string
  notificationsEnabled: boolean
  securityNotificationsEnabled: boolean
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  fullName: string
  email: string
  password: string
}

export interface ResetPasswordFormData {
  email: string
}

export interface UpdatePasswordFormData {
  password: string
  confirmPassword: string
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
  redirectTo?: string
}

// Notification types
export type NotificationType = 
  | 'achievement'
  | 'milestone'
  | 'reminder'
  | 'system'
  | 'pathway'
  | 'streak'
  | 'content'
  | 'profile'
  | 'security'
  | 'goal'
  | 'innovation'
  | 'feedback'
  | 'collaboration'
  | 'mentorship'
  | 'community'
  | 'update'

export type NotificationChannel = 'email' | 'push' | 'in_app'
export type NotificationFrequency = 'instant' | 'daily' | 'weekly' | 'never'

export interface Notification {
  id: string
  user_id: string
  title: string
  description?: string
  type: NotificationType
  read: boolean
  data?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface NotificationPreferences {
  id: string;
  userId: string;
  channel: NotificationChannel;
  enabled: boolean;
  frequency: NotificationFrequency;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  id: string
  user_id: string
  theme: 'light' | 'dark' | 'system'
  font_size: 'small' | 'normal' | 'large'
  reduced_motion: boolean
  high_contrast: boolean
  email_notifications: boolean
  push_notifications: boolean
  sound_enabled: boolean
  profile_visibility: 'public' | 'private'
  show_online_status: boolean
  show_progress: boolean
  learning_style: 'visual' | 'auditory' | 'kinesthetic'
  goal_reminders: boolean
  progress_tracking: boolean
  two_factor_enabled: boolean
  login_alerts: boolean
  device_history: boolean
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  full_name: string | null
  username: string | null
  bio: string | null
  avatar_url: string | null
  pathway: 'ascender' | 'neothinker' | 'immortal' | null
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export interface NotificationContextType {
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Omit<Notification, 'id' | 'created_at' | 'updated_at'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export interface NotificationPreference {
  id: string
  user_id: string
  channel: NotificationChannel
  enabled: boolean
  frequency: NotificationFrequency
  quietHoursStart?: string
  quietHoursEnd?: string
}

