# 🐧 PenguinHosting Dashboard

A modern, real-time system monitoring dashboard built with Next.js, featuring live metrics, security monitoring, and PowerShell integration.

## ✨ Features

### 🖥️ **System Monitoring**
- **Real-time CPU, Memory, and Disk usage monitoring**
- **Windows Performance Counters integration**
- **Process monitoring with detailed metrics**
- **Disk usage tracking across multiple drives**
- **System uptime and health status**
- **Live performance charts and visualizations**

### 🌐 **Global Server Management**
- **Multi-server monitoring from single dashboard**
- **Support for different service types (HTTP, HTTPS, APIs, Databases)**
- **Country-based server organization with flags**
- **Real-time ping and uptime monitoring**
- **Custom port and service configuration**
- **Server status management (online/offline/warning/error)**

### 🔒 **Security Dashboard**
- **Windows Defender integration**
- **Firewall status monitoring**
- **Threat detection and blocking statistics**
- **Security event logging**
- **BitLocker encryption status**
- **Failed login attempt tracking**

### 💬 **Communications System**
- **System-wide messaging and alerts**
- **Priority-based message classification**
- **Real-time notifications**
- **Message persistence with localStorage**
- **Interactive communication interface**

### 🛠️ **Additional Features**
- **PowerShell console integration**
- **Network interface monitoring**
- **Diagnostic tools and performance tests**
- **Customizable settings and preferences**
- **Dark/Light theme support**
- **Responsive design for all devices**
- **Particle animation background effects**

## 🏗️ **Architecture**

### **Frontend Stack**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5.7** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons

### **Backend Integration**
- **Next.js API Routes** - Server-side data processing
- **Windows OS Integration** - Native system metrics
- **Real-time Updates** - 5-second refresh intervals
- **Error Handling** - Graceful fallbacks and error recovery

### **Data Management**
- **localStorage** - Client-side persistence
- **Real-time State** - React hooks and context
- **API Caching** - Optimized data fetching
- **Hydration Safety** - SSR-compatible state management

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18.18.0 or higher
- Windows Server 2022 (recommended) or Windows 10/11
- PowerShell 5.1 or higher

### **Installation**

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/laggis/penguinhosting-dashboard.git
cd penguinhosting-dashboard
\`\`\`

2. **Install Dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Start Development Server**
\`\`\`bash
npm run dev
\`\`\`

4. **Start Production Server**
\`\`\`bash
npm run build
npm start
\`\`\`

5. **Windows Batch Start**
\`\`\`bash
start-dashboard.bat
\`\`\`

## 📁 **Project Structure**

\`\`\`
penguinhosting-dashboard/
├── app/
│   ├── api/
│   │   ├── system-metrics/
│   │   │   └── route.ts          # System metrics API endpoint
│   │   └── health/
│   │       └── route.ts          # Health check endpoint
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Home page
│   ├── loading.tsx               # Loading UI
│   ├── error.tsx                 # Error boundary
│   └── not-found.tsx             # 404 page
├── components/
│   ├── ui/                       # shadcn/ui components
│   └── dashboard.tsx             # Main dashboard component
├── hooks/
│   └── use-system-metrics.ts     # Custom hook for system data
├── scripts/
│   └── test-system-metrics.ps1   # PowerShell testing script
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
\`\`\`

## ⚙️ **Configuration**

### **Environment Variables**
Create a `.env.local` file in the root directory:

\`\`\`env
# Custom port (default: 8080)
CUSTOM_PORT=8080

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080

# Development settings
NODE_ENV=development
\`\`\`

### **Server Configuration**
The dashboard runs on port 8080 by default. You can change this in:
- `.env.local` file
- `next.config.js`
- Environment variable `CUSTOM_PORT`

## 🖥️ **Dashboard Sections**

### **1. Main Dashboard**
- System overview with real-time metrics
- Performance charts and graphs
- Process monitoring table
- Storage usage visualization
- Security status indicators
- System alerts and notifications

### **2. Diagnostics**
- Hardware status monitoring
- System health indicators
- Performance testing tools
- Temperature and fan speed monitoring
- Boot time and stability metrics

### **3. Data Center**
- Global server management interface
- Add/remove servers dynamically
- Multi-country server monitoring
- Service-specific port monitoring
- Real-time ping and uptime tracking
- Server performance metrics

### **4. Network**
- Network interface monitoring
- Bandwidth usage statistics
- Latency measurements
- Packet success rates
- Connection status tracking

### **5. Security**
- Threat detection dashboard
- Security service status
- Recent security events
- Firewall and antivirus monitoring
- Failed login attempt tracking

### **6. Console**
- Integrated PowerShell terminal
- Quick command shortcuts
- Command history
- System information queries
- Administrative tools access

### **7. Communications**
- System message center
- Priority-based notifications
- Real-time alerts
- Message management
- Communication history

### **8. Settings**
- Display preferences
- Notification settings
- Performance configuration
- Theme customization
- Auto-refresh intervals

## 🔧 **API Endpoints**

### **System Metrics** - `/api/system-metrics`
\`\`\`typescript
GET /api/system-metrics
Response: {
  cpuUsage: number,
  memoryUsage: number,
  uptime: string,
  networkStatus: number,
  processes: ProcessInfo[],
  diskUsage: DiskInfo[],
  systemInfo: SystemInfo
}
\`\`\`

### **Health Check** - `/api/health`
\`\`\`typescript
GET /api/health
Response: {
  status: "healthy" | "unhealthy",
  timestamp: string,
  services: ServiceStatus[]
}
\`\`\`

### **API Testing** - `/test-api`
- Accessible page for testing API endpoints

## 🌐 **Server Monitoring**

### **Supported Services**
- **HTTP (Port 80)** - Web servers
- **HTTPS (Port 443)** - Secure web servers
- **Web Apps (Port 8080)** - Application servers
- **Development (Port 3000)** - Dev environments
- **Custom Apps (Port 9000)** - Custom applications
- **MySQL (Port 3306)** - Database servers
- **PostgreSQL (Port 5432)** - Database servers
- **Redis (Port 6379)** - Cache servers
- **SSH (Port 22)** - Remote access (if needed)
- **Custom Ports** - Any port configuration

### **Adding Servers**
1. Navigate to Data Center tab
2. Click "Add Server" button
3. Fill in server details:
   - Server name
   - IP address
   - Port and service type
   - Location and country
4. Server will be automatically monitored

### **Server Management**
- **Toggle Status** - Enable/disable monitoring
- **Remove Servers** - Delete from monitoring list
- **Reset All** - Restore default server list
- **Real-time Updates** - Automatic health checks every 30 seconds

## 🎨 **Customization**

### **Themes**
- **Dark Mode** (default) - Cyberpunk-inspired dark theme
- **Light Mode** - Clean light theme
- **Custom Colors** - Modify `tailwind.config.js` for custom color schemes

### **Animations**
- **Particle Background** - Animated particle system
- **Loading Animations** - Custom loading states
- **Hover Effects** - Interactive UI elements
- **Smooth Transitions** - Fluid state changes

### **Layout**
- **Responsive Design** - Works on all screen sizes
- **Sidebar Navigation** - Collapsible navigation menu
- **Grid System** - Flexible component layout
- **Card Components** - Modular information display

## 🔍 **Troubleshooting**

### **Common Issues**

**1. System Metrics Not Loading**
- Check Windows permissions
- Verify PowerShell execution policy
- Ensure Node.js has system access
- Check firewall settings

**2. Server Monitoring Issues**
- Verify network connectivity
- Check port accessibility
- Confirm firewall rules
- Validate IP addresses

**3. Performance Issues**
- Reduce refresh intervals in settings
- Disable animations if needed
- Check system resources
- Clear browser cache

**4. Hydration Errors**
- Clear localStorage data
- Restart development server
- Check for client/server state mismatches

### **Debug Mode**
Enable debug logging by setting:
\`\`\`env
NODE_ENV=development
DEBUG=true
\`\`\`

## 📊 **Performance Optimization**

### **Frontend Optimization**
- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Next.js image optimization
- **Bundle Analysis** - Webpack bundle analyzer
- **Caching Strategy** - Aggressive caching for static assets

### **Backend Optimization**
- **API Caching** - Response caching for system metrics
- **Error Handling** - Graceful error recovery
- **Resource Management** - Efficient system resource usage
- **Memory Management** - Optimized data structures

## 🔒 **Security Considerations**

### **Data Protection**
- **No sensitive data exposure** - System metrics only
- **Local storage only** - No external data transmission
- **CORS protection** - Configured for local access
- **Input validation** - All user inputs validated

### **Network Security**
- **Local network only** - Designed for internal use
- **Port-based monitoring** - No SSH dependency required
- **Firewall friendly** - Uses standard service ports
- **Secure defaults** - Conservative security settings

## 🚀 **Deployment Options**

### **Development**
\`\`\`bash
npm run dev
\`\`\`
- Hot reloading enabled
- Debug mode active
- Development optimizations

### **Production**
\`\`\`bash
npm run build
npm start
\`\`\`
- Optimized build
- Production performance
- Error logging enabled

### **Windows Service**
\`\`\`bash
# Install PM2
npm install -g pm2

# Start as service
pm2 start npm --name "penguinhosting" -- start

# Save configuration
pm2 save
pm2 startup
\`\`\`

### **Docker** (Optional)
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
\`\`\`

## 📈 **Monitoring & Analytics**

### **System Metrics**
- **CPU Usage** - Real-time processor utilization
- **Memory Usage** - RAM consumption tracking
- **Disk Usage** - Storage space monitoring
- **Network Activity** - Bandwidth and connectivity
- **Process Monitoring** - Running applications tracking

### **Server Health**
- **Uptime Tracking** - Service availability monitoring
- **Response Times** - Latency measurements
- **Error Rates** - Failure detection and alerting
- **Performance Trends** - Historical data analysis

## 🤝 **Contributing**

### **Development Setup**
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test thoroughly
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open Pull Request

### **Code Standards**
- **TypeScript** - Strict type checking enabled
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Conventional Commits** - Standardized commit messages

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Next.js Team** - Amazing React framework
- **Vercel** - Hosting and deployment platform
- **shadcn/ui** - Beautiful component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon library
- **Microsoft** - Windows Server platform

## 📞 **Support**

For support and questions, please visit our documentation or contact the PenguinHosting team.

## System Requirements

- **OS**: Windows Server 2022, Windows 10/11
- **Node.js**: 18+
- **RAM**: 4GB minimum
- **Storage**: 1GB free space
- **Network**: Local network access

---

## 🎯 **Roadmap**

### **Upcoming Features**
- [ ] **Database Integration** - PostgreSQL/MySQL support
- [ ] **User Authentication** - Multi-user support
- [ ] **Alert System** - Email/SMS notifications
- [ ] **Historical Data** - Long-term metrics storage
- [ ] **Mobile App** - React Native companion
- [ ] **API Documentation** - OpenAPI/Swagger docs
- [ ] **Plugin System** - Extensible architecture
- [ ] **Cloud Integration** - AWS/Azure monitoring

### **Version History**
- **v1.0.0** - Initial release with core monitoring
- **v1.1.0** - Added global server monitoring
- **v1.2.0** - Enhanced port and service support
- **v1.3.0** - Communications system
- **v1.4.0** - Security dashboard improvements

---

**Built with ❤️ for system administrators and DevOps engineers**

*Keep your servers running smoothly with real-time monitoring and beautiful visualizations!* 🐧
