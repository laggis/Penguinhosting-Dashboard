"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Activity } from "lucide-react"

interface HealthData {
  status: string
  timestamp: string
  service: string
  version: string
  uptime: number
  environment: string
  port: string
  checks: {
    api: { status: string; responseTime: number }
    memory: { status: string; heapUsed: number; heapTotal: number }
    system: { status: string; platform: string; arch: string; nodeVersion: string }
  }
}

interface MetricsData {
  success: boolean
  data?: any
  error?: string
  source: string
  version?: string
}

export default function TestAPI() {
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [metricsData, setMetricsData] = useState<MetricsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchHealthData = async () => {
    try {
      const response = await fetch("/api/health")
      const data = await response.json()
      setHealthData(data)
    } catch (error) {
      console.error("Failed to fetch health data:", error)
      setHealthData(null)
    }
  }

  const fetchMetricsData = async () => {
    try {
      const response = await fetch("/api/system-metrics")
      const data = await response.json()
      setMetricsData(data)
    } catch (error) {
      console.error("Failed to fetch metrics data:", error)
      setMetricsData({ success: false, error: "Failed to fetch", source: "PenguinHosting API" })
    }
  }

  const refreshAll = async () => {
    setLoading(true)
    await Promise.all([fetchHealthData(), fetchMetricsData()])
    setLastUpdate(new Date())
    setLoading(false)
  }

  useEffect(() => {
    refreshAll()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "ok":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "unhealthy":
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Activity className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variant =
      status === "healthy" || status === "ok"
        ? "default"
        : status === "degraded" || status === "warning"
          ? "secondary"
          : "destructive"
    return <Badge variant={variant}>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">PenguinHosting API Test</h1>
            <p className="text-slate-300">Test and monitor API endpoints</p>
          </div>
          <Button onClick={refreshAll} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh All
          </Button>
        </div>

        {lastUpdate && <p className="text-sm text-slate-400">Last updated: {lastUpdate.toLocaleTimeString()}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Check */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                {healthData && getStatusIcon(healthData.status)}
                Health Check API
              </CardTitle>
              <CardDescription>/api/health endpoint status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {healthData ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Status:</span>
                    {getStatusBadge(healthData.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Service:</span>
                    <span className="text-white">{healthData.service}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Version:</span>
                    <span className="text-white">{healthData.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Uptime:</span>
                    <span className="text-white">{Math.floor(healthData.uptime)}s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Environment:</span>
                    <span className="text-white">{healthData.environment}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Port:</span>
                    <span className="text-white">{healthData.port}</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-white">System Checks:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">API Response:</span>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(healthData.checks.api.status)}
                          <span className="text-white">{healthData.checks.api.responseTime}ms</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Memory:</span>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(healthData.checks.memory.status)}
                          <span className="text-white">
                            {healthData.checks.memory.heapUsed}MB / {healthData.checks.memory.heapTotal}MB
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">System:</span>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(healthData.checks.system.status)}
                          <span className="text-white">
                            {healthData.checks.system.platform} {healthData.checks.system.arch}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-red-400">Failed to load health data</div>
              )}
            </CardContent>
          </Card>

          {/* System Metrics */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                {metricsData?.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                System Metrics API
              </CardTitle>
              <CardDescription>/api/system-metrics endpoint status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {metricsData ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Status:</span>
                    {getStatusBadge(metricsData.success ? "ok" : "error")}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Source:</span>
                    <span className="text-white">{metricsData.source}</span>
                  </div>

                  {metricsData.success && metricsData.data ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Hostname:</span>
                        <span className="text-white">{metricsData.data.hostname}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">CPU Usage:</span>
                        <span className="text-white">{metricsData.data.cpu.usage}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Memory Usage:</span>
                        <span className="text-white">{metricsData.data.memory.usage}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Disk Usage:</span>
                        <span className="text-white">{metricsData.data.disk.usage}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Processes:</span>
                        <span className="text-white">{metricsData.data.processes.total}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-red-400">Error: {metricsData.error || "Unknown error"}</div>
                  )}
                </>
              ) : (
                <div className="text-red-400">Failed to load metrics data</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Raw Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Raw Health Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-slate-300 overflow-auto max-h-64 bg-slate-900 p-3 rounded">
                {JSON.stringify(healthData, null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Raw Metrics Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-slate-300 overflow-auto max-h-64 bg-slate-900 p-3 rounded">
                {JSON.stringify(metricsData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
