"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Sparkles, Globe, Target, Brain, Heart } from "lucide-react"
import Link from "next/link"

interface DashboardMetric {
  title: string
  value: string | number
  change: string
  trend: "up" | "down"
}

interface PersonalizedDashboardProps {
  pathway: "ascender" | "neothinker" | "immortal"
  metrics: DashboardMetric[]
  nextSteps: {
    title: string
    description: string
    action: string
    link: string
  }[]
  communityHighlights: {
    title: string
    description: string
    members: number
  }[]
}

export function PersonalizedDashboard({
  pathway,
  metrics,
  nextSteps,
  communityHighlights
}: PersonalizedDashboardProps) {
  const pathwayConfig = {
    ascender: {
      color: "orange",
      icon: Sparkles,
      title: "Wealth Creation"
    },
    neothinker: {
      color: "amber",
      icon: Brain,
      title: "Personal Growth"
    },
    immortal: {
      color: "red",
      icon: Heart,
      title: "Health & Longevity"
    }
  }

  const config = pathwayConfig[pathway]
  const Icon = config.icon

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full bg-${config.color}-100 dark:bg-${config.color}-900/30`}>
          <Icon className={`h-6 w-6 text-${config.color}-500`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Welcome Back
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Continue your journey to {config.title}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {metric.title}
            </h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {metric.value}
              </p>
              <p className={`ml-2 text-sm ${
                metric.trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                {metric.change}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Steps */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Your Next Steps
        </h3>
        <div className="space-y-4">
          {nextSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                </div>
                <Link href={step.link}>
                  <Button variant="outline" size="sm">
                    {step.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Highlights */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Community Highlights
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {communityHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                {highlight.title}
              </h4>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {highlight.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Users className="h-4 w-4" />
                <span>{highlight.members} members participating</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 