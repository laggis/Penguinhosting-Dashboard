import { Loader2, Activity } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="relative">
            <Activity className="h-16 w-16 text-blue-500 animate-pulse" />
            <Loader2 className="h-8 w-8 text-white animate-spin absolute top-4 left-4" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Loading PenguinHosting Dashboard</h2>
          <p className="text-slate-300">Initializing system monitoring and security components...</p>
        </div>

        <div className="space-y-2">
          <div className="w-64 bg-slate-700 rounded-full h-2 mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm text-slate-400">Loading system metrics and security data</p>
        </div>

        <div className="text-xs text-slate-500">PenguinHosting Dashboard v1.0.0</div>
      </div>
    </div>
  )
}
