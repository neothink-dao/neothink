"use client"

import { motion } from "framer-motion"
import { ExperiencePhases } from "./experience-phases"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Brain, Zap, Rocket, Award, Target, Users, BookOpen, Globe, Waves, Command } from "lucide-react"

interface PathwayRequirement {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "upcoming"
  progress: number
  total: number
}

interface PathwayExperienceProps {
  pathway: "ascender" | "neothinker" | "immortal"
  currentPhase: string
  requirements: PathwayRequirement[]
  superachieverProgress: {
    completed: number
    total: number
  }
}

const pathwayConfig = {
  ascender: {
    color: "orange",
    icon: Rocket,
    title: "Wealth Creation",
    phases: [
      {
        id: "discovery",
        title: "Discovery",
        description: "Explore the Ascender pathway and understand how it can transform your financial future.",
        icon: "globe" as const,
        color: "orange"
      },
      {
        id: "onboarding",
        title: "Onboarding",
        description: "Set up your Ascender profile and begin your journey to financial mastery.",
        icon: "target" as const,
        color: "orange"
      },
      {
        id: "progressing",
        title: "Progressing",
        description: "Apply FLOW principles and build your wealth creation system.",
        icon: "waves" as const,
        color: "blue"
      },
      {
        id: "endgame",
        title: "Endgame",
        description: "Achieve financial freedom and become a master wealth creator.",
        icon: "award" as const,
        color: "orange"
      }
    ]
  },
  neothinker: {
    color: "amber",
    icon: Brain,
    title: "Personal Growth",
    phases: [
      {
        id: "discovery",
        title: "Discovery",
        description: "Understand how the Neothinker pathway can transform your life and relationships.",
        icon: "globe" as const,
        color: "amber"
      },
      {
        id: "onboarding",
        title: "Onboarding",
        description: "Begin your journey to integrated thinking and personal mastery.",
        icon: "target" as const,
        color: "amber"
      },
      {
        id: "progressing",
        title: "Progressing",
        description: "Apply Neothink principles and transform your life.",
        icon: "brain" as const,
        color: "amber"
      },
      {
        id: "endgame",
        title: "Endgame",
        description: "Achieve true happiness and become a master of life.",
        icon: "award" as const,
        color: "amber"
      }
    ]
  },
  immortal: {
    color: "red",
    icon: Zap,
    title: "Health & Longevity",
    phases: [
      {
        id: "discovery",
        title: "Discovery",
        description: "Learn how the Immortal pathway can transform your health and extend your life.",
        icon: "globe" as const,
        color: "red"
      },
      {
        id: "onboarding",
        title: "Onboarding",
        description: "Begin your journey to optimal health and longevity.",
        icon: "target" as const,
        color: "red"
      },
      {
        id: "progressing",
        title: "Progressing",
        description: "Apply longevity principles and optimize your health.",
        icon: "zap" as const,
        color: "red"
      },
      {
        id: "endgame",
        title: "Endgame",
        description: "Achieve extraordinary health and become a master of longevity.",
        icon: "award" as const,
        color: "red"
      }
    ]
  }
}

export function PathwayExperience({
  pathway,
  currentPhase,
  requirements,
  superachieverProgress
}: PathwayExperienceProps) {
  const config = pathwayConfig[pathway]
  const Icon = config.icon

  return (
    <div className="space-y-8">
      {/* Pathway Header */}
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full bg-${config.color}-100 dark:bg-${config.color}-900/30`}>
          <Icon className={`h-6 w-6 text-${config.color}-500`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {config.title} Journey
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Your path to {config.title.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Experience Phases */}
      <ExperiencePhases
        type="pathway"
        pathway={pathway}
        phases={config.phases.map(phase => ({
          ...phase,
          status: phase.id === currentPhase ? "current" :
                  config.phases.findIndex(p => p.id === phase.id) <
                  config.phases.findIndex(p => p.id === currentPhase) ? "completed" : "upcoming",
          progress: phase.id === currentPhase ? 50 : 100,
          total: 100,
          color: phase.color || config.color
        }))}
      />

      {/* Current Phase Requirements */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Current Phase Requirements
        </h3>
        <div className="space-y-4">
          {requirements.map((req, index) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {req.title}
                  </h4>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {req.description}
                  </p>
                </div>
                <span className={`text-sm ${
                  req.status === "completed" ? "text-green-500" :
                  req.status === "current" ? "text-orange-500" :
                  "text-zinc-400"
                }`}>
                  {req.status === "completed" ? "Completed" :
                   req.status === "current" ? "In Progress" :
                   "Upcoming"}
                </span>
              </div>
              {req.status !== "upcoming" && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Progress: {req.progress} of {req.total}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {Math.round((req.progress / req.total) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(req.progress / req.total) * 100}
                    className="mt-2 h-2"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Superachiever Progress */}
      <div className="rounded-lg border border-purple-500 bg-purple-50 p-6 dark:border-purple-500 dark:bg-purple-950/20">
        <div className="flex items-center gap-3">
          <Award className="h-6 w-6 text-purple-500" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Superachiever Progress
          </h3>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">
              {superachieverProgress.completed} of {superachieverProgress.total} Pathways Completed
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">
              {Math.round((superachieverProgress.completed / superachieverProgress.total) * 100)}%
            </span>
          </div>
          <Progress
            value={(superachieverProgress.completed / superachieverProgress.total) * 100}
            className="mt-2 h-2"
          />
        </div>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Complete all pathways to unlock exclusive benefits and join the elite Superachiever community.
        </p>
      </div>
    </div>
  )
} 