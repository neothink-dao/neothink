export type Pathway = 'ascender' | 'neothinker' | 'immortal'

export interface QuizStep {
  id: string
  title: string
  description: string
  type: 'single' | 'multiple' | 'scale' | 'text'
  options?: {
    value: string
    label: string
    description?: string
  }[]
  pathwayWeights?: {
    [key in Pathway]: number
  }
}

export interface UserPreferences {
  interests: string[]
  goals: string[]
  learningStyle: 'visual' | 'auditory' | 'kinesthetic'
  timeCommitment: 'low' | 'medium' | 'high'
  experienceLevel: 'beginner' | 'intermediate' | 'advanced'
}

export interface QuizState {
  currentStep: number
  totalSteps: number
  answers: Record<string, any>
  preferences: UserPreferences
  recommendedPathway?: Pathway
  progress: number
}

export interface PathwayInfo {
  id: Pathway
  title: string
  description: string
  icon: string
  benefits: string[]
  features: string[]
  requirements?: string[]
} 