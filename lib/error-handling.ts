/**
 * Error handling utilities for consistent error management
 */

// Error types for categorization
export enum ErrorType {
  VALIDATION = "VALIDATION_ERROR",
  AUTHENTICATION = "AUTHENTICATION_ERROR",
  AUTHORIZATION = "AUTHORIZATION_ERROR",
  NOT_FOUND = "NOT_FOUND_ERROR",
  RATE_LIMIT = "RATE_LIMIT_ERROR",
  DATABASE = "DATABASE_ERROR",
  EXTERNAL_SERVICE = "EXTERNAL_SERVICE_ERROR",
  INTERNAL = "INTERNAL_ERROR",
}

// Error severity levels for logging
export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

// Interface for structured error information
export interface ErrorInfo {
  type: ErrorType
  message: string
  code?: string
  severity?: ErrorSeverity
  details?: any
}

// Map of public error messages to avoid leaking sensitive information
const PUBLIC_ERROR_MESSAGES: Record<ErrorType, string> = {
  [ErrorType.VALIDATION]: "The provided data is invalid.",
  [ErrorType.AUTHENTICATION]: "Authentication failed.",
  [ErrorType.AUTHORIZATION]: "You don't have permission to perform this action.",
  [ErrorType.NOT_FOUND]: "The requested resource was not found.",
  [ErrorType.RATE_LIMIT]: "Too many requests. Please try again later.",
  [ErrorType.DATABASE]: "A database error occurred.",
  [ErrorType.EXTERNAL_SERVICE]: "An external service error occurred.",
  [ErrorType.INTERNAL]: "An internal server error occurred.",
}

// Define a logger that respects environment
export const logger = {
  error: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(message, ...args)
    } else {
      // In production, could send to a logging service
      console.error(message)
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(message, ...args)
    } else {
      console.warn(message)
    }
  },
  info: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.info(message, ...args)
    }
  },
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, ...args)
    }
  }
}

/**
 * Create a structured error object
 */
export function createError(
  type: ErrorType,
  message: string,
  details?: any,
  code?: string,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
): ErrorInfo {
  return {
    type,
    message,
    code,
    severity,
    details,
  }
}

/**
 * Log an error with appropriate severity
 */
export function logError(error: ErrorInfo): void {
  const { type, message, code, severity, details } = error

  // Create structured log entry
  const logEntry = {
    timestamp: new Date().toISOString(),
    type,
    message,
    code,
    severity,
    details: sanitizeErrorDetails(details),
  }

  // Log based on severity
  switch (severity) {
    case ErrorSeverity.CRITICAL:
      logger.error("CRITICAL ERROR:", JSON.stringify(logEntry))
      // In a production app, you might want to send alerts for critical errors
      break
    case ErrorSeverity.HIGH:
      logger.error("ERROR:", JSON.stringify(logEntry))
      break
    case ErrorSeverity.MEDIUM:
      logger.warn("WARNING:", JSON.stringify(logEntry))
      break
    case ErrorSeverity.LOW:
      logger.info("INFO:", JSON.stringify(logEntry))
      break
    default:
      logger.debug("LOG:", JSON.stringify(logEntry))
  }
}

/**
 * Get a safe public error message
 */
export function getPublicErrorMessage(error: ErrorInfo): string {
  return PUBLIC_ERROR_MESSAGES[error.type] || PUBLIC_ERROR_MESSAGES[ErrorType.INTERNAL]
}

/**
 * Sanitize error details to remove sensitive information
 */
function sanitizeErrorDetails(details: any): any {
  if (!details) return null

  // Create a copy to avoid modifying the original
  const sanitized = { ...details }

  // Remove sensitive fields
  const sensitiveFields = [
    "password",
    "token",
    "secret",
    "key",
    "auth",
    "credential",
    "jwt",
    "apiKey",
    "api_key",
    "accessToken",
    "access_token",
    "refreshToken",
    "refresh_token",
  ]

  // Recursively sanitize objects
  function sanitizeObject(obj: any) {
    if (!obj || typeof obj !== "object") return

    Object.keys(obj).forEach((key) => {
      // Check if this is a sensitive field
      if (sensitiveFields.some((field) => key.toLowerCase().includes(field.toLowerCase()))) {
        obj[key] = "[REDACTED]"
      }
      // Recursively sanitize nested objects
      else if (typeof obj[key] === "object" && obj[key] !== null) {
        sanitizeObject(obj[key])
      }
    })
  }

  sanitizeObject(sanitized)
  return sanitized
}

/**
 * Handle an error and return appropriate response data
 */
export function handleApiError(error: any): { statusCode: number; body: any } {
  // Default to internal server error
  let errorInfo: ErrorInfo = {
    type: ErrorType.INTERNAL,
    message: "An unexpected error occurred",
    severity: ErrorSeverity.HIGH,
  }

  // If it's already our error format, use it
  if (error && error.type && Object.values(ErrorType).includes(error.type)) {
    errorInfo = error as ErrorInfo
  }
  // Handle specific error types
  else if (error && error.code) {
    // Handle Supabase errors
    if (error.code === "PGRST301" || error.code === "PGRST204") {
      errorInfo = createError(ErrorType.NOT_FOUND, "Resource not found", error, error.code, ErrorSeverity.LOW)
    } else if (error.code === "42501") {
      errorInfo = createError(ErrorType.AUTHORIZATION, "Permission denied", error, error.code, ErrorSeverity.MEDIUM)
    } else if (error.code === "23505") {
      errorInfo = createError(ErrorType.VALIDATION, "Duplicate entry", error, error.code, ErrorSeverity.LOW)
    }
  }

  // Log the error
  logError(errorInfo)

  // Determine status code
  let statusCode = 500
  switch (errorInfo.type) {
    case ErrorType.VALIDATION:
      statusCode = 400
      break
    case ErrorType.AUTHENTICATION:
      statusCode = 401
      break
    case ErrorType.AUTHORIZATION:
      statusCode = 403
      break
    case ErrorType.NOT_FOUND:
      statusCode = 404
      break
    case ErrorType.RATE_LIMIT:
      statusCode = 429
      break
    case ErrorType.DATABASE:
    case ErrorType.EXTERNAL_SERVICE:
    case ErrorType.INTERNAL:
      statusCode = 500
      break
  }

  // Return safe response
  return {
    statusCode,
    body: {
      error: getPublicErrorMessage(errorInfo),
      code: errorInfo.code,
    },
  }
}

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 400
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const errorMessages = {
  auth: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_NOT_VERIFIED: 'Please verify your email before continuing',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
    UNAUTHORIZED: 'You must be signed in to access this resource',
  },
  profile: {
    NOT_FOUND: 'Profile not found',
    UPDATE_FAILED: 'Failed to update profile',
    INVALID_PATHWAY: 'Invalid pathway selected',
  },
  progress: {
    UPDATE_FAILED: 'Failed to update progress',
    INVALID_PHASE: 'Invalid phase selected',
  },
  achievements: {
    UPDATE_FAILED: 'Failed to update achievement',
    NOT_FOUND: 'Achievement not found',
  },
  validation: {
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
    REQUIRED_FIELD: 'This field is required',
  },
  server: {
    INTERNAL_ERROR: 'An unexpected error occurred. Please try again later.',
    SERVICE_UNAVAILABLE: 'Service is temporarily unavailable. Please try again later.',
  },
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    return new AppError(
      error.message,
      'UNKNOWN_ERROR',
      500
    )
  }

  return new AppError(
    'An unexpected error occurred',
    'UNKNOWN_ERROR',
    500
  )
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

