import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Perform basic health checks
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "PenguinHosting Dashboard",
      version: "1.0.0",
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      port: process.env.CUSTOM_PORT || "8080",
      checks: {
        api: {
          status: "ok",
          responseTime: Date.now() - startTime,
        },
        memory: {
          status: "ok",
          usage: process.memoryUsage(),
          heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        },
        system: {
          status: "ok",
          platform: process.platform,
          arch: process.arch,
          nodeVersion: process.version,
        },
      },
    }

    // Check if memory usage is too high (over 500MB)
    if (healthData.checks.memory.heapUsed > 500) {
      healthData.checks.memory.status = "warning"
      healthData.status = "degraded"
    }

    return NextResponse.json(healthData)
  } catch (error) {
    console.error("PenguinHosting Health Check Error:", error)

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        service: "PenguinHosting Dashboard",
        version: "1.0.0",
        error: error instanceof Error ? error.message : "Unknown error",
        checks: {
          api: {
            status: "error",
            responseTime: Date.now() - startTime,
          },
        },
      },
      { status: 500 },
    )
  }
}
