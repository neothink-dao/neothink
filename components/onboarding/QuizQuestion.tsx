import { QuizStep } from "@/types/quiz"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface QuizQuestionProps {
  step: QuizStep
  value: any
  onChange: (value: any) => void
  className?: string
}

export function QuizQuestion({
  step,
  value,
  onChange,
  className,
}: QuizQuestionProps) {
  if (!step.options) return null

  if (step.type === "single") {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{step.title}</h2>
          <p className="text-muted-foreground">{step.description}</p>
        </div>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="grid gap-4"
        >
          {step.options.map((option) => (
            <div key={option.value} className="relative">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={option.value}
                className="flex cursor-pointer flex-col space-y-2 rounded-lg border border-border/50 bg-card p-4 hover:bg-accent peer-checked:border-primary peer-checked:bg-accent"
              >
                <span className="font-medium">{option.label}</span>
                {option.description && (
                  <span className="text-sm text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    )
  }

  if (step.type === "multiple") {
    const selected = value || []
    return (
      <div className={cn("space-y-6", className)}>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{step.title}</h2>
          <p className="text-muted-foreground">{step.description}</p>
        </div>
        <div className="grid gap-4">
          {step.options.map((option) => (
            <div key={option.value} className="relative">
              <Checkbox
                id={option.value}
                checked={selected.includes(option.value)}
                onCheckedChange={(checked) => {
                  const newValue = checked
                    ? [...selected, option.value]
                    : selected.filter((v: string) => v !== option.value)
                  onChange(newValue)
                }}
                className="peer sr-only"
              />
              <Label
                htmlFor={option.value}
                className="flex cursor-pointer flex-col space-y-2 rounded-lg border border-border/50 bg-card p-4 hover:bg-accent peer-checked:border-primary peer-checked:bg-accent"
              >
                <span className="font-medium">{option.label}</span>
                {option.description && (
                  <span className="text-sm text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </Label>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
} 