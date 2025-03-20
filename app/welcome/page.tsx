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
  AlertCircle,
  Target,
  Compass,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  action?: () => Promise<void> | void
  pathwayContent?: {
    ascender?: { title: string; description: string }
    neothinker?: { title: string; description: string }
    immortal?: { title: string; description: string }
  }
}

const pathwayColors = {
  ascender: "orange",
  neothinker: "amber",
  immortal: "red"
} as const

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
          router.push("/auth/sign-in")
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
        router.push("/auth/sign-in")
        return
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("id", user.id)

      if (updateError) throw updateError

      toast({
        title: `Welcome to the ${pathway?.charAt(0).toUpperCase()}${pathway?.slice(1)} Path!`,
        description: "Your journey to extraordinary begins now.",
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
      title: "Welcome to Your Journey",
      description: "Let's get you started on your path to transformation.",
      icon: <Sparkles className="h-6 w-6" />,
      pathwayContent: {
        ascender: {
          title: "Welcome, Future Value Creator",
          description: "Your journey to extraordinary wealth and business success begins here."
        },
        neothinker: {
          title: "Welcome, Future Integrated Thinker",
          description: "Your journey to extraordinary happiness and personal growth begins here."
        },
        immortal: {
          title: "Welcome, Future Self-Leader",
          description: "Your journey to extraordinary health and longevity begins here."
        }
      }
    },
    {
      id: "goals",
      title: "Set Your Goals",
      description: "Define what success means to you and track your progress.",
      icon: <Target className="h-6 w-6" />,
      action: () => router.push("/goals"),
      pathwayContent: {
        ascender: {
          title: "Business Goals",
          description: "Set your wealth creation and business growth objectives."
        },
        neothinker: {
          title: "Personal Goals",
          description: "Define your happiness and personal development milestones."
        },
        immortal: {
          title: "Health Goals",
          description: "Establish your health optimization and longevity targets."
        }
      }
    },
    {
      id: "resources",
      title: "Access Your Resources",
      description: "Explore tools and content tailored to your journey.",
      icon: <BookOpen className="h-6 w-6" />,
      action: () => router.push("/resources"),
      pathwayContent: {
        ascender: {
          title: "Business Resources",
          description: "Access the Ascension Platform, FLOW Training, and business tools."
        },
        neothinker: {
          title: "Growth Resources",
          description: "Access Neothink Courses, Prime Mentorship, and personal development tools."
        },
        immortal: {
          title: "Health Resources",
          description: "Access the Immortalis Platform, Project Life, and health optimization tools."
        }
      }
    },
    {
      id: "community",
      title: "Join Your Community",
      description: "Connect with others on the same path.",
      icon: <Users className="h-6 w-6" />,
      action: () => router.push("/community"),
      pathwayContent: {
        ascender: {
          title: "Ascenders Community",
          description: "Network with successful entrepreneurs and value creators."
        },
        neothinker: {
          title: "Neothinkers Community",
          description: "Connect with integrated thinkers and personal growth enthusiasts."
        },
        immortal: {
          title: "Immortals Community",
          description: "Collaborate with health optimizers and longevity researchers."
        }
      }
    },
    {
      id: "settings",
      title: "Personalize Your Experience",
      description: "Set up your preferences and notifications.",
      icon: <Settings className="h-6 w-6" />,
      action: handleEnableNotifications,
      pathwayContent: {
        ascender: {
          title: "Business Preferences",
          description: "Set up your business alerts and networking preferences."
        },
        neothinker: {
          title: "Growth Preferences",
          description: "Set up your learning style and mentorship preferences."
        },
        immortal: {
          title: "Health Preferences",
          description: "Set up your health tracking and research preferences."
        }
      }
    }
  ]

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent dark:border-orange-400 mx-auto" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading your journey...</p>
        </div>
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
          <Button 
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const currentStepData = onboardingSteps[currentStep]
  const pathwaySpecificContent = pathway && currentStepData.pathwayContent?.[pathway]
  const pathwayColor = pathway ? pathwayColors[pathway] : "orange"

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
                            "h-2 w-8 rounded-full transition-colors",
                            index <= currentStep
                              ? `bg-${pathwayColor}-500 dark:bg-${pathwayColor}-400`
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
                    <div className={`rounded-full bg-${pathwayColor}-100 p-3 dark:bg-${pathwayColor}-900/30`}>
                      {currentStepData.icon}
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {pathwaySpecificContent?.title || currentStepData.title}
                    </h2>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      {pathwaySpecificContent?.description || currentStepData.description}
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
                        await handleStepAction()
                        if (currentStep === onboardingSteps.length - 1) {
                          await handleCompleteOnboarding()
                        } else {
                          setCurrentStep((prev) => prev + 1)
                        }
                      }}
                      className={`bg-${pathwayColor}-500 hover:bg-${pathwayColor}-600 text-white`}
                    >
                      {currentStep === onboardingSteps.length - 1 ? (
                        <>
                          Begin Your Journey
                          <Compass className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Continue
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
                        <CheckCircle2 className={`h-4 w-4 text-${pathwayColor}-500`} />
                        {pathway === "ascender" && "Set clear business goals and milestones"}
                        {pathway === "neothinker" && "Define your personal growth objectives"}
                        {pathway === "immortal" && "Establish your health optimization targets"}
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className={`h-4 w-4 text-${pathwayColor}-500`} />
                        {pathway === "ascender" && "Dedicate time for business development"}
                        {pathway === "neothinker" && "Schedule daily reflection time"}
                        {pathway === "immortal" && "Plan your health optimization routine"}
                      </li>
                      <li className="flex items-center gap-2">
                        <Bell className={`h-4 w-4 text-${pathwayColor}-500`} />
                        {pathway === "ascender" && "Stay updated on business opportunities"}
                        {pathway === "neothinker" && "Get notified about growth insights"}
                        {pathway === "immortal" && "Track your health progress"}
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
        <div className={`absolute -top-1/2 -right-1/4 w-96 h-96 bg-${pathwayColor}-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-${pathwayColor}-900/30`} />
        <div className={`absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-${pathwayColor}-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-${pathwayColor}-900/30`} />
        <div className={`absolute top-1/2 left-1/2 w-96 h-96 bg-${pathwayColor}-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-${pathwayColor}-900/30`} />
      </div>
    </div>
  )
}
