import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PenguinHosting Dashboard",
  description: "Real-time system monitoring dashboard with security monitoring and PowerShell integration",
  keywords: ["dashboard", "monitoring", "system-metrics", "penguinhosting", "security"],
  authors: [{ name: "PenguinHosting Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0f172a",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="application-name" content="PenguinHosting Dashboard" />
        <meta name="apple-mobile-web-app-title" content="PenguinHosting" />
      </head>
      <body className={`${inter.className} bg-slate-900 text-white min-h-screen`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">{children}</div>
      </body>
    </html>
  )
}
