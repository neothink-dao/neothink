"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PersonalIntroProps {
  onComplete: (data: { story: string; goals: string[] }) => void
}

const commonGoals = [
  "Wealth Creation",
  "Personal Growth",
  "Career Development",
  "Health & Wellness",
  "Relationships",
  "Spiritual Growth",
  "Creative Expression",
  "Social Impact",
]

export function PersonalIntro({ onComplete }: PersonalIntroProps) {
  const [story, setStory] = useState("")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [customGoal, setCustomGoal] = useState("")

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    )
  }

  const addCustomGoal = () => {
    if (customGoal.trim() && !selectedGoals.includes(customGoal.trim())) {
      setSelectedGoals((prev) => [...prev, customGoal.trim()])
      setCustomGoal("")
    }
  }

  const handleSubmit = () => {
    if (story.trim() && selectedGoals.length > 0) {
      onComplete({
        story: story.trim(),
        goals: selectedGoals,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Share Your Story
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Help us understand your journey and aspirations
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="story">Your Story</Label>
          <Textarea
            id="story"
            placeholder="Tell us about your background, experiences, and what drives you..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Your Goals</Label>
          <div className="flex flex-wrap gap-2">
            {commonGoals.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => toggleGoal(goal)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedGoals.includes(goal)
                    ? "bg-amber-500 text-white"
                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                }`}
              >
                {goal}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="Add a custom goal..."
              className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />
            <Button
              type="button"
              variant="outline"
              onClick={addCustomGoal}
              disabled={!customGoal.trim()}
            >
              Add
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
          <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Community Preview
          </h4>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            You'll be able to connect with {selectedGoals.length > 0 ? "like-minded individuals" : "others"} who share your goals and aspirations.
          </p>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full"
        disabled={!story.trim() || selectedGoals.length === 0}
      >
        Continue
      </Button>
    </div>
  )
} 