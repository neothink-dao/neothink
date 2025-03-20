"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { AnimatedTransition } from "@/components/ui/AnimatedTransition"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  Bell,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  action?: () => Promise<void> | void
}

export default function WelcomePage() {
  const router = useRouter()
  const { user, supabase } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [pathway, setPathway] = useState<"ascender" | "neothinker" | "immortal">()
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUserData() {
      try {
        if (!user?.id) {
          router.push("/auth/signin")
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("pathway, onboarding_completed")
          .eq("id", user.id)
          .single()

        if (profileError) throw profileError

        if (profile?.pathway) {
          setPathway(profile.pathway)
        }

        if (profile?.onboarding_completed) {
          router.push("/dashboard")
          return
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading user data:", error)
        setError("Failed to load your profile. Please try again.")
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [user, supabase, router])

  const handleEnableNotifications = async () => {
    try {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        setNotificationsEnabled(true)
        toast({
          title: "Notifications enabled",
          description: "You'll now receive updates about your journey.",
        })
      } else {
        toast({
          title: "Notifications disabled",
          description: "You can enable them later in your settings.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error enabling notifications:", error)
      toast({
        title: "Error",
        description: "Failed to enable notifications. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCompleteOnboarding = async () => {
    try {
      if (!user?.id) {
        router.push("/auth/signin")
        return
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("id", user.id)

      if (updateError) throw updateError

      toast({
        title: "Welcome to Neothink!",
        description: "Your journey begins now.",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing onboarding:", error)
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleStepAction = async () => {
    const currentStepData = onboardingSteps[currentStep]
    if (currentStepData.action) {
      try {
        await currentStepData.action()
      } catch (error) {
        console.error(`Error in step ${currentStepData.id}:`, error)
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const onboardingSteps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to Neothink",
      description: `Welcome to your journey as a ${pathway || 'seeker'}! Let's get you started with everything you need to know.`,
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      id: "resources",
      title: "Explore Resources",
      description: "Access exclusive content, guides, and tools tailored to your pathway.",
      icon: <BookOpen className="h-6 w-6" />,
      action: () => router.push("/resources"),
    },
    {
      id: "community",
      title: "Join the Community",
      description: "Connect with fellow seekers and share your journey.",
      icon: <Users className="h-6 w-6" />,
      action: () => router.push("/community"),
    },
    {
      id: "notifications",
      title: "Stay Updated",
      description: "Enable notifications to never miss important updates and events.",
      icon: <Bell className="h-6 w-6" />,
      action: handleEnableNotifications,
    },
  ]

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent dark:border-orange-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedTransition>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg border border-zinc-200 bg-white/90 shadow-xl backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/90">
              <div className="p-8">
                <div className="flex flex-col space-y-8">
                  {/* Progress indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {onboardingSteps.map((step, index) => (
                        <div
                          key={step.id}
                          className={cn(
                            "h-2 w-2 rounded-full transition-colors",
                            index <= currentStep
                              ? "bg-orange-500 dark:bg-orange-400"
                              : "bg-zinc-200 dark:bg-zinc-700"
                          )}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      Step {currentStep + 1} of {onboardingSteps.length}
                    </div>
                  </div>

                  {/* Current step content */}
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/30">
                      {onboardingSteps[currentStep].icon}
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {onboardingSteps[currentStep].title}
                    </h2>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      {onboardingSteps[currentStep].description}
                    </p>
                  </motion.div>

                  {/* Action buttons */}
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                      disabled={currentStep === 0}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={async () => {
                        if (currentStep === onboardingSteps.length - 1) {
                          await handleCompleteOnboarding()
                        } else {
                          await handleStepAction()
                          setCurrentStep((prev) => prev + 1)
                        }
                      }}
                    >
                      {currentStep === onboardingSteps.length - 1 ? (
                        "Get Started"
                      ) : (
                        <>
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Quick tips */}
                  <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Quick Tips
                    </h3>
                    <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Complete your profile to get personalized recommendations
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        Set aside 15 minutes daily for your journey
                      </li>
                      <li className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-blue-500" />
                        Enable notifications to stay updated
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedTransition>
      </div>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-amber-900/30" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-orange-900/30" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-red-900/30" />
      </div>
    </div>
  )
}
