"use client"

import { useState } from "react"
import { Rocket, Brain, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface PathwayOption {
  id: "ascender" | "neothinker" | "immortal"
  title: string
  subtitle: string
  tagline: string
  description: string
  icon: any
  color: string
  features: string[]
  cta: string
  gradient: string
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
    tagline: "Boost Your Prosperity",
    description: "Become your wealthiest with access to:",
    icon: Rocket,
    color: "text-orange-500",
    gradient: "from-orange-500 to-amber-500",
    features: [
      "Ascension",
      "FLOW",
      "Ascenders"
    ],
    cta: "Join now and become wealthier"
  },
  {
    id: "neothinker",
    title: "Neothinker",
    subtitle: "Supercharged Thinker",
    tagline: "Boost Your Happiness",
    description: "Become your happiest with access to:",
    icon: Brain,
    color: "text-amber-500",
    gradient: "from-amber-500 to-yellow-500",
    features: [
      "Neothink",
      "Mark Hamilton",
      "Neothinkers"
    ],
    cta: "Join now and become happier"
  },
  {
    id: "immortal",
    title: "Immortal",
    subtitle: "Supercharged Leader",
    tagline: "Boost Your Longevity",
    description: "Become your healthiest with access to:",
    icon: Zap,
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Immortalis",
      "Project Life",
      "Immortals"
    ],
    cta: "Join now and become healthier"
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

      <div className="grid gap-6 md:grid-cols-3">
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
              className={cn(
                "relative flex w-full flex-col rounded-2xl border p-6 transition-all duration-300",
                isSelected
                  ? "border-transparent ring-2 ring-offset-2 dark:ring-offset-zinc-900"
                  : "border-zinc-200 hover:border-transparent hover:shadow-lg dark:border-zinc-800",
                isSelected && `ring-${pathway.color}`,
                (isSelected || isHovered) && "scale-[1.02]"
              )}
            >
              <div className="flex flex-col space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "rounded-xl p-2.5 bg-gradient-to-br",
                      pathway.gradient
                    )}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {pathway.title}
                      </h4>
                      <div className="flex flex-col gap-1.5 mt-1">
                        <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                          {pathway.subtitle}
                        </span>
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          `bg-${pathway.gradient} text-white`
                        )}>
                          {pathway.tagline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {pathway.description}
                  </p>

                  <ul className="space-y-2">
                    {pathway.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                      >
                        <svg
                          className={cn("h-4 w-4", pathway.color)}
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

                  <p className={cn(
                    "text-sm font-medium",
                    pathway.color
                  )}>
                    {pathway.cta}
                  </p>
                </div>
              </div>

              {/* Selection indicator */}
              <div className={cn(
                "absolute right-4 top-4 h-5 w-5 rounded-full border-2 transition-colors",
                isSelected
                  ? `border-${pathway.color} bg-${pathway.color}`
                  : "border-zinc-300 dark:border-zinc-600"
              )}>
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

              {/* Hover/Selection effect */}
              <div className={cn(
                "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300",
                pathway.gradient,
                (isSelected || isHovered) && "opacity-[0.08]"
              )} />
            </button>
          )
        })}
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/30">
          {error}
        </div>
      )}
    </div>
  )
} 