import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/auth'
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export const dynamic = 'force-dynamic'

interface PageParams {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function CallbackPage({
  searchParams,
}: PageParams) {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  const next = typeof searchParams.next === 'string' ? searchParams.next : undefined

  if (session?.user?.email_confirmed_at) {
    redirect(next || '/dashboard')
  } else if (session?.user) {
    redirect(`/auth/verify${next ? `?next=${next}` : ''}`)
  } else {
    redirect(`/auth/login${next ? `?next=${next}` : ''}`)
  }

  // This will never be shown, but we need to return something
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-800/50">
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
            <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
              Verifying your account...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
