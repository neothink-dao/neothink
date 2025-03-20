"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

export const dynamic = 'force-dynamic'

interface Question {
  id: number
  text: string
  options: {
    text: string
    ascender: number
    neothinker: number
    immortal: number
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is your primary goal in life?",
    options: [
      { text: "Building wealth and financial freedom", ascender: 3, neothinker: 1, immortal: 1 },
      { text: "Finding happiness and personal growth", ascender: 1, neothinker: 3, immortal: 1 },
      { text: "Achieving longevity and health", ascender: 1, neothinker: 1, immortal: 3 },
      { text: "Creating positive societal impact", ascender: 2, neothinker: 2, immortal: 2 }
    ]
  },
  {
    id: 2,
    text: "How do you prefer to learn and grow?",
    options: [
      { text: "Through practical business experience", ascender: 3, neothinker: 1, immortal: 1 },
      { text: "Through personal development and reflection", ascender: 1, neothinker: 3, immortal: 1 },
      { text: "Through scientific research and innovation", ascender: 1, neothinker: 1, immortal: 3 },
      { text: "Through a combination of all approaches", ascender: 2, neothinker: 2, immortal: 2 }
    ]
  },
  {
    id: 3,
    text: "What type of community do you value most?",
    options: [
      { text: "Business and entrepreneurial network", ascender: 3, neothinker: 1, immortal: 1 },
      { text: "Personal growth and support group", ascender: 1, neothinker: 3, immortal: 1 },
      { text: "Scientific and research community", ascender: 1, neothinker: 1, immortal: 3 },
      { text: "Diverse and inclusive community", ascender: 2, neothinker: 2, immortal: 2 }
    ]
  },
  {
    id: 4,
    text: "What drives your decision-making?",
    options: [
      { text: "Market opportunities and ROI", ascender: 3, neothinker: 1, immortal: 1 },
      { text: "Personal values and fulfillment", ascender: 1, neothinker: 3, immortal: 1 },
      { text: "Scientific evidence and research", ascender: 1, neothinker: 1, immortal: 3 },
      { text: "Balance of multiple factors", ascender: 2, neothinker: 2, immortal: 2 }
    ]
  },
  {
    id: 5,
    text: "What legacy do you want to leave?",
    options: [
      { text: "Business empire and wealth", ascender: 3, neothinker: 1, immortal: 1 },
      { text: "Personal transformation and wisdom", ascender: 1, neothinker: 3, immortal: 1 },
      { text: "Scientific breakthroughs and longevity", ascender: 1, neothinker: 1, immortal: 3 },
      { text: "Positive impact on society", ascender: 2, neothinker: 2, immortal: 2 }
    ]
  }
]

export default function DiscoverPage() {
  const router = useRouter()
  const { user, supabase } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ ascender: 0, neothinker: 0, immortal: 0 })
  const [showResults, setShowResults] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    const option = questions[currentQuestion].options[optionIndex]
    
    setScores(prev => ({
      ascender: prev.ascender + option.ascender,
      neothinker: prev.neothinker + option.neothinker,
      immortal: prev.immortal + option.immortal
    }))

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedOption(null)
      } else {
        setShowResults(true)
      }
    }, 1000)
  }

  const getRecommendedPath = () => {
    const maxScore = Math.max(scores.ascender, scores.neothinker, scores.immortal)
    if (maxScore === scores.ascender) return "ascender"
    if (maxScore === scores.neothinker) return "neothinker"
    return "immortal"
  }

  const handleUpdatePathway = async () => {
    if (!user) return
    
    try {
      setIsUpdating(true)
      const pathway = getRecommendedPath()
      
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ 
          pathway,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id)

      if (updateError) throw updateError

      // Redirect to the pathway page
      router.push(`/pathways/${pathway}`)
    } catch (error) {
      console.error("Error updating pathway:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Growth Compass
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Discover your optimal path to transformation through this personalized assessment.
            </p>
          </div>

          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Question {currentQuestion + 1} of {questions.length}</span>
                <span className="text-zinc-600 dark:text-zinc-400">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {questions[currentQuestion].text}
                  </h2>

                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        disabled={selectedOption !== null}
                        className={`w-full p-4 rounded-lg border text-left transition-all ${
                          selectedOption === null
                            ? "border-zinc-200 hover:border-orange-500 hover:bg-orange-50 dark:border-zinc-800 dark:hover:border-orange-500 dark:hover:bg-orange-950/20"
                            : selectedOption === index
                            ? "border-orange-500 bg-orange-50 dark:border-orange-500 dark:bg-orange-950/20"
                            : "border-zinc-200 dark:border-zinc-800 opacity-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-900 dark:text-zinc-100">{option.text}</span>
                          {selectedOption === index && (
                            <CheckCircle2 className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8 text-center"
                >
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Your Recommended Path
                  </h2>
                  
                  <div className="p-6 rounded-lg border border-orange-500 bg-orange-50 dark:border-orange-500 dark:bg-orange-950/20">
                    <h3 className="text-xl font-semibold text-orange-500 mb-2">
                      {getRecommendedPath().charAt(0).toUpperCase() + getRecommendedPath().slice(1)}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Based on your responses, this pathway aligns best with your goals and values.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <div className="text-2xl font-bold text-orange-500">{scores.ascender}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">Ascender Score</div>
                    </div>
                    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <div className="text-2xl font-bold text-orange-500">{scores.neothinker}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">Neothinker Score</div>
                    </div>
                    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <div className="text-2xl font-bold text-orange-500">{scores.immortal}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">Immortal Score</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {user ? (
                      // For authenticated users
                      <>
                        <Button 
                          size="lg" 
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={handleUpdatePathway}
                          disabled={isUpdating}
                        >
                          {isUpdating ? "Updating..." : "Choose This Path"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full"
                          onClick={() => {
                            setCurrentQuestion(0)
                            setScores({ ascender: 0, neothinker: 0, immortal: 0 })
                            setShowResults(false)
                            setSelectedOption(null)
                          }}
                        >
                          Take the Assessment Again
                        </Button>
                      </>
                    ) : (
                      // For unauthenticated users
                      <>
                        <Link 
                          href={`/auth/sign-up?pathway=${getRecommendedPath()}`}
                          className="block"
                        >
                          <Button 
                            size="lg" 
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            Start Your Journey
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/pathways/${getRecommendedPath()}`}>
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full"
                          >
                            Learn More About This Path
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="lg"
                          className="w-full"
                          onClick={() => {
                            setCurrentQuestion(0)
                            setScores({ ascender: 0, neothinker: 0, immortal: 0 })
                            setShowResults(false)
                            setSelectedOption(null)
                          }}
                        >
                          Take the Assessment Again
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
} 