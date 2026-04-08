param(
    [int]$Port = 8090
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting FitConnect on http://localhost:$Port ..."
Start-Process "http://localhost:$Port/UserApp/index.html"
Start-Process "http://localhost:$Port/GymOwnerApp/index.html"

Set-Location $root
python -m http.server $Port
