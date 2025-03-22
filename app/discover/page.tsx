"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/auth-context"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@supabase/ssr"

const questions = [
  {
    question: "How do you prefer to solve problems?",
    options: [
      { text: "Through systematic analysis and pattern recognition", pathway: "neothinker" },
      { text: "By taking action and learning from experience", pathway: "ascender" },
      { text: "By thinking outside the box and finding novel solutions", pathway: "immortal" },
    ],
  },
  {
    question: "What motivates you the most?",
    options: [
      { text: "Understanding complex systems and ideas", pathway: "neothinker" },
      { text: "Personal growth and achievement", pathway: "ascender" },
      { text: "Creating something new and impactful", pathway: "immortal" },
    ],
  },
  {
    question: "How do you prefer to learn?",
    options: [
      { text: "Through deep study and analysis", pathway: "neothinker" },
      { text: "Through practical experience and feedback", pathway: "ascender" },
      { text: "Through experimentation and innovation", pathway: "immortal" },
    ],
  },
  {
    question: "What's your ideal way to spend time?",
    options: [
      { text: "Exploring new concepts and theories", pathway: "neothinker" },
      { text: "Working on self-improvement", pathway: "ascender" },
      { text: "Creating and innovating", pathway: "immortal" },
    ],
  },
  {
    question: "What's your approach to challenges?",
    options: [
      { text: "Analyze and understand the root cause", pathway: "neothinker" },
      { text: "Take immediate action and adapt", pathway: "ascender" },
      { text: "Find innovative ways to overcome them", pathway: "immortal" },
    ],
  },
]

const pathwayDescriptions = {
  neothinker: {
    title: "Neothinker",
    description: "You excel at pattern recognition and systematic thinking. The Neothinker pathway will help you develop advanced cognitive frameworks and deep understanding.",
  },
  ascender: {
    title: "Ascender",
    description: "You thrive on personal growth and practical achievement. The Ascender pathway will accelerate your journey to peak performance and self-mastery.",
  },
  immortal: {
    title: "Immortal",
    description: "You're driven by innovation and creative problem-solving. The Immortal pathway will help you push boundaries and create lasting impact.",
  },
}

export default function DiscoverPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ ascender: 0, neothinker: 0, immortal: 0 })
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleAnswer = async (pathway: string) => {
    const newScores = {
      ...scores,
      [pathway]: scores[pathway as keyof typeof scores] + 1,
    }
    setScores(newScores)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)

      if (user) {
        try {
          const recommendedPathway = Object.entries(newScores).reduce((a, b) => 
            b[1] > a[1] ? b : a
          )[0]

          const { error } = await supabase
            .from("user_pathways")
            .upsert({
              user_id: user.id,
              pathway: recommendedPathway,
              quiz_scores: newScores,
              updated_at: new Date().toISOString(),
            })

          if (error) throw error
        } catch (err) {
          console.error("Error saving pathway:", err)
          setError("Failed to save your pathway preference. Please try again.")
        }
      }
    }
  }

  const getRecommendedPathway = () => {
    return Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0]
  }

  if (!showResults) {
    return (
      <Container className="flex items-center justify-center min-h-screen py-12">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Discover Your Pathway</CardTitle>
            <CardDescription>
              Answer these questions to find the learning pathway that best matches your style and goals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {questions[currentQuestion].question}
              </h2>
              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option.pathway)}
                    variant="outline"
                    className="justify-start text-left h-auto py-4 px-6"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <div className="flex gap-1">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-4 rounded-full ${
                      index <= currentQuestion
                        ? "bg-primary"
                        : "bg-zinc-200 dark:bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    )
  }

  const recommendedPathway = getRecommendedPathway()
  const pathwayInfo = pathwayDescriptions[recommendedPathway as keyof typeof pathwayDescriptions]

  return (
    <Container className="flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Your Recommended Pathway</CardTitle>
          <CardDescription>
            Based on your answers, we think this pathway will best support your growth journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{pathwayInfo.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {pathwayInfo.description}
            </p>
          </div>

          <div className="grid gap-4">
            <Button onClick={() => {
              if (!user) {
                localStorage.setItem('recommendedPathway', recommendedPathway);
                router.push(`/auth/sign-in?redirectedFrom=/pathways/${recommendedPathway}`);
              } else {
                router.push(`/pathways/${recommendedPathway}`);
              }
            }}>
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentQuestion(0)
                setScores({ ascender: 0, neothinker: 0, immortal: 0 })
                setShowResults(false)
              }}
            >
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
} 