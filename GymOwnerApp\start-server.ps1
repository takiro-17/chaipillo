param(
    [int]$Port = 8088
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting local server on http://localhost:$Port ..."
Start-Process "http://localhost:$Port/index.html"

Set-Location $root
python -m http.server $Port
