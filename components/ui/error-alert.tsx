import { AlertCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AppError } from "@/lib/error-handling"

interface ErrorAlertProps {
  error: AppError | null
  onDismiss: () => void
}

export function ErrorAlert({ error, onDismiss }: ErrorAlertProps) {
  if (!error) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 mb-4"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-medium">{error.message}</h3>
            {error.code && (
              <p className="text-sm opacity-80 mt-1">
                Error code: {error.code}
              </p>
            )}
          </div>
          <button
            onClick={onDismiss}
            className="text-destructive/60 hover:text-destructive transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 