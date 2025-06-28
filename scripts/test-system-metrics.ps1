# PenguinHosting Dashboard - System Metrics Test Script
# This script tests system monitoring capabilities and API endpoints

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PenguinHosting System Metrics Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Basic System Information
Write-Host "1. Testing Basic System Information..." -ForegroundColor Yellow
try {
    $computerInfo = Get-ComputerInfo -Property @(
        'WindowsProductName',
        'WindowsVersion', 
        'TotalPhysicalMemory',
        'CsProcessors'
    )
    
    Write-Host "   ✓ OS: $($computerInfo.WindowsProductName)" -ForegroundColor Green
    Write-Host "   ✓ Version: $($computerInfo.WindowsVersion)" -ForegroundColor Green
    Write-Host "   ✓ RAM: $([math]::Round($computerInfo.TotalPhysicalMemory / 1GB, 2)) GB" -ForegroundColor Green
    Write-Host "   ✓ CPU: $($computerInfo.CsProcessors.Name)" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Failed to get system information: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: CPU Usage
Write-Host "2. Testing CPU Usage..." -ForegroundColor Yellow
try {
    $cpuUsage = Get-Counter '\Processor(_Total)\% Processor Time' -SampleInterval 1 -MaxSamples 3
    $avgCpuUsage = ($cpuUsage.CounterSamples | Measure-Object -Property CookedValue -Average).Average
    Write-Host "   ✓ Average CPU Usage: $([math]::Round(100 - $avgCpuUsage, 2))%" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Failed to get CPU usage: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Memory Usage
Write-Host "3. Testing Memory Usage..." -ForegroundColor Yellow
try {
    $memory = Get-CimInstance -ClassName Win32_OperatingSystem
    $totalMemory = $memory.TotalVisibleMemorySize * 1KB
    $freeMemory = $memory.FreePhysicalMemory * 1KB
    $usedMemory = $totalMemory - $freeMemory
    $memoryUsagePercent = [math]::Round(($usedMemory / $totalMemory) * 100, 2)
    
    Write-Host "   ✓ Total Memory: $([math]::Round($totalMemory / 1GB, 2)) GB" -ForegroundColor Green
    Write-Host "   ✓ Used Memory: $([math]::Round($usedMemory / 1GB, 2)) GB" -ForegroundColor Green
    Write-Host "   ✓ Memory Usage: $memoryUsagePercent%" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Failed to get memory usage: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: Disk Usage
Write-Host "4. Testing Disk Usage..." -ForegroundColor Yellow
try {
    $disks = Get-CimInstance -ClassName Win32_LogicalDisk -Filter "DriveType=3"
    foreach ($disk in $disks) {
        $usagePercent = [math]::Round((($disk.Size - $disk.FreeSpace) / $disk.Size) * 100, 2)
        Write-Host "   ✓ Drive $($disk.DeviceID) Usage: $usagePercent% ($([math]::Round($disk.Size / 1GB, 2)) GB total)" -ForegroundColor Green
    }
} catch {
    Write-Host "   ✗ Failed to get disk usage: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 5: Network Interfaces
Write-Host "5. Testing Network Interfaces..." -ForegroundColor Yellow
try {
    $networkAdapters = Get-NetAdapter | Where-Object { $_.Status -eq 'Up' }
    foreach ($adapter in $networkAdapters) {
        Write-Host "   ✓ Interface: $($adapter.Name) - $($adapter.LinkSpeed)" -ForegroundColor Green
    }
} catch {
    Write-Host "   ✗ Failed to get network interfaces: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 6: Running Processes
Write-Host "6. Testing Process Information..." -ForegroundColor Yellow
try {
    $processes = Get-Process
    $totalProcesses = $processes.Count
    $topProcesses = $processes | Sort-Object CPU -Descending | Select-Object -First 5
    
    Write-Host "   ✓ Total Processes: $totalProcesses" -ForegroundColor Green
    Write-Host "   ✓ Top CPU Processes:" -ForegroundColor Green
    foreach ($process in $topProcesses) {
        if ($process.CPU) {
            Write-Host "     - $($process.ProcessName): $([math]::Round($process.CPU, 2))s CPU time" -ForegroundColor Cyan
        }
    }
} catch {
    Write-Host "   ✗ Failed to get process information: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 7: API Endpoint Test
Write-Host "7. Testing PenguinHosting API Endpoints..." -ForegroundColor Yellow
$apiBase = "http://localhost:8080"

# Test Health Endpoint
try {
    $healthResponse = Invoke-RestMethod -Uri "$apiBase/api/health" -Method GET -TimeoutSec 10
    Write-Host "   ✓ Health API: $($healthResponse.status)" -ForegroundColor Green
    Write-Host "     - Service: $($healthResponse.service)" -ForegroundColor Cyan
    Write-Host "     - Version: $($healthResponse.version)" -ForegroundColor Cyan
} catch {
    Write-Host "   ✗ Health API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Metrics Endpoint
try {
    $metricsResponse = Invoke-RestMethod -Uri "$apiBase/api/system-metrics" -Method GET -TimeoutSec 10
    if ($metricsResponse.success) {
        Write-Host "   ✓ Metrics API: Success" -ForegroundColor Green
        Write-Host "     - Hostname: $($metricsResponse.data.hostname)" -ForegroundColor Cyan
        Write-Host "     - CPU Usage: $($metricsResponse.data.cpu.usage)%" -ForegroundColor Cyan
    } else {
        Write-Host "   ✗ Metrics API returned error: $($metricsResponse.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "   ✗ Metrics API failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 8: Windows Services
Write-Host "8. Testing Critical Windows Services..." -ForegroundColor Yellow
$criticalServices = @('Winmgmt', 'EventLog', 'Themes', 'AudioSrv', 'BITS')
try {
    foreach ($serviceName in $criticalServices) {
        $service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
        if ($service) {
            $status = if ($service.Status -eq 'Running') { "✓" } else { "✗" }
            $color = if ($service.Status -eq 'Running') { "Green" } else { "Red" }
            Write-Host "   $status Service $serviceName: $($service.Status)" -ForegroundColor $color
        }
    }
} catch {
    Write-Host "   ✗ Failed to check services: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PenguinHosting Test Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Keep window open
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
