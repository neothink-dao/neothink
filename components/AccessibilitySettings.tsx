import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Settings2 } from 'lucide-react'

export function AccessibilitySettings() {
  const {
    reduceMotion,
    toggleReduceMotion,
    highContrast,
    toggleHighContrast,
    fontSize,
    setFontSize,
  } = useAccessibility()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-20 right-4 z-50 rounded-full bg-zinc-100 p-2 shadow-lg hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 md:bottom-4"
          aria-label="Accessibility settings"
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
          <DialogDescription>
            Customize your experience to make the site more accessible for your needs.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="reduce-motion"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                Reduce motion
              </label>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Minimize animations and transitions
              </p>
            </div>
            <Switch
              id="reduce-motion"
              checked={reduceMotion}
              onCheckedChange={toggleReduceMotion}
              aria-label="Toggle reduced motion"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="high-contrast"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                High contrast
              </label>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Increase contrast for better readability
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={toggleHighContrast}
              aria-label="Toggle high contrast"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="font-size"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Font size
            </label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger id="font-size" aria-label="Select font size">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="larger">Larger</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 