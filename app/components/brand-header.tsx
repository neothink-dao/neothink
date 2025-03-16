"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Sparkles } from "lucide-react"

export function BrandHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const { user } = useAuth()
  const pathname = usePathname()

  // Don't render header on auth pages
  if (pathname.startsWith("/auth")) return null

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-zinc-200 dark:bg-zinc-900/80 dark:border-zinc-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
              aria-label="Neothink+ Home"
            >
              <Sparkles
                className="h-6 w-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-400 dark:via-orange-400 dark:to-red-400"
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                aria-hidden="true"
              />
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400">
                Neothink+
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-6 py-2 text-sm font-medium text-white transition hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
                aria-label="Go to Dashboard"
              >
                Dashboard
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  href="/auth/login"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-6 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80"
                  aria-label="Log in to Neothink+"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-6 py-2 text-sm font-medium text-white transition hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
                  aria-label="Sign up for Neothink+"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              ref={buttonRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:hidden dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute left-0 right-0 top-16 mt-px bg-white shadow-lg dark:bg-zinc-900 transform opacity-100 scale-100 transition-all duration-100 ease-out mobile-menu-enter"
            id="mobile-menu"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
          >
            <div className="p-4 space-y-4">
              {user ? (
                <Link
                  href="/dashboard"
                  className="block w-full text-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-6 py-3 text-base font-medium text-white transition hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                  aria-label="Go to Dashboard"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block w-full text-center rounded-md border border-zinc-200 bg-white px-6 py-3 text-base font-medium text-zinc-900 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80"
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-label="Log in to Neothink+"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block w-full text-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-6 py-3 text-base font-medium text-white transition hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-300 dark:hover:via-orange-300 dark:hover:to-red-300"
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-label="Sign up for Neothink+"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
