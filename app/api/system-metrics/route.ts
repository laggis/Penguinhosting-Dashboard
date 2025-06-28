import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration - replace with actual system monitoring
function generateMockMetrics() {
  const now = new Date()

  return {
    timestamp: now.toISOString(),
    hostname: "penguinhosting-server-01",
    system: {
      platform: "win32",
      arch: "x64",
      uptime: Math.floor(Math.random() * 86400), // Random uptime in seconds
      loadavg: [Math.random() * 2, Math.random() * 2, Math.random() * 2],
    },
    cpu: {
      usage: Math.floor(Math.random() * 100),
      cores: 8,
      model: "Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz",
      temperature: Math.floor(Math.random() * 30) + 40, // 40-70°C
    },
    memory: {
      total: 16 * 1024 * 1024 * 1024, // 16GB
      used: Math.floor(Math.random() * 12 * 1024 * 1024 * 1024), // Random used memory
      free: 0, // Will be calculated
      usage: 0, // Will be calculated
    },
    disk: {
      total: 1024 * 1024 * 1024 * 1024, // 1TB
      used: Math.floor(Math.random() * 800 * 1024 * 1024 * 1024), // Random used disk
      free: 0, // Will be calculated
      usage: 0, // Will be calculated
    },
    network: {
      interfaces: [
        {
          name: "Ethernet",
          rx_bytes: Math.floor(Math.random() * 1000000000),
          tx_bytes: Math.floor(Math.random() * 1000000000),
          rx_packets: Math.floor(Math.random() * 1000000),
          tx_packets: Math.floor(Math.random() * 1000000),
          speed: 1000, // Mbps
        },
      ],
    },
    processes: {
      total: Math.floor(Math.random() * 200) + 100,
      running: Math.floor(Math.random() * 50) + 20,
      sleeping: Math.floor(Math.random() * 150) + 80,
    },
  }
}

export async function GET(request: NextRequest) {
  try {
    const metrics = generateMockMetrics()

    // Calculate derived values
    metrics.memory.free = metrics.memory.total - metrics.memory.used
    metrics.memory.usage = Math.floor((metrics.memory.used / metrics.memory.total) * 100)

    metrics.disk.free = metrics.disk.total - metrics.disk.used
    metrics.disk.usage = Math.floor((metrics.disk.used / metrics.disk.total) * 100)

    return NextResponse.json({
      success: true,
      data: metrics,
      source: "PenguinHosting Monitoring API",
      version: "1.0.0",
    })
  } catch (error) {
    console.error("PenguinHosting API Error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch system metrics",
        message: error instanceof Error ? error.message : "Unknown error",
        source: "PenguinHosting Monitoring API",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed",
      message: "Use GET to retrieve system metrics",
    },
    { status: 405 },
  )
}
