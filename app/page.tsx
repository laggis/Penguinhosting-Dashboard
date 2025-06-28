import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "PenguinHosting Dashboard - System Monitoring",
  description: "Real-time system monitoring dashboard with metrics, security monitoring, and PowerShell integration",
}

export default function Home() {
  return <Dashboard />
}
