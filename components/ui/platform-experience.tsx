"use client"

import { motion } from "framer-motion"
import { ExperiencePhases } from "./experience-phases"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Award, Globe, Target, Users, BookOpen } from "lucide-react"

interface PlatformRequirement {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "upcoming"
  progress: number
  total: number
}

interface PlatformExperienceProps {
  currentPhase: string
  requirements: PlatformRequirement[]
  pathwayProgress: {
    ascender: number
    neothinker: number
    immortal: number
  }
}

const platformPhases = [
  {
    id: "discovery",
    title: "Discovery",
    description: "Explore Neothink+ and understand how it can enhance your journey across all pathways.",
    icon: "globe" as const
  },
  {
    id: "onboarding",
    title: "Onboarding",
    description: "Set up your Neothink+ profile and begin your integrated journey.",
    icon: "target" as const
  },
  {
    id: "progressing",
    title: "Progressing",
    description: "Leverage Neothink+ resources and community to accelerate your growth.",
    icon: "users" as const
  },
  {
    id: "endgame",
    title: "Endgame",
    description: "Achieve Superachiever status by completing all pathways.",
    icon: "award" as const
  }
]

export function PlatformExperience({
  currentPhase,
  requirements,
  pathwayProgress
}: PlatformExperienceProps) {
  return (
    <div className="space-y-8">
      {/* Platform Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
          <Sparkles className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Neothink+ Journey
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Your integrated path to transformation
          </p>
        </div>
      </div>

      {/* Experience Phases */}
      <ExperiencePhases
        type="platform"
        phases={platformPhases.map(phase => ({
          ...phase,
          status: phase.id === currentPhase ? "current" :
                  platformPhases.findIndex(p => p.id === phase.id) <
                  platformPhases.findIndex(p => p.id === currentPhase) ? "completed" : "upcoming",
          progress: phase.id === currentPhase ? 50 : 100,
          total: 100
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

      {/* Pathway Progress Overview */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Pathway Progress
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(pathwayProgress).map(([pathway, progress], index) => (
            <motion.div
              key={pathway}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                {pathway}
              </h4>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Progress
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="mt-2 h-2"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 