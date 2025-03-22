import { PathwayInfo } from "@/types/quiz"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, TrendingUp, Brain, Infinity } from "lucide-react"

interface PathwayRecommendationProps {
  pathway: PathwayInfo
  onSelect: () => void
  className?: string
}

const pathwayIcons = {
  ascender: TrendingUp,
  neothinker: Brain,
  immortal: Infinity,
}

export function PathwayRecommendation({
  pathway,
  onSelect,
  className,
}: PathwayRecommendationProps) {
  const Icon = pathwayIcons[pathway.id as keyof typeof pathwayIcons]

  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-card p-6 shadow-lg",
        className
      )}
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold tracking-tight">
            {pathway.title}
          </h3>
          <p className="text-muted-foreground">{pathway.description}</p>
        </div>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <h4 className="font-medium">Benefits</h4>
          <ul className="space-y-2">
            {pathway.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Features</h4>
          <ul className="space-y-2">
            {pathway.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {pathway.requirements && (
        <div className="mb-6">
          <h4 className="mb-2 font-medium">Requirements</h4>
          <ul className="space-y-2">
            {pathway.requirements.map((requirement) => (
              <li key={requirement} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button onClick={onSelect} className="w-full">
        Select {pathway.title} Pathway
      </Button>
    </div>
  )
} 