"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { QuizProgress } from "@/components/onboarding/QuizProgress"
import { QuizQuestion } from "@/components/onboarding/QuizQuestion"
import { PathwayRecommendation } from "@/components/onboarding/PathwayRecommendation"
import { quizSteps, pathways } from "@/data/quiz"
import type { QuizState, Pathway } from "@/types/quiz"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function QuizPage() {
  const router = useRouter()
  const [state, setState] = useState<QuizState>({
    currentStep: 1,
    totalSteps: quizSteps.length + 1, // +1 for pathway selection
    answers: {},
    preferences: {
      interests: [],
      goals: [],
      learningStyle: "visual",
      timeCommitment: "medium",
      experienceLevel: "beginner",
    },
    progress: 0,
  })

  const currentStep = quizSteps[state.currentStep - 1]
  const isLastStep = state.currentStep === quizSteps.length
  const showPathways = state.currentStep > quizSteps.length

  const calculateRecommendedPathway = (): Pathway => {
    const scores: Record<Pathway, number> = {
      ascender: 0,
      neothinker: 0,
      immortal: 0,
    }

    // Calculate scores based on answers and weights
    Object.entries(state.answers).forEach(([stepId, answer]) => {
      const step = quizSteps.find((s) => s.id === stepId)
      if (step?.pathwayWeights) {
        Object.entries(step.pathwayWeights).forEach(([pathway, weight]) => {
          const pathwayKey = pathway as Pathway
          if (Array.isArray(answer)) {
            // Multiple choice
            answer.forEach(() => {
              scores[pathwayKey] += weight
            })
          } else {
            // Single choice
            scores[pathwayKey] += weight
          }
        })
      }
    })

    // Return pathway with highest score
    return (Object.entries(scores).reduce((a, b) => 
      scores[a[0] as Pathway] > scores[b[0] as Pathway] ? a : b
    )[0] as Pathway)
  }

  const handleNext = () => {
    if (showPathways) {
      // Complete onboarding
      router.push("/dashboard")
      return
    }

    setState((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
      progress: ((prev.currentStep + 1) / prev.totalSteps) * 100,
      ...(isLastStep && {
        recommendedPathway: calculateRecommendedPathway(),
      }),
    }))
  }

  const handleBack = () => {
    setState((prev) => ({
      ...prev,
      currentStep: prev.currentStep - 1,
      progress: ((prev.currentStep - 1) / prev.totalSteps) * 100,
    }))
  }

  const handleAnswer = (value: any) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentStep.id]: value,
      },
    }))
  }

  const handleSelectPathway = (pathway: Pathway) => {
    // Save pathway selection
    setState((prev) => ({
      ...prev,
      selectedPathway: pathway,
    }))
    // Navigate to dashboard or next step
    router.push("/dashboard")
  }

  return (
    <Container className="py-8">
      <QuizProgress
        currentStep={state.currentStep}
        totalSteps={state.totalSteps}
        className="mb-8"
      />

      {showPathways ? (
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Your Recommended Pathway
            </h1>
            <p className="text-muted-foreground">
              Based on your answers, we recommend the following pathway for your journey
            </p>
          </div>

          {state.recommendedPathway && (
            <PathwayRecommendation
              pathway={pathways.find((p) => p.id === state.recommendedPathway)!}
              onSelect={() => handleSelectPathway(state.recommendedPathway!)}
            />
          )}

          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Other Pathways</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {pathways
                .filter((p) => p.id !== state.recommendedPathway)
                .map((pathway) => (
                  <PathwayRecommendation
                    key={pathway.id}
                    pathway={pathway}
                    onSelect={() => handleSelectPathway(pathway.id)}
                    className="opacity-75 hover:opacity-100"
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <QuizQuestion
          step={currentStep}
          value={state.answers[currentStep.id]}
          onChange={handleAnswer}
        />
      )}

      <div className="mt-8 flex justify-between">
        {state.currentStep > 1 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          className="ml-auto flex items-center gap-2"
          disabled={!state.answers[currentStep?.id]}
        >
          {isLastStep ? "View Results" : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Container>
  )
} 