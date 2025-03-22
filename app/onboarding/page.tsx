"use client"

import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, TrendingUp, Infinity } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: TrendingUp,
    title: "Ascender",
    description: "Master wealth creation and business transformation",
  },
  {
    icon: Brain,
    title: "Neothinker",
    description: "Unlock advanced cognitive abilities and personal transformation",
  },
  {
    icon: Infinity,
    title: "Immortal",
    description: "Access cutting-edge longevity research and life extension",
  },
]

export default function OnboardingPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to Your Journey
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Take our quick assessment to discover your optimal pathway to personal
            and professional transformation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Link href="/onboarding/quiz">
            <Button size="lg" className="gap-2">
              Start Assessment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 sm:mt-20"
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="relative rounded-2xl border border-border/50 bg-card p-6 shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mx-auto mt-16 max-w-2xl text-center sm:mt-20"
      >
        <h2 className="text-lg font-semibold">How it works</h2>
        <p className="mt-2 text-muted-foreground">
          Our assessment takes about 5 minutes to complete. We'll ask you a series
          of questions about your goals, experience, and preferences to recommend
          the best pathway for your journey.
        </p>
      </motion.div>
    </Container>
  )
} 