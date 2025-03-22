import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/ui/container"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900">
      <Header />
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  )
}
