"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Brain, Zap, Rocket, Award, Target, Users, BookOpen, Globe, Waves, Command } from "lucide-react"

interface ExperiencePhase {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "upcoming"
  progress: number
  total: number
  icon: "sparkles" | "brain" | "zap" | "rocket" | "award" | "target" | "users" | "book" | "globe" | "waves" | "command"
  color?: string
}

interface ExperiencePhasesProps {
  type: "platform" | "pathway"
  pathway?: "ascender" | "neothinker" | "immortal"
  phases: ExperiencePhase[]
}

export function ExperiencePhases({ type, pathway, phases }: ExperiencePhasesProps) {
  const getIcon = (icon: ExperiencePhase["icon"], color?: string) => {
    switch (icon) {
      case "sparkles":
        return <Sparkles className={`h-5 w-5 text-${color || 'amber'}-500`} />
      case "brain":
        return <Brain className={`h-5 w-5 text-${color || 'amber'}-500`} />
      case "zap":
        return <Zap className={`h-5 w-5 text-${color || 'red'}-500`} />
      case "rocket":
        return <Rocket className={`h-5 w-5 text-${color || 'orange'}-500`} />
      case "award":
        return <Award className={`h-5 w-5 text-${color || 'purple'}-500`} />
      case "target":
        return <Target className={`h-5 w-5 text-${color || 'blue'}-500`} />
      case "users":
        return <Users className={`h-5 w-5 text-${color || 'green'}-500`} />
      case "book":
        return <BookOpen className={`h-5 w-5 text-${color || 'indigo'}-500`} />
      case "globe":
        return <Globe className={`h-5 w-5 text-${color || 'teal'}-500`} />
      case "waves":
        return <Waves className={`h-5 w-5 text-${color || 'blue'}-500`} />
      case "command":
        return <Command className={`h-5 w-5 text-${color || 'green'}-500`} />
    }
  }

  const getPhaseTitle = (phase: ExperiencePhase) => {
    switch (phase.id) {
      case "discovery":
        return "Discovery (XP1)"
      case "onboarding":
        return "Onboarding (XP2)"
      case "progressing":
        return "Progressing (XP3)"
      case "endgame":
        return "Endgame (XP4)"
      default:
        return phase.title
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        {type === "platform" ? (
          <Award className="h-6 w-6 text-purple-500" />
        ) : (
          getIcon(phases[0].icon)
        )}
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {type === "platform" ? "Neothink+ Journey" : `${pathway?.charAt(0).toUpperCase()}${pathway?.slice(1)} Journey`}
        </h2>
      </div>

      <div className="space-y-4">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg border p-6 ${
              phase.status === "current"
                ? "border-orange-500 bg-orange-50 dark:border-orange-500 dark:bg-orange-950/20"
                : phase.status === "completed"
                ? "border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-950/20"
                : "border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <div className="flex items-start gap-4">
              {getIcon(phase.icon, phase.color)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {getPhaseTitle(phase)}
                  </h3>
                  <span className={`text-sm ${
                    phase.status === "completed" ? "text-green-500" :
                    phase.status === "current" ? "text-orange-500" :
                    "text-zinc-400"
                  }`}>
                    {phase.status === "completed" ? "Completed" :
                     phase.status === "current" ? "In Progress" :
                     "Upcoming"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {phase.description}
                </p>
                {phase.status !== "upcoming" && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        Progress: {phase.progress} of {phase.total}
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {Math.round((phase.progress / phase.total) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(phase.progress / phase.total) * 100}
                      className="mt-2 h-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 