import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isProtectedRoute, isPublicRoute, isStaticPath } from "@/lib/config/routes"

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/pathways',
    '/profile',
    '/settings'
  ]

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      // Redirect to login if accessing protected route without session
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return res
}
