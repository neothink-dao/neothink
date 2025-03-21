import { createHash } from 'crypto'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes
const DEVICE_FINGERPRINT_TIMEOUT = 30 * 24 * 60 * 60 * 1000 // 30 days

interface SessionMetadata {
  lastActivity: number
  deviceFingerprint: string
}

export function generateDeviceFingerprint(request: NextRequest): string {
  const components = [
    request.headers.get('user-agent') || '',
    request.headers.get('accept-language') || '',
    request.headers.get('sec-ch-ua-platform') || '',
    request.headers.get('sec-ch-ua') || ''
  ]

  return createHash('sha256')
    .update(components.join('|'))
    .digest('hex')
}

export async function validateSession(request: NextRequest): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionMetadata = cookieStore.get('session_metadata')

  if (!sessionMetadata) {
    return false
  }

  try {
    const metadata: SessionMetadata = JSON.parse(sessionMetadata.value)
    const currentFingerprint = generateDeviceFingerprint(request)

    // Check session timeout
    if (Date.now() - metadata.lastActivity > SESSION_TIMEOUT) {
      return false
    }

    // Check device fingerprint
    if (metadata.deviceFingerprint !== currentFingerprint) {
      return false
    }

    // Update last activity
    metadata.lastActivity = Date.now()
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'session_metadata',
      value: JSON.stringify(metadata),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: DEVICE_FINGERPRINT_TIMEOUT / 1000
    })

    return true
  } catch (error) {
    console.error('Session validation error:', error)
    return false
  }
}

export async function initializeSession(request: NextRequest): Promise<void> {
  const metadata: SessionMetadata = {
    lastActivity: Date.now(),
    deviceFingerprint: generateDeviceFingerprint(request)
  }

  const cookieStore = await cookies()
  cookieStore.set({
    name: 'session_metadata',
    value: JSON.stringify(metadata),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: DEVICE_FINGERPRINT_TIMEOUT / 1000
  })
} 