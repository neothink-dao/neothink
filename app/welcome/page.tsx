"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/auth-context"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createBrowserClient } from "@supabase/ssr"

const steps = [
  {
    title: "Welcome",
    description: "Let's get you started on your journey to transformation.",
  },
  {
    title: "Choose Your Path",
    description: "Select the pathway that resonates most with your goals.",
  },
  {
    title: "Complete Your Profile",
    description: "Tell us a bit about yourself so we can personalize your experience.",
  },
]

const pathways = [
  {
    id: "ascender",
    title: "Ascender",
    description: "Focus on personal growth, wealth creation, and business mastery.",
  },
  {
    id: "neothinker",
    title: "Neothinker",
    description: "Develop advanced cognitive frameworks and deep understanding.",
  },
  {
    id: "immortal",
    title: "Immortal",
    description: "Push boundaries in longevity, innovation, and lasting impact.",
  },
]

export default function WelcomePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [pathway, setPathway] = useState<"ascender" | "neothinker" | "immortal">()
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in")
      return
    }

    const loadUserPathway = async () => {
      try {
        const { data, error } = await supabase
          .from("user_pathways")
          .select("pathway")
          .eq("user_id", user.id)
          .single()

        if (error) throw error

        if (data?.pathway) {
          setPathway(data.pathway as "ascender" | "neothinker" | "immortal")
          router.push(`/pathways/${data.pathway}`)
        }
      } catch (err) {
        console.error("Error loading user pathway:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserPathway()
  }, [user, router])

  const handlePathwaySelect = async (selectedPathway: "ascender" | "neothinker" | "immortal") => {
    if (!user) return

    try {
      setIsLoading(true)
      setError(null)

      const { error } = await supabase
        .from("user_pathways")
        .upsert({
          user_id: user.id,
          pathway: selectedPathway,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      router.push(`/pathways/${selectedPathway}`)
    } catch (err) {
      console.error("Error saving pathway:", err)
      setError("Failed to save your pathway preference. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 ${
                  index !== steps.length - 1
                    ? "border-t-2 border-zinc-200 dark:border-zinc-800"
                    : ""
                } relative`}
              >
                <div
                  className={`w-8 h-8 rounded-full ${
                    index <= currentStep
                      ? "bg-primary text-white"
                      : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  } flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {steps[currentStep].description}
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="error" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Step Content */}
        <div className="grid gap-6 md:grid-cols-3">
          {pathways.map((p) => (
            <Card key={p.id} className="relative">
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handlePathwaySelect(p.id as "ascender" | "neothinker" | "immortal")}
                  disabled={isLoading}
                  className="w-full"
                >
                  Choose Path
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  )
}
