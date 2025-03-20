interface RateLimitEntry {
  attempts: number
  lastAttempt: number
  blocked: boolean
}

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 5
const BLOCK_DURATION = 30 * 60 * 1000 // 30 minutes

class RateLimiter {
  private static instance: RateLimiter
  private limits: Map<string, RateLimitEntry>

  private constructor() {
    this.limits = new Map()
  }

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter()
    }
    return RateLimiter.instance
  }

  public checkRateLimit(identifier: string): { allowed: boolean; waitTime?: number } {
    const now = Date.now()
    const entry = this.limits.get(identifier) || {
      attempts: 0,
      lastAttempt: now,
      blocked: false,
    }

    // Check if blocked
    if (entry.blocked) {
      const timeElapsed = now - entry.lastAttempt
      if (timeElapsed < BLOCK_DURATION) {
        const waitTime = BLOCK_DURATION - timeElapsed
        return { allowed: false, waitTime }
      }
      // Reset if block duration has passed
      entry.blocked = false
      entry.attempts = 0
    }

    // Check rate limit window
    if (now - entry.lastAttempt > RATE_LIMIT_WINDOW) {
      // Reset attempts if window has passed
      entry.attempts = 0
    }

    // Increment attempts
    entry.attempts++
    entry.lastAttempt = now

    // Block if max attempts exceeded
    if (entry.attempts > MAX_ATTEMPTS) {
      entry.blocked = true
      this.limits.set(identifier, entry)
      return { allowed: false, waitTime: BLOCK_DURATION }
    }

    this.limits.set(identifier, entry)
    return { allowed: true }
  }

  public reset(identifier: string): void {
    this.limits.delete(identifier)
  }
}

export const rateLimiter = RateLimiter.getInstance() 