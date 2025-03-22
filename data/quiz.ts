import { QuizStep, PathwayInfo } from "@/types/quiz"

export const quizSteps: QuizStep[] = [
  {
    id: "goals",
    title: "What are your primary goals?",
    description: "Select all that apply to your journey",
    type: "multiple",
    options: [
      {
        value: "wealth",
        label: "Build wealth and financial freedom",
        description: "Create sustainable business advantages and generate wealth",
      },
      {
        value: "happiness",
        label: "Achieve deeper happiness and fulfillment",
        description: "Develop personal advantages and find purpose",
      },
      {
        value: "longevity",
        label: "Extend lifespan and enhance health",
        description: "Access cutting-edge longevity research and technologies",
      },
    ],
    pathwayWeights: {
      ascender: 0.6,
      neothinker: 0.3,
      immortal: 0.1,
    },
  },
  {
    id: "experience",
    title: "What's your experience level?",
    description: "Help us understand where you're starting from",
    type: "single",
    options: [
      {
        value: "beginner",
        label: "Beginner",
        description: "New to personal development and transformation",
      },
      {
        value: "intermediate",
        label: "Intermediate",
        description: "Some experience with personal growth practices",
      },
      {
        value: "advanced",
        label: "Advanced",
        description: "Extensive experience in personal development",
      },
    ],
  },
  {
    id: "time",
    title: "How much time can you commit?",
    description: "Be realistic about your availability",
    type: "single",
    options: [
      {
        value: "low",
        label: "1-2 hours per week",
        description: "Fit learning around a busy schedule",
      },
      {
        value: "medium",
        label: "3-5 hours per week",
        description: "Dedicated time for regular practice",
      },
      {
        value: "high",
        label: "6+ hours per week",
        description: "Serious commitment to transformation",
      },
    ],
  },
  {
    id: "learning",
    title: "What's your preferred learning style?",
    description: "Choose how you best absorb information",
    type: "single",
    options: [
      {
        value: "visual",
        label: "Visual",
        description: "Learn through videos, diagrams, and visual content",
      },
      {
        value: "auditory",
        label: "Auditory",
        description: "Learn through discussions, lectures, and audio content",
      },
      {
        value: "kinesthetic",
        label: "Kinesthetic",
        description: "Learn through practice, exercises, and hands-on experience",
      },
    ],
  },
]

export const pathways: PathwayInfo[] = [
  {
    id: "ascender",
    title: "Ascender",
    description: "Master wealth creation and business transformation",
    icon: "trending-up",
    benefits: [
      "Develop breakthrough business advantages",
      "Create sustainable wealth systems",
      "Build high-value networks",
      "Master strategic thinking",
    ],
    features: [
      "Business strategy workshops",
      "Wealth creation frameworks",
      "Network building events",
      "1-on-1 mentoring",
    ],
    requirements: [
      "Commitment to business growth",
      "Willingness to take calculated risks",
      "Drive for financial mastery",
    ],
  },
  {
    id: "neothinker",
    title: "Neothinker",
    description: "Unlock advanced cognitive abilities and personal transformation",
    icon: "brain",
    benefits: [
      "Enhance mental clarity and focus",
      "Develop superior decision-making",
      "Achieve deeper happiness",
      "Master emotional intelligence",
    ],
    features: [
      "Cognitive enhancement techniques",
      "Decision-making frameworks",
      "Mindfulness practices",
      "Personal development workshops",
    ],
    requirements: [
      "Open to new ways of thinking",
      "Regular practice commitment",
      "Interest in personal growth",
    ],
  },
  {
    id: "immortal",
    title: "Immortal",
    description: "Access cutting-edge longevity research and life extension",
    icon: "infinity",
    benefits: [
      "Learn latest longevity research",
      "Optimize health and vitality",
      "Access breakthrough technologies",
      "Join longevity research community",
    ],
    features: [
      "Longevity research updates",
      "Health optimization protocols",
      "Biotech investment insights",
      "Expert health consultations",
    ],
    requirements: [
      "Interest in longevity science",
      "Commitment to health optimization",
      "Openness to cutting-edge research",
    ],
  },
] 