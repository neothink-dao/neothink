"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Rocket, Brain, Zap } from "lucide-react"

interface PathwayOption {
  id: "ascender" | "neothinker" | "immortal"
  title: string
  subtitle: string
  description: string
  icon: any
  color: string
  features: string[]
  community: string
  popular?: boolean
}

interface PathwaySelectionProps {
  onSelect: (pathway: "ascender" | "neothinker" | "immortal") => void
  selectedPathway?: "ascender" | "neothinker" | "immortal"
  error?: string
}

const pathways: PathwayOption[] = [
  {
    id: "ascender",
    title: "Ascender",
    subtitle: "Supercharged Creator",
    description: "Unlock your full creative potential and master the art of innovation",
    icon: Rocket,
    color: "from-blue-500 to-indigo-500",
    features: [
      "Breakthrough idea development",
      "Creative process optimization",
      "Portfolio building",
      "Innovation workshops",
      "Creator community access"
    ],
    community: "Join a network of visionary creators and innovators"
  },
  {
    id: "neothinker",
    title: "Neothinker",
    subtitle: "Supercharged Thinker",
    description: "Develop integrated thinking and solve complex problems",
    icon: Brain,
    color: "from-amber-500 to-orange-500",
    features: [
      "Advanced thinking frameworks",
      "Knowledge integration",
      "Problem-solving tools",
      "Research methodologies",
      "Thinker network access"
    ],
    community: "Connect with deep thinkers and knowledge seekers",
    popular: true
  },
  {
    id: "immortal",
    title: "Immortal",
    subtitle: "Supercharged Leader",
    description: "Optimize your longevity and create lasting impact",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    features: [
      "Longevity optimization",
      "Impact strategies",
      "Wealth building",
      "Leadership development",
      "Leader network access"
    ],
    community: "Network with visionary leaders and changemakers"
  }
]

export function PathwaySelection({ onSelect, selectedPathway, error }: PathwaySelectionProps) {
  const [hoveredPathway, setHoveredPathway] = useState<PathwayOption["id"] | null>(null)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Choose Your Path to Greatness
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Select the pathway that best aligns with your goals and aspirations
        </p>
      </div>

      <div className="grid gap-4">
        {pathways.map((pathway) => {
          const Icon = pathway.icon
          const isSelected = selectedPathway === pathway.id
          const isHovered = hoveredPathway === pathway.id

          return (
            <button
              key={pathway.id}
              type="button"
              onClick={() => onSelect(pathway.id)}
              onMouseEnter={() => setHoveredPathway(pathway.id)}
              onMouseLeave={() => setHoveredPathway(null)}
              className={`relative flex w-full flex-col rounded-lg border p-6 transition-all ${
                isSelected
                  ? "border-amber-500 ring-2 ring-amber-500"
                  : "border-zinc-200 hover:border-amber-200 hover:shadow-md dark:border-zinc-800 dark:hover:border-amber-800"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg bg-gradient-to-r ${pathway.color} p-2`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                        {pathway.title}
                      </h4>
                      {pathway.popular && (
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {pathway.subtitle}
                    </p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 transition-colors ${
                  isSelected
                    ? "border-amber-500 bg-amber-500"
                    : "border-zinc-300 dark:border-zinc-600"
                }`}>
                  {isSelected && (
                    <svg
                      className="h-full w-full text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                {pathway.description}
              </p>

              <div className="mt-4 space-y-2">
                <h5 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Key Features:
                </h5>
                <ul className="space-y-1">
                  {pathway.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <svg
                        className="h-4 w-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-md bg-zinc-50 p-3 text-sm text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400">
                {pathway.community}
              </div>

              {(isSelected || isHovered) && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/5 to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/10" />
              )}
            </button>
          )
        })}
      </div>

      {selectedPathway && (
        <Button
          onClick={() => onSelect(selectedPathway)}
          className="w-full"
        >
          Continue with {pathways.find(p => p.id === selectedPathway)?.title}
        </Button>
      )}
    </div>
  )
} 