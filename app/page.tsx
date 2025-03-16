"use client"

import { Suspense, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-900 to-black">
      <Suspense>
        <HomeContent />
      </Suspense>
      <BackgroundGradientEffects />
    </div>
  )
}

function HomeContent() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.replace("/dashboard")
    }
  }, [router, user])

  return (
    <main className="flex-1 flex flex-col" role="main">
      <HeroSection router={router} />
      <PathwaysSection router={router} />
    </main>
  )
}

function HeroSection({ router }: { router: any }) {
  return (
    <section 
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-24" 
      aria-labelledby="hero-heading" 
      role="region"
    >
      <div className="container relative mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-zinc-800 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span className="text-base font-medium bg-gradient-to-r from-amber-200 via-orange-200 to-red-200 bg-clip-text text-transparent">
              Prosper Happily Forever
            </span>
          </div>

          <h1 
            id="hero-heading" 
            className="mt-8 animate-fade-in-delay-1 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="inline-block mb-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
              Go Further,
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
              Faster, Forever
            </span>
          </h1>

          <p className="animate-fade-in-delay-2 mx-auto mt-10 max-w-2xl text-lg sm:text-xl leading-relaxed text-zinc-300 [text-wrap:balance]">
            Become more of the brilliant value creator, integrated thinker, and self-leader you're meant to be so you can fully enjoy living more of the extraordinarily exhilarating life you're meant to live and love.
          </p>

          <div className="animate-fade-in-delay-2 mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="relative inline-block h-10 w-10 rounded-full ring-2 ring-zinc-800 transition-transform hover:scale-105 hover:-translate-y-1"
                  >
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-amber-${i}00 to-orange-${i}00 blur-sm opacity-60`} />
                    <div className={`relative h-full w-full rounded-full bg-gradient-to-br from-amber-${i}00 to-orange-${i}00`} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-zinc-200">
                  2,000+
                </span>
                <span className="text-sm text-zinc-400">
                  members
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-6 w-6 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-zinc-200">
                  4.9/5
                </span>
                <span className="text-sm text-zinc-400">
                  from 500+ reviews
                </span>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-delay-3 mt-14 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button
              onClick={() => router.push("/auth/signup")}
              className="group relative inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-8 py-3 text-lg font-semibold text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400"
            >
              <div className="relative flex items-center gap-2">
                <span className="relative z-10">Get Started</span>
                <svg 
                  className="relative z-10 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>

            <button
              onClick={() => router.push("/auth/login")}
              className="group inline-flex h-14 items-center justify-center rounded-xl border-2 border-zinc-800 bg-zinc-900/50 backdrop-blur px-8 py-3 text-lg font-semibold text-zinc-100 transition-all hover:scale-105 hover:border-zinc-700 hover:bg-zinc-900/80 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <span>Keep Going</span>
              <svg 
                className="ml-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
              </svg>
            </button>
          </div>

          <div className="animate-fade-in-delay-4 mt-16 flex justify-center">
            <button 
              onClick={() => {
                const pathwaysSection = document.getElementById('pathways-heading')
                pathwaysSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group flex flex-col items-center gap-2 text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <span className="text-sm font-medium">Explore Pathways</span>
              <div className="relative h-10 w-10 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center group-hover:border-zinc-700 transition-colors">
                <svg 
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
          style={{ 
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            animation: 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }} 
        />
      </div>

      {/* Additional decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute h-full w-full bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
    </section>
  )
}

function PathwaysSection({ router }: { router: any }) {
  const pathways = [
    {
      title: "Ascender",
      subtitle: "Supercharged Value Creator",
      description: "Enjoy greater prosperity and become your wealthiest as an Ascender with:",
      color: "orange",
      features: ["Ascension", "FLOW", "Ascenders"],
      benefits: [
        "All-in-one business platform",
        "Weekly Q&A/Office Hours",
        "Affiliate sales training"
      ],
      icon: (
        <svg className="h-7 w-7 text-orange-600 dark:text-orange-400 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      )
    },
    {
      title: "Neothinker",
      subtitle: "Supercharged Integrated Thinker",
      description: "Enjoy greater happiness and become your happiest as a Neothinker with:",
      color: "amber",
      features: ["Neothink", "Mark Hamilton", "Neothinkers"],
      benefits: [
        "40+ Neothink courses & masterclasses",
        "Private Neothink Community",
        "Weekly Q&A/Office Hours"
      ],
      icon: (
        <svg className="h-7 w-7 text-amber-600 dark:text-amber-400 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-6.45 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2Z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-6.45 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2Z" />
        </svg>
      )
    },
    {
      title: "Immortal",
      subtitle: "Supercharged Self-Leader",
      description: "Enjoy greater longevity and become your healthiest as an Immortal with:",
      color: "red",
      features: ["Immortalis", "Project Life", "Immortals"],
      benefits: [
        "Digital-first nation building",
        "Anti-aging research",
        "Longevity supplements"
      ],
      icon: (
        <svg className="h-7 w-7 text-red-600 dark:text-red-400 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    }
  ]

  return (
    <section 
      className="relative w-full py-32" 
      aria-labelledby="pathways-heading" 
      role="region"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 
              id="pathways-heading" 
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              <span className="block mb-4 text-zinc-100">Choose Your Path to</span>
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                Extraordinary Living
              </span>
            </h2>
            <p className="mt-6 text-lg text-zinc-400 [text-wrap:balance] max-w-2xl mx-auto">
              Enhance your current path with powerful tools and insights that amplify your potential for wealth, happiness, and longevity.
            </p>
          </div>
          
          <div className="grid gap-8">
            {pathways.map((pathway, index) => (
              <div
                key={pathway.title}
                className={`pathway-card group relative animate-fade-in-delay-${index + 1} rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur p-8 sm:p-10 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-zinc-900/80
                  ${pathway.color === 'amber' ? 'hover:border-amber-900/50' : ''}
                  ${pathway.color === 'orange' ? 'hover:border-orange-900/50' : ''}
                  ${pathway.color === 'red' ? 'hover:border-red-900/50' : ''}`}
                role="region"
                aria-labelledby={`pathway-${pathway.title}`}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-zinc-950/50 pointer-events-none" />

                <div className="relative flex flex-col sm:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${
                      pathway.color === 'amber' ? 'bg-amber-950/50' :
                      pathway.color === 'orange' ? 'bg-orange-950/50' :
                      'bg-red-950/50'
                    }`}>
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-2xl blur-xl opacity-50 transition-opacity duration-500 group-hover:opacity-100 ${
                        pathway.color === 'amber' ? 'bg-amber-900/30' :
                        pathway.color === 'orange' ? 'bg-orange-900/30' :
                        'bg-red-900/30'
                      }`} />
                      {pathway.icon}
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 
                        id={`pathway-${pathway.title}`} 
                        className={`text-2xl font-bold ${
                          pathway.color === 'amber' ? 'text-amber-400' :
                          pathway.color === 'orange' ? 'text-orange-400' :
                          'text-red-400'
                        }`}
                      >
                        {pathway.title}
                      </h3>
                      <p className="mt-2 text-lg text-zinc-300">
                        {pathway.subtitle}
                      </p>
                      <p className="mt-3 text-zinc-400">
                        {pathway.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {pathway.benefits.map((benefit) => (
                        <div 
                          key={benefit} 
                          className="flex items-center gap-3 group/item"
                        >
                          <div className={`flex-shrink-0 p-1 rounded-full transition-all duration-300 group-hover/item:scale-110 ${
                            pathway.color === 'amber' ? 'bg-amber-950/50 group-hover/item:bg-amber-900/50' :
                            pathway.color === 'orange' ? 'bg-orange-950/50 group-hover/item:bg-orange-900/50' :
                            'bg-red-950/50 group-hover/item:bg-red-900/50'
                          }`}>
                            <svg 
                              className={`h-5 w-5 ${
                                pathway.color === 'amber' ? 'text-amber-400' :
                                pathway.color === 'orange' ? 'text-orange-400' :
                                'text-red-400'
                              }`}
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="text-zinc-300 group-hover/item:text-zinc-100 transition-colors">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => router.push(`/pathways/${pathway.title.toLowerCase()}`)}
                        className={`group/btn relative inline-flex h-12 items-center justify-center rounded-xl px-6 text-base font-semibold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                          pathway.color === 'amber' ? 'bg-amber-600 text-white hover:bg-amber-500 focus:ring-amber-500' :
                          pathway.color === 'orange' ? 'bg-orange-600 text-white hover:bg-orange-500 focus:ring-orange-500' :
                          'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500'
                        }`}
                      >
                        <span>Learn More</span>
                        <svg 
                          className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative mt-32 bg-zinc-900/50 border-t border-zinc-800 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 to-zinc-900/50" />
        
        <div className="relative container mx-auto px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                <span className="block text-zinc-100 mb-2">Ready to Transform Your Life?</span>
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                  Join the Movement Today
                </span>
              </h3>
              <p className="mt-6 text-lg text-zinc-400 [text-wrap:balance]">
                Join thousands of value creators, integrated thinkers, and self-leaders who are living extraordinary lives through our proven pathways.
              </p>
            </div>

            <div className="mt-10">
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button
                  onClick={() => router.push("/discover")}
                  className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-[2px] transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 transition-all group-hover:opacity-0" />
                  <span className="relative inline-flex h-12 items-center justify-center rounded-[10px] bg-zinc-950 px-6 text-base font-semibold text-white transition-all group-hover:bg-transparent">
                    Discover Your Path
                    <svg 
                      className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </button>

                <button
                  onClick={() => router.push("/success-stories")}
                  className="group relative inline-flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 text-base font-semibold text-zinc-300 transition-all hover:scale-105 hover:bg-zinc-900 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                >
                  See Success Stories
                  <svg 
                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <line x1="10" y1="9" x2="8" y2="9"/>
                  </svg>
                </button>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/50">
                        <svg 
                          className="h-6 w-6 text-amber-400" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-zinc-100">Growing Community</h4>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-amber-400">2,000+</span>
                        <span className="text-sm text-zinc-400">active members</span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-400">
                        Join a thriving community of like-minded individuals on their journey to extraordinary living.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-950/50">
                        <svg 
                          className="h-6 w-6 text-orange-400" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-zinc-100">Proven Results</h4>
                      <div className="mt-2 flex items-baseline gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="h-5 w-5 text-orange-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-zinc-400">
                          4.9/5 from 500+ reviews
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-400">
                        Our pathways have helped thousands achieve extraordinary results in wealth, happiness, and longevity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute h-full w-full bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
      </div>
    </section>
  )
}

function BackgroundGradientEffects() {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[20%] top-[20%] aspect-square w-[300px] animate-blob rounded-full bg-amber-500/10 blur-[100px]" />
        <div className="absolute right-[20%] bottom-[20%] aspect-square w-[300px] animate-blob rounded-full bg-red-500/10 blur-[100px]" />
      </div>
    </>
  )
}
