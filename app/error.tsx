"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("PenguinHosting Dashboard Error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-red-500 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Dashboard Error</h1>
          <p className="text-xl text-slate-300">Something went wrong with the PenguinHosting Dashboard</p>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-400 mb-2">Error Details:</p>
          <p className="text-sm text-red-400 font-mono break-all">{error.message || "Unknown error occurred"}</p>
          {error.digest && <p className="text-xs text-slate-500 mt-2">Error ID: {error.digest}</p>}
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium w-full justify-center"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>

          <a
            href="/"
            className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium w-full justify-center"
          >
            <Home className="h-5 w-5" />
            Return to Dashboard
          </a>
        </div>

        <div className="text-sm text-slate-500">If this error persists, please contact PenguinHosting support</div>
      </div>
    </div>
  )
}
