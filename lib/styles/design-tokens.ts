import { Brain, Rocket, Sparkles, Zap } from 'lucide-react'

export const typography = {
  fontFamily: 'Inter, system-ui, sans-serif',
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
}

export const colors = {
  // Neutral colors for UI elements
  neutral: {
    50: 'zinc-50',
    100: 'zinc-100',
    200: 'zinc-200',
    300: 'zinc-300',
    400: 'zinc-400',
    500: 'zinc-500',
    600: 'zinc-600',
    700: 'zinc-700',
    800: 'zinc-800',
    900: 'zinc-900',
  },
  
  // Brand gradient colors
  brand: {
    gradient: {
      light: 'from-amber-500 via-orange-500 to-red-500',
      dark: 'dark:from-amber-400 dark:via-orange-400 dark:to-red-400',
    },
  },

  // Pathway-specific color palettes
  pathways: {
    ascender: {
      50: 'orange-50',
      100: 'orange-100',
      200: 'orange-200',
      300: 'orange-300',
      400: 'orange-400',
      500: 'orange-500',
      600: 'orange-600',
      700: 'orange-700',
      800: 'orange-800',
      900: 'orange-900',
    },
    neothinker: {
      50: 'amber-50',
      100: 'amber-100',
      200: 'amber-200',
      300: 'amber-300',
      400: 'amber-400',
      500: 'amber-500',
      600: 'amber-600',
      700: 'amber-700',
      800: 'amber-800',
      900: 'amber-900',
    },
    immortal: {
      50: 'red-50',
      100: 'red-100',
      200: 'red-200',
      300: 'red-300',
      400: 'red-400',
      500: 'red-500',
      600: 'red-600',
      700: 'red-700',
      800: 'red-800',
      900: 'red-900',
    },
  },
}

export const pathways = {
  ascender: {
    name: 'Ascender',
    icon: Rocket,
    color: colors.pathways.ascender,
    identity: 'Supercharged Value Creator',
    valueProposition: 'Enjoy greater prosperity and become your wealthiest as an Ascender.',
    description: 'Access Ascension + FLOW + Ascenders',
    tagline: 'Build a profitable business online with education, tools, and community.',
    features: [
      'All-in-one business platform',
      'Ascension Business System masterclass',
      'Weekly Q&A/Office Hours',
      'Affiliate sales training',
      'Weekly business training',
    ],
  },
  neothinker: {
    name: 'Neothinker',
    icon: Brain,
    color: colors.pathways.neothinker,
    identity: 'Supercharged Integrated Thinker',
    valueProposition: 'Enjoy greater happiness and become your happiest as a Neothinker.',
    description: 'Access Neothink + Mark Hamilton + Neothinkers',
    tagline: 'Transform into a genius-level mentality for extraordinary success.',
    features: [
      '40+ Neothink courses & masterclasses',
      'Private Neothink Community',
      'Weekly Q&A/Office Hours',
      'Live Implementation workshops',
      'Direct mentor support',
    ],
  },
  immortal: {
    name: 'Immortal',
    icon: Zap,
    color: colors.pathways.immortal,
    identity: 'Supercharged Self-Leader',
    valueProposition: 'Enjoy greater longevity and become your healthiest as an Immortal.',
    description: 'Access Immortalis + Project Life + Immortals',
    tagline: 'Join the movement for unlimited human potential and longevity.',
    features: [
      'Digital-first nation building',
      'Prime Law framework',
      'Anti-aging research',
      'Longevity supplements',
      'Telemedicine services',
    ],
  },
}

export const brand = {
  name: 'Neothink+',
  icon: Sparkles,
  tagline: 'Go Further, Faster, Forever.',
  mission: 'Prosper Happily Forever.',
  vision: 'Become more of the brilliant value creator, integrated thinker, and self-leader you\'re meant to be so you can fully enjoy living more of the extraordinarily exhilarating life you\'re meant to live and love.',
  description: 'The unifying hub for unlocking your full potential through Ascender, Neothinker, and Immortal pathways.',
}

// Utility function to get pathway-specific styles
export const getPathwayStyles = (pathway: keyof typeof pathways) => {
  const config = pathways[pathway]
  return {
    background: `bg-${config.color[500]}`,
    text: `text-${config.color[500]}`,
    border: `border-${config.color[500]}`,
    hover: `hover:bg-${config.color[600]}`,
    gradient: {
      light: `from-${config.color[500]} to-${config.color[600]}`,
      dark: `dark:from-${config.color[400]} dark:to-${config.color[500]}`,
    },
  }
}

// Common component styles
export const componentStyles = {
  card: "rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
  button: "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  input: "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900",
  gradientText: "bg-gradient-to-r bg-clip-text text-transparent",
} 