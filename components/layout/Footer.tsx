"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
} from 'lucide-react'

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Impact', href: '/impact' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Newsletter', href: '/newsletter' },
    { label: 'Events', href: '/events' },
    { label: 'Help Center', href: '/help' },
  ],
  legal: [
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Licenses', href: '/licenses' },
  ],
  social: [
    { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
    { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  ],
}

export function Footer() {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/auth")
  const isDashboard = pathname.startsWith("/dashboard")

  // Don't show footer on auth or dashboard pages
  if (isAuthPage || isDashboard) return null

  return (
    <footer className="border-t bg-zinc-50 dark:bg-zinc-900">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Stay Updated
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-[240px]"
                aria-label="Email address"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Company
            </h2>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Resources
            </h2>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Contact
            </h2>
            <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p>1234 Innovation Drive</p>
              <p>San Francisco, CA 94107</p>
              <p>United States</p>
              <a
                href="mailto:contact@neothink.com"
                className="inline-flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                <Mail className="h-4 w-4" />
                contact@neothink.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} NeoThink. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {footerLinks.social.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                    aria-label={`Follow us on ${link.label}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>

            {/* Legal Links */}
            <div className="flex gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
