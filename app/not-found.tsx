import Link from "next/link"
import { Container } from "@/components/ui/container"

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">404</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="text-sm font-semibold leading-7 text-primary hover:text-primary/80"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
        </div>
      </div>
    </Container>
  )
} 