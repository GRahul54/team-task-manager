import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Team Task Manager</h1>
        <p className="mt-4 text-gray-600">One link to start your app and manage projects and tasks.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link
            href="/auth/signin"
            className="rounded-2xl bg-indigo-600 px-5 py-4 text-white font-semibold hover:bg-indigo-700"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-2xl border border-indigo-600 px-5 py-4 text-indigo-600 font-semibold hover:bg-indigo-50"
          >
            Sign Up
          </Link>
          <Link
            href="/dashboard"
            className="rounded-2xl border border-gray-300 px-5 py-4 text-gray-700 font-semibold hover:bg-gray-100"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}