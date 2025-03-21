"use client"

import { useState } from "react"
import { Rocket, Brain, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface PathwayOption {
  id: "ascender" | "neothinker" | "immortal"
  title: string
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
    description: "Enhance your wealth creation with:",
    icon: Rocket,
    color: "text-orange-500 dark:text-orange-400",
    gradient: "from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500",
    features: ["Ascension", "FLOW", "Ascenders"],
    cta: "Elevate your wealth creation"
  },
  {
    id: "neothinker",
    title: "Neothinker",
    description: "Enhance your inner power with:",
    icon: Brain,
    color: "text-amber-500 dark:text-amber-400",
    gradient: "from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500",
    features: ["Neothink", "Mark Hamilton", "Neothinkers"],
    cta: "Unlock deeper insights"
  },
  {
    id: "immortal",
    title: "Immortal",
    description: "Enhance your wellbeing with:",
    icon: Zap,
    color: "text-red-500 dark:text-red-400",
    gradient: "from-red-500 to-red-600 dark:from-red-400 dark:to-red-500",
    features: ["Immortalis", "Project Life", "Immortals"],
    cta: "Maximize your vitality"
  }
]

export function PathwaySelection({ onSelect, selectedPathway, error }: PathwaySelectionProps) {
  const [hoveredPathway, setHoveredPathway] = useState<PathwayOption["id"] | null>(null)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2.5">
        <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Choose Your Focus
        </h3>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
          Select the area where you want to accelerate your growth
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
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
                "group relative flex w-full flex-col overflow-hidden rounded-2xl border bg-white/90 p-5 backdrop-blur-sm transition-all duration-300 dark:bg-zinc-900/90",
                isSelected
                  ? "ring-2 ring-offset-2 dark:ring-offset-zinc-950"
                  : "hover:border-zinc-300 dark:hover:border-zinc-700",
                isSelected && pathway.id === "ascender" && "ring-orange-500 border-orange-500/50 dark:ring-orange-400 dark:border-orange-400/50",
                isSelected && pathway.id === "neothinker" && "ring-amber-500 border-amber-500/50 dark:ring-amber-400 dark:border-amber-400/50",
                isSelected && pathway.id === "immortal" && "ring-red-500 border-red-500/50 dark:ring-red-400 dark:border-red-400/50",
                !isSelected && "border-zinc-200/50 dark:border-zinc-800/50",
                (isSelected || isHovered) && "scale-[1.01]"
              )}
            >
              <div className="relative flex flex-col space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn(
                      "rounded-xl p-2 shadow-lg transition-transform duration-300 bg-gradient-to-r shrink-0",
                      pathway.gradient,
                      (isSelected || isHovered) && "scale-105"
                    )}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                      {pathway.title}
                    </h4>
                  </div>

                  {/* Selection indicator */}
                  <div className={cn(
                    "relative h-4 w-4 shrink-0 rounded-full border-2 transition-all duration-300",
                    isSelected && pathway.id === "ascender" && "border-orange-500 bg-orange-500 scale-105 dark:border-orange-400 dark:bg-orange-400",
                    isSelected && pathway.id === "neothinker" && "border-amber-500 bg-amber-500 scale-105 dark:border-amber-400 dark:bg-amber-400",
                    isSelected && pathway.id === "immortal" && "border-red-500 bg-red-500 scale-105 dark:border-red-400 dark:bg-red-400",
                    !isSelected && "border-zinc-300 dark:border-zinc-600"
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
                          strokeWidth={3}
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
                        className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                      >
                        <div className={cn(
                          "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full transition-transform duration-300 bg-gradient-to-r",
                          pathway.gradient,
                          (isSelected || isHovered) && "scale-105"
                        )}>
                          <svg
                            className="h-2 w-2 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-0.5">
                    <p className={cn(
                      "inline-flex items-center text-sm font-medium transition-all duration-300 gap-1.5",
                      pathway.color,
                      (isSelected || isHovered) ? "translate-x-0.5" : ""
                    )}>
                      {pathway.cta}
                      <svg
                        className={cn(
                          "h-3 w-3 transition-transform duration-300",
                          (isSelected || isHovered) && "translate-x-0.5"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50/50 p-4 text-sm text-red-600 backdrop-blur-sm dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  )
} 