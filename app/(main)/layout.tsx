import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="container py-12">{children}</main>
      <Footer />
    </div>
  )
} 