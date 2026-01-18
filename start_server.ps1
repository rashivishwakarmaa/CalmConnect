# CalmConnect Server Startup Script
Write-Host "Starting CalmConnect Server..." -ForegroundColor Green
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $scriptPath "CalmChat\calmchat.backend"

Set-Location $backendPath
python app.py
