import { cn } from "@/lib/utils"

interface QuizProgressProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function QuizProgress({
  currentStep,
  totalSteps,
  className,
}: QuizProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-muted-foreground">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
} 