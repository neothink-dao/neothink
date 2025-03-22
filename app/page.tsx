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
      <section className="relative overflow-hidden section-padding pt-20 md:pt-32">
        <div className="container-narrow relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="text-left"
            >
              <motion.div variants={item} className="mb-6 inline-block">
                <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                  <span className="mr-2 h-2 w-2 rounded-full bg-gradient-primary animate-pulse"></span>
                  <span className="font-medium">Transforming lives since 1982</span>
                </span>
              </motion.div>
              <motion.h1 
                variants={item}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              >
                Go Further, Faster,{" "}
                <span className="text-gradient-primary relative">
                  Forever
                  <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-primary opacity-50"></span>
                </span>
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
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link href="/discover">
                  <Button size="xl" variant="gradient" className="group relative overflow-hidden">
                    <span className="relative z-10">Discover Your Path</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
                  </Button>
                </Link>
                <Link href="#about">
                  <Button variant="outline" size="xl" className="group">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div 
                variants={item}
                className="mt-8 flex items-center gap-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gradient-primary dark:border-zinc-900"></div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <span className="text-sm font-medium">4.9/5 from 150K+ reviews</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-primary/10 p-1">
                <div className="absolute inset-0 bg-gradient-primary/20 blur-3xl"></div>
                <div className="relative h-full w-full rounded-xl bg-white p-8 dark:bg-zinc-900">
                  {/* Placeholder for hero image/illustration */}
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <Users className="mx-auto h-16 w-16 text-gradient-primary" />
                      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">Join our community</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            <div className="group rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-4xl font-bold text-gradient-primary">2M+</div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Lives Transformed</div>
            </div>
            <div className="group rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-4xl font-bold text-gradient-primary">4M+</div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Books Sold</div>
            </div>
            <div className="group rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-4xl font-bold text-gradient-primary">150K+</div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Testimonials</div>
            </div>
            <div className="group rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-4xl font-bold text-gradient-primary">140+</div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Countries</div>
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
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
          </motion.div>

          {/* Pathway Cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card 
                variant="ascender"
                hover="glow-ascender"
                className="group h-full overflow-hidden transition-all duration-200 hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 transition-colors duration-200 group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-900/30 dark:text-orange-400">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gradient-ascender">Ascender</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pretty text-lg">
                    Become wealthier and your wealthiest through breakthrough business advantages, 
                    powerful tools, and a community of value creators.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/pathways/ascender" className="group inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400">
                    Learn more <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card 
                variant="neothinker"
                hover="glow-neothinker"
                className="group h-full overflow-hidden transition-all duration-200 hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-colors duration-200 group-hover:bg-amber-600 group-hover:text-white dark:bg-amber-900/30 dark:text-amber-400">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gradient-neothinker">Neothinker</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pretty text-lg">
                    Become happier and your happiest through breakthrough personal advantages, 
                    prime mentorship, and a community of integrated thinkers.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/pathways/neothinker" className="group inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400">
                    Learn more <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card 
                variant="immortal"
                hover="glow-immortal"
                className="group h-full overflow-hidden transition-all duration-200 hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 transition-colors duration-200 group-hover:bg-red-600 group-hover:text-white dark:bg-red-900/30 dark:text-red-400">
                    <Globe className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gradient-immortal">Immortal</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pretty text-lg">
                    Become healthier and your healthiest through breakthrough political advantages, 
                    longevity R&D, and a community of self-leaders.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/pathways/immortal" className="group inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400">
                    Learn more <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-zinc-100 dark:bg-zinc-800/20">
        <div className="container-narrow">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto text-center"
          >
            <Star className="mx-auto h-10 w-10 text-orange-500 dark:text-orange-400" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Transforming Lives Daily
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Read the stories of those who have already begun their journey.
            </p>
          </motion.div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <blockquote className="group flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  "Mark Hamilton's teachings completely transformed my approach to business. I've since launched 
                  two successful companies and achieved financial freedom."
                </p>
                <div className="mt-6 flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-ascender"></div>
                  <div className="ml-4">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">Michael T.</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Entrepreneur, New York</p>
                  </div>
                </div>
              </blockquote>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <blockquote className="group flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  "The Neothinker path unlocked a level of happiness I didn't know was possible. 
                  I'm now living a purpose-driven life with incredible clarity."
                </p>
                <div className="mt-6 flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-neothinker"></div>
                  <div className="ml-4">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">Sarah J.</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Psychologist, London</p>
                  </div>
                </div>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform Your Life?
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Join thousands of others who have already begun their journey to a better life.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/discover">
              <Button size="xl" variant="gradient" className="group relative overflow-hidden">
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button variant="outline" size="xl" className="group">
                Create Account
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
