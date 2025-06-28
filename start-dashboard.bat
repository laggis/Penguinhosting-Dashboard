@echo off
echo Starting PenguinHosting Dashboard...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if errorlevel 1 (
    echo Error: npm is not available
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Set environment variables
set CUSTOM_PORT=8080
set DASHBOARD_NAME=PenguinHosting

echo.
echo ==========================================
echo   PenguinHosting Dashboard Starting
echo ==========================================
echo   Port: %CUSTOM_PORT%
echo   URL: http://localhost:%CUSTOM_PORT%
echo ==========================================
echo.

REM Start the dashboard
npm start

REM Keep window open if there's an error
if errorlevel 1 (
    echo.
    echo Error: Dashboard failed to start
    pause
)
