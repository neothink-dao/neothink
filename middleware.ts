import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isProtectedRoute, isPublicRoute, isStaticPath } from "@/lib/config/routes"
import { rateLimiter } from '@/lib/rate-limiter'
import { setSecurityHeaders } from '@/lib/security/headers'
import { validateSession, initializeSession } from '@/lib/security/session'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Apply security headers to all responses
  setSecurityHeaders(response)

  // Rate limit auth endpoints
  if (request.nextUrl.pathname.startsWith('/api/auth') || 
      request.nextUrl.pathname.startsWith('/auth')) {
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown'
    const identifier = `${ip}:${request.nextUrl.pathname}`
    const { allowed, waitTime } = rateLimiter.checkRateLimit(identifier)

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          waitTime
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(waitTime! / 1000).toString()
          }
        }
      )
    }
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Handle static paths
  if (isStaticPath(request.nextUrl.pathname)) {
    return response
  }

  // Handle public routes
  if (isPublicRoute(request.nextUrl.pathname)) {
    if (session) {
      // Initialize session metadata for authenticated users
      await initializeSession(request)
    }
    return response
  }

  // Handle protected routes
  if (isProtectedRoute(request.nextUrl.pathname)) {
    if (!session) {
      const redirectUrl = new URL('/auth/sign-in', request.url)
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Validate session metadata for protected routes
    const isValidSession = await validateSession(request)
    if (!isValidSession) {
      // Clear the session and redirect to login
      await supabase.auth.signOut()
      const redirectUrl = new URL('/auth/sign-in', request.url)
      redirectUrl.searchParams.set('error', 'session_expired')
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
