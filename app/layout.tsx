"use client"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { BrandHeader } from "./components"
import { defaultMetadata } from "./metadata"
import { useEffect } from "react"
import { AuthProvider } from "@/context/auth-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  ...defaultMetadata,
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('ServiceWorker registration successful')
          },
          (err) => {
            console.log('ServiceWorker registration failed: ', err)
          }
        )
      })
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Neothink" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="font-sans antialiased bg-zinc-50 text-zinc-900 transition-colors duration-200 dark:bg-zinc-900 dark:text-zinc-100">
        <AuthProvider>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <BrandHeader />
              <main className="flex-1 w-full">{children}</main>
              <footer className="border-t border-zinc-200 bg-white py-8 sm:py-12 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center sm:text-left">
                      &copy; {new Date().getFullYear()} Neothink+. All rights reserved.
                    </p>
                    <nav className="flex items-center gap-4 sm:gap-6">
                      <a 
                        href="/privacy" 
                        className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:text-zinc-400 dark:hover:text-zinc-200"
                      >
                        Privacy
                      </a>
                      <a 
                        href="/terms" 
                        className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:text-zinc-400 dark:hover:text-zinc-200"
                      >
                        Terms
                      </a>
                    </nav>
                  </div>
                </div>
              </footer>
            </div>
          </Providers>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}