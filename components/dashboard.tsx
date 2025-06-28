"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  Bell,
  CircleOff,
  Command,
  Cpu,
  Database,
  Download,
  Globe,
  HardDrive,
  Hexagon,
  Lock,
  type LucideIcon,
  MessageSquare,
  Moon,
  Radio,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sun,
  Terminal,
  Wifi,
  Zap,
  MemoryStick,
  Network,
  AlertTriangle,
  CheckCircle,
  Eye,
  Clock,
  XCircle,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSystemMetrics } from "@/hooks/use-system-metrics"

interface SecurityEvent {
  id: string
  timestamp: string
  type: "threat" | "login" | "firewall" | "update"
  severity: "low" | "medium" | "high" | "critical"
  message: string
  source: string
}

interface Server {
  id: string
  name: string
  ip: string
  port: number
  type: string
  country: string
  status: "online" | "offline" | "warning" | "error"
  uptime: number
  responseTime: number
  lastCheck: string
  cpu: number
  memory: number
  storage: number
  ping: number
  service: string
  location: string
}

interface Message {
  id: string
  timestamp: string
  type: "info" | "warning" | "error" | "success"
  title: string
  content: string
  priority: "low" | "medium" | "high"
  read: boolean
}

export default function Dashboard() {
  const {
    data: metrics,
    loading,
    error,
    lastUpdated,
    refresh,
  } = useSystemMetrics({
    refreshInterval: 5000,
    autoRefresh: true,
  })
  const [activeTab, setActiveTab] = useState<string>("dashboard")
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [servers, setServers] = useState<Server[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [consoleInput, setConsoleInput] = useState("")
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Use real data from metrics or fallback to default values
  const systemStatus = metrics
    ? Math.min(95, (metrics.cpu.usage + metrics.memory.usage + metrics.network.status) / 3)
    : 85
  const cpuUsage = metrics?.cpu.usage || 42
  const memoryUsage = metrics?.memory.usage || 68
  const networkStatus = metrics?.network.status || 92
  const securityLevel = 75 // Keep this simulated for now
  const uptime = metrics?.system.uptime || "0d 00:00:00"
  const hostname = metrics?.hostname || "SERVER-01"
  const totalMemory = metrics?.memory.total || 24
  const freeMemory = metrics?.memory.free || 8
  const cpuCount = metrics?.cpu.cores || 8

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update time only after mounted
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [mounted])

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Initialize demo data
  useEffect(() => {
    // Security Events
    const demoSecurityEvents: SecurityEvent[] = [
      {
        id: "1",
        timestamp: new Date().toISOString(),
        type: "threat",
        severity: "high",
        message: "Suspicious login attempt blocked from IP 192.168.1.100",
        source: "Windows Defender",
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: "firewall",
        severity: "medium",
        message: "Firewall rule updated for port 8080",
        source: "Windows Firewall",
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 600000).toISOString(),
        type: "update",
        severity: "low",
        message: "Security definitions updated successfully",
        source: "Windows Update",
      },
    ]

    // Servers
    const demoServers: Server[] = [
      {
        id: "1",
        name: "Web Server 01",
        ip: "192.168.1.10",
        port: 80,
        type: "HTTP",
        country: "US",
        status: "online",
        uptime: 99.9,
        responseTime: 45,
        lastCheck: new Date().toISOString(),
        cpu: 47,
        memory: 61,
        storage: 70,
        ping: 45,
        service: "HTTP",
        location: "New York, USA",
      },
      {
        id: "2",
        name: "Database Server",
        ip: "192.168.1.20",
        port: 3306,
        type: "MySQL",
        country: "US",
        status: "online",
        uptime: 99.8,
        responseTime: 12,
        lastCheck: new Date().toISOString(),
        cpu: 32,
        memory: 58,
        storage: 75,
        ping: 78,
        service: "MySQL",
        location: "London, UK",
      },
      {
        id: "3",
        name: "API Gateway",
        ip: "192.168.1.30",
        port: 8080,
        type: "API",
        country: "CA",
        status: "warning",
        uptime: 98.5,
        responseTime: 120,
        lastCheck: new Date().toISOString(),
        cpu: 85,
        memory: 92,
        storage: 63,
        ping: 120,
        service: "Web App",
        location: "Tokyo, Japan",
      },
    ]

    // Messages
    const demoMessages: Message[] = [
      {
        id: "1",
        timestamp: new Date().toISOString(),
        type: "info",
        title: "System Update Available",
        content: "A new system update is available for installation. Please schedule maintenance window.",
        priority: "medium",
        read: false,
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        type: "success",
        title: "Backup Completed",
        content: "Daily backup completed successfully. All data has been secured.",
        priority: "low",
        read: true,
      },
    ]

    setSecurityEvents(demoSecurityEvents)
    setServers(demoServers)
    setMessages(demoMessages)

    // Console welcome message
    setConsoleOutput(["PenguinHosting PowerShell Console v1.0.0", "Type 'help' for available commands", ""])
  }, [])

  const handleConsoleCommand = (command: string) => {
    const newOutput = [...consoleOutput, `PS C:\\PenguinHosting> ${command}`]

    switch (command.toLowerCase().trim()) {
      case "help":
        newOutput.push("Available commands:")
        newOutput.push("  help     - Show this help message")
        newOutput.push("  status   - Show system status")
        newOutput.push("  refresh  - Refresh system metrics")
        newOutput.push("  clear    - Clear console")
        newOutput.push("  uptime   - Show system uptime")
        break
      case "status":
        newOutput.push(`System Status: ${metrics ? "Online" : "Offline"}`)
        if (metrics) {
          newOutput.push(`CPU Usage: ${metrics.cpu.usage}%`)
          newOutput.push(`Memory Usage: ${metrics.memory.usage}%`)
          newOutput.push(`Disk Usage: ${metrics.disk.usage}%`)
        }
        break
      case "refresh":
        refresh()
        newOutput.push("System metrics refreshed")
        break
      case "clear":
        setConsoleOutput(["Console cleared", ""])
        setConsoleInput("")
        return
      case "uptime":
        if (metrics) {
          newOutput.push(`System Uptime: ${metrics.system.uptime}`)
        } else {
          newOutput.push("Uptime information not available")
        }
        break
      default:
        newOutput.push(`Command not found: ${command}`)
        newOutput.push("Type 'help' for available commands")
    }

    newOutput.push("")
    setConsoleOutput(newOutput)
    setConsoleInput("")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">SYSTEM INITIALIZING</div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-4 right-4 bg-red-900/80 border border-red-500/50 rounded-md p-3 z-50 max-w-md">
          <div className="text-red-400 text-sm">
            <div className="font-semibold">System Error:</div>
            <div className="text-xs mt-1">{error}</div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {hostname}
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search systems..."
                className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="text-slate-400 hover:text-slate-100"
                    >
                      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback className="bg-slate-700 text-cyan-500">CM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem
                    icon={Command}
                    label="Dashboard"
                    active={activeTab === "dashboard"}
                    onClick={() => setActiveTab("dashboard")}
                  />
                  <NavItem
                    icon={Activity}
                    label="Diagnostics"
                    active={activeTab === "diagnostics"}
                    onClick={() => setActiveTab("diagnostics")}
                  />
                  <NavItem
                    icon={Database}
                    label="Data Center"
                    active={activeTab === "datacenter"}
                    onClick={() => setActiveTab("datacenter")}
                  />
                  <NavItem
                    icon={Globe}
                    label="Network"
                    active={activeTab === "network"}
                    onClick={() => setActiveTab("network")}
                  />
                  <NavItem
                    icon={Shield}
                    label="Security"
                    active={activeTab === "security"}
                    onClick={() => setActiveTab("security")}
                  />
                  <NavItem
                    icon={Terminal}
                    label="Console"
                    active={activeTab === "console"}
                    onClick={() => setActiveTab("console")}
                  />
                  <NavItem
                    icon={MessageSquare}
                    label="Communications"
                    active={activeTab === "communications"}
                    onClick={() => setActiveTab("communications")}
                  />
                  <NavItem
                    icon={Settings}
                    label="Settings"
                    active={activeTab === "settings"}
                    onClick={() => setActiveTab("settings")}
                  />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">SYSTEM STATUS</div>
                  <div className="space-y-3">
                    <StatusItem label="Core Systems" value={Math.round(systemStatus)} color="cyan" />
                    <StatusItem label="Security" value={securityLevel} color="green" />
                    <StatusItem label="Network" value={networkStatus} color="blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            {activeTab === "dashboard" && <DashboardContent />}
            {activeTab === "diagnostics" && <DiagnosticsContent />}
            {activeTab === "datacenter" && <DataCenterContent />}
            {activeTab === "network" && <NetworkContent />}
            {activeTab === "security" && <SecurityContent />}
            {activeTab === "console" && <ConsoleContent />}
            {activeTab === "communications" && <CommunicationsContent />}
            {activeTab === "settings" && <SettingsContent />}
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">
              {/* System time */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1 font-mono">SYSTEM TIME</div>
                      <div className="text-3xl font-mono text-cyan-400 mb-1">{formatTime(currentTime)}</div>
                      <div className="text-sm text-slate-400">{formatDate(currentTime)}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Uptime</div>
                        <div className="text-sm font-mono text-slate-200">{uptime}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Platform</div>
                        <div className="text-sm font-mono text-slate-200">Windows</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton
                      icon={Shield}
                      label="Security Scan"
                      onClick={() => {
                        alert("🔒 Security scan initiated! Switching to Security tab...")
                        setActiveTab("security")
                      }}
                    />
                    <ActionButton
                      icon={RefreshCw}
                      label="Sync Data"
                      onClick={() => {
                        alert("🔄 Data synchronization started! This may take a few moments...")
                      }}
                    />
                    <ActionButton
                      icon={Download}
                      label="Backup"
                      onClick={() => {
                        alert("💾 System backup initiated! Check the Data Center tab for progress...")
                        setActiveTab("datacenter")
                      }}
                    />
                    <ActionButton
                      icon={Terminal}
                      label="Console"
                      onClick={() => {
                        setActiveTab("console")
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Resource allocation */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Resource Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Processing Power</div>
                        <div className="text-xs text-cyan-400">{cpuUsage}% allocated</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          style={{ width: `${cpuUsage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Memory Allocation</div>
                        <div className="text-xs text-purple-400">{memoryUsage}% allocated</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${memoryUsage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Network Bandwidth</div>
                        <div className="text-xs text-blue-400">35% allocated</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-700/50">
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-slate-400">Priority Level</div>
                        <div className="flex items-center">
                          <Slider defaultValue={[3]} max={5} step={1} className="w-24 mr-2" />
                          <span className="text-cyan-400">3/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Environment controls */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Environment Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Radio className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Power Management</Label>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Lock className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Security Protocol</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Power Saving Mode</Label>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CircleOff className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Auto Shutdown</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Dashboard Content Component
  function DashboardContent() {
    return (
      <div className="grid gap-6">
        {/* System Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              <Cpu className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cpuUsage}%</div>
              <Progress value={cpuUsage} className="mt-2" />
              <p className="text-xs text-slate-400 mt-2">{cpuCount} cores • 65°C</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              <MemoryStick className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{memoryUsage}%</div>
              <Progress value={memoryUsage} className="mt-2" />
              <p className="text-xs text-slate-400 mt-2">
                {totalMemory - freeMemory} GB / {totalMemory} GB
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
              <HardDrive className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65%</div>
              <Progress value={65} className="mt-2" />
              <p className="text-xs text-slate-400 mt-2">324 GB / 500 GB</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Clock className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uptime}</div>
              <p className="text-xs text-slate-400 mt-2">Host: {hostname}</p>
              <p className="text-xs text-slate-400">Platform: Windows x64</p>
            </CardContent>
          </Card>
        </div>

        {/* System Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>System Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Hostname:</span>
                  <p className="font-medium">{hostname}</p>
                </div>
                <div>
                  <span className="text-slate-400">Platform:</span>
                  <p className="font-medium">Windows</p>
                </div>
                <div>
                  <span className="text-slate-400">Architecture:</span>
                  <p className="font-medium">x64</p>
                </div>
                <div>
                  <span className="text-slate-400">CPU Cores:</span>
                  <p className="font-medium">{cpuCount}</p>
                </div>
                <div>
                  <span className="text-slate-400">Total Processes:</span>
                  <p className="font-medium">156</p>
                </div>
                <div>
                  <span className="text-slate-400">Running Processes:</span>
                  <p className="font-medium">45</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="h-5 w-5" />
                <span>Network Interfaces</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <p className="font-medium">Ethernet 1</p>
                      <p className="text-sm text-slate-400">1000 Mbps</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">↓ 1.2 GB</p>
                      <p className="text-sm">↑ 850 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <p className="font-medium">Wi-Fi</p>
                      <p className="text-sm text-slate-400">300 Mbps</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">↓ 45 MB</p>
                      <p className="text-sm">↑ 12 MB</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Diagnostics Content Component
  function DiagnosticsContent() {
    return (
      <div className="grid gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-cyan-500" />
              System Diagnostics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-200">Hardware Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">CPU Temperature:</span>
                    <span className="text-green-400">42°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">GPU Temperature:</span>
                    <span className="text-green-400">38°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">System Fan Speed:</span>
                    <span className="text-cyan-400">1,250 RPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Power Supply:</span>
                    <span className="text-green-400">Optimal</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-200">System Health</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Boot Time:</span>
                    <span className="text-cyan-400">45.2 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Crash:</span>
                    <span className="text-green-400">None</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Error Count (24h):</span>
                    <span className="text-amber-400">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">System Stability:</span>
                    <span className="text-green-400">Excellent</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-100">Performance Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Cpu className="mr-2 h-4 w-4" />
                CPU Stress Test
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <HardDrive className="mr-2 h-4 w-4" />
                Memory Test
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Wifi className="mr-2 h-4 w-4" />
                Network Test
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Data Center Content Component
  function DataCenterContent() {
    const [mounted, setMounted] = useState(false)
    const [servers, setServers] = useState([
      {
        id: "server-1",
        name: "Web Server 01",
        ip: "192.168.1.10",
        port: 80,
        type: "HTTP",
        country: "US",
        status: "online",
        uptime: 99.9,
        responseTime: 45,
        lastCheck: new Date().toISOString(),
        cpu: 47,
        memory: 61,
        storage: 70,
        ping: 45,
        service: "HTTP",
        location: "New York, USA",
      },
      {
        id: "server-2",
        name: "Database Server",
        ip: "192.168.1.20",
        port: 3306,
        type: "MySQL",
        country: "US",
        status: "online",
        uptime: 99.8,
        responseTime: 12,
        lastCheck: new Date().toISOString(),
        cpu: 32,
        memory: 58,
        storage: 75,
        ping: 78,
        service: "MySQL",
        location: "London, UK",
      },
      {
        id: "server-3",
        name: "API Gateway",
        ip: "192.168.1.30",
        port: 8080,
        type: "API",
        country: "CA",
        status: "warning",
        uptime: 98.5,
        responseTime: 120,
        lastCheck: new Date().toISOString(),
        cpu: 85,
        memory: 92,
        storage: 63,
        ping: 120,
        service: "Web App",
        location: "Tokyo, Japan",
      },
    ])

    const [showAddServer, setShowAddServer] = useState(false)
    const [newServer, setNewServer] = useState({
      name: "",
      ip: "",
      port: "",
      type: "HTTP",
      country: "US",
      location: "",
    })

    // Load servers from localStorage on component mount
    useEffect(() => {
      setMounted(true)
      const savedServers = localStorage.getItem("dashboard-servers")
      if (savedServers) {
        try {
          const parsedServers = JSON.parse(savedServers)
          setServers(parsedServers)
        } catch (error) {
          console.error("Error loading saved servers:", error)
        }
      }
    }, [])

    // Save servers to localStorage whenever servers change (only after mounted)
    useEffect(() => {
      if (mounted) {
        localStorage.setItem("dashboard-servers", JSON.stringify(servers))
      }
    }, [servers, mounted])

    // Don't render until mounted to prevent hydration mismatch
    if (!mounted) {
      return (
        <div className="grid gap-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-32">
                <div className="text-slate-400">Loading server status...</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    const deleteServer = (serverId: string) => {
      if (confirm("Are you sure you want to remove this server from monitoring?")) {
        setServers(servers.filter((server) => server.id !== serverId))
      }
    }

    const toggleServerStatus = (serverId: string) => {
      setServers(
        servers.map((server) => {
          if (server.id === serverId) {
            const newStatus = server.status === "online" ? "offline" : "online"
            return { ...server, status: newStatus }
          }
          return server
        }),
      )
    }

    const addServer = () => {
      if (newServer.name && newServer.ip && newServer.port) {
        const server = {
          id: `server-${Date.now()}`,
          name: newServer.name,
          ip: newServer.ip,
          port: Number.parseInt(newServer.port),
          type: newServer.type,
          country: newServer.country,
          status: "online" as const,
          uptime: Math.random() * 10 + 95, // Random uptime between 95-100%
          responseTime: Math.floor(Math.random() * 100) + 10, // Random response time 10-110ms
          lastCheck: new Date().toISOString(),
          cpu: Math.floor(Math.random() * 60) + 20, // Random CPU 20-80%
          memory: Math.floor(Math.random() * 60) + 30, // Random memory 30-90%
          storage: Math.floor(Math.random() * 40) + 50, // Random storage 50-90%
          ping: Math.floor(Math.random() * 100) + 10,
          service: newServer.type,
          location: newServer.location || `${newServer.country} Server`,
        }
        setServers([...servers, server])
        setNewServer({ name: "", ip: "", port: "", type: "HTTP", country: "US", location: "" })
        setShowAddServer(false)
      }
    }

    const resetServers = () => {
      if (confirm("Are you sure you want to reset all servers to default? This will remove all custom servers.")) {
        const defaultServers = [
          {
            id: "server-1",
            name: "Web Server 01",
            ip: "192.168.1.10",
            port: 80,
            type: "HTTP",
            country: "US",
            status: "online" as const,
            uptime: 99.9,
            responseTime: 45,
            lastCheck: new Date().toISOString(),
            cpu: 47,
            memory: 61,
            storage: 70,
            ping: 45,
            service: "HTTP",
            location: "New York, USA",
          },
          {
            id: "server-2",
            name: "Database Server",
            ip: "192.168.1.20",
            port: 3306,
            type: "MySQL",
            country: "US",
            status: "online" as const,
            uptime: 99.8,
            responseTime: 12,
            lastCheck: new Date().toISOString(),
            cpu: 32,
            memory: 58,
            storage: 75,
            ping: 78,
            service: "MySQL",
            location: "London, UK",
          },
          {
            id: "server-3",
            name: "API Gateway",
            ip: "192.168.1.30",
            port: 8080,
            type: "API",
            country: "CA",
            status: "warning" as const,
            uptime: 98.5,
            responseTime: 120,
            lastCheck: new Date().toISOString(),
            cpu: 85,
            memory: 92,
            storage: 63,
            ping: 120,
            service: "Web App",
            location: "Tokyo, Japan",
          },
        ]
        setServers(defaultServers)
      }
    }

    return (
      <div className="grid gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Global Server Status</span>
              </CardTitle>
              <CardDescription>Monitor servers across different locations</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setShowAddServer(true)} className="bg-green-600 hover:bg-green-700" size="sm">
                Add Server
              </Button>
              <Button
                onClick={resetServers}
                variant="outline"
                size="sm"
                className="border-amber-600/50 text-amber-400 hover:bg-amber-900/20 bg-transparent"
              >
                Reset All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {servers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {servers.map((server) => (
                  <Card key={server.id} className="bg-slate-800/30 border-slate-700/50 relative group">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleServerStatus(server.id)}
                          className="h-6 w-6 p-0 text-slate-400 hover:text-blue-400"
                          title={server.status === "online" ? "Take offline" : "Bring online"}
                        >
                          {server.status === "online" ? (
                            <CircleOff className="h-3 w-3" />
                          ) : (
                            <CheckCircle className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteServer(server.id)}
                          className="h-6 w-6 p-0 text-slate-400 hover:text-red-400"
                          title="Remove server"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between pr-12">
                        <CardTitle className="text-sm">{server.name}</CardTitle>
                        {getStatusIcon(server.status)}
                      </div>
                      <CardDescription className="text-xs">
                        {server.ip}:{server.port} • {server.type}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Uptime:</span>
                          <span
                            className={
                              server.uptime > 99
                                ? "text-green-400"
                                : server.uptime > 95
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }
                          >
                            {server.uptime}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Response:</span>
                          <span
                            className={
                              server.responseTime < 50
                                ? "text-green-400"
                                : server.responseTime < 100
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }
                          >
                            {server.responseTime}ms
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Location:</span>
                          <span>{server.country}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">CPU:</span>
                          <span
                            className={
                              server.cpu < 70 ? "text-green-400" : server.cpu < 85 ? "text-yellow-400" : "text-red-400"
                            }
                          >
                            {server.cpu}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Memory:</span>
                          <span
                            className={
                              server.memory < 70
                                ? "text-green-400"
                                : server.memory < 85
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }
                          >
                            {server.memory}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Globe className="mx-auto h-12 w-12 text-slate-500 mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">No Servers</h3>
                <p className="text-slate-500 mb-4">Add servers to start monitoring</p>
                <Button onClick={() => setShowAddServer(true)} className="bg-green-600 hover:bg-green-700">
                  Add Your First Server
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Server Modal */}
        {showAddServer && (
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Add New Server</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddServer(false)}
                  className="text-slate-400 hover:text-slate-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-slate-400">Server Name</Label>
                  <input
                    type="text"
                    value={newServer.name}
                    onChange={(e) => setNewServer({ ...newServer, name: e.target.value })}
                    placeholder="e.g., Web Server 02"
                    className="w-full mt-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <Label className="text-sm text-slate-400">IP Address</Label>
                  <input
                    type="text"
                    value={newServer.ip}
                    onChange={(e) => setNewServer({ ...newServer, ip: e.target.value })}
                    placeholder="e.g., 192.168.1.50"
                    className="w-full mt-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <Label className="text-sm text-slate-400">Port</Label>
                  <input
                    type="number"
                    value={newServer.port}
                    onChange={(e) => setNewServer({ ...newServer, port: e.target.value })}
                    placeholder="e.g., 80"
                    className="w-full mt-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <Label className="text-sm text-slate-400">Service Type</Label>
                  <select
                    value={newServer.type}
                    onChange={(e) => setNewServer({ ...newServer, type: e.target.value })}
                    className="w-full mt-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="HTTP">HTTP</option>
                    <option value="HTTPS">HTTPS</option>
                    <option value="MySQL">MySQL</option>
                    <option value="PostgreSQL">PostgreSQL</option>
                    <option value="Redis">Redis</option>
                    <option value="API">API</option>
                    <option value="SSH">SSH</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm text-slate-400">Country</Label>
                  <select
                    value={newServer.country}
                    onChange={(e) => setNewServer({ ...newServer, country: e.target.value })}
                    className="w-full mt-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="AU">Australia</option>
                    <option value="SG">Singapore</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm text-slate-400">Location (Optional)</Label>
                  <input
                    type="text"
                    value={newServer.location}
                    onChange={(e) => setNewServer({ ...newServer, location: e.target.value })}
                    placeholder="e.g., New York, USA"
                    className="w-full mt-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAddServer(false)}
                className="border-slate-600/50 text-slate-400 hover:bg-slate-800/50"
              >
                Cancel
              </Button>
              <Button
                onClick={addServer}
                className="bg-green-600 hover:bg-green-700"
                disabled={!newServer.name || !newServer.ip || !newServer.port}
              >
                Add Server
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Server Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400">
                {servers.filter((s) => s.status === "online").length}
              </div>
              <div className="text-sm text-slate-400">Online Servers</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-400">
                {servers.filter((s) => s.status === "warning").length}
              </div>
              <div className="text-sm text-slate-400">Warning Status</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-400">
                {servers.filter((s) => s.status === "error" || s.status === "offline").length}
              </div>
              <div className="text-sm text-slate-400">Offline/Error</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-cyan-400">{servers.length}</div>
              <div className="text-sm text-slate-400">Total Servers</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Network Content Component
  function NetworkContent() {
    return (
      <div className="grid gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center">
              <Globe className="mr-2 h-5 w-5 text-cyan-500" />
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-2xl font-bold text-cyan-400">1.2 GB/s</div>
                <div className="text-sm text-slate-400">Bandwidth Usage</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-2xl font-bold text-green-400">42ms</div>
                <div className="text-sm text-slate-400">Latency</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-2xl font-bold text-purple-400">99.8%</div>
                <div className="text-sm text-slate-400">Packet Success</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-100">Network Interfaces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ethernet 1", ip: "192.168.1.100", status: "Connected", speed: "1 Gbps" },
                { name: "Ethernet 2", ip: "192.168.1.101", status: "Connected", speed: "1 Gbps" },
                { name: "Wi-Fi", ip: "192.168.1.102", status: "Disconnected", speed: "N/A" },
                { name: "VPN", ip: "10.0.0.1", status: "Connected", speed: "100 Mbps" },
              ].map((interface_, i) => (
                <div key={i} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-200">{interface_.name}</div>
                      <div className="text-sm text-slate-400">{interface_.ip}</div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          interface_.status === "Connected"
                            ? "bg-green-500/20 text-green-400 border-green-500/50"
                            : "bg-red-500/20 text-red-400 border-red-500/50"
                        }
                      >
                        {interface_.status}
                      </Badge>
                      <div className="text-sm text-slate-400 mt-1">{interface_.speed}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Security Content Component
  function SecurityContent() {
    const [mounted, setMounted] = useState(false)
    const [securityEvents, setSecurityEvents] = useState([
      {
        id: "event-1",
        time: "15:42:12",
        event: "Suspicious login attempt blocked from IP 192.168.1.100",
        type: "warning",
        severity: "high",
        source: "Windows Defender",
      },
      {
        id: "event-2",
        time: "14:30:45",
        event: "Firewall rule updated for port 8080",
        type: "info",
        severity: "medium",
        source: "Windows Firewall",
      },
      {
        id: "event-3",
        time: "13:15:22",
        event: "Security definitions updated successfully",
        type: "success",
        severity: "low",
        source: "Windows Update",
      },
      {
        id: "event-4",
        time: "12:05:18",
        event: "Failed login attempt detected from external IP",
        type: "error",
        severity: "high",
        source: "Windows Defender",
      },
      {
        id: "event-5",
        time: "11:30:00",
        event: "Security policy updated successfully",
        type: "info",
        severity: "low",
        source: "Group Policy",
      },
    ])

    // Load security events from localStorage on component mount
    useEffect(() => {
      setMounted(true)
      const savedEvents = localStorage.getItem("dashboard-security-events")
      if (savedEvents) {
        try {
          const parsedEvents = JSON.parse(savedEvents)
          setSecurityEvents(parsedEvents)
        } catch (error) {
          console.error("Error loading saved security events:", error)
        }
      }
    }, [])

    // Save security events to localStorage whenever events change (only after mounted)
    useEffect(() => {
      if (mounted) {
        localStorage.setItem("dashboard-security-events", JSON.stringify(securityEvents))
      }
    }, [securityEvents, mounted])

    // Don't render until mounted to prevent hydration mismatch
    if (!mounted) {
      return (
        <div className="grid gap-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-32">
                <div className="text-slate-400">Loading security dashboard...</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    const deleteSecurityEvent = (eventId: string) => {
      if (confirm("Are you sure you want to delete this security event?")) {
        setSecurityEvents(securityEvents.filter((event) => event.id !== eventId))
      }
    }

    const clearAllEvents = () => {
      if (confirm("Are you sure you want to clear all security events? This action cannot be undone.")) {
        setSecurityEvents([])
      }
    }

    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case "low":
          return "bg-blue-500/20 text-blue-400 border-blue-500/50"
        case "medium":
          return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
        case "high":
          return "bg-orange-500/20 text-orange-400 border-orange-500/50"
        case "critical":
          return "bg-red-500/20 text-red-400 border-red-500/50"
        default:
          return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      }
    }

    const getTypeColor = (type: string) => {
      switch (type) {
        case "success":
          return "bg-green-500/20 text-green-400 border-green-500/50"
        case "warning":
          return "bg-amber-500/20 text-amber-400 border-amber-500/50"
        case "error":
          return "bg-red-500/20 text-red-400 border-red-500/50"
        case "info":
          return "bg-blue-500/20 text-blue-400 border-blue-500/50"
        default:
          return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      }
    }

    return (
      <div className="grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Windows Defender</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Firewall</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">BitLocker</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Encrypted</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Updates</span>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Available</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Security Events</span>
                </CardTitle>
                <CardDescription>Recent security events and alerts</CardDescription>
              </div>
              {securityEvents.length > 0 && (
                <Button
                  onClick={clearAllEvents}
                  variant="outline"
                  size="sm"
                  className="border-red-600/50 text-red-400 hover:bg-red-900/20 bg-transparent"
                >
                  Clear All
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {securityEvents.length > 0 ? (
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {securityEvents.map((event) => (
                      <div
                        key={event.id}
                        className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 relative group"
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteSecurityEvent(event.id)}
                            className="h-6 w-6 p-0 text-slate-400 hover:text-red-400"
                            title="Delete event"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-start justify-between pr-8">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  event.severity === "high"
                                    ? "bg-orange-500"
                                    : event.severity === "medium"
                                      ? "bg-yellow-500"
                                      : event.severity === "critical"
                                        ? "bg-red-500"
                                        : "bg-blue-500"
                                }`}
                              />
                              <span className="text-sm font-medium text-slate-200">{event.event}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-slate-400">
                              <span>{event.source}</span>
                              <span>•</span>
                              <span>{event.time}</span>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <Badge className={getSeverityColor(event.severity)} variant="outline">
                              {event.severity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-12">
                  <Shield className="mx-auto h-12 w-12 text-slate-500 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-300 mb-2">No Security Events</h3>
                  <p className="text-slate-500 mb-4">All security events have been cleared</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Console Content Component
  function ConsoleContent() {
    return (
      <div className="grid gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Terminal className="h-5 w-5" />
              <span>PowerShell Console</span>
            </CardTitle>
            <CardDescription>Execute PowerShell commands and view system information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-black rounded-lg p-4 font-mono text-sm h-96 overflow-y-auto">
              {consoleOutput.map((line, index) => (
                <div key={index} className="text-green-400">
                  {line}
                </div>
              ))}
              <div className="flex items-center">
                <span className="text-blue-400">PS C:\PenguinHosting&gt; </span>
                <input
                  type="text"
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleConsoleCommand(consoleInput)
                    }
                  }}
                  className="bg-transparent border-none outline-none text-green-400 flex-1 ml-1"
                  placeholder="Type a command..."
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Communications Content Component
  function CommunicationsContent() {
    const [mounted, setMounted] = useState(false)
    const [messages, setMessages] = useState([
      {
        id: "msg-1",
        sender: "System Administrator",
        time: "15:42:12",
        message: "Scheduled maintenance will occur at 02:00. All systems will be temporarily offline.",
        priority: "high",
        unread: true,
      },
      {
        id: "msg-2",
        sender: "Security Module",
        time: "14:30:45",
        message: "Unusual login attempt blocked from IP 192.168.1.45. Added to watchlist.",
        priority: "medium",
        unread: true,
      },
      {
        id: "msg-3",
        sender: "Network Control",
        time: "12:15:33",
        message: "Bandwidth allocation adjusted for priority services during peak hours.",
        priority: "low",
        unread: false,
      },
      {
        id: "msg-4",
        sender: "Data Center",
        time: "09:05:18",
        message: "Backup verification complete. All data integrity checks passed.",
        priority: "low",
        unread: false,
      },
      {
        id: "msg-5",
        sender: "Update Service",
        time: "08:30:00",
        message: "Windows Server updates available. Restart required after installation.",
        priority: "medium",
        unread: false,
      },
    ])

    const [newMessage, setNewMessage] = useState("")

    // Load messages from localStorage on component mount
    useEffect(() => {
      setMounted(true)
      const savedMessages = localStorage.getItem("dashboard-communications")
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages)
          setMessages(parsedMessages)
        } catch (error) {
          console.error("Error loading saved messages:", error)
        }
      }
    }, [])

    // Save messages to localStorage whenever messages change (only after mounted)
    useEffect(() => {
      if (mounted) {
        localStorage.setItem("dashboard-communications", JSON.stringify(messages))
      }
    }, [messages, mounted])

    // Don't render until mounted to prevent hydration mismatch
    if (!mounted) {
      return (
        <div className="grid gap-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-32">
                <div className="text-slate-400">Loading communications...</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    const deleteMessage = (messageId: string) => {
      if (confirm("Are you sure you want to delete this message?")) {
        setMessages(messages.filter((msg) => msg.id !== messageId))
      }
    }

    const markAsRead = (messageId: string) => {
      setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, unread: false } : msg)))
    }

    const addMessage = () => {
      if (newMessage.trim()) {
        const message = {
          id: `msg-${Date.now()}`,
          sender: "User",
          time: new Date().toLocaleTimeString("en-US", { hour12: false }),
          message: newMessage.trim(),
          priority: "low",
          unread: false,
        }
        setMessages([message, ...messages])
        setNewMessage("")
      }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        addMessage()
      }
    }

    const clearAllMessages = () => {
      if (confirm("Are you sure you want to clear all messages? This action cannot be undone.")) {
        setMessages([])
      }
    }

    return (
      <div className="grid gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>System Messages</span>
              </CardTitle>
              <CardDescription>System notifications and alerts</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
                {messages.filter((msg) => msg.unread).length} Unread
              </Badge>
              {messages.length > 0 && (
                <Button
                  onClick={clearAllMessages}
                  variant="outline"
                  size="sm"
                  className="border-red-600/50 text-red-400 hover:bg-red-900/20 bg-transparent"
                >
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {messages.length > 0 ? (
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="p-4 bg-slate-800/50 rounded-lg relative group">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-1">
                          {message.unread && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(message.id)}
                              className="h-6 w-6 p-0 text-slate-400 hover:text-blue-400"
                              title="Mark as read"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteMessage(message.id)}
                            className="h-6 w-6 p-0 text-slate-400 hover:text-red-400"
                            title="Delete message"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-start justify-between pr-16">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{message.sender}</h4>
                            <span className="text-xs text-slate-500">{message.time}</span>
                          </div>
                          <p className="text-sm text-slate-400">{message.message}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {message.priority}
                            </Badge>
                          </div>
                        </div>
                        {message.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-slate-500 mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">No Messages</h3>
                <p className="text-slate-500 mb-4">All communications have been cleared</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t border-slate-700/50 pt-4">
            <div className="flex items-center w-full space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <Button onClick={addMessage} className="bg-cyan-600 hover:bg-cyan-700">
                Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Settings Content Component
  function SettingsContent() {
    return (
      <div className="grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Dashboard Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Auto Refresh</span>
                  <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Refresh Interval</span>
                  <span className="font-medium">5 seconds</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Theme</span>
                  <span className="font-medium">Dark</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Notifications</span>
                  <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Performance Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Animations</span>
                  <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Data Retention</span>
                  <span className="font-medium">7 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Cache Size</span>
                  <span className="font-medium">50 MB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Logging Level</span>
                  <span className="font-medium">Info</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}

// Component for nav items
function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: { icon: LucideIcon; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// Component for status items
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-cyan-500 to-blue-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

// Action button component
function ActionButton({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick?: () => void }) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="h-auto p-3 flex flex-col items-center space-y-1 border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 hover:text-slate-100"
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}
