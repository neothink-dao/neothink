import Link from "next/link"

<div className="flex items-center gap-4">
  <Link
    href="/auth/sign-in"
    className="text-sm font-medium text-gray-700 hover:text-gray-900"
  >
    Sign in
  </Link>
  <Link
    href="/auth/sign-up"
    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
  >
    Sign up
  </Link>
</div> 