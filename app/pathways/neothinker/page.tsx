"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Sparkles, Globe, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    title: "Neothink Courses",
    description: "Comprehensive curriculum designed to transform your thinking and enhance your personal growth.",
    features: [
      "40+ masterclasses",
      "Personal development tools",
      "Mindset transformation",
      "Life optimization guides"
    ]
  },
  {
    title: "Prime Mentorship",
    description: "Direct guidance from experienced mentors who have mastered the art of integrated thinking.",
    features: [
      "Weekly Q&A sessions",
      "Personal coaching",
      "Success strategies",
      "Accountability support"
    ]
  },
  {
    title: "Neothinkers Community",
    description: "Join a vibrant community of integrated thinkers committed to personal transformation.",
    features: [
      "Supportive environment",
      "Growth workshops",
      "Success sharing",
      "Lifelong connections"
    ]
  }
]

export default function NeothinkerPathway() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-8"
            >
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Neothinker Pathway</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl"
            >
              Become Your Happiest
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400"
            >
              Join thousands of integrated thinkers who have transformed their lives through breakthrough personal advantages, prime mentorship, and a community of like-minded individuals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                href="/auth/sign-up?pathway=neothinker"
                className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#benefits">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Background Effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30" />
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Your Path to Extraordinary Happiness
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              The Neothinker pathway combines powerful insights, expert guidance, and a supportive community to help you achieve unprecedented personal growth and happiness.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  {benefit.description}
                </p>
                <ul className="space-y-3">
                  {benefit.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <CheckCircle2 className="h-5 w-5 text-amber-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-amber-50 dark:bg-amber-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Ready to Transform Your Life?
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Join thousands of successful individuals who have already discovered their path to extraordinary happiness through the Neothinker pathway.
            </p>
            <div className="mt-10">
              <Link
                href="/auth/sign-up?pathway=neothinker"
                className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 