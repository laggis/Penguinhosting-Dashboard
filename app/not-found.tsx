import Link from "next/link"
import { Home, AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <AlertTriangle className="h-24 w-24 text-yellow-500 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
          <p className="text-xl text-slate-300">
            The page you're looking for doesn't exist in the PenguinHosting Dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-slate-400">This might be because:</p>
          <ul className="text-left text-slate-400 space-y-1 max-w-md mx-auto">
            <li>• The URL was typed incorrectly</li>
            <li>• The page has been moved or deleted</li>
            <li>• You don't have permission to access this page</li>
            <li>• The dashboard is still loading</li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
        >
          <Home className="h-5 w-5" />
          Return to Dashboard
        </Link>

        <div className="text-sm text-slate-500 mt-8">PenguinHosting Dashboard v1.0.0</div>
      </div>
    </div>
  )
}
