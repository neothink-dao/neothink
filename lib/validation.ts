export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    errors.push("Please enter a valid email address")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function formatValidationErrors(errors: string[]): string {
  if (errors.length === 0) return ""
  if (errors.length === 1) return errors[0]
  
  return errors.map((error, index) => {
    if (index === errors.length - 1) {
      return `and ${error.toLowerCase()}`
    }
    return error.toLowerCase()
  }).join(", ")
} 