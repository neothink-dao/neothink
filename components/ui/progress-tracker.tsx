"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Star, Award } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  progress: number
  total: number
  icon: "trophy" | "target" | "star" | "award"
}

interface ProgressTrackerProps {
  achievements: Achievement[]
  superachieverProgress: {
    completed: number
    total: number
  }
}

export function ProgressTracker({ achievements, superachieverProgress }: ProgressTrackerProps) {
  const getIcon = (type: Achievement["icon"]) => {
    switch (type) {
      case "trophy":
        return <Trophy className="h-5 w-5 text-orange-500" />
      case "target":
        return <Target className="h-5 w-5 text-amber-500" />
      case "star":
        return <Star className="h-5 w-5 text-red-500" />
      case "award":
        return <Award className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Superachiever Progress */}
      <div className="rounded-lg border border-purple-500 bg-purple-50 p-6 dark:border-purple-500 dark:bg-purple-950/20">
        <div className="flex items-center gap-3">
          <Award className="h-6 w-6 text-purple-500" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Superachiever Status
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

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Your Achievements
        </h3>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start gap-4">
                {getIcon(achievement.icon)}
                <div className="flex-1">
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {achievement.title}
                  </h4>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {achievement.description}
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {achievement.progress} of {achievement.total}
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {Math.round((achievement.progress / achievement.total) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(achievement.progress / achievement.total) * 100}
                      className="mt-2 h-2"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 