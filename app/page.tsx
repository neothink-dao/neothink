"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, Sparkles, Globe } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl"
            >
              Go Further, Faster, Forever
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400"
            >
              Join over 2 million lives transformed through Mark Hamilton's revolutionary approach to personal and societal transformation.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link href="/discover">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Discover Your Path
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">2M+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Lives Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">4M+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Books Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">150K+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Testimonials</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">140+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Countries</div>
            </div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-red-900/30" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              About Mark Hamilton
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              For over 45 years, Mark Hamilton has pioneered a revolutionary approach to personal and societal transformation. His writings have empowered millions to unlock their full potential, create visionary businesses, and live extraordinary lives.
            </p>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              He is now focusing on his ultimate goal: preserving the greatest value in the universe - individual human consciousness - and to cure all aging and death.
            </p>
          </div>

          {/* Pathway Cards */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Sparkles className="h-6 w-6 text-orange-500" />
              <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Ascender</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Become wealthier and your wealthiest through breakthrough business advantages, powerful tools, and a community of value creators.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <BookOpen className="h-6 w-6 text-orange-500" />
              <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Neothinker</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Become happier and your happiest through breakthrough personal advantages, prime mentorship, and a community of integrated thinkers.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Globe className="h-6 w-6 text-orange-500" />
              <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Immortal</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Become healthier and your healthiest through breakthrough political advantages, longevity R&D, and a community of self-leaders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Ready to Transform Your Life?
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Take the Growth Compass to discover your optimal path to transformation and join thousands of others who have already begun their journey.
            </p>
            <div className="mt-10">
              <Link href="/discover">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Take the Growth Compass
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
