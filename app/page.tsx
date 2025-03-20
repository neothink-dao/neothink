"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, BookOpen, Sparkles, Globe, Star, ChevronRight } from "lucide-react"
import Link from "next/link"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding pt-32 md:pt-40">
        <div className="container-narrow relative z-10">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <motion.div variants={item} className="mb-4 inline-block">
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <span className="mr-1 h-2 w-2 rounded-full bg-gradient-primary"></span>
                <span className="font-medium">Transforming lives since 1982</span>
              </span>
            </motion.div>
            <motion.h1 
              variants={item}
              className="text-balance"
            >
              Go Further, Faster, <span className="text-gradient-primary">Forever</span>
            </motion.h1>
            <motion.p 
              variants={item}
              className="mt-6 text-lg text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-xl"
            >
              Join over 2 million lives transformed through Mark Hamilton's revolutionary 
              approach to personal and societal transformation.
            </motion.p>
            <motion.div 
              variants={item}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/discover">
                <Button size="xl" variant="gradient" className="group">
                  Discover Your Path
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#about">
                <Button variant="outline" size="xl">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            <div className="rounded-lg border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-3xl font-bold text-gradient-primary">2M+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Lives Transformed</div>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-3xl font-bold text-gradient-primary">4M+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Books Sold</div>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-3xl font-bold text-gradient-primary">150K+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Testimonials</div>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-3xl font-bold text-gradient-primary">140+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Countries</div>
            </div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 h-96 w-96 rounded-full bg-amber-100/50 mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30" />
          <div className="absolute -bottom-1/2 -left-1/4 h-96 w-96 rounded-full bg-orange-100/50 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30" />
          <div className="absolute top-1/2 left-1/2 h-96 w-96 rounded-full bg-red-100/50 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-red-900/30" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container-narrow">
          <div className="mx-auto text-center">
            <h2 className="text-balance">
              About Mark Hamilton
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              For over 45 years, Mark Hamilton has pioneered a revolutionary approach to personal and societal transformation. 
              His writings have empowered millions to unlock their full potential, create visionary businesses, 
              and live extraordinary lives.
            </p>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              He is now focusing on his ultimate goal: preserving the greatest value in the universe - 
              individual human consciousness - and to cure all aging and death.
            </p>
          </div>

          {/* Pathway Cards */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card 
              variant="ascender"
              hover="glow-ascender"
              className="overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <CardTitle className="text-gradient-ascender">Ascender</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty">
                  Become wealthier and your wealthiest through breakthrough business advantages, 
                  powerful tools, and a community of value creators.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href="/pathways/ascender" className="inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card 
              variant="neothinker"
              hover="glow-neothinker"
              className="overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle className="text-gradient-neothinker">Neothinker</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty">
                  Become happier and your happiest through breakthrough personal advantages, 
                  prime mentorship, and a community of integrated thinkers.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href="/pathways/neothinker" className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card 
              variant="immortal"
              hover="glow-immortal"
              className="overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <Globe className="h-5 w-5" />
                </div>
                <CardTitle className="text-gradient-immortal">Immortal</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty">
                  Become healthier and your healthiest through breakthrough political advantages, 
                  longevity R&D, and a community of self-leaders.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href="/pathways/immortal" className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-zinc-100 dark:bg-zinc-800/20">
        <div className="container-narrow">
          <div className="mx-auto text-center">
            <Star className="mx-auto h-8 w-8 text-orange-500 dark:text-orange-400" />
            <h2 className="mt-4 text-balance">
              Transforming Lives Daily
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Read the stories of those who have already begun their journey.
            </p>
          </div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <blockquote className="flex flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
                "Mark Hamilton's teachings completely transformed my approach to business. I've since launched 
                two successful companies and achieved financial freedom."
              </p>
              <div className="mt-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-ascender"></div>
                <div className="ml-3">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">Michael T.</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Entrepreneur, New York</p>
                </div>
              </div>
            </blockquote>
            
            <blockquote className="flex flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
                "The Neothinker path unlocked a level of happiness I didn't know was possible. 
                I'm now living a purpose-driven life with incredible clarity."
              </p>
              <div className="mt-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-neothinker"></div>
                <div className="ml-3">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">Sarah J.</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Psychologist, London</p>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance">
            Ready to Transform Your Life?
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Take the Growth Compass to discover your optimal path to transformation and join thousands 
            of others who have already begun their journey.
          </p>
          <div className="mt-10">
            <Link href="/discover">
              <Button size="xl" variant="gradient" className="group">
                Take the Growth Compass
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
