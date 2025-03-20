"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, BookOpen, Globe, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    title: "Ascension Platform",
    description: "All-in-one business platform with powerful tools and resources to accelerate your growth.",
    features: [
      "Business strategy templates",
      "Market analysis tools",
      "Financial planning resources",
      "Project management system"
    ]
  },
  {
    title: "FLOW Training",
    description: "Comprehensive training program to master the art of value creation and business success.",
    features: [
      "Weekly live training sessions",
      "Business case studies",
      "Expert guest speakers",
      "Implementation guides"
    ]
  },
  {
    title: "Ascenders Community",
    description: "Connect with like-minded entrepreneurs and value creators in our exclusive community.",
    features: [
      "Private networking events",
      "Mastermind groups",
      "Business partnerships",
      "Success stories sharing"
    ]
  }
]

export default function AscenderPathway() {
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-8"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Ascender Pathway</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl"
            >
              Become Your Wealthiest
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400"
            >
              Join thousands of value creators who have transformed their lives through breakthrough business advantages, powerful tools, and a community of like-minded entrepreneurs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link href="/auth/signup">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-orange-900/30" />
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-amber-900/30" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Your Path to Extraordinary Wealth
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              The Ascender pathway combines powerful tools, expert guidance, and a supportive community to help you achieve unprecedented business success.
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
                      <CheckCircle2 className="h-5 w-5 text-orange-500" />
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
      <section className="py-24 sm:py-32 bg-orange-50 dark:bg-orange-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Join thousands of successful entrepreneurs who have already discovered their path to extraordinary wealth through the Ascender pathway.
            </p>
            <div className="mt-10">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Start Your Ascension Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 