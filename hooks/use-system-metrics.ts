"use client"

import { useState, useEffect, useCallback } from "react"

export interface SystemMetrics {
  timestamp: string
  hostname: string
  system: {
    platform: string
    arch: string
    uptime: number
    loadavg: number[]
  }
  cpu: {
    usage: number
    cores: number
    model: string
    temperature: number
  }
  memory: {
    total: number
    used: number
    free: number
    usage: number
  }
  disk: {
    total: number
    used: number
    free: number
    usage: number
  }
  network: {
    interfaces: Array<{
      name: string
      rx_bytes: number
      tx_bytes: number
      rx_packets: number
      tx_packets: number
      speed: number
    }>
  }
  processes: {
    total: number
    running: number
    sleeping: number
  }
}

export interface UseSystemMetricsOptions {
  refreshInterval?: number
  autoRefresh?: boolean
  onError?: (error: Error) => void
  onSuccess?: (data: SystemMetrics) => void
}

export interface UseSystemMetricsReturn {
  data: SystemMetrics | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  refresh: () => Promise<void>
  startAutoRefresh: () => void
  stopAutoRefresh: () => void
  isAutoRefreshing: boolean
}

export function useSystemMetrics(options: UseSystemMetricsOptions = {}): UseSystemMetricsReturn {
  const { refreshInterval = 5000, autoRefresh = true, onError, onSuccess } = options

  const [data, setData] = useState<SystemMetrics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/system-metrics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`PenguinHosting API Error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch system metrics")
      }

      setData(result.data)
      setLastUpdated(new Date())
      onSuccess?.(result.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      onError?.(err instanceof Error ? err : new Error(errorMessage))
      console.error("PenguinHosting Metrics Error:", err)
    } finally {
      setLoading(false)
    }
  }, [onError, onSuccess])

  const refresh = useCallback(async () => {
    await fetchMetrics()
  }, [fetchMetrics])

  const startAutoRefresh = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }

    setIsAutoRefreshing(true)
    const id = setInterval(fetchMetrics, refreshInterval)
    setIntervalId(id)
  }, [fetchMetrics, refreshInterval, intervalId])

  const stopAutoRefresh = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    setIsAutoRefreshing(false)
  }, [intervalId])

  // Initial fetch and auto-refresh setup
  useEffect(() => {
    fetchMetrics()

    if (autoRefresh) {
      startAutoRefresh()
    }

    // Cleanup on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, []) // Only run on mount

  // Handle visibility change to pause/resume auto-refresh
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoRefresh()
      } else if (autoRefresh) {
        startAutoRefresh()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [autoRefresh, startAutoRefresh, stopAutoRefresh])

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    startAutoRefresh,
    stopAutoRefresh,
    isAutoRefreshing,
  }
}

// Utility functions for formatting metrics data
export const formatBytes = (bytes: number): string => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes === 0) return "0 Bytes"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
}

export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}

export const getUsageColor = (usage: number): string => {
  if (usage < 50) return "text-green-500"
  if (usage < 80) return "text-yellow-500"
  return "text-red-500"
}

export const getUsageBarColor = (usage: number): string => {
  if (usage < 50) return "bg-green-500"
  if (usage < 80) return "bg-yellow-500"
  return "bg-red-500"
}
