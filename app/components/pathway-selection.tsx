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
    tagline: "Amplify Your Prosperity",
    description: "Enhance your wealth creation with:",
    icon: Rocket,
    color: "text-orange-500",
    gradient: "from-orange-500 to-amber-500",
    features: [
      "Ascension",
      "FLOW",
      "Ascenders"
    ],
    cta: "Elevate your wealth creation"
  },
  {
    id: "neothinker",
    title: "Neothinker",
    subtitle: "Supercharged Thinker",
    tagline: "Amplify Your Potential",
    description: "Enhance your inner power with:",
    icon: Brain,
    color: "text-amber-500",
    gradient: "from-amber-500 to-yellow-500",
    features: [
      "Neothink",
      "Mark Hamilton",
      "Neothinkers"
    ],
    cta: "Unlock deeper insights"
  },
  {
    id: "immortal",
    title: "Immortal",
    subtitle: "Supercharged Leader",
    tagline: "Amplify Your Vitality",
    description: "Enhance your wellbeing with:",
    icon: Zap,
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Immortalis",
      "Project Life",
      "Immortals"
    ],
    cta: "Maximize your vitality"
  }
]

export function PathwaySelection({ onSelect, selectedPathway, error }: PathwaySelectionProps) {
  const [hoveredPathway, setHoveredPathway] = useState<PathwayOption["id"] | null>(null)

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Choose Your Focus
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Select the area where you want to accelerate your growth
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                "group relative flex w-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300",
                isSelected
                  ? "border-transparent ring-2 ring-offset-2 dark:ring-offset-black"
                  : "border-zinc-200/50 hover:border-transparent hover:shadow-lg dark:border-zinc-800/50",
                isSelected && `ring-${pathway.color}`,
                (isSelected || isHovered) && "scale-[1.02]"
              )}
            >
              {/* Gradient background */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
                pathway.gradient,
                (isSelected || isHovered) && "opacity-[0.03]"
              )} />

              <div className="relative flex flex-col space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "rounded-xl p-2.5 bg-gradient-to-br shadow-lg",
                      pathway.gradient
                    )}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                        {pathway.title}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center rounded-full bg-zinc-100/80 px-2 py-0.5 text-xs font-medium text-zinc-800 backdrop-blur-sm dark:bg-zinc-800/80 dark:text-zinc-200">
                          {pathway.subtitle}
                        </span>
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white shadow-sm",
                          `bg-gradient-to-r ${pathway.gradient}`
                        )}>
                          {pathway.tagline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  <div className={cn(
                    "relative h-5 w-5 shrink-0 rounded-full border-2 transition-colors",
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
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {pathway.description}
                  </p>

                  <ul className="space-y-2">
                    {pathway.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                      >
                        <svg
                          className={cn("h-3.5 w-3.5", pathway.color)}
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
                    "text-sm font-medium transition-colors",
                    pathway.color,
                    (isSelected || isHovered) && "text-current"
                  )}>
                    {pathway.cta} →
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/30">
          {error}
        </div>
      )}
    </div>
  )
} 